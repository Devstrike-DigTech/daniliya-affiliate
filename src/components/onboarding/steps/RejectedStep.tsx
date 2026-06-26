"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { Dots, OnboardingTopbar } from "@/components/onboarding/shells";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";

export default function RejectedStep() {
  const router = useRouter();
  const { firstName } = useOnboarding();

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper">
      <OnboardingTopbar name={firstName} onExit={() => router.push("/")} />
      <Dots className="-right-10 top-20" />
      <Dots className="-left-10 bottom-10" />
      <div className="mx-auto max-w-[680px] px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center sm:p-10">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
            <Icon name="alert" size={28} />
          </span>
          <span className="mt-4 inline-block rounded-full bg-red-500 px-4 py-1.5 text-xs font-bold text-white">
            KYC rejected
          </span>
          <h1 className="mt-4 text-2xl font-bold">We couldn&apos;t verify your submission</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink/55">
            Don&apos;t worry — this happens often and is usually quick to fix.
            Review the reason below and resubmit.
          </p>
          <div className="mt-6 rounded-xl bg-red-50 p-5 text-left">
            <p className="text-sm font-bold">
              Reviewer <span className="text-red-500">note</span>
            </p>
            <p className="mt-1 text-sm text-ink/60">
              ID document was blurry or partially cropped. Please re-upload a
              clearer photo.
            </p>
          </div>
          <ul className="mt-5 space-y-1.5 text-left text-xs text-ink/60">
            <li>· Ensure your full name matches the name registered with your BVN.</li>
            <li>· Upload a clear photo of your ID — all 4 corners visible, no glare.</li>
            <li>· Confirm your NIN and BVN are entered correctly (11 digits each).</li>
          </ul>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => router.push("/join/kyc")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-coal py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              <Icon name="arrow-left" size={16} /> Go Back
            </button>
            <button
              onClick={() => router.push("/join/kyc")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Re submit KYC <Icon name="arrow-right" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
