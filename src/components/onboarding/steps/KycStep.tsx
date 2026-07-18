"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import Icon from "@/components/Icon";
import {
  GatedShell,
  OnboardingAside,
  WhatHappensNext,
  type Profile,
} from "@/components/onboarding/shells";
import { kycHighlights } from "@/lib/data";
import { submitKyc } from "@/app/join/actions";
import { IDLE } from "@/app/join/action-state";

const label = "mb-1.5 block text-sm font-bold";
const base =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";

/** Exactly the values the API's SubmitKycDto accepts — anything else is a 400. */
const GOV_ID_TYPES = [
  "NIN slip",
  "Driver's licence",
  "International passport",
  "Voter's card",
];

export type Bank = { name: string; code: string };

const digits = (s: string) => s.replace(/\D/g, "");

export default function KycStep({
  profile,
  firstName,
  banks,
  banksError,
  nextSteps,
}: {
  profile: Profile;
  firstName: string;
  banks: Bank[];
  banksError: boolean;
  nextSteps: { text: string; done?: boolean }[];
}) {
  const [state, formAction, pending] = useActionState(submitKyc, IDLE);
  const [account, setAccount] = useState("");

  return (
    <GatedShell name={firstName}>
      <p className="max-w-2xl text-sm text-ink/60">
        We use this information to confirm your identity and send payouts to the
        right account. Your data is encrypted and never shared.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {kycHighlights.map((h) => (
          <div
            key={h.title}
            className="flex items-center gap-3 rounded-2xl bg-coal p-4 text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-brand">
              <Icon name={h.icon} size={20} />
            </span>
            <div>
              <p className="text-sm font-bold">{h.title}</p>
              <p className="text-xs text-white/60">{h.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
        <form
          action={formAction}
          className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-8"
        >
          <p className="font-bold">Payout account</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="bankCode">
                Bank <span className="text-red-500">*</span>
              </label>
              <select
                id="bankCode"
                name="bankCode"
                defaultValue=""
                disabled={banksError}
                className={base}
              >
                <option value="" disabled>
                  {banksError ? "Bank list unavailable" : "Select your bank"}
                </option>
                {banks.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.name}
                  </option>
                ))}
              </select>
              {banksError && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  We couldn&apos;t load the bank list from the server.
                </p>
              )}
            </div>
            <div>
              <label className={label} htmlFor="accountNumber">
                Account Number <span className="text-red-500">*</span>
              </label>
              <input
                id="accountNumber"
                name="accountNumber"
                value={account}
                onChange={(e) => setAccount(digits(e.target.value).slice(0, 10))}
                inputMode="numeric"
                placeholder="10-digit bank account number"
                className={base}
              />
            </div>
          </div>
          {/* The account name is resolved server-side during verification — we
              deliberately show no name here rather than invent one. */}
          <p className="mt-2 text-xs text-ink/45">
            Your account name is confirmed by your bank when you submit; it is
            never typed in by hand.
          </p>

          <p className="mt-6 font-bold">Government-issued ID</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="govIdType">
                ID type <span className="text-red-500">*</span>
              </label>
              <select id="govIdType" name="govIdType" defaultValue="" className={base}>
                <option value="" disabled>
                  Select your ID type
                </option>
                {GOV_ID_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={label} htmlFor="govIdUrl">
                Link to your ID <span className="text-red-500">*</span>
              </label>
              <input
                id="govIdUrl"
                name="govIdUrl"
                type="url"
                placeholder="https://…"
                className={base}
              />
            </div>
          </div>
          <p className="mt-2 rounded-xl bg-cream px-4 py-3 text-xs text-ink/65">
            <span className="font-bold">File upload isn&apos;t available yet.</span>{" "}
            The API has no upload endpoint — it expects a URL to an
            already-hosted image or PDF of your ID — so paste a link rather than
            choosing a file.
          </p>

          {state.error && (
            <p
              role="alert"
              className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
            >
              {state.error}
            </p>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/join/tutorial"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-coal py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Skip for now <Icon name="arrow-right" size={16} />
            </Link>
            <button
              disabled={pending}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Submitting…" : "Submit KYC"}
              <Icon name="arrow-right" size={16} />
            </button>
          </div>
          <p className="mt-3 text-xs text-ink/45">
            The tutorial and assessment are not blocked by KYC — verification
            gates payouts, so you can complete it later from your profile.
          </p>
        </form>

        <OnboardingAside profile={profile}>
          <div className="rounded-2xl bg-cream p-5">
            <p className="flex items-center gap-2 text-sm font-bold">
              <Icon name="shield-check" size={15} className="text-brand" />
              Why we ask for <span className="text-brand">this</span>
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-ink/65">
              <li>· Protects our affiliate network from fraud.</li>
              <li>· Required by Nigerian financial regulations.</li>
              <li>· Ensures payouts reach the right person.</li>
            </ul>
          </div>
          <WhatHappensNext steps={nextSteps} />
        </OnboardingAside>
      </div>
    </GatedShell>
  );
}
