"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import {
  GatedShell,
  OnboardingAside,
  WhatHappensNext,
} from "@/components/onboarding/shells";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";
import {
  assessmentImproveTopics,
  assessmentQuestions,
  ASSESSMENT_PASS_MARK,
  ASSESSMENT_RETAKES,
} from "@/lib/data";

const NEXT_STEPS = [
  { text: "We review within 24 hours.", done: true },
  { text: "You unlock the Tutorial step.", done: true },
  { text: "Pass the assessment & start earning." },
];

export default function FailStep() {
  const router = useRouter();
  const { profile, firstName, score, retakes, resetAssessment } = useOnboarding();

  return (
    <GatedShell name={firstName}>
      <div className="grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-red-300 bg-white p-6 sm:p-8">
          <p className="text-sm text-ink/50">Not passed yet</p>
          <h1 className="mt-1 text-2xl font-bold">You scored {score}%</h1>
          <p className="mt-2 text-sm text-ink/60">
            You need {ASSESSMENT_PASS_MARK}% to activate your affiliate account.
            Review the tutorial and try again — you&apos;ve got this.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-xs text-ink/50">Your score</p>
              <p className="mt-1 text-xl font-bold text-red-500">{score}%</p>
            </div>
            <div className="rounded-xl bg-cream p-4">
              <p className="text-xs text-ink/50">Retakes remaining</p>
              <p className="mt-1 text-xl font-bold">{retakes} of {ASSESSMENT_RETAKES}</p>
            </div>
          </div>
          <div className="mt-5 rounded-xl bg-cream p-5">
            <p className="text-sm font-bold">Where you can improve</p>
            <ul className="mt-2 space-y-1.5 text-xs text-ink/65">
              {assessmentImproveTopics.map((t) => (
                <li key={t}>· {t}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => router.push("/join/tutorial")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/20 py-3.5 text-sm font-bold transition-colors hover:border-ink"
            >
              <Icon name="play" size={15} /> Review Tutorial
            </button>
            <button
              onClick={() => {
                resetAssessment();
                router.push("/join/assessment");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Retake assessment <Icon name="arrow-right" size={16} />
            </button>
          </div>
        </div>
        <OnboardingAside profile={profile}>
          <div className="rounded-2xl bg-cream p-5">
            <p className="text-sm font-bold">
              Take the <span className="text-brand">Assessment</span>
            </p>
            <p className="mt-2 text-xs text-ink/60">
              · Pass mark: {ASSESSMENT_PASS_MARK}% · {assessmentQuestions.length} questions
            </p>
          </div>
          <WhatHappensNext steps={NEXT_STEPS} />
        </OnboardingAside>
      </div>
    </GatedShell>
  );
}
