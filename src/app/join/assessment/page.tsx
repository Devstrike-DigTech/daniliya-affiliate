import type { Metadata } from "next";
import AssessmentStep from "@/components/onboarding/steps/AssessmentStep";

export const metadata: Metadata = { title: "Assessment" };

export default function Page() {
  return <AssessmentStep />;
}
