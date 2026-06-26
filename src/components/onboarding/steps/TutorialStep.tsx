"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import AccentText from "@/components/AccentText";
import {
  GatedShell,
  OnboardingAside,
  WhatHappensNext,
} from "@/components/onboarding/shells";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";
import { tutorialLessons } from "@/lib/data";

const NEXT_STEPS = [
  { text: "We review within 24 hours.", done: true },
  { text: "You unlock the Tutorial step.", done: true },
  { text: "Pass the assessment & start earning." },
];

/** Click-to-play video facade — loads the YouTube embed only on play.
 * Shows a "coming soon" state until the client supplies a videoId. */
function LessonVideo({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing && videoId)
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerated-download; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-ink/90"
    >
      <Image
        src="/images/affiliates/onboarding.jpg"
        alt={title}
        fill
        sizes="(max-width:1024px) 100vw, 60vw"
        className="object-cover opacity-50 transition-opacity group-hover:opacity-40"
      />
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-ink transition-transform group-hover:scale-110">
        <Icon name="play" size={26} />
      </span>
      {playing && !videoId && (
        <span className="absolute bottom-4 rounded-full bg-black/70 px-4 py-1.5 text-xs font-bold text-white">
          Lesson video coming soon
        </span>
      )}
    </button>
  );
}

export default function TutorialStep() {
  const router = useRouter();
  const { profile, firstName } = useOnboarding();
  const [lesson, setLesson] = useState(0);
  const [maxReached, setMaxReached] = useState(0);

  const L = tutorialLessons[lesson];
  const total = tutorialLessons.length;
  const last = lesson === total - 1;

  // re-mount the video (reset to poster) whenever the lesson changes
  const goTo = (i: number) => setLesson(i);
  const advance = () => {
    if (last) {
      router.push("/join/assessment");
      return;
    }
    const next = lesson + 1;
    setMaxReached((m) => Math.max(m, next));
    setLesson(next);
  };

  useEffect(() => {
    setMaxReached((m) => Math.max(m, lesson));
  }, [lesson]);

  return (
    <GatedShell name={firstName}>
      <h1 className="text-2xl font-bold">
        Daniliya Tutorial, Lesson {lesson + 1} of {total}
      </h1>
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          {/* lesson tabs — boxed: done (green) / active (gold) / locked (grey) */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {tutorialLessons.map((t, i) => {
              const done = i < maxReached;
              const active = i === lesson;
              const locked = i > maxReached;
              return (
                <button
                  key={t.title}
                  disabled={locked}
                  onClick={() => !locked && goTo(i)}
                  className={`flex items-start gap-1.5 rounded-xl px-3 py-2.5 text-left text-xs leading-snug transition-colors ${
                    active
                      ? "bg-brand/10 font-bold text-brand ring-1 ring-brand/30"
                      : done
                        ? "bg-green-50 text-ink"
                        : "cursor-not-allowed bg-ink/5 text-ink/35"
                  }`}
                >
                  <span className="font-bold">{i + 1}.</span>
                  <span className="flex-1">{t.title}</span>
                  {done && <Icon name="check" size={13} className="mt-px shrink-0 text-green-500" />}
                  {locked && <Icon name="lock" size={11} className="mt-px shrink-0 text-ink/30" />}
                </button>
              );
            })}
          </div>

          <div className="mt-5">
            <LessonVideo key={lesson} videoId={L.videoId} title={L.title} />
          </div>
          <p className="mt-4 text-[15px] font-bold">{L.title}</p>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink/60">{L.text}</p>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => (lesson === 0 ? router.push("/join/kyc") : goTo(lesson - 1))}
              className="inline-flex items-center gap-2 text-sm font-bold text-ink/60 hover:text-ink"
            >
              <Icon name="arrow-left" size={16} /> Go back
            </button>
            <button
              onClick={advance}
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              {last ? "Start Assessment" : "Next Lesson"} <Icon name="arrow-right" size={16} />
            </button>
          </div>
        </div>

        <OnboardingAside profile={profile}>
          <div className="rounded-2xl bg-cream p-5">
            <p className="text-sm font-bold">
              <AccentText a={L.aside.heading} />
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-ink/65">
              {L.aside.bullets.map((b) => (
                <li key={b}>· {b}</li>
              ))}
            </ul>
          </div>
          <WhatHappensNext steps={NEXT_STEPS} />
        </OnboardingAside>
      </div>
    </GatedShell>
  );
}
