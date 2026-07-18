import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Card, PageHead, StatusBadge } from "@/components/widgets";
import { apiFetchSafe } from "@/lib/api";
import { naira } from "@/lib/dashboard";
import {
  money,
  shortDate,
  type BankAccount,
  type Overview,
  type Payouts,
} from "@/lib/affiliate";

export const metadata: Metadata = { title: "Payouts" };

export default async function PayoutsPage() {
  const [payouts, overview, banks] = await Promise.all([
    apiFetchSafe<Payouts>("/me/payouts"),
    apiFetchSafe<Overview>("/affiliate/overview"),
    apiFetchSafe<BankAccount[]>("/me/bank-accounts"),
  ]);

  const history = payouts?.history ?? [];
  const paid = history
    .filter((h) => h.status.toUpperCase() === "PAID")
    .reduce((sum, h) => sum + money(h.amount), 0);
  const defaultBank = banks?.find((b) => b.isDefault) ?? banks?.[0] ?? null;

  return (
    <>
      <PageHead
        title="Payouts"
        subtitle="Confirmed commissions are disbursed by Daniliya in scheduled payout batches."
      />

      {/* The countdown-to-Monday hero was removed: no endpoint publishes a
          payout schedule, minimum payout or next-run date, so every number on
          it was invented. Wallet balance and pending commission are real. */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-coal p-6 text-white">
          <p className="flex items-center gap-2 text-sm font-bold text-brand">
            <Icon name="wallet" size={16} /> Wallet balance
          </p>
          <p className="mt-2 text-3xl font-bold">{naira(money(payouts?.walletBalance))}</p>
          <p className="mt-1 text-xs text-white/55">Available to be disbursed to you.</p>
        </div>
        <Card>
          <p className="text-sm text-ink/55">Pending commission</p>
          <p className="mt-2 text-[26px] font-bold">{naira(money(overview?.pending))}</p>
          <p className="mt-1 text-xs text-ink/50">
            Commission on referred orders that has not been disbursed yet.
          </p>
        </Card>
      </div>

      {/* Lifetime paid and payout count are computed from the history rows
          themselves — there is no summary block on the endpoint. */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-sm text-ink/55">Lifetime paid</p>
          <p className="mt-2 text-[26px] font-bold">{naira(paid)}</p>
        </Card>
        <Card>
          <p className="text-sm text-ink/55">Payouts to date</p>
          <p className="mt-2 text-[26px] font-bold">{history.length}</p>
        </Card>
      </div>

      <Card className="mt-6 overflow-x-auto">
        <p className="font-bold">Payout history</p>
        <table className="mt-4 w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs text-ink/50">
              <th className="pb-3 font-medium">Batch</th>
              <th className="pb-3 font-medium">Scheduled</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h) => (
              <tr key={h.batch} className="border-b border-ink/5 last:border-0">
                <td className="py-3.5 text-ink/60">{h.batch}</td>
                <td className="py-3.5 text-ink/60">{shortDate(h.scheduledDate)}</td>
                <td className="py-3.5 font-bold">{naira(money(h.amount))}</td>
                <td className="py-3.5 text-right">
                  <StatusBadge status={h.status} />
                </td>
              </tr>
            ))}
            {history.length === 0 && (
              <tr>
                <td colSpan={4} className="py-10 text-center text-sm text-ink/45">
                  You haven&apos;t been included in a payout batch yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* Payout account comes from GET /me/bank-accounts. */}
      <Card className="mt-6 max-w-md">
        <p className="flex items-center gap-2 text-sm text-ink/55">
          <Icon name="wallet" size={16} className="text-brand" /> Payout account
        </p>
        {defaultBank ? (
          <>
            <p className="mt-2 text-lg font-bold">
              {defaultBank.bankName ?? "Bank account"}
            </p>
            <p className="text-sm text-ink/60">
              ****{defaultBank.accountNumber.slice(-4)}
              {defaultBank.accountName ? ` · ${defaultBank.accountName}` : ""}
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm text-ink/60">
            No payout account on file yet. Add one so your commission can be
            disbursed.
          </p>
        )}
        <Link
          href="/profile?tab=bank"
          className="mt-4 block rounded-xl bg-brand py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          {defaultBank ? "Manage bank details" : "Add bank details"}
        </Link>
      </Card>
    </>
  );
}
