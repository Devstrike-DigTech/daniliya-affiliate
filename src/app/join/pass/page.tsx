import type { Metadata } from "next";
import PassStep from "@/components/onboarding/steps/PassStep";

export const metadata: Metadata = { title: "You're in" };

export default function Page() {
  return <PassStep />;
}
