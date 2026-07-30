import type { Metadata } from "next";
import RejectedStep from "@/components/onboarding/steps/RejectedStep";
import { firstNameOf } from "@/lib/onboarding";
import { requireJoinStep } from "../guard";

export const metadata: Metadata = { title: "KYC rejected" };

export default async function Page() {
  const { status, me } = await requireJoinStep((s) => s.kycStatus === "REJECTED");

  return <RejectedStep firstName={firstNameOf(me)} reason={status.kycReason} />;
}
