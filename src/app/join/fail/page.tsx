import type { Metadata } from "next";
import FailStep from "@/components/onboarding/steps/FailStep";
import { firstNameOf, fullName } from "@/lib/onboarding";
import { nextStepsFor, requireJoinStep } from "../guard";

export const metadata: Metadata = { title: "Assessment result" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ score?: string }>;
}) {
  // Only reachable once the server has recorded a failed attempt.
  const { status, me } = await requireJoinStep(
    (s) =>
      s.role === "AFFILIATE" &&
      !(s.assessment?.passed ?? false) &&
      (s.assessment?.attemptsUsed ?? 0) > 0,
  );

  // /onboarding/status does not expose the score of a single attempt, so the
  // submit action passes it through the URL. Everything the screen gates on
  // (attempts, pass mark) comes from the server, not this value.
  const raw = (await searchParams).score;
  const parsed = raw === undefined ? NaN : Number(raw);
  const score = Number.isInteger(parsed) && parsed >= 0 && parsed <= 100 ? parsed : null;

  const assessment = status.assessment;
  const attemptsUsed = assessment?.attemptsUsed ?? 0;
  const retakesLeft = assessment?.retakesLeft ?? 0;

  return (
    <FailStep
      profile={{
        name: fullName(me),
        email: me?.email ?? "",
        phone: me?.phone ?? "",
      }}
      firstName={firstNameOf(me)}
      score={score}
      passMark={assessment?.passMark ?? 60}
      attemptsUsed={attemptsUsed}
      retakesLeft={retakesLeft}
      maxAttempts={attemptsUsed + retakesLeft}
      nextSteps={nextStepsFor(status)}
    />
  );
}
