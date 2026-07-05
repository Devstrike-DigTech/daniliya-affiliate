import Link from "next/link";
import Icon from "@/components/Icon";
import CopyButton from "@/components/CopyButton";
import { Card, StatCard, StatusBadge } from "@/components/widgets";
import {
  affiliate,
  masterLink,
  overviewStats,
  recentSales,
  tierProgress,
  weeklySales,
} from "@/lib/dashboard";

const maxBar = Math.max(...weeklySales.map((d) => d.value));

export default function OverviewPage() {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-[28px]">
            Welcome back, {affiliate.firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-ink/55">
            Here&apos;s how your affiliate business is doing this week.
          </p>
        </div>
        <CopyButton
          value={masterLink}
          className="rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white"
        />
      </div>

      {/* KPI cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Weekly performance */}
        <Card>
          <p className="font-bold">Weekly performance</p>
          <p className="text-xs text-ink/50">Sales — last 7 days</p>
          <div className="mt-6 flex h-56 items-stretch gap-3 sm:gap-6">
            {weeklySales.map((d) => (
              <div key={d.day} className="flex h-full flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-brand transition-all"
                    style={{ height: `${(d.value / maxBar) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-ink/50">{d.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Current tier */}
        <div className="flex flex-col rounded-2xl bg-coal p-6 text-white">
          <p className="text-sm font-bold text-brand">Current Tier</p>
          <p className="mt-3 text-[40px] font-bold leading-none">{tierProgress.current}</p>
          <p className="mt-1 text-sm text-white/70">₦10,000 flat commission / sale</p>
          <div className="mt-6 flex items-center justify-between text-sm font-bold">
            <span>{tierProgress.current}</span>
            <span>{tierProgress.next}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-brand" style={{ width: `${tierProgress.pct}%` }} />
          </div>
          <p className="mt-3 text-xs text-white/60">
            {tierProgress.toUnlock} more to unlock {tierProgress.next}
          </p>
          <Link
            href="/leaderboard"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
          >
            View Leaderboard <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </div>

      {/* Recent referred sales */}
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
              <th className="pb-3 font-medium">Product</th>
              <th className="pb-3 font-medium">Commission</th>
              <th className="pb-3 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((r) => (
              <tr key={r.order} className="border-b border-ink/5 last:border-0">
                <td className="py-3.5 text-ink/60">{r.order}</td>
                <td className="py-3.5 font-medium">{r.product}</td>
                <td className="py-3.5 font-bold">{r.commission}</td>
                <td className="py-3.5 text-right">
                  <StatusBadge status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}
