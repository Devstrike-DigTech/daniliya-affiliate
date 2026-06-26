"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { Dots } from "@/components/onboarding/shells";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";
import { onboardingRoles } from "@/lib/data";
import { LANDING_URL } from "@/lib/dashboard";
import { portals } from "@/lib/portals";

// This is the AFFILIATE portal — only the affiliate path continues here.
// Other roles redirect out to their own portal / the marketing site.
const DESTINATION: Record<string, string> = {
  customer: `${LANDING_URL}/shop`,
  affiliate: "/join/kyc",
  influencer: portals.influencer,
  vendor: portals.vendor,
};

export default function RoleStep() {
  const router = useRouter();
  const { role, setRole } = useOnboarding();
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const proceed = () => {
    if (!role) return;
    const dest = DESTINATION[role] ?? "/join/kyc";
    if (dest.startsWith("http")) window.location.href = dest;
    else router.push(dest);
  };

  // Roving arrow-key navigation across the radio group.
  const onKeyNav = (e: React.KeyboardEvent, i: number) => {
    const n = onboardingRoles.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (next >= 0) {
      e.preventDefault();
      setRole(onboardingRoles[next].key);
      cardRefs.current[next]?.focus();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper">
      <Dots className="-right-12 top-4" />
      <Dots className="-left-12 bottom-4" />
      <div className="mx-auto max-w-[760px] px-4 py-10 sm:px-6">
        <button
          onClick={() => router.push("/join/verify")}
          className="inline-flex items-center gap-2 text-sm font-bold text-ink/70 hover:text-ink"
        >
          <Icon name="arrow-left" size={18} /> Go Back
        </button>
        <p className="mt-8 text-center text-xl font-bold text-brand">Daniliya</p>
        <h1 className="mt-3 text-center text-[26px] font-bold">
          How would you use Daniliya
        </h1>
        <p className="mt-2 text-center text-sm text-ink/55">
          Pick the role that fits you and proceed to create your account
        </p>

        <div
          role="radiogroup"
          aria-label="How would you use Daniliya"
          className="mt-8 grid gap-5 sm:grid-cols-2"
        >
          {onboardingRoles.map((r, i) => {
            const active = role === r.key;
            const dimmed = role !== null && !active;
            return (
              <button
                key={r.key}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                role="radio"
                aria-checked={active}
                tabIndex={active || (role === null && i === 0) ? 0 : -1}
                onClick={() => setRole(r.key)}
                onKeyDown={(e) => onKeyNav(e, i)}
                className={`relative flex h-40 flex-col justify-end rounded-2xl p-6 text-left outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                  r.dark ? "bg-coal text-white" : "bg-brand text-ink"
                } ${
                  active
                    ? "scale-[1.02] shadow-xl"
                    : dimmed
                      ? "scale-[0.98] opacity-40 grayscale hover:opacity-90 hover:grayscale-0"
                      : "hover:opacity-95"
                }`}
              >
                <span
                  className={`absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-xl ${
                    r.dark ? "bg-brand text-ink" : "bg-ink text-brand"
                  }`}
                >
                  <Icon name={r.icon} size={20} tint />
                </span>

                {/* proper radio indicator */}
                <span
                  className={`absolute right-6 top-6 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                    active
                      ? r.dark
                        ? "border-brand"
                        : "border-ink"
                      : r.dark
                        ? "border-white/40"
                        : "border-ink/40"
                  }`}
                >
                  {active && (
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        r.dark ? "bg-brand" : "bg-ink"
                      }`}
                    />
                  )}
                </span>

                <p className="flex items-center gap-1 text-lg font-bold">
                  {r.title} <Icon name="chevron-right" size={16} />
                </p>
                <p className={`mt-1 text-sm ${r.dark ? "text-white/70" : "text-ink/70"}`}>
                  {r.text}
                </p>
              </button>
            );
          })}
        </div>

        <button
          disabled={!role}
          aria-disabled={!role}
          onClick={proceed}
          className="mt-6 w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:bg-ink/15 disabled:text-ink/40"
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
