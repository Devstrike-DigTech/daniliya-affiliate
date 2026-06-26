import type { Metadata } from "next";
import VerifyStep from "@/components/onboarding/steps/VerifyStep";

export const metadata: Metadata = { title: "Verify your email" };

export default function Page() {
  return <VerifyStep />;
}
