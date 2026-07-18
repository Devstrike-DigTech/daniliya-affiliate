"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthSplit } from "@/components/onboarding/shells";

/** The API's resend cooldown is 50s — the timer mirrors it exactly. */
const RESEND_COOLDOWN = 50;

export default function VerifyStep({ email }: { email: string }) {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [secs, setSecs] = useState(RESEND_COOLDOWN);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (secs <= 0) return;
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs]);

  const code = digits.join("");

  const set = (i: number, v: string) => {
    const c = v.replace(/\D/g, "").slice(-1);
    setDigits((d) => d.map((x, j) => (j === i ? c : x)));
    if (c && i < 5) refs.current[i + 1]?.focus();
  };

  /** Pasting the whole code into any box fills the row. */
  const onPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    setDigits(Array.from({ length: 6 }, (_, i) => pasted[i] ?? ""));
    refs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    if (code.length !== 6) {
      setError("Enter all 6 digits.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setError(body?.message ?? "That code could not be verified.");
        return;
      }
      // Verifying signs the user in; /join re-reads the server status and sends
      // them to whichever step they actually belong on.
      router.push("/join");
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    setError(null);
    setNotice(null);
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setError(body?.message ?? "Could not resend the code.");
        return;
      }
      setNotice(body?.message ?? "A new code has been sent.");
      setSecs(RESEND_COOLDOWN);
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    }
  };

  if (!email) {
    return (
      <AuthSplit>
        <p className="text-2xl font-bold text-brand">Daniliya</p>
        <h1 className="mt-5 text-[34px] font-bold leading-tight">
          We don&apos;t know which account to verify
        </h1>
        <p className="mt-2 text-sm text-ink/55">
          This page needs the email you signed up with. Start again from the sign
          up form and we&apos;ll send a fresh code.
        </p>
        <Link
          href="/join/signup"
          className="mt-7 block w-full rounded-xl bg-brand py-3.5 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          Back to sign up
        </Link>
      </AuthSplit>
    );
  }

  return (
    <AuthSplit>
      <p className="text-2xl font-bold text-brand">Daniliya</p>
      <h1 className="mt-5 text-[34px] font-bold leading-tight">Verify your account</h1>
      <p className="mt-2 text-sm text-ink/55">
        Enter the 6 digit code sent to{" "}
        <span className="font-bold text-brand">{email}</span>
      </p>
      <form className="mt-7" onSubmit={submit} noValidate>
        <div className="flex gap-3">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChange={(e) => set(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              onPaste={onPaste}
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              aria-label={`Digit ${i + 1}`}
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
              onClick={resend}
              disabled={secs > 0}
              className="font-bold text-brand hover:underline disabled:cursor-not-allowed disabled:text-ink/30 disabled:no-underline"
            >
              Resend
            </button>
          </span>
        </div>
        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
          >
            {error}
          </p>
        )}
        {notice && (
          <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {notice}
          </p>
        )}
        <button
          disabled={busy}
          className="mt-7 w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Verifying…" : "Continue"}
        </button>
      </form>
    </AuthSplit>
  );
}
