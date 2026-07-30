import type { Metadata } from "next";
import { Card, PageHead, StatCard } from "@/components/widgets";
import { apiFetchSafe } from "@/lib/api";
import { naira } from "@/lib/dashboard";
import { money, shortDate, type Referrals } from "@/lib/affiliate";

export const metadata: Metadata = { title: "Referrals" };

export default async function ReferralsPage() {
  const referrals = await apiFetchSafe<Referrals>("/affiliate/referrals");
  const rows = referrals?.rows ?? [];

  return (
    <>
      <PageHead
        title="Referred customers"
        subtitle="People who bought through your link — your community of buyers."
      />

      {/* Only two counters exist on the API summary. The old "New this month"
          and "Repeat buyers" cards had no data behind them and are gone. */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Total customers"
          value={String(referrals?.summary.customers ?? 0)}
          icon="users"
        />
        <StatCard
          label="Total orders"
          value={String(referrals?.summary.totalOrders ?? 0)}
          icon="cart"
        />
      </div>

      {/* No per-customer commission figure and no referral code on the row, so
          the "Your commission" column and the "via CODE" caption are removed. */}
      <Card className="mt-6 overflow-x-auto">
        <p className="font-bold">Customer list</p>
        <table className="mt-4 w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs text-ink/50">
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Orders</th>
              <th className="pb-3 font-medium">Lifetime spend</th>
              <th className="pb-3 font-medium">Last order</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={`${r.name}-${i}`} className="border-b border-ink/5 last:border-0">
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/15 text-xs font-bold text-brand">
                      {r.name.slice(0, 2).toUpperCase()}
                    </span>
                    <p className="font-bold">{r.name}</p>
                  </div>
                </td>
                <td className="py-3.5 text-ink/60">{r.orders}</td>
                <td className="py-3.5 text-ink/60">{naira(money(r.spend))}</td>
                <td className="py-3.5 text-ink/60">{shortDate(r.last)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="py-10 text-center text-sm text-ink/45">
                  No referred customers yet. Share your link to bring buyers in.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
}
