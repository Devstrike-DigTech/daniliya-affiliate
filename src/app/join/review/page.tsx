import type { Metadata } from "next";
import ReviewStep from "@/components/onboarding/steps/ReviewStep";
import { firstNameOf, fullName } from "@/lib/onboarding";
import { requireJoinStep } from "../guard";

export const metadata: Metadata = { title: "KYC under review" };

const NEXT_LABEL: Record<string, string> = {
  tutorial: "Tutorial",
  assessment: "Assessment",
  active: "Your dashboard",
};

export default async function Page() {
  // Only meaningful once a KYC record actually exists and is awaiting review.
  const { status, me } = await requireJoinStep((s) => s.kycStatus === "PENDING");

  return (
    <ReviewStep
      profile={{
        name: fullName(me),
        email: me?.email ?? "",
        phone: me?.phone ?? "",
      }}
      firstName={firstNameOf(me)}
      nextStepLabel={NEXT_LABEL[status.step] ?? "Continue your onboarding"}
    />
  );
}
