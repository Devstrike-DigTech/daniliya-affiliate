"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ApiError, apiFetch } from "@/lib/api";
import { refreshSession } from "@/lib/session";
import { IDLE, type ActionState } from "./action-state";

const messageOf = (err: unknown, fallback: string) =>
  err instanceof ApiError ? err.message : fallback;

// ── Role ────────────────────────────────────────────────────────────────

/**
 * Provisions the affiliate profile. The JWT in the cookie still says CUSTOMER
 * straight after this call, so we rotate the token pair immediately — without
 * that, the first /affiliate/* request the dashboard makes returns 403.
 */
export async function selectAffiliateRole(): Promise<ActionState> {
  try {
    await apiFetch("/onboarding/role", {
      method: "POST",
      body: JSON.stringify({ role: "AFFILIATE" }),
    });
  } catch (err) {
    return { error: messageOf(err, "Could not set your role. Try again.") };
  }

  const refreshed = await refreshSession();
  if (!refreshed) {
    return {
      error:
        "Your role was saved but your session could not be renewed. Sign in again to continue.",
    };
  }

  revalidatePath("/join", "layout");
  redirect("/join/kyc");
}

// ── Tutorial ────────────────────────────────────────────────────────────

export async function completeLesson(stepId: string): Promise<ActionState> {
  try {
    await apiFetch(`/onboarding/tutorial/${stepId}/complete`, { method: "POST" });
  } catch (err) {
    return { error: messageOf(err, "Could not save your progress.") };
  }
  revalidatePath("/join/tutorial");
  return IDLE;
}

// ── Assessment ──────────────────────────────────────────────────────────

export type AssessmentResult = {
  score: number;
  passed: boolean;
  correct: number;
  total: number;
  passMark: number;
  attemptsUsed: number;
  retakesLeft: number;
  referralCode: string | null;
  isActive: boolean;
};

/**
 * Answers are graded server-side; `selected` is the option TEXT, not an index.
 * On success we send the user to the pass/fail screen, both of which re-read
 * the server status before rendering.
 */
export async function submitAssessment(
  answers: { questionId: string; selected: string }[],
): Promise<ActionState> {
  let result: AssessmentResult;
  try {
    result = await apiFetch<AssessmentResult>("/onboarding/assessment/submit", {
      method: "POST",
      body: JSON.stringify({ answers }),
    });
  } catch (err) {
    return { error: messageOf(err, "Could not submit your assessment.") };
  }

  revalidatePath("/join", "layout");
  // The score of a single attempt is not exposed by /onboarding/status, so the
  // fail screen receives it here. Everything the screen gates on (retakes left,
  // pass mark) is re-read from the server.
  redirect(result.passed ? "/join/pass" : `/join/fail?score=${result.score}`);
}

// ── KYC ─────────────────────────────────────────────────────────────────

export type BankAccount = { id: string; accountName: string; accountNumber: string };

/**
 * KYC needs a verified payout account, so this creates the bank account first
 * and then submits the KYC record with its id.
 *
 * NOTE: in this environment `POST /me/bank-accounts` returns 503 — no bank
 * name-enquiry provider key is configured — which makes KYC impossible to
 * complete. That error is surfaced verbatim; nothing here fakes a success.
 */
export async function submitKyc(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const accountNumber = String(formData.get("accountNumber") ?? "");
  const bankCode = String(formData.get("bankCode") ?? "");
  const idType = String(formData.get("idType") ?? "");
  const idNumber = String(formData.get("idNumber") ?? "").trim();
  const dob = String(formData.get("dob") ?? "").trim();
  const govIdUrl = String(formData.get("govIdUrl") ?? "").trim();

  if (!/^\d{10}$/.test(accountNumber)) return { error: "Enter your 10-digit account number." };
  if (!bankCode) return { error: "Select your bank." };
  if (!idType) return { error: "Select the type of ID you are submitting." };
  if (!idNumber) return { error: "Enter your ID number." };

  let account: BankAccount;
  try {
    account = await apiFetch<BankAccount>("/me/bank-accounts", {
      method: "POST",
      body: JSON.stringify({ accountNumber, bankCode, isDefault: true }),
    });
  } catch (err) {
    if (err instanceof ApiError && err.status === 503) {
      return {
        error:
          `Bank verification is unavailable, so KYC cannot be submitted right now. ` +
          `The API reported: “${err.message}” This is a service configuration issue on ` +
          `our side — your details have not been saved.`,
      };
    }
    return { error: messageOf(err, "Could not verify that bank account.") };
  }

  try {
    await apiFetch("/kyc", {
      method: "POST",
      body: JSON.stringify({
        idType,
        idNumber,
        ...(dob ? { dob } : {}),
        ...(govIdUrl ? { govIdUrl } : {}),
        bankAccountId: account.id,
      }),
    });
  } catch (err) {
    return { error: messageOf(err, "Could not submit your KYC.") };
  }

  revalidatePath("/join", "layout");
  redirect("/join/review");
}
