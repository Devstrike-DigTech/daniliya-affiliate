import type { Metadata } from "next";
import RoleStep from "@/components/onboarding/steps/RoleStep";
import { requireJoinStep } from "../guard";

export const metadata: Metadata = { title: "Choose your role" };

/** Only reachable while the server still has you on a non-affiliate role. */
export default async function Page() {
  await requireJoinStep((s) => s.role !== "AFFILIATE");
  return <RoleStep />;
}
