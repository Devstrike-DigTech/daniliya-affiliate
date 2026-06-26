import type { Metadata } from "next";
import ReviewStep from "@/components/onboarding/steps/ReviewStep";

export const metadata: Metadata = { title: "KYC under review" };

export default function Page() {
  return <ReviewStep />;
}
