"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthSplit } from "@/components/onboarding/shells";
import { LANDING_URL } from "@/lib/dashboard";
import PasswordField from "@/components/PasswordField";

const input =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";
const label = "mb-1.5 block text-sm font-bold";

/** Mirrors the API's PASSWORD_RULE — fail here rather than round-trip for it. */
const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export default function SignupStep() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // The API takes firstName + lastName separately, so a single-word name
    // can't be split and is rejected here rather than silently mangled.
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length < 2) {
      setError("Enter your first and last name.");
      return;
    }
    if (!PASSWORD_RULE.test(password)) {
      setError(
        "Password must be at least 8 characters and include an uppercase letter, a lowercase letter and a number.",
      );
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    // The form is noValidate, so the checkbox's `required` isn't enforced by the
    // browser — gate it here instead.
    if (!agreed) {
      setError("Please accept the Terms and Privacy Policy to continue.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: parts[0],
          lastName: parts.slice(1).join(" "),
          email: email.trim(),
          phone: phone.trim() || undefined,
          password,
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setError(body?.message ?? "Sign up failed. Try again.");
        return;
      }
      router.push(`/join/verify?email=${encodeURIComponent(email.trim())}`);
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthSplit>
      <p className="text-2xl font-bold text-brand">Daniliya</p>
      <h1 className="mt-5 text-[34px] font-bold leading-tight">
        Create your Daniliya <span className="text-brand">account</span>
      </h1>
      <p className="mt-2 text-sm text-ink/55">
        Your journey on Daniliya starts here
      </p>
      <form className="mt-7 space-y-4" onSubmit={submit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              className={input}
              placeholder="e.g. Kate Esther"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>
          <div>
            <label className={label}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className={input}
              placeholder="e.g yourmail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label className={label}>Phone / WhatsApp</label>
            <input
              className={input}
              placeholder="e.g +2348438..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
          </div>
          <div>
            <label className={label}>
              Password <span className="text-red-500">*</span>
            </label>
            <PasswordField
              placeholder="At least 8 characters"
              value={password}
              onChange={setPassword}
              required
            />
          </div>
          <div>
            <label className={label}>
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <PasswordField
              placeholder="Repeat password"
              value={confirm}
              onChange={setConfirm}
              required
            />
          </div>
        </div>
        <p className="text-xs text-ink/45">
          Use at least 8 characters with an uppercase letter, a lowercase letter
          and a number.
        </p>
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="accent-brand"
          />{" "}
          I agree to
          Daniliya&apos;s{" "}
          <a
            href={`${LANDING_URL}/terms`}
            target="_blank"
            className="font-bold text-brand hover:underline"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href={`${LANDING_URL}/privacy`}
            target="_blank"
            className="font-bold text-brand hover:underline"
          >
            Privacy Policy
          </a>
          .
        </label>
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
          {busy ? "Creating your account…" : "Sign up"}
        </button>
      </form>
      <p className="mt-6 text-sm text-ink/60">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-brand hover:underline">
          Log in
        </Link>
      </p>
    </AuthSplit>
  );
}
