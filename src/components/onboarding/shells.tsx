"use client";

import Image from "next/image";
import Icon from "@/components/Icon";
import { LANDING_URL } from "@/lib/dashboard";

/** Dark "Welcome {name} 👋 … Exit" bar at the top of the gated steps. */
export function OnboardingTopbar({
  name,
  onExit,
}: {
  name: string;
  onExit: () => void;
}) {
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-8">
        <p className="text-lg font-bold">
          Welcome <span className="text-brand">{name}</span> 👋
        </p>
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 text-sm font-bold text-red-400 transition-opacity hover:opacity-80"
        >
          <Icon name="exit" size={18} /> Exit
        </button>
      </div>
    </div>
  );
}

export type Profile = { name: string; email: string; phone: string };

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "DA";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

/** Right-hand rail: gold-topped profile card + a variable lower panel. */
export function OnboardingAside({
  profile,
  children,
}: {
  profile: Profile;
  children?: React.ReactNode;
}) {
  return (
    <aside className="space-y-4">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink/10">
        <div className="h-16 bg-brand" />
        <div className="px-5 pb-5">
          <span className="-mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-ink text-lg font-bold text-white ring-4 ring-white">
            {initials(profile.name)}
          </span>
          <p className="mt-3 text-[17px] font-bold">{profile.name}</p>
          <div className="mt-2 space-y-1 text-xs text-ink/55">
            <p className="flex items-center gap-2">
              <Icon name="mail" size={14} className="text-brand" />
              {profile.email}
            </p>
            <p className="flex items-center gap-2">
              <Icon name="phone" size={14} className="text-brand" />
              {profile.phone}
            </p>
          </div>
        </div>
      </div>
      {children}
    </aside>
  );
}

/** "What happens next" panel used across KYC / tutorial / assessment. */
export function WhatHappensNext({
  steps,
}: {
  steps: { text: string; done?: boolean }[];
}) {
  return (
    <div className="rounded-2xl bg-cream p-5">
      <p className="flex items-center gap-2 text-sm font-bold">
        <Icon name="play" size={14} className="text-brand" />
        What happens <span className="text-brand">next</span>
      </p>
      <ol className="mt-3 space-y-2 text-xs text-ink/65">
        {steps.map((s, i) => (
          <li key={s.text} className="flex items-start gap-2">
            <span className="font-bold text-ink/40">{i + 1}.</span>
            <span className="flex-1">{s.text}</span>
            {s.done && <Icon name="check" size={13} className="text-green-500" />}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Left-image / right-content split used by Sign up + Verify email. */
export function AuthSplit({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-0px)] max-w-[1240px] items-stretch gap-0 p-4 sm:p-6 lg:grid-cols-2 lg:gap-8 lg:p-8">
      <div className="relative hidden overflow-hidden rounded-3xl lg:block">
        <Image
          src="/images/affiliates/onboarding.jpg"
          alt="Join Daniliya"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center py-10 lg:py-0">{children}</div>
    </div>
  );
}

/** Gated-step shell: dark Welcome topbar + max-width content container.
 * Exit returns home. */
export function GatedShell({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper">
      <OnboardingTopbar
        name={name}
        onExit={() => {
          window.location.href = LANDING_URL;
        }}
      />
      <div className="mx-auto max-w-[1240px] px-4 py-10 sm:px-8">{children}</div>
    </div>
  );
}

/** Faint dotted-grid decoration used on the role / review / rejected screens. */
export function Dots({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute h-40 w-40 bg-[radial-gradient(var(--color-brand)_1.4px,transparent_1.4px)] [background-size:14px_14px] opacity-40 ${className}`}
    />
  );
}
