"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthSplit } from "@/components/onboarding/shells";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";
import { LANDING_URL } from "@/lib/dashboard";
import DatePicker from "@/components/DatePicker";
import PasswordField from "@/components/PasswordField";

const input =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";
const label = "mb-1.5 block text-sm font-bold";

export default function SignupStep() {
  const router = useRouter();
  const { profile, setProfile } = useOnboarding();
  const [dob, setDob] = useState("");

  return (
    <AuthSplit>
      <p className="text-2xl font-bold text-brand">Daniliya</p>
      <h1 className="mt-5 text-[34px] font-bold leading-tight">
        Create your Daniliya <span className="text-brand">account</span>
      </h1>
      <p className="mt-2 text-sm text-ink/55">
        Your journey on Daniliya starts here
      </p>
      <form
        className="mt-7 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/join/verify");
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              className={input}
              placeholder="Enter your full name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={label}>
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <DatePicker value={dob} onChange={setDob} placeholder="dd/mm/yyyy" />
          </div>
          <div>
            <label className={label}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className={input}
              placeholder="e.g yourmail@gmail.com"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={label}>
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              className={input}
              placeholder="e.g +2348438..."
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>
          <div>
            <label className={label}>
              Password <span className="text-red-500">*</span>
            </label>
            <PasswordField placeholder="Least 8 characters" required />
          </div>
          <div>
            <label className={label}>
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <PasswordField placeholder="Repeat password" required />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input type="checkbox" required className="accent-brand" /> I agree to
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
        <button className="w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
          Sign up
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
