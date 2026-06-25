"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { Card, PageHead } from "@/components/widgets";
import { affiliate, payoutRows, payoutStats } from "@/lib/dashboard";

// time until next Monday 10:00 WAT
function useCountdown() {
  const [t, setT] = useState("00:00:00");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const next = new Date(now);
      const days = (8 - now.getDay()) % 7 || 7;
      next.setDate(now.getDate() + days);
      next.setHours(10, 0, 0, 0);
      let s = Math.max(0, Math.floor((next.getTime() - now.getTime()) / 1000));
      const h = Math.floor(s / 3600);
      s -= h * 3600;
      const m = Math.floor(s / 60);
      s -= m * 60;
      const p = (n: number) => String(n).padStart(2, "0");
      setT(`${p(h)}:${p(m)}:${p(s)}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function PayoutsPage() {
  const countdown = useCountdown();

  return (
    <>
      <PageHead
        title="Payouts"
        subtitle="Confirmed commissions auto-pay every Monday. You can also request early payout."
      />

      {/* Next payout countdown */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-coal p-6 text-white">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-brand">
            <Icon name="wallet" size={16} /> Next Monday Payout
          </p>
          <p className="mt-2 text-3xl font-bold">₦6,525</p>
          <p className="mt-1 text-xs text-white/55">
            Minimum payout: ₦5,000 · Next auto-payout: Monday, 10:00 WAT
          </p>
        </div>
        <p className="font-mono text-4xl font-bold tabular-nums sm:text-5xl">
          {countdown.split("").map((c, i) => (
            <span key={i} className={c === ":" ? "text-white/40" : ""}>
              {c}
            </span>
          ))}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {payoutStats.map((s) => (
          <Card key={s.label}>
            <p className="text-sm text-ink/55">{s.label}</p>
            <p className="mt-2 text-[26px] font-bold">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6 overflow-x-auto">
        <p className="font-bold">Payout history</p>
        <table className="mt-4 w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs text-ink/50">
              <th className="pb-3 font-medium">Reference</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Method</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {payoutRows.map((r) => (
              <tr key={r.reference} className="border-b border-ink/5 last:border-0">
                <td className="py-3.5 text-ink/60">{r.reference}</td>
                <td className="py-3.5 text-ink/60">{r.date}</td>
                <td className="py-3.5 text-ink/60">{r.method}</td>
                <td className="py-3.5 font-bold">{r.amount}</td>
                <td className="py-3.5 text-right">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Payout account */}
      <Card className="mt-6 max-w-md">
        <p className="flex items-center gap-2 text-sm text-ink/55">
          <Icon name="wallet" size={16} className="text-brand" /> Payout account
        </p>
        <p className="mt-2 text-lg font-bold">{affiliate.bank.name}</p>
        <p className="text-sm text-ink/60">
          {affiliate.bank.masked} · {affiliate.bank.accountName}
        </p>
        <Link
          href="/profile?tab=bank"
          className="mt-4 block rounded-xl bg-brand py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          Update bank details
        </Link>
      </Card>
    </>
  );
}
