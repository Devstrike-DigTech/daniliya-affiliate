"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import CopyButton from "@/components/CopyButton";
import {
  GatedShell,
  OnboardingAside,
  type Profile,
} from "@/components/onboarding/shells";
import { LANDING_URL } from "@/lib/dashboard";

export default function PassStep({
  profile,
  firstName,
  code,
  masterLink,
}: {
  profile: Profile;
  firstName: string;
  /** Minted by the API when the assessment is passed. */
  code: string;
  /** From GET /affiliate/links — null if it could not be loaded. */
  masterLink: string | null;
}) {
  return (
    <GatedShell name={firstName}>
      <div className="grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl bg-coal p-8 text-white sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/20 px-4 py-1.5 text-xs font-bold text-brand">
            <Icon name="check" size={14} /> You&apos;re In
          </span>
          <h1 className="mt-5 text-[32px] font-bold leading-tight">
            Welcome to the <span className="text-brand">Daniliya affiliate</span>{" "}
            family, {firstName}.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">
            Your account is activated. Start sharing your link below — every
            Monday we pay confirmed commissions straight to your bank.
          </p>
          <div className="mt-7 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className="text-xs font-bold text-brand">Your affiliate code</p>
            <p className="mt-1 text-xl font-bold tracking-wide">{code}</p>
            <p className="mt-4 text-xs text-white/55">Your first payment link</p>
            {masterLink ? (
              <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/5 p-2 pl-4">
                <span className="min-w-0 flex-1 truncate text-sm text-white/80">
                  {masterLink}
                </span>
                <CopyButton
                  value={masterLink}
                  className="shrink-0 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-white"
                />
              </div>
            ) : (
              <p className="mt-2 rounded-xl bg-white/5 p-4 text-sm text-white/55">
                We couldn&apos;t load your links just now — open the Links page in
                your dashboard to find them.
              </p>
            )}
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <a
              href={`${LANDING_URL}/shop`}
              className="rounded-xl border border-white/25 py-3.5 text-center text-sm font-bold transition-colors hover:border-brand hover:text-brand"
            >
              Browse All Products
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Go to Dashboard <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </div>

        <OnboardingAside profile={profile}>
          <div className="space-y-3 rounded-2xl bg-cream p-5">
            {[
              ["Share daily", "Post your link on WhatsApp Status & socials."],
              ["Track results", "Watch clicks and sales tick up in real time."],
              ["Get paid Monday", "Confirmed commissions auto-queue for payout."],
            ].map(([t, d], i) => (
              <div key={t} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-ink">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-bold">{t}</p>
                  <p className="text-xs text-ink/60">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </OnboardingAside>
      </div>
    </GatedShell>
  );
}
