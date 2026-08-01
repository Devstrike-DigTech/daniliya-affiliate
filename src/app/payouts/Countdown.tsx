"use client";

import { useEffect, useState } from "react";

/** Two-digit clamp — never shows negative once the target passes. */
const pad = (n: number) => Math.max(0, n).toString().padStart(2, "0");

/**
 * Live HH:MM:SS countdown to the next auto-payout. Rendered as a client island
 * so the surrounding Payouts page stays server-rendered. `target` is the ISO
 * date from the API; once it passes we hold at 00:00:00 (the weekly cron will
 * have advanced it by the next load).
 */
export default function Countdown({ target }: { target: string }) {
  const end = new Date(target).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Until mounted, render a stable placeholder so SSR and first paint agree.
  const diff = now === null ? 0 : Math.max(0, end - now);
  const totalHrs = Math.floor(diff / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const secs = Math.floor((diff % 60_000) / 1000);

  return (
    <span className="font-mono tabular-nums" suppressHydrationWarning>
      {pad(totalHrs)}
      <span className="text-white/40">:</span>
      {pad(mins)}
      <span className="text-white/40">:</span>
      {pad(secs)}
    </span>
  );
}
