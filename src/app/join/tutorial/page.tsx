import type { Metadata } from "next";
import TutorialStep, { type Lesson } from "@/components/onboarding/steps/TutorialStep";
import { apiFetchSafe } from "@/lib/api";
import { firstNameOf, fullName } from "@/lib/onboarding";
import { nextStepsFor, requireJoinStep } from "../guard";

export const metadata: Metadata = { title: "Affiliate tutorial" };

export default async function Page() {
  // The API does not gate the tutorial on KYC — only on holding the affiliate
  // role — so this mirrors what the server actually enforces.
  const { status, me } = await requireJoinStep(
    (s) => s.role === "AFFILIATE" && s.step !== "active",
  );

  const lessons = await apiFetchSafe<Lesson[]>("/onboarding/tutorial");

  return (
    <TutorialStep
      profile={{
        name: fullName(me),
        email: me?.email ?? "",
        phone: me?.phone ?? "",
      }}
      firstName={firstNameOf(me)}
      lessons={lessons ?? []}
      nextSteps={nextStepsFor(status)}
    />
  );
}
