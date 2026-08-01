"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { StatusBadge } from "@/components/widgets";
import { money, shortDate } from "@/lib/affiliate";
import { naira } from "@/lib/dashboard";

export type PayoutRow = {
  batch: string;
  amount: string;
  status: string;
  scheduledDate: string | null;
};

/**
 * Payout history with a client-side search (by batch reference). Payouts are
 * always bank transfers to the affiliate's payout account — shown in the card
 * below — so "Method" is a constant label rather than per-row data we don't store.
 */
export default function HistoryTable({ rows }: { rows: PayoutRow[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? rows.filter((r) => r.batch.toLowerCase().includes(q)) : rows;
  }, [rows, query]);

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-bold">Payout history</p>
        <div className="relative sm:w-72">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by reference"
            className="h-11 w-full rounded-xl border border-ink/15 bg-white pl-4 pr-11 text-sm outline-none transition-colors placeholder:text-ink/40 focus:border-brand"
          />
          <span className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-brand/15 text-brand">
            <Icon name="search" size={15} />
          </span>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink/45">
              <th className="pb-3 pr-4 font-bold">Reference</th>
              <th className="px-4 pb-3 font-bold">Date</th>
              <th className="px-4 pb-3 font-bold">Method</th>
              <th className="px-4 pb-3 text-right font-bold">Amount</th>
              <th className="px-4 pb-3 text-right font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/8">
            {filtered.map((r) => (
              <tr key={r.batch} className="transition-colors hover:bg-ink/[0.02]">
                <td className="py-4 pr-4 font-mono text-xs font-bold text-ink/80">{r.batch}</td>
                <td className="px-4 py-4 text-ink/60">{shortDate(r.scheduledDate)}</td>
                <td className="px-4 py-4 text-ink/60">Bank transfer</td>
                <td className="px-4 py-4 text-right font-bold tabular-nums">{naira(money(r.amount))}</td>
                <td className="px-4 py-4 text-right">
                  <StatusBadge status={r.status} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-sm text-ink/45">
                  {rows.length === 0
                    ? "You haven't been included in a payout batch yet."
                    : "No payouts match your search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
