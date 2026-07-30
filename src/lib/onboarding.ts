import { cookies } from "next/headers";
import { apiFetch, apiFetchSafe } from "./api";
import { ACCESS_COOKIE } from "./auth-cookies";

/**
 * The join wizard is driven ENTIRELY by this shape. `step` is the API's
 * authoritative view of where the user is; the portal never keeps join
 * progress in React state or storage, so a user can't land on a screen the
 * server disagrees with (e.g. /join/pass without having passed).
 *
 * Mirrors OnboardingService.status() in the API.
 */
export type JoinRole = "CUSTOMER" | "AFFILIATE" | "INFLUENCER" | "VENDOR" | "ADMIN";
export type KycStatus = "PENDING" | "APPROVED" | "REJECTED";

/** Affiliate steps come from OnboardingService.affiliateStep(); a user who has
 * not picked a role yet is still CUSTOMER and reports "done". */
export type JoinStep =
  | "done"
  | "kyc"
  | "kyc-rejected"
  | "tutorial"
  | "assessment"
  | "locked"
  | "active"
  | "review"
  | "approved"
  | "rejected";

export type JoinStatus = {
  role: JoinRole;
  accountStatus: string;
  kycStatus: KycStatus | null;
  kycReason: string | null;
  step: JoinStep;
  /** Affiliate-only — absent for other roles. */
  tutorial?: { total: number; done: number; completed: boolean };
  assessment?: {
    passed: boolean;
    attemptsUsed: number;
    retakesLeft: number;
    passMark: number;
  };
  isActive?: boolean;
  referralCode?: string | null;
};

export type Me = {
  id: string;
  email: string;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  role: JoinRole;
  status: string;
};

export const hasSession = async () =>
  Boolean((await cookies()).get(ACCESS_COOKIE)?.value);

export const getJoinStatus = () => apiFetch<JoinStatus>("/onboarding/status");
export const getJoinStatusSafe = () => apiFetchSafe<JoinStatus>("/onboarding/status");
export const getMe = () => apiFetch<Me>("/auth/me");
export const getMeSafe = () => apiFetchSafe<Me>("/auth/me");

/**
 * The single canonical screen for a given server state. Every /join page
 * redirects here when the user does not belong on it.
 */
export function joinPathForStatus(status: JoinStatus): string {
  if (status.role !== "AFFILIATE") return "/join/role";

  switch (status.step) {
    case "active":
      return "/join/pass";
    case "kyc-rejected":
      return "/join/rejected";
    case "kyc":
      return "/join/kyc";
    case "tutorial":
      return "/join/tutorial";
    case "assessment":
      return "/join/assessment";
    case "locked":
      return "/join/fail";
    default:
      return "/join/role";
  }
}

/** Display name for the "Welcome {name}" topbar and the profile card. */
export function fullName(me: Me | null): string {
  const name = [me?.firstName, me?.lastName].filter(Boolean).join(" ").trim();
  return name || me?.email || "there";
}

export function firstNameOf(me: Me | null): string {
  return me?.firstName?.trim() || fullName(me).split(/\s+/)[0] || "there";
}

/** Only ever navigate to in-app paths supplied via ?next=. */
export function safeNext(next: string | undefined): string | null {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return null;
  return next;
}
