import type { Metadata } from "next";
import { PageHead } from "@/components/widgets";
import { apiFetchSafe } from "@/lib/api";
import type { Earnings } from "@/lib/affiliate";
import EarningsView from "./EarningsView";

export const metadata: Metadata = { title: "Earnings" };

export default async function EarningsPage() {
  const earnings = await apiFetchSafe<Earnings>("/affiliate/earnings");

  if (!earnings) {
    return (
      <>
        <PageHead
          title="Earnings"
          subtitle="Every sale you've referred — broken down by status."
        />
        <p className="mt-10 text-center text-sm text-ink/50">
          We couldn&apos;t load your earnings just now. Please refresh.
        </p>
      </>
    );
  }

  return <EarningsView summary={earnings.summary} records={earnings.records} />;
}
