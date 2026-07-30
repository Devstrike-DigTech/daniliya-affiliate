import type { Metadata } from "next";
import Link from "next/link";
import AssessmentStep, { type Question } from "@/components/onboarding/steps/AssessmentStep";
import { GatedShell } from "@/components/onboarding/shells";
import { ApiError, apiFetch } from "@/lib/api";
import { firstNameOf, fullName } from "@/lib/onboarding";
import { nextStepsFor, requireJoinStep } from "../guard";

export const metadata: Metadata = { title: "Assessment" };

type Attempt = {
  questions: Question[];
  timerSeconds: number;
  passMark: number;
  attemptsUsed: number;
  retakesLeft: number;
};

export default async function Page() {
  const { status, me } = await requireJoinStep(
    (s) => s.role === "AFFILIATE" && s.step !== "active",
  );

  const profile = {
    name: fullName(me),
    email: me?.email ?? "",
    phone: me?.phone ?? "",
  };

  // Starting an attempt is what enforces the rules: 400 if the tutorial isn't
  // finished, 403 once every attempt is used. Surface the API's own wording
  // rather than crashing or silently rendering an empty quiz.
  let attempt: Attempt;
  try {
    attempt = await apiFetch<Attempt>("/onboarding/assessment");
  } catch (err) {
    const message =
      err instanceof ApiError ? err.message : "The assessment could not be started.";
    return (
      <GatedShell name={firstNameOf(me)}>
        <div className="mx-auto max-w-xl rounded-2xl border border-ink/10 bg-white p-8 text-center">
          <h1 className="text-xl font-bold">You can&apos;t start the assessment yet</h1>
          <p className="mt-2 text-sm text-ink/60">{message}</p>
          <Link
            href="/join/tutorial"
            className="mt-6 inline-block rounded-xl bg-brand px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Back to the tutorial
          </Link>
        </div>
      </GatedShell>
    );
  }

  return (
    <AssessmentStep
      profile={profile}
      firstName={firstNameOf(me)}
      questions={attempt.questions}
      timerSeconds={attempt.timerSeconds}
      passMark={attempt.passMark}
      retakesLeft={attempt.retakesLeft}
      nextSteps={nextStepsFor(status)}
    />
  );
}
