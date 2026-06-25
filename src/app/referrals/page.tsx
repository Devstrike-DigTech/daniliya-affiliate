import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { Card, PageHead, StatCard } from "@/components/widgets";
import { referralRows, referralStats } from "@/lib/dashboard";

export const metadata: Metadata = { title: "Referrals" };

export default function ReferralsPage() {
  return (
    <>
      <PageHead
        title="Referred customers"
        subtitle="People who bought through your link — your community of buyers."
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {referralStats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
        ))}
      </div>

      <Card className="mt-6 overflow-x-auto">
        <p className="font-bold">Customer list</p>
        <table className="mt-4 w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs text-ink/50">
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Orders</th>
              <th className="pb-3 font-medium">Lifetime spend</th>
              <th className="pb-3 font-medium">Your commission</th>
              <th className="pb-3 font-medium">Last order</th>
            </tr>
          </thead>
          <tbody>
            {referralRows.map((r, i) => (
              <tr key={i} className="border-b border-ink/5 last:border-0">
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/15 text-xs font-bold text-brand">
                      {r.name.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <p className="font-bold">{r.name}</p>
                      <p className="text-xs text-ink/45">via {r.code}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 text-ink/60">{r.orders}</td>
                <td className="py-3.5 text-ink/60">{r.spend}</td>
                <td className="py-3.5 font-bold text-green-600">{r.commission}</td>
                <td className="py-3.5 text-ink/60">{r.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}
