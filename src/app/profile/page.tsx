import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHead } from "@/components/widgets";
import ProfileTabs from "./ProfileTabs";

export const metadata: Metadata = { title: "Profile & KYC" };

export default function ProfilePage() {
  return (
    <>
      <PageHead
        title="Profile & KYC"
        subtitle="Keep your details up to date so payouts and verification go smoothly."
      />
      <Suspense fallback={null}>
        <ProfileTabs />
      </Suspense>
    </>
  );
}
