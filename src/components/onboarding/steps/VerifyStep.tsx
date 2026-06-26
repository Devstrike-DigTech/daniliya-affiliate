"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthSplit } from "@/components/onboarding/shells";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";

export default function VerifyStep() {
  const router = useRouter();
  const { profile } = useOnboarding();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [secs, setSecs] = useState(50);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (secs <= 0) return;
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs]);

  const set = (i: number, v: string) => {
    const c = v.replace(/\D/g, "").slice(-1);
    setDigits((d) => d.map((x, j) => (j === i ? c : x)));
    if (c && i < 5) refs.current[i + 1]?.focus();
  };

  return (
    <AuthSplit>
      <p className="text-2xl font-bold text-brand">Daniliya</p>
      <h1 className="mt-5 text-[34px] font-bold leading-tight">Verify your account</h1>
      <p className="mt-2 text-sm text-ink/55">
        Enter the 6 digit code sent to{" "}
        <span className="font-bold text-brand">{profile.email}</span>
      </p>
      <form
        className="mt-7"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/join/role");
        }}
      >
        <div className="flex gap-3">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChange={(e) => set(i, e.target.value)}
              inputMode="numeric"
              maxLength={1}
              className={`h-14 w-14 rounded-xl border text-center text-xl font-bold outline-none transition-colors ${
                d ? "border-brand text-brand" : "border-ink/15"
              } focus:border-brand`}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="tabular-nums text-ink/50">
            {String(Math.floor(secs / 60)).padStart(2, "0")}:
            {String(secs % 60).padStart(2, "0")}
          </span>
          <span className="text-ink/55">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={() => setSecs(50)}
              className="font-bold text-brand hover:underline"
            >
              Resend
            </button>
          </span>
        </div>
        <button className="mt-7 w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
          Continue
        </button>
      </form>
    </AuthSplit>
  );
}
