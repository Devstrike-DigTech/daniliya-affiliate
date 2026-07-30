import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHead } from "@/components/widgets";
import { apiFetchSafe } from "@/lib/api";
import type { BankAccount, KycMe, Me, Overview } from "@/lib/affiliate";
import ProfileTabs from "./ProfileTabs";

export const metadata: Metadata = { title: "Profile & KYC" };

export default async function ProfilePage() {
  const [me, overview, banks, bankList, kyc] = await Promise.all([
    apiFetchSafe<Me>("/auth/me"),
    apiFetchSafe<Overview>("/affiliate/overview"),
    apiFetchSafe<BankAccount[]>("/me/bank-accounts"),
    apiFetchSafe<{ name: string; code: string }[]>("/banks"),
    apiFetchSafe<KycMe>("/kyc/me"),
  ]);

  return (
    <>
      <PageHead
        title="Profile & KYC"
        subtitle="Keep your details up to date so payouts and verification go smoothly."
      />
      <Suspense fallback={null}>
        <ProfileTabs
          me={me}
          code={overview?.code ?? null}
          banks={banks ?? []}
          bankList={bankList ?? []}
          kyc={kyc}
        />
      </Suspense>
    </>
  );
}
