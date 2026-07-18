"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { Card, PageHead, StatusBadge } from "@/components/widgets";
import { naira } from "@/lib/dashboard";
import { money, shortDate, titleCase, type Earnings } from "@/lib/affiliate";

export default function EarningsView({ summary, records }: Earnings) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  // Filter chips are derived from the statuses actually present, rather than a
  // hardcoded list, so we never offer a filter that can't match anything.
  const filters = useMemo(
    () => ["All", ...Array.from(new Set(records.map((r) => r.status)))],
    [records],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return records
      .filter((r) => filter === "All" || r.status === filter)
      .filter((r) => !q || r.order.toLowerCase().includes(q));
  }, [records, filter, query]);

  // Built in the browser from the rows already on screen — there is no
  // server-side export endpoint.
  const exportCsv = () => {
    const head = ["Order", "Date", "Sale", "Commission", "Status"];
    const body = rows.map((r) => [r.order, r.date, r.sale, r.commission, r.status]);
    const csv = [head, ...body]
      .map((line) => line.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "daniliya-earnings.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHead
        title="Earnings"
        subtitle="Every sale you've referred — broken down by status."
        action={
          <button
            onClick={exportCsv}
            disabled={rows.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-coal px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Icon name="download" size={16} /> Export CSV
          </button>
        }
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-ink/55">Gross GMV</p>
          <p className="mt-2 text-[26px] font-bold">{naira(money(summary.grossGmv))}</p>
        </Card>
        <Card>
          <p className="text-sm text-ink/55">Commission Earned</p>
          <p className="mt-2 text-[26px] font-bold">
            {naira(money(summary.commissionEarned))}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-ink/55">Total Transactions</p>
          <p className="mt-2 text-[26px] font-bold">{summary.transactions}</p>
        </Card>
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap rounded-full bg-ink/5 p-1 text-sm font-bold">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2 transition-colors ${
                  filter === f ? "bg-ink text-white" : "text-ink/55"
                }`}
              >
                {f === "All" ? f : titleCase(f)}
              </button>
            ))}
          </div>
          <label className="flex min-w-[240px] flex-1 items-center gap-2.5 rounded-full border border-ink/15 px-4 py-2.5 sm:flex-none">
            <Icon name="search" size={16} className="text-ink/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by order ID"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink/35"
            />
          </label>
        </div>

        {/* The Customer and Product columns are gone: GET /affiliate/earnings
            returns order, sale, commission, status and date only. */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[620px] text-sm">
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
              {rows.map((r) => (
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
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-sm text-ink/45">
                    {records.length === 0
                      ? "No referred sales yet. Share your link to start earning."
                      : "No transactions match your filters."}
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
