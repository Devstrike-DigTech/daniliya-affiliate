import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { Card, PageHead, StatCard } from "@/components/widgets";
import {
  leaderboardRows,
  podium,
  referralStats,
  tierLadder,
} from "@/lib/dashboard";

export const metadata: Metadata = { title: "Leaderboard" };

export default function LeaderboardPage() {
  return (
    <>
      <PageHead
        title="Leaderboard"
        subtitle="Top affiliates this month. Top 10 win a ₦25,000 cash bonus."
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {referralStats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
        ))}
      </div>

      {/* Podium */}
      <div className="mt-6 grid grid-cols-3 items-end gap-4">
        {podium.map((p) => {
          const first = p.rank === 1;
          return (
            <div key={p.rank} className="flex flex-col items-center">
              <div className="relative">
                {first && (
                  <Icon name="crown" size={26} className="absolute -top-7 left-1/2 -translate-x-1/2 text-brand" />
                )}
                <span
                  className={`flex items-center justify-center rounded-full bg-brand/15 font-bold text-brand ring-4 ${
                    first ? "h-24 w-24 ring-brand" : "h-20 w-20 ring-ink/10"
                  }`}
                >
                  {p.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <p className="mt-3 text-sm font-bold">{p.name}</p>
              <p className="text-xs text-brand">{p.earned}</p>
              <div
                className={`mt-3 flex w-full items-center justify-center rounded-t-xl font-bold text-white ${
                  first ? "h-24 bg-brand text-2xl" : "h-16 bg-coal text-xl"
                }`}
              >
                {p.rank}
              </div>
            </div>
          );
        })}
      </div>

      {/* Rankings */}
      <Card className="mt-6 overflow-x-auto">
        <p className="font-bold">This month&apos;s rankings</p>
        <table className="mt-4 w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs text-ink/50">
              <th className="pb-3 font-medium">Rank</th>
              <th className="pb-3 font-medium">Affiliate</th>
              <th className="pb-3 font-medium">Tier</th>
              <th className="pb-3 font-medium">Sales</th>
              <th className="pb-3 font-medium">Earned</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardRows.map((r) => (
              <tr
                key={r.rank}
                className={`border-b border-ink/5 last:border-0 ${r.you ? "bg-brand/10" : ""}`}
              >
                <td className="py-3.5 font-bold">{r.rank}</td>
                <td className="py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{r.name}</span>
                    <span className="text-xs text-ink/40">{r.code}</span>
                    {r.you && (
                      <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white">You</span>
                    )}
                  </div>
                </td>
                <td className="py-3.5 text-ink/60">{r.tier}</td>
                <td className="py-3.5 text-green-600">{r.sales}</td>
                <td className="py-3.5 font-bold">{r.earned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Tier ladder */}
      <Card className="mt-6">
        <p className="font-bold">Loyalty tier ladder</p>
        <p className="text-xs text-ink/50">
          Climb the ranks as your lifetime earnings grow — commission stays a
          flat ₦10,000 per sale at every tier.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tierLadder.map((t) => (
            <div key={t.label} className="rounded-2xl border border-ink/10 p-5">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${t.color}`}>
                {t.label}
              </span>
              <p className="mt-3 text-[17px] font-bold">{t.perk}</p>
              <p className="mt-1.5 text-xs text-ink/55">{t.req}</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
