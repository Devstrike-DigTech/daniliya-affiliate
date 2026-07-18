import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import { safeNext } from "@/lib/onboarding";

export const metadata: Metadata = { title: "Log in" };

/**
 * `?next=` is set by the Proxy when it bounces an unauthenticated request.
 * Reading it on the server keeps this page free of `useSearchParams` and the
 * Suspense boundary that would otherwise be required.
 */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const next = safeNext((await searchParams).next);
  return <LoginForm next={next} />;
}
