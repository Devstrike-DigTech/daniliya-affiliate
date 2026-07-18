import { redirect } from "next/navigation";
import {
  getJoinStatusSafe,
  getMeSafe,
  joinPathForStatus,
  type JoinStatus,
  type Me,
} from "@/lib/onboarding";

/**
 * Every gated join screen calls this on each load. It re-reads the server's
 * authoritative status and redirects to the canonical screen unless `allow`
 * says the user genuinely belongs here — which is why you cannot reach
 * /join/pass without the server saying you passed.
 */
export async function requireJoinStep(
  allow: (status: JoinStatus) => boolean,
): Promise<{ status: JoinStatus; me: Me | null }> {
  const [status, me] = await Promise.all([getJoinStatusSafe(), getMeSafe()]);

  // Proxy already gated on a session; a null status means the token was
  // rejected outright, so send them back to sign in.
  if (!status) redirect("/login");
  if (!allow(status)) redirect(joinPathForStatus(status));

  return { status, me };
}

/**
 * The "What happens next" rail, built from the real server status instead of
 * the hardcoded all-done list the mockup shipped with.
 */
export function nextStepsFor(status: JoinStatus) {
  const tutorial = status.tutorial;
  const assessment = status.assessment;

  return [
    {
      text: status.kycStatus
        ? `Identity check submitted — ${status.kycStatus.toLowerCase()}.`
        : "Submit your identity & payout details.",
      done: status.kycStatus === "APPROVED",
    },
    {
      text: tutorial
        ? `Finish the tutorial — ${tutorial.done} of ${tutorial.total} lessons done.`
        : "Finish the affiliate tutorial.",
      done: tutorial?.completed ?? false,
    },
    {
      text: assessment
        ? `Score ${assessment.passMark}% or more on the assessment to activate.`
        : "Pass the assessment to activate your account.",
      done: assessment?.passed ?? false,
    },
  ];
}
