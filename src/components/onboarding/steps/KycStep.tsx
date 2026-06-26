"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import FileDropzone from "@/components/FileDropzone";
import {
  GatedShell,
  OnboardingAside,
  WhatHappensNext,
} from "@/components/onboarding/shells";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";
import { kycHighlights, nigerianBanks } from "@/lib/data";

const label = "mb-1.5 block text-sm font-bold";
const base =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";

const NEXT_STEPS = [
  { text: "We review within 24 hours.", done: true },
  { text: "You unlock the Tutorial step.", done: true },
  { text: "Pass the assessment & start earning." },
];

const digits = (s: string) => s.replace(/\D/g, "");

export default function KycStep() {
  const router = useRouter();
  const { profile, firstName, role } = useOnboarding();

  // Affiliates take the tutorial + assessment; influencers/vendors are
  // approved by an admin, so they go straight to the review state.
  const afterKyc = role === "affiliate" ? "/join/tutorial" : "/join/review";

  const [nin, setNin] = useState("");
  const [bvn, setBvn] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [touched, setTouched] = useState(false);

  const errors = {
    nin: nin.length !== 11 ? "Enter your 11-digit NIN." : "",
    bvn: bvn.length !== 11 ? "Enter your 11-digit BVN." : "",
    bank: !bank ? "Select your bank." : "",
    account: account.length !== 10 ? "Enter your 10-digit account number." : "",
    file: !file ? "Upload a government-issued ID." : "",
  };
  const isValid = Object.values(errors).every((e) => !e);

  const cls = (err: string) =>
    `${base} ${touched && err ? "border-red-400" : "border-ink/15"}`;
  const Err = ({ msg }: { msg: string }) =>
    touched && msg ? (
      <p className="mt-1.5 text-xs font-medium text-red-500">{msg}</p>
    ) : null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (isValid) router.push(afterKyc);
  };

  return (
    <GatedShell name={firstName}>
      <p className="max-w-2xl text-sm text-ink/60">
        We use this information to confirm your identity and send payouts to the
        right account. Your data is encrypted and never shared.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {kycHighlights.map((h) => (
          <div key={h.title} className="flex items-center gap-3 rounded-2xl bg-coal p-4 text-white">
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
        <form noValidate className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-8" onSubmit={submit}>
          <p className="font-bold">Identity numbers</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>
                NIN <span className="text-red-500">*</span>
              </label>
              <input
                value={nin}
                onChange={(e) => setNin(digits(e.target.value).slice(0, 11))}
                inputMode="numeric"
                placeholder="11-digit National Identification Number"
                className={cls(errors.nin)}
              />
              <Err msg={errors.nin} />
            </div>
            <div>
              <label className={label}>
                BVN <span className="text-red-500">*</span>
              </label>
              <input
                value={bvn}
                onChange={(e) => setBvn(digits(e.target.value).slice(0, 11))}
                inputMode="numeric"
                placeholder="11-digit Bank Verification Number"
                className={cls(errors.bvn)}
              />
              <Err msg={errors.bvn} />
            </div>
          </div>

          <p className="mt-6 font-bold">Payout account</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>
                Bank <span className="text-red-500">*</span>
              </label>
              <select value={bank} onChange={(e) => setBank(e.target.value)} className={cls(errors.bank)}>
                <option value="" disabled>Select your bank</option>
                {nigerianBanks.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
              <Err msg={errors.bank} />
            </div>
            <div>
              <label className={label}>
                Account Number <span className="text-red-500">*</span>
              </label>
              <input
                value={account}
                onChange={(e) => setAccount(digits(e.target.value).slice(0, 10))}
                inputMode="numeric"
                placeholder="10-digit bank account number"
                className={cls(errors.account)}
              />
              <Err msg={errors.account} />
            </div>
          </div>

          <p className="mt-6 font-bold">Government-issued ID</p>
          <FileDropzone onChange={setFile} invalid={touched && !!errors.file} />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => router.push("/join/role")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-coal py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              <Icon name="arrow-left" size={16} /> Go Back
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Proceed <Icon name="arrow-right" size={16} />
            </button>
          </div>
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
          <WhatHappensNext steps={NEXT_STEPS} />
        </OnboardingAside>
      </div>
    </GatedShell>
  );
}
