"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import {
  GatedShell,
  OnboardingAside,
  WhatHappensNext,
  type Profile,
} from "@/components/onboarding/shells";
import { completeLesson } from "@/app/join/actions";

export type Lesson = {
  id: string;
  title: string;
  content: string | null;
  videoUrl: string | null;
  fileUrls: string[];
  completed: boolean;
};

/**
 * Lessons, their order and their completed flags all come from the API. The
 * only thing held in component state is which lesson is currently on screen —
 * progress itself is server state, re-read on every load.
 */
export default function TutorialStep({
  profile,
  firstName,
  lessons,
  nextSteps,
}: {
  profile: Profile;
  firstName: string;
  lessons: Lesson[];
  nextSteps: { text: string; done?: boolean }[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Open on the first lesson that is still outstanding.
  const firstUndone = lessons.findIndex((l) => !l.completed);
  const [index, setIndex] = useState(firstUndone === -1 ? 0 : firstUndone);

  if (lessons.length === 0) {
    return (
      <GatedShell name={firstName}>
        <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center">
          <h1 className="text-xl font-bold">No tutorial lessons are published yet</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink/55">
            The affiliate tutorial has not been loaded into the platform. You
            can&apos;t start the assessment until it is — please check back, or
            contact support.
          </p>
        </div>
      </GatedShell>
    );
  }

  const total = lessons.length;
  const lesson = lessons[index];
  const last = index === total - 1;
  const allDone = lessons.every((l) => l.completed);

  const advance = () => {
    setError(null);
    startTransition(async () => {
      // Marking complete is idempotent server-side, so re-visiting is safe.
      const result = await completeLesson(lesson.id);
      if (result.error) {
        setError(result.error);
        return;
      }
      if (last) {
        router.push("/join/assessment");
        return;
      }
      setIndex(index + 1);
      router.refresh();
    });
  };

  return (
    <GatedShell name={firstName}>
      <h1 className="text-2xl font-bold">
        Daniliya Tutorial, Lesson {index + 1} of {total}
      </h1>
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          {/* lesson tabs — done (green) / active (gold) / not yet done (grey) */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {lessons.map((t, i) => {
              const active = i === index;
              return (
                <button
                  key={t.id}
                  onClick={() => setIndex(i)}
                  className={`flex items-start gap-1.5 rounded-xl px-3 py-2.5 text-left text-xs leading-snug transition-colors ${
                    active
                      ? "bg-brand/10 font-bold text-brand ring-1 ring-brand/30"
                      : t.completed
                        ? "bg-green-50 text-ink"
                        : "bg-ink/5 text-ink/60 hover:bg-ink/10"
                  }`}
                >
                  <span className="font-bold">{i + 1}.</span>
                  <span className="flex-1">{t.title}</span>
                  {t.completed && (
                    <Icon name="check" size={13} className="mt-px shrink-0 text-green-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* The API returns videoUrl: null for every lesson — there are no
              tutorial videos, so we show the written lesson instead of a player
              that would never play anything. */}
          {lesson.videoUrl ? (
            <div className="mt-5 aspect-video overflow-hidden rounded-2xl bg-black">
              <video src={lesson.videoUrl} controls className="h-full w-full" />
            </div>
          ) : (
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-cream px-5 py-4 text-sm text-ink/60">
              <Icon name="play" size={16} className="text-brand" />
              This lesson has no video — read it below.
            </div>
          )}

          <p className="mt-4 text-[15px] font-bold">{lesson.title}</p>
          <p className="mt-1 max-w-xl whitespace-pre-line text-sm leading-relaxed text-ink/60">
            {lesson.content?.trim() || "This lesson has no written content yet."}
          </p>

          {lesson.fileUrls.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {lesson.fileUrls.map((url) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-brand hover:underline"
                  >
                    Lesson attachment
                  </a>
                </li>
              ))}
            </ul>
          )}

          {error && (
            <p
              role="alert"
              className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
            >
              {error}
            </p>
          )}

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setIndex(Math.max(0, index - 1))}
              disabled={index === 0}
              className="inline-flex items-center gap-2 text-sm font-bold text-ink/60 transition-colors enabled:hover:text-ink disabled:opacity-40"
            >
              <Icon name="arrow-left" size={16} /> Go back
            </button>
            <div className="flex items-center gap-3">
              {allDone && (
                <button
                  onClick={() => router.push("/join/assessment")}
                  className="inline-flex items-center gap-2 rounded-xl border border-ink/20 px-5 py-3.5 text-sm font-bold transition-colors hover:border-ink"
                >
                  Go to assessment
                </button>
              )}
              <button
                onClick={advance}
                disabled={pending}
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending
                  ? "Saving…"
                  : last
                    ? "Finish & start assessment"
                    : "Next lesson"}
                <Icon name="arrow-right" size={16} />
              </button>
            </div>
          </div>
        </div>

        <OnboardingAside profile={profile}>
          <div className="rounded-2xl bg-cream p-5">
            <p className="text-sm font-bold">
              Your <span className="text-brand">progress</span>
            </p>
            <p className="mt-2 text-xs text-ink/60">
              {lessons.filter((l) => l.completed).length} of {total} lessons
              completed. All of them must be done before the assessment unlocks.
            </p>
          </div>
          <WhatHappensNext steps={nextSteps} />
        </OnboardingAside>
      </div>
    </GatedShell>
  );
}
