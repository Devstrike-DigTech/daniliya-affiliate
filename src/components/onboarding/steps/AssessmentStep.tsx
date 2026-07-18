"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import Icon from "@/components/Icon";
import {
  GatedShell,
  OnboardingAside,
  WhatHappensNext,
  type Profile,
} from "@/components/onboarding/shells";
import { submitAssessment } from "@/app/join/actions";

export type Question = { id: string; text: string; options: string[] };

/**
 * Questions are served without their answers and graded server-side; `selected`
 * is the option TEXT. The only client state is which option is highlighted —
 * the pass/fail outcome comes back from the API.
 */
export default function AssessmentStep({
  profile,
  firstName,
  questions,
  timerSeconds,
  passMark,
  retakesLeft,
  nextSteps,
}: {
  profile: Profile;
  firstName: string;
  questions: Question[];
  timerSeconds: number;
  passMark: number;
  retakesLeft: number;
  nextSteps: { text: string; done?: boolean }[];
}) {
  const total = questions.length;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [secs, setSecs] = useState(timerSeconds);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const submit = useCallback(() => {
    setError(null);
    startTransition(async () => {
      const answers = questions
        .filter((q) => selected[q.id] !== undefined)
        .map((q) => ({ questionId: q.id, selected: selected[q.id] }));
      const result = await submitAssessment(answers);
      if (result?.error) setError(result.error);
    });
  }, [questions, selected]);

  // Auto-submit when the server's timer runs out — the API rejects a late
  // attempt outright, so a half-finished paper is better than a lost one.
  useEffect(() => {
    if (secs <= 0) return;
    const t = setTimeout(() => {
      setSecs((s) => s - 1);
      if (secs === 1) submit();
    }, 1000);
    return () => clearTimeout(t);
  }, [secs, submit]);

  const q = questions[index];
  const last = index === total - 1;
  const unanswered = total - Object.keys(selected).length;

  return (
    <GatedShell name={firstName}>
      <div className="grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold sm:text-2xl">
              Daniliya Assessment Question {index + 1} of {total}
            </h1>
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white">
              {String(Math.floor(Math.max(0, secs) / 60)).padStart(2, "0")}:
              {String(Math.max(0, secs) % 60).padStart(2, "0")}
              <Icon name="clock" size={15} className="text-brand" />
            </span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink/10">
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>

          <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-6 sm:p-8">
            <p className="text-sm text-ink/50">
              Question {index + 1} of {total}
            </p>
            <p className="mt-1 text-lg font-bold">{q.text}</p>
            <div className="mt-5 space-y-3">
              {q.options.map((opt, i) => {
                const active = selected[q.id] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setSelected((s) => ({ ...s, [q.id]: opt }))}
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

            {error && (
              <p
                role="alert"
                className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
              >
                {error}
              </p>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => setIndex(Math.max(0, index - 1))}
                disabled={index === 0}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/20 py-3.5 text-sm font-bold transition-colors enabled:hover:border-ink disabled:opacity-40"
              >
                <Icon name="arrow-left" size={16} /> Previous
              </button>
              <button
                onClick={() => (last ? submit() : setIndex(index + 1))}
                disabled={pending}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? "Submitting…" : last ? "Submit" : "Next"}
                <Icon name="arrow-right" size={16} />
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
              · Pass mark: {passMark}% · {unanswered} unanswered ·{" "}
              {retakesLeft} {retakesLeft === 1 ? "attempt" : "attempts"} left
            </p>
          </div>
          <WhatHappensNext steps={nextSteps} />
        </OnboardingAside>
      </div>
    </GatedShell>
  );
}
