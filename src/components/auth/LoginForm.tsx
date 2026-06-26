"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthSplit } from "@/components/onboarding/shells";
import PasswordField from "@/components/PasswordField";

const input =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";
const label = "mb-1.5 block text-sm font-bold";

export default function LoginForm() {
  const router = useRouter();

  return (
    <AuthSplit>
      <p className="text-2xl font-bold text-brand">Daniliya</p>
      <h1 className="mt-5 text-[34px] font-bold leading-tight">
        Welcome <span className="text-brand">back</span>
      </h1>
      <p className="mt-2 text-sm text-ink/55">
        Log in to your affiliate dashboard
      </p>

      <form
        className="mt-7 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/");
        }}
      >
        <div>
          <label className={label}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className={input}
            placeholder="e.g yourmail@gmail.com"
            required
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-bold">
              Password <span className="text-red-500">*</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-bold text-brand hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordField placeholder="Enter your password" required />
        </div>
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input type="checkbox" className="accent-brand" /> Keep me signed in
        </label>
        <button className="w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
          Log in
        </button>
      </form>

      <p className="mt-6 text-sm text-ink/60">
        Don&apos;t have an account?{" "}
        <Link href="/join/signup" className="font-bold text-brand hover:underline">
          Sign up
        </Link>
      </p>
    </AuthSplit>
  );
}
