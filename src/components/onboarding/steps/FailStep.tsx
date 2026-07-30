"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import {
  GatedShell,
  OnboardingAside,
  WhatHappensNext,
  type Profile,
} from "@/components/onboarding/shells";

export default function FailStep({
  profile,
  firstName,
  score,
  passMark,
  attemptsUsed,
  retakesLeft,
  maxAttempts,
  nextSteps,
}: {
  profile: Profile;
  firstName: string;
  /** From the attempt that was just submitted; null on a direct visit. */
  score: number | null;
  passMark: number;
  attemptsUsed: number;
  retakesLeft: number;
  maxAttempts: number;
  nextSteps: { text: string; done?: boolean }[];
}) {
  const locked = retakesLeft <= 0;

  return (
    <GatedShell name={firstName}>
      <div className="grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-red-300 bg-white p-6 sm:p-8">
          <p className="text-sm text-ink/50">Not passed yet</p>
          <h1 className="mt-1 text-2xl font-bold">
            {score === null
              ? "You haven't passed the assessment"
              : `You scored ${score}%`}
          </h1>
          <p className="mt-2 text-sm text-ink/60">
            {locked
              ? `You've used all ${maxAttempts} attempts. Contact support to have your assessment reset.`
              : `You need ${passMark}% to activate your affiliate account. Review the tutorial and try again — you've got this.`}
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-xs text-ink/50">Your score</p>
              <p className="mt-1 text-xl font-bold text-red-500">
                {score === null ? "Not available" : `${score}%`}
              </p>
            </div>
            <div className="rounded-xl bg-cream p-4">
              <p className="text-xs text-ink/50">Attempts remaining</p>
              <p className="mt-1 text-xl font-bold">
                {retakesLeft} of {maxAttempts}
              </p>
              <p className="mt-1 text-xs text-ink/45">{attemptsUsed} used so far</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/join/tutorial"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/20 py-3.5 text-sm font-bold transition-colors hover:border-ink"
            >
              <Icon name="play" size={15} /> Review Tutorial
            </Link>
            {!locked && (
              <Link
                href="/join/assessment"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                Retake assessment <Icon name="arrow-right" size={16} />
              </Link>
            )}
          </div>
        </div>
        <OnboardingAside profile={profile}>
          <div className="rounded-2xl bg-cream p-5">
            <p className="text-sm font-bold">
              Take the <span className="text-brand">Assessment</span>
            </p>
            <p className="mt-2 text-xs text-ink/60">· Pass mark: {passMark}%</p>
          </div>
          <WhatHappensNext steps={nextSteps} />
        </OnboardingAside>
      </div>
    </GatedShell>
  );
}
