import { redirect } from "next/navigation";
import {
  getJoinStatusSafe,
  hasSession,
  joinPathForStatus,
  safeNext,
} from "@/lib/onboarding";

/**
 * The router for the whole join flow. Anyone landing here — a fresh visitor, or
 * someone who just signed in — is sent to the one screen the SERVER says they
 * belong on. Nothing about their progress is inferred on the client.
 */
export default async function JoinIndex({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const next = safeNext((await searchParams).next);

  if (!(await hasSession())) redirect("/join/signup");

  const status = await getJoinStatusSafe();
  if (!status) redirect("/login");

  // A fully activated affiliate belongs in the dashboard, not the wizard.
  if (status.role === "AFFILIATE" && status.step === "active") redirect(next ?? "/");

  redirect(joinPathForStatus(status));
}
