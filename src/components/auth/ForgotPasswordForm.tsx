"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import { AuthSplit } from "@/components/onboarding/shells";

const input =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";
const label = "mb-1.5 block text-sm font-bold";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setError(body?.message ?? "Could not start the password reset.");
        return;
      }
      setSent(true);
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthSplit>
      <p className="text-2xl font-bold text-brand">Daniliya</p>

      {!sent ? (
        <>
          <h1 className="mt-5 text-[34px] font-bold leading-tight">
            Forgot your <span className="text-brand">password</span>?
          </h1>
          <p className="mt-2 text-sm text-ink/55">
            Enter the email linked to your account and we&apos;ll send you a code
            to reset it.
          </p>
          <form className="mt-7 space-y-4" onSubmit={submit} noValidate>
            <div>
              <label className={label} htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                className={input}
                placeholder="e.g yourmail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
              >
                {error}
              </p>
            )}
            <button
              disabled={busy}
              className="w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? "Sending…" : "Send reset code"}
            </button>
          </form>
          <p className="mt-6 text-sm text-ink/60">
            Remembered it?{" "}
            <Link href="/login" className="font-bold text-brand hover:underline">
              Back to login
            </Link>
          </p>
        </>
      ) : (
        <>
          <span className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/15 text-brand">
            <Icon name="mail" size={26} />
          </span>
          <h1 className="mt-5 text-[34px] font-bold leading-tight">
            Check your <span className="text-brand">email</span>
          </h1>
          {/* The API answers identically whether or not the address is
              registered, so we must not claim an email definitely went out. */}
          <p className="mt-2 text-sm text-ink/60">
            If{" "}
            <span className="font-bold text-ink">{email || "that address"}</span>{" "}
            is registered, a reset code is on its way. It expires in an hour.
          </p>
          <Link
            href="/reset-password"
            className="mt-7 block w-full rounded-xl bg-brand py-3.5 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            I have my code
          </Link>
          <button
            onClick={() => setSent(false)}
            className="mt-3 w-full rounded-xl border border-ink/15 py-3.5 text-sm font-bold transition-colors hover:bg-ink/5"
          >
            Use a different email
          </button>

          <p className="mt-6 text-sm text-ink/60">
            <Link href="/login" className="font-bold text-brand hover:underline">
              Back to login
            </Link>
          </p>
        </>
      )}
    </AuthSplit>
  );
}
