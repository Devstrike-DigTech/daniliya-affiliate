"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { Card, PageHead, StatusBadge } from "@/components/widgets";
import { earningsRows, earningsSummary } from "@/lib/dashboard";

const FILTERS = ["All", "Pending", "Paid"] as const;

export default function EarningsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return earningsRows
      .filter((r) => filter === "All" || r.status === filter)
      .filter((r) => !q || r.order.toLowerCase().includes(q) || r.customer.toLowerCase().includes(q));
  }, [filter, query]);

  return (
    <>
      <PageHead
        title="Earnings"
        subtitle="Every sale you've referred — broken down by status."
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-coal px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90">
            <Icon name="download" size={16} /> Export CSV
          </button>
        }
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {earningsSummary.map((s) => (
          <Card key={s.label}>
            <p className="text-sm text-ink/55">{s.label}</p>
            <p className="mt-2 text-[26px] font-bold">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex rounded-full bg-ink/5 p-1 text-sm font-bold">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2 transition-colors ${
                  filter === f ? "bg-ink text-white" : "text-ink/55"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <label className="flex min-w-[240px] flex-1 items-center gap-2.5 rounded-full border border-ink/15 px-4 py-2.5 sm:flex-none">
            <Icon name="search" size={16} className="text-ink/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by ID, Name"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink/35"
            />
          </label>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-xs text-ink/50">
                <th className="pb-3 font-medium">Order</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Sale</th>
                <th className="pb-3 font-medium">Commission</th>
                <th className="pb-3 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.order} className="border-b border-ink/5 last:border-0">
                  <td className="py-3.5 text-ink/60">{r.order}</td>
                  <td className="py-3.5 text-ink/60">{r.date}</td>
                  <td className="py-3.5 font-medium">{r.customer}</td>
                  <td className="py-3.5 text-ink/60">{r.product}</td>
                  <td className="py-3.5 text-ink/60">{r.sale}</td>
                  <td className="py-3.5 font-bold">{r.commission}</td>
                  <td className="py-3.5 text-right">
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-sm text-ink/45">
                    No transactions match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
