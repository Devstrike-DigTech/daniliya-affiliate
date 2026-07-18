import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { Card, PageHead } from "@/components/widgets";
import { apiFetchSafe } from "@/lib/api";
import { naira } from "@/lib/dashboard";
import { money, type Leaderboard } from "@/lib/affiliate";

export const metadata: Metadata = { title: "Leaderboard" };

export default async function LeaderboardPage() {
  const board = await apiFetchSafe<Leaderboard>("/affiliate/leaderboard");
  const top = board?.top ?? [];

  // Podium is rendered from the real top three, in 2-1-3 visual order, and
  // only when all three exist.
  const byRank = (n: number) => top.find((r) => r.rank === n);
  const podium = [byRank(2), byRank(1), byRank(3)].filter(
    (r): r is NonNullable<typeof r> => Boolean(r),
  );

  return (
    <>
      <PageHead
        title="Leaderboard"
        subtitle="Top affiliates by commission earned."
      />

      {/* myRank is null when you're outside the top list — say so rather than
          rendering a rank that doesn't exist. */}
      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl bg-coal p-6 text-white">
        <Icon name="trophy" size={20} className="text-brand" />
        {board?.myRank != null ? (
          <p className="text-sm font-bold">
            Your current rank:{" "}
            <span className="text-xl text-brand">#{board.myRank}</span>
          </p>
        ) : (
          <p className="text-sm font-bold text-white/80">
            You&apos;re not in the top list yet — keep referring to climb on.
          </p>
        )}
      </div>

      {podium.length === 3 && (
        <div className="mt-6 grid grid-cols-3 items-end gap-4">
          {podium.map((p) => {
            const first = p.rank === 1;
            return (
              <div key={p.rank} className="flex flex-col items-center">
                <div className="relative">
                  {first && (
                    <Icon
                      name="crown"
                      size={26}
                      className="absolute -top-7 left-1/2 -translate-x-1/2 text-brand"
                    />
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
                <p className="text-xs text-brand">{naira(money(p.earned))}</p>
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
      )}

      {/* Tier and sales-count columns are gone — the leaderboard payload has
          rank, name, code and earned only. */}
      <Card className="mt-6 overflow-x-auto">
        <p className="font-bold">Rankings</p>
        <table className="mt-4 w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs text-ink/50">
              <th className="pb-3 font-medium">Rank</th>
              <th className="pb-3 font-medium">Affiliate</th>
              <th className="pb-3 text-right font-medium">Earned</th>
            </tr>
          </thead>
          <tbody>
            {top.map((r) => (
              <tr
                key={r.code}
                className={`border-b border-ink/5 last:border-0 ${r.you ? "bg-brand/10" : ""}`}
              >
                <td className="py-3.5 font-bold">{r.rank}</td>
                <td className="py-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold">{r.name}</span>
                    <span className="text-xs text-ink/40">{r.code}</span>
                    {r.you && (
                      <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white">
                        You
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3.5 text-right font-bold">{naira(money(r.earned))}</td>
              </tr>
            ))}
            {top.length === 0 && (
              <tr>
                <td colSpan={3} className="py-10 text-center text-sm text-ink/45">
                  The leaderboard is empty right now.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* The loyalty tier ladder card was removed: the API publishes a tier
          name but no tier thresholds or perks, so every figure on it was
          invented. */}
    </>
  );
}
