import Link from "next/link";
import Icon from "@/components/Icon";
import CopyButton from "@/components/CopyButton";
import { Card, StatCard, StatusBadge } from "@/components/widgets";
import { apiFetchSafe } from "@/lib/api";
import { COMMISSION_PER_SALE, naira } from "@/lib/dashboard";
import {
  money,
  shortDate,
  titleCase,
  type AffiliateLinks,
  type Earnings,
  type Me,
  type Overview,
} from "@/lib/affiliate";

export default async function OverviewPage() {
  const [me, overview, links, earnings] = await Promise.all([
    apiFetchSafe<Me>("/auth/me"),
    apiFetchSafe<Overview>("/affiliate/overview"),
    apiFetchSafe<AffiliateLinks>("/affiliate/links"),
    apiFetchSafe<Earnings>("/affiliate/earnings"),
  ]);

  const recent = earnings?.records.slice(0, 5) ?? [];

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-[28px]">
            Welcome back{me ? `, ${me.firstName}` : ""} 👋
          </h1>
          <p className="mt-1 text-sm text-ink/55">
            Here&apos;s how your affiliate business is doing.
          </p>
        </div>
        {links?.master && (
          <CopyButton
            value={links.master}
            className="rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white"
          />
        )}
      </div>

      {/* KPI cards. There is no click/impression data in the API, so the
          "clicks this week" card is gone; and no time series, so no
          percentage deltas. */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Lifetime earnings"
          value={naira(money(overview?.lifetimeEarnings))}
          icon="trending-up"
        />
        <StatCard
          label="Pending payout"
          value={naira(money(overview?.pending))}
          icon="wallet"
        />
        <StatCard
          label="Conversions"
          value={String(overview?.conversions ?? 0)}
          icon="grid"
        />
        <StatCard
          label="Gross GMV referred"
          value={naira(money(earnings?.summary.grossGmv))}
          icon="chart"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* The weekly sales bar chart that used to sit here has been removed —
            the API exposes no time-series data to draw it from. */}
        <Card className="flex flex-col justify-center">
          <p className="text-sm text-ink/55">Your referral code</p>
          <p className="mt-1 text-[34px] font-bold leading-none">
            {overview?.code ?? "—"}
          </p>
          <p className="mt-3 text-sm text-ink/55">
            Every order placed through your link is credited to this code. It is
            permanent and tied to all your historical referrals.
          </p>
          <Link
            href="/links"
            className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-brand hover:underline"
          >
            Get your links <Icon name="arrow-right" size={14} />
          </Link>
        </Card>

        {/* Current tier. The API returns the tier name only — there are no
            threshold or progress fields, so the progress bar and the
            "X more to unlock" line have been removed. */}
        <div className="flex flex-col rounded-2xl bg-coal p-6 text-white">
          <p className="text-sm font-bold text-brand">Current Tier</p>
          <p className="mt-3 text-[40px] font-bold leading-none">
            {overview ? titleCase(overview.tier) : "—"}
          </p>
          <p className="mt-1 text-sm text-white/70">
            {naira(COMMISSION_PER_SALE)} flat commission / sale
          </p>
          <p className="mt-4 text-xs text-white/60">
            Status:{" "}
            <span className={overview?.isActive ? "text-green-400" : "text-white/80"}>
              {overview?.isActive ? "Active" : "Not active yet"}
            </span>
          </p>
          <Link
            href="/leaderboard"
            className="mt-auto inline-flex w-fit items-center gap-1.5 pt-5 text-sm font-bold text-brand hover:underline"
          >
            View Leaderboard <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </div>

      {/* Recent referred sales. Earnings records carry no product name, so that
          column is replaced by the order date and sale value. */}
      <Card className="mt-6 overflow-x-auto">
        <div className="flex items-center justify-between">
          <p className="font-bold">Recent referred sales</p>
          <Link href="/earnings" className="text-sm font-bold text-gold hover:underline">
            View all
          </Link>
        </div>
        <table className="mt-4 w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs text-ink/50">
              <th className="pb-3 font-medium">Order</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Sale</th>
              <th className="pb-3 font-medium">Commission</th>
              <th className="pb-3 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((r) => (
              <tr key={r.order} className="border-b border-ink/5 last:border-0">
                <td className="py-3.5 text-ink/60">{r.order}</td>
                <td className="py-3.5 text-ink/60">{shortDate(r.date)}</td>
                <td className="py-3.5 text-ink/60">{naira(money(r.sale))}</td>
                <td className="py-3.5 font-bold">{naira(money(r.commission))}</td>
                <td className="py-3.5 text-right">
                  <StatusBadge status={r.status} />
                </td>
              </tr>
            ))}
            {recent.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-sm text-ink/45">
                  No referred sales yet. Share your link to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
}
