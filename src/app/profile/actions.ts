"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api";

export type PasswordState = { ok: boolean; message: string } | null;

export type KycFormState = { ok: boolean; error?: string } | null;

/**
 * Complete verification (or just add a payout account) from Settings — the same
 * work the onboarding KYC step does, but it returns a result for a modal to
 * close on instead of redirecting into the onboarding wizard. Sends the ID
 * fields only when they're present, so it doubles as "add another bank account".
 */
export async function submitKycFromSettings(
  _prev: KycFormState,
  formData: FormData,
): Promise<KycFormState> {
  const accountNumber = String(formData.get("accountNumber") ?? "");
  const bankCode = String(formData.get("bankCode") ?? "");
  const idType = String(formData.get("idType") ?? "");
  const idNumber = String(formData.get("idNumber") ?? "").trim();
  const dob = String(formData.get("dob") ?? "").trim();

  if (!/^\d{10}$/.test(accountNumber)) return { ok: false, error: "Enter your 10-digit account number." };
  if (!bankCode) return { ok: false, error: "Select your bank." };

  const wantsKyc = Boolean(idType || idNumber);
  if (wantsKyc) {
    if (!idType) return { ok: false, error: "Select your ID type." };
    if (!idNumber) return { ok: false, error: "Enter your ID number." };
  }

  let accountId: string;
  try {
    const account = await apiFetch<{ id: string }>("/me/bank-accounts", {
      method: "POST",
      body: JSON.stringify({ accountNumber, bankCode, isDefault: true }),
    });
    accountId = account.id;
  } catch (err) {
    // Re-use an account that's already saved rather than erroring out.
    if (err instanceof ApiError && /already saved/i.test(err.message)) {
      const accounts = await apiFetch<{ id: string; accountNumber: string }[]>("/me/bank-accounts");
      const found = accounts.find((a) => a.accountNumber === accountNumber);
      if (!found) return { ok: false, error: err.message };
      accountId = found.id;
    } else {
      return {
        ok: false,
        error: err instanceof ApiError ? err.message : "Could not verify that bank account.",
      };
    }
  }

  if (wantsKyc) {
    try {
      await apiFetch("/kyc", {
        method: "POST",
        body: JSON.stringify({
          idType,
          idNumber,
          ...(dob ? { dob } : {}),
          bankAccountId: accountId,
        }),
      });
    } catch (err) {
      return { ok: false, error: err instanceof ApiError ? err.message : "Could not submit your KYC." };
    }
  }

  revalidatePath("/profile");
  return { ok: true };
}

/**
 * POST /auth/change-password. The API validates the current password and the
 * new password's strength rule, so its message is surfaced verbatim.
 */
export async function changePassword(
  _prev: PasswordState,
  formData: FormData,
): Promise<PasswordState> {
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!currentPassword || !newPassword) {
    return { ok: false, message: "Enter your current and new password." };
  }
  if (newPassword !== confirmPassword) {
    return { ok: false, message: "The new passwords don't match." };
  }

  try {
    await apiFetch("/auth/change-password", {
      method: "POST",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return { ok: true, message: "Password updated." };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof ApiError ? err.message : "Something went wrong.",
    };
  }
}
