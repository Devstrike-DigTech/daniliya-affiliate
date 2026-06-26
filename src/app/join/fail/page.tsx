import type { Metadata } from "next";
import FailStep from "@/components/onboarding/steps/FailStep";

export const metadata: Metadata = { title: "Assessment result" };

export default function Page() {
  return <FailStep />;
}
