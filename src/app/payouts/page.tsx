import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Card, PageHead } from "@/components/widgets";
import { apiFetchSafe } from "@/lib/api";
import { naira } from "@/lib/dashboard";
import { money, type BankAccount, type Payouts } from "@/lib/affiliate";
import Countdown from "./Countdown";
import HistoryTable from "./HistoryTable";

export const metadata: Metadata = { title: "Payouts" };

/** "Monday, 4 Aug · 10:00 WAT" — the real next-run instant, in Lagos time. */
function nextRunLabel(iso: string | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const day = d.toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "short",
    timeZone: "Africa/Lagos",
  });
  const time = d.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Africa/Lagos",
  });
  return `${day} · ${time} WAT`;
}

export default async function PayoutsPage() {
  const [payouts, banks] = await Promise.all([
    apiFetchSafe<Payouts>("/me/payouts"),
    apiFetchSafe<BankAccount[]>("/me/bank-accounts"),
  ]);

  const history = payouts?.history ?? [];
  const nextAmount = money(payouts?.walletBalance);
  const defaultBank = banks?.find((b) => b.isDefault) ?? banks?.[0] ?? null;

  return (
    <>
      <PageHead
        title="Payouts"
        subtitle="Confirmed commissions are paid out automatically every Monday."
      />

      {/* Next Monday payout — the wallet balance (confirmed commission) is what
          the next weekly batch disburses; the schedule + minimum come from the
          API, so nothing here is invented. */}
      <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-coal p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-brand">
            <Icon name="wallet" size={16} /> Next Monday payout
          </p>
          <p className="mt-2 text-4xl font-bold">{naira(nextAmount)}</p>
          <p className="mt-2 text-xs text-white/55">
            Minimum payout: {naira(money(payouts?.minPayout))} · Next auto-payout:{" "}
            {nextRunLabel(payouts?.nextPayoutDate)}
          </p>
        </div>
        {payouts?.nextPayoutDate && (
          <div className="shrink-0 text-4xl font-bold tracking-tight text-white/90 sm:text-5xl">
            <Countdown target={payouts.nextPayoutDate} />
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-ink/55">Lifetime paid</p>
          <p className="mt-2 text-[26px] font-bold">{naira(money(payouts?.lifetimePaid))}</p>
        </Card>
        <Card>
          <p className="text-sm text-ink/55">Payouts to date</p>
          <p className="mt-2 text-[26px] font-bold">{payouts?.payoutsToDate ?? 0}</p>
        </Card>
        <Card>
          <p className="text-sm text-ink/55">Avg. payout</p>
          <p className="mt-2 text-[26px] font-bold">{naira(money(payouts?.avgPayout))}</p>
        </Card>
      </div>

      <div className="mt-6">
        <HistoryTable rows={history} />
      </div>

      {/* Payout account comes from GET /me/bank-accounts. */}
      <Card className="mt-6 max-w-md">
        <p className="flex items-center gap-2 text-sm text-ink/55">
          <Icon name="wallet" size={16} className="text-brand" /> Payout account
        </p>
        {defaultBank ? (
          <>
            <p className="mt-2 text-lg font-bold">{defaultBank.bankName ?? "Bank account"}</p>
            <p className="text-sm text-ink/60">
              ****{defaultBank.accountNumber.slice(-4)}
              {defaultBank.accountName ? ` · ${defaultBank.accountName}` : ""}
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm text-ink/60">
            No payout account on file yet. Add one so your commission can be disbursed.
          </p>
        )}
        <Link
          href="/profile?tab=bank"
          className="mt-4 block rounded-xl bg-brand py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          {defaultBank ? "Update bank details" : "Add bank details"}
        </Link>
      </Card>
    </>
  );
}
