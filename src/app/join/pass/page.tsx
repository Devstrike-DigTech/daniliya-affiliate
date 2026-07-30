import type { Metadata } from "next";
import PassStep from "@/components/onboarding/steps/PassStep";
import { apiFetchSafe } from "@/lib/api";
import { firstNameOf, fullName } from "@/lib/onboarding";
import { requireJoinStep } from "../guard";

export const metadata: Metadata = { title: "You're in" };

export default async function Page() {
  // Only the server can say you passed — this screen is unreachable otherwise.
  const { status, me } = await requireJoinStep(
    (s) => s.role === "AFFILIATE" && (s.assessment?.passed ?? false),
  );

  const links = await apiFetchSafe<{ master: string }>("/affiliate/links");

  return (
    <PassStep
      profile={{
        name: fullName(me),
        email: me?.email ?? "",
        phone: me?.phone ?? "",
      }}
      firstName={firstNameOf(me)}
      code={status.referralCode ?? "—"}
      masterLink={links?.master ?? null}
    />
  );
}
