import type { Metadata } from "next";
import { PageHead } from "@/components/widgets";
import { apiFetchSafe } from "@/lib/api";
import type { AffiliateLinks } from "@/lib/affiliate";
import LinksView from "./LinksView";

export const metadata: Metadata = { title: "My Links" };

export default async function LinksPage() {
  const links = await apiFetchSafe<AffiliateLinks>("/affiliate/links");

  return (
    <>
      <PageHead
        title="My referral links"
        subtitle="Share these unique links — every sale credited to you earns commission."
      />
      {links ? (
        <LinksView master={links.master} products={links.products} />
      ) : (
        <p className="mt-10 text-center text-sm text-ink/50">
          We couldn&apos;t load your referral links just now. Please refresh.
        </p>
      )}
    </>
  );
}
