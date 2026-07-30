import type { Metadata } from "next";
import VerifyStep from "@/components/onboarding/steps/VerifyStep";

export const metadata: Metadata = { title: "Verify your email" };

/**
 * The email is read from the query string on the server and handed down as a
 * prop, so no `useSearchParams` (and therefore no Suspense boundary) is needed.
 */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  return <VerifyStep email={email ?? ""} />;
}
