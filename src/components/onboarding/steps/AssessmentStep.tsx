"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import {
  GatedShell,
  OnboardingAside,
  WhatHappensNext,
} from "@/components/onboarding/shells";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";
import {
  assessmentQuestions,
  ASSESSMENT_PASS_MARK,
} from "@/lib/data";

const NEXT_STEPS = [
  { text: "We review within 24 hours.", done: true },
  { text: "You unlock the Tutorial step.", done: true },
  { text: "Pass the assessment & start earning." },
];

export default function AssessmentStep() {
  const router = useRouter();
  const {
    profile,
    firstName,
    answers,
    setAnswers,
    qIndex,
    setQIndex,
    setScore,
    retakes,
    setRetakes,
  } = useOnboarding();

  const total = assessmentQuestions.length;
  const q = assessmentQuestions[qIndex];
  const last = qIndex === total - 1;
  const unanswered = answers.filter((a) => a === -1).length;
  const [secs, setSecs] = useState(8 * 60);

  const submit = useCallback(() => {
    const correct = assessmentQuestions.reduce(
      (n, qq, i) => n + (answers[i] === qq.answer ? 1 : 0),
      0,
    );
    const pct = Math.round((correct / total) * 100);
    setScore(pct);
    if (pct >= ASSESSMENT_PASS_MARK) {
      router.push("/join/pass");
    } else {
      setRetakes(Math.max(0, retakes - 1));
      router.push("/join/fail");
    }
  }, [answers, total, setScore, setRetakes, retakes, router]);

  useEffect(() => {
    if (secs <= 0) {
      submit();
      return;
    }
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs, submit]);

  const pick = (i: number) =>
    setAnswers(answers.map((a, j) => (j === qIndex ? i : a)));

  return (
    <GatedShell name={firstName}>
      <div className="grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold sm:text-2xl">
              Daniliya Assessment Question {qIndex + 1} of {total}
            </h1>
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white">
              {String(Math.floor(secs / 60)).padStart(2, "0")}:
              {String(secs % 60).padStart(2, "0")}
              <Icon name="clock" size={15} className="text-brand" />
            </span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink/10">
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{ width: `${((qIndex + 1) / total) * 100}%` }}
            />
          </div>

          <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-6 sm:p-8">
            <p className="text-sm text-ink/50">Question {qIndex + 1} of {total}</p>
            <p className="mt-1 text-lg font-bold">{q.q}</p>
            <div className="mt-5 space-y-3">
              {q.options.map((opt, i) => {
                const active = answers[qIndex] === i;
                return (
                  <button
                    key={opt}
                    onClick={() => pick(i)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-colors ${
                      active ? "border-brand bg-brand/5" : "border-ink/15 hover:border-ink/30"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        active ? "bg-brand text-white" : "bg-ink/5 text-ink/60"
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => setQIndex(Math.max(0, qIndex - 1))}
                disabled={qIndex === 0}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/20 py-3.5 text-sm font-bold transition-colors enabled:hover:border-ink disabled:opacity-40"
              >
                <Icon name="arrow-left" size={16} /> Previous
              </button>
              <button
                onClick={() => (last ? submit() : setQIndex(qIndex + 1))}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                {last ? "Submit" : "Next"} <Icon name="arrow-right" size={16} />
              </button>
            </div>
          </div>
        </div>

        <OnboardingAside profile={profile}>
          <div className="rounded-2xl bg-cream p-5">
            <p className="text-sm font-bold">
              Take the <span className="text-brand">Assessment</span>
            </p>
            <p className="mt-2 text-xs text-ink/60">
              · Pass mark: {ASSESSMENT_PASS_MARK}% · {unanswered} unanswered
            </p>
          </div>
          <WhatHappensNext steps={NEXT_STEPS} />
        </OnboardingAside>
      </div>
    </GatedShell>
  );
}
