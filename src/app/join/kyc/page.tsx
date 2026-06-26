import type { Metadata } from "next";
import KycStep from "@/components/onboarding/steps/KycStep";

export const metadata: Metadata = { title: "Identity & KYC" };

export default function Page() {
  return <KycStep />;
}
