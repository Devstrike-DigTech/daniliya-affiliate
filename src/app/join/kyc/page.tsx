import type { Metadata } from "next";
import KycStep, { type Bank } from "@/components/onboarding/steps/KycStep";
import { apiFetchSafe } from "@/lib/api";
import { firstNameOf, fullName } from "@/lib/onboarding";
import { nextStepsFor, requireJoinStep } from "../guard";

export const metadata: Metadata = { title: "Identity & KYC" };

export default async function Page() {
  // Reachable while you are an affiliate who either hasn't submitted KYC yet or
  // was rejected and is resubmitting. A pending record has its own screen.
  const { status, me } = await requireJoinStep(
    (s) =>
      s.role === "AFFILIATE" &&
      s.step !== "active" &&
      (s.kycStatus === null || s.kycStatus === "REJECTED"),
  );

  const banks = await apiFetchSafe<Bank[]>("/banks");

  return (
    <KycStep
      profile={{
        name: fullName(me),
        email: me?.email ?? "",
        phone: me?.phone ?? "",
      }}
      firstName={firstNameOf(me)}
      banks={banks ?? []}
      banksError={banks === null}
      nextSteps={nextStepsFor(status)}
    />
  );
}
