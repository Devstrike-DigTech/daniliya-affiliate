"use client";

import Icon from "@/components/Icon";
import {
  Dots,
  OnboardingTopbar,
  type Profile,
} from "@/components/onboarding/shells";
import { LANDING_URL } from "@/lib/dashboard";

export default function ReviewStep({
  profile,
  firstName,
  nextStepLabel,
}: {
  profile: Profile;
  firstName: string;
  /** Where the server says this user goes next — not a guess. */
  nextStepLabel: string;
}) {
  const goHome = () => {
    window.location.href = LANDING_URL;
  };

  const cards: [string, string, string][] = [
    ["mail", "Email", profile.email],
    ...(profile.phone ? ([["phone", "Phone", profile.phone]] as [string, string, string][]) : []),
    ["play", "Next Step", nextStepLabel],
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper">
      <OnboardingTopbar name={firstName} onExit={goHome} />
      <Dots className="-right-10 top-20" />
      <Dots className="-left-10 bottom-10" />
      <div className="mx-auto max-w-[680px] px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center sm:p-10">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream text-brand">
            <Icon name="clock" size={28} />
          </span>
          <span className="mt-4 inline-block rounded-full bg-brand px-4 py-1.5 text-xs font-bold text-white">
            Under Review
          </span>
          <h1 className="mt-4 text-2xl font-bold">Your KYC is being reviewed</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink/55">
            Thanks, {firstName}. Verification runs in the background and gates
            your payouts — it does not hold up the tutorial or the assessment,
            so you can carry on.
          </p>
          <div
            className={`mt-6 grid gap-4 ${cards.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
          >
            {cards.map(([icon, l, v]) => (
              <div key={l} className="rounded-2xl border border-ink/10 p-4 text-left">
                <Icon name={icon} size={18} className="text-brand" />
                <p className="mt-2 text-sm font-bold">{l}</p>
                <p className="truncate text-xs text-ink/50">{v}</p>
              </div>
            ))}
          </div>
          <button
            onClick={goHome}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Go back home <Icon name="arrow-right" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
