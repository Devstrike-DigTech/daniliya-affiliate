import type { Metadata } from "next";
import SignupStep from "@/components/onboarding/steps/SignupStep";

export const metadata: Metadata = { title: "Create your account" };

export default function Page() {
  return <SignupStep />;
}
