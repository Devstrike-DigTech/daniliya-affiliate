import type { Metadata } from "next";
import TutorialStep from "@/components/onboarding/steps/TutorialStep";

export const metadata: Metadata = { title: "Affiliate tutorial" };

export default function Page() {
  return <TutorialStep />;
}
