"use client";

import { useRef, useState, useTransition } from "react";
import Icon from "@/components/Icon";
import { Dots } from "@/components/onboarding/shells";
import { onboardingRoles } from "@/lib/data";
import { LANDING_URL } from "@/lib/dashboard";
import { portals } from "@/lib/portals";
import { selectAffiliateRole } from "@/app/join/actions";

/**
 * This is the AFFILIATE portal, and it is the only role this app can provision.
 * The other roles are onboarded by their own portals, so picking one sends the
 * user there rather than pretending to sign them up here.
 */
const EXTERNAL: Record<string, string> = {
  customer: `${LANDING_URL}/shop`,
  influencer: portals.influencer,
  vendor: portals.vendor,
};

/** This is the Affiliate portal, so Affiliate is pre-selected. */
const HOME_ROLE = "affiliate";
const roleTitle = (key: string) =>
  onboardingRoles.find((r) => r.key === key)?.title ?? key;

export default function RoleStep() {
  const [role, setRole] = useState<string>(HOME_ROLE);
  // The external role a confirmation dialog is open for, or null.
  const [confirming, setConfirming] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Affiliate is the only role this portal can provision. Picking any other
  // means signing up on that role's own portal, so confirm before leaving.
  const pick = (key: string) => {
    setError(null);
    if (EXTERNAL[key]) setConfirming(key);
    else setRole(key);
  };

  const proceed = () => {
    setError(null);
    // The server provisions the affiliate profile and rotates our tokens (the
    // JWT still carries the old CUSTOMER role until it does), then redirects.
    startTransition(async () => {
      const result = await selectAffiliateRole();
      if (result?.error) setError(result.error);
    });
  };

  // Roving arrow-key navigation moves focus across the cards; activating a card
  // (click/Enter) is what picks it, so arrowing to another role never redirects.
  const onKeyNav = (e: React.KeyboardEvent, i: number) => {
    const n = onboardingRoles.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (next >= 0) {
      e.preventDefault();
      cardRefs.current[next]?.focus();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper">
      <Dots className="-right-12 top-4" />
      <Dots className="-left-12 bottom-4" />
      <div className="mx-auto max-w-[760px] px-4 py-10 sm:px-6">
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
            // Affiliate is pre-selected; keep the other roles full-colour and
            // clearly clickable rather than dimmed, since they're real choices.
            const dimmed = false;
            return (
              <button
                key={r.key}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                role="radio"
                aria-checked={active}
                tabIndex={active ? 0 : -1}
                onClick={() => pick(r.key)}
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

        <p className="mt-5 text-center text-xs text-ink/45">
          You&apos;re signing up as an <span className="font-bold text-ink/70">Affiliate</span>.
          Pick another role only if you meant to register differently.
        </p>

        {error && (
          <p
            role="alert"
            className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
          >
            {error}
          </p>
        )}

        <button
          disabled={pending}
          aria-disabled={pending}
          onClick={proceed}
          className="mt-6 w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:bg-ink/15 disabled:text-ink/40"
        >
          {pending ? "Setting up your account…" : "Continue as Affiliate"}
        </button>
      </div>

      {/* Confirm leaving for another role's portal */}
      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/50"
            aria-hidden
            onClick={() => setConfirming(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Register as a ${roleTitle(confirming)}`}
            className="relative z-10 w-full max-w-md rounded-2xl bg-paper p-6 shadow-2xl"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <Icon name="affiliate-links" size={20} tint />
            </span>
            <p className="mt-4 text-lg font-bold">
              Register as a {roleTitle(confirming)}?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              You&apos;re on the Daniliya <span className="font-bold">Affiliate</span> sign-up.
              {" "}
              {confirming === "customer"
                ? "Customers shop on the main Daniliya store — we'll take you there to continue."
                : `${roleTitle(confirming)} registration happens on its own portal — we'll take you there to finish signing up.`}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConfirming(null)}
                className="rounded-xl border border-ink/15 py-3 text-sm font-bold transition-colors hover:bg-ink/5"
              >
                Stay as Affiliate
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.href = EXTERNAL[confirming];
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                Take me there <Icon name="chevron-right" size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
