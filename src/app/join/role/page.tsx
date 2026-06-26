import type { Metadata } from "next";
import RoleStep from "@/components/onboarding/steps/RoleStep";

export const metadata: Metadata = { title: "Choose your role" };

export default function Page() {
  return <RoleStep />;
}
