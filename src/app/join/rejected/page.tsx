import type { Metadata } from "next";
import RejectedStep from "@/components/onboarding/steps/RejectedStep";

export const metadata: Metadata = { title: "KYC rejected" };

export default function Page() {
  return <RejectedStep />;
}
