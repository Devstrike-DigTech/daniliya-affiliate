"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Icon from "@/components/Icon";
import PasswordField from "@/components/PasswordField";
import { Card } from "@/components/widgets";
import { shortDate, titleCase, type BankAccount, type KycMe, type Me } from "@/lib/affiliate";
import { changePassword, type PasswordState } from "./actions";

const label = "mb-1.5 block text-sm font-bold";
const readonly =
  "w-full rounded-xl border border-ink/10 bg-paper px-4 py-3 text-sm text-ink/80";

// The Notification tab was removed — no notification-settings endpoint exists,
// so every toggle on it was decorative.
const TABS = [
  { key: "personal", label: "Personal & KYC" },
  { key: "bank", label: "Bank details" },
  { key: "security", label: "Security" },
];

export default function ProfileTabs({
  me,
  code,
  banks,
  kyc,
}: {
  me: Me | null;
  code: string | null;
  banks: BankAccount[];
  kyc: KycMe | null;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState(params.get("tab") ?? "personal");
  const [state, formAction, pending] = useActionState<PasswordState, FormData>(
    changePassword,
    null,
  );
  const [signingOut, setSigningOut] = useState(false);

  const signOut = async () => {
    setSigningOut(true);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    router.replace("/login");
    router.refresh();
  };

  const kycStatus = kyc?.status ? titleCase(kyc.status) : "Not submitted";

  return (
    <>
      {/* Tab bar */}
      <div className="mt-6 flex gap-1 overflow-x-auto rounded-2xl bg-ink/5 p-1.5">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`shrink-0 rounded-xl px-5 py-2.5 text-sm font-bold transition-colors ${
              tab === t.key ? "bg-white text-ink shadow-sm" : "text-ink/55"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "personal" && (
        <>
          {/* Read-only: the API has no endpoint for updating profile details,
              so editable inputs would have nowhere to save to. Date of birth
              is not part of GET /auth/me and has been dropped. */}
          <Card className="mt-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label}>Full Name</label>
                <p className={readonly}>
                  {me ? `${me.firstName} ${me.lastName}`.trim() : "—"}
                </p>
              </div>
              <div>
                <label className={label}>Email</label>
                <p className={readonly}>{me?.email ?? "—"}</p>
              </div>
              <div>
                <label className={label}>Phone</label>
                <p className={readonly}>{me?.phone ?? "—"}</p>
              </div>
              <div>
                <label className={label}>Member since</label>
                <p className={readonly}>{shortDate(me?.createdAt)}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-ink/45">
              Contact support to change your name, email or phone number.
            </p>
          </Card>

          <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
            {/* KYC from GET /kyc/me — it returns a status and a submitted flag
                only, so the NIN / BVN / document rows are gone. */}
            <div className="rounded-2xl bg-coal p-6 text-white">
              <p className="flex items-center gap-2 text-sm font-bold text-brand">
                <Icon name="shield-check" size={15} /> KYC status
              </p>
              <p className="mt-2 text-lg font-bold">{kycStatus}</p>
              <p className="mt-1 text-xs text-white/55">
                {kyc?.submitted
                  ? "Your documents are with our team."
                  : "You haven't submitted identity documents yet."}
              </p>
              {!kyc?.submitted && (
                <Link
                  href="/join/kyc"
                  className="mt-4 inline-block rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white"
                >
                  Start verification
                </Link>
              )}
            </div>
            <Card>
              <p className="text-sm text-ink/55">Affiliate code</p>
              <p className="mt-1 text-2xl font-bold">{code ?? "—"}</p>
              <p className="mt-2 text-xs text-ink/55">
                Your code is permanent and tied to all your historical referrals.
              </p>
            </Card>
          </div>
        </>
      )}

      {tab === "bank" && (
        <Card className="mt-6">
          <p className="flex items-center gap-2 font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/15 text-brand">
              <Icon name="bank" size={18} />
            </span>
            Bank &amp; payout details
          </p>

          {/* Lists the accounts on GET /me/bank-accounts. Adding one runs
              through the verification flow, which resolves the account name
              server-side. */}
          {banks.length > 0 ? (
            <ul className="mt-5 space-y-3">
              {banks.map((b) => (
                <li
                  key={b.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink/10 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-bold">
                      {b.bankName ?? "Bank account"}
                      {b.isDefault && (
                        <span className="ml-2 rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-bold text-brand">
                          Default
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-ink/60">
                      ****{b.accountNumber.slice(-4)}
                      {b.accountName ? ` · ${b.accountName}` : ""}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm text-ink/60">
              You haven&apos;t added a payout account yet. Commission can only
              be disbursed once one is on file.
            </p>
          )}

          <Link
            href="/join/kyc"
            className="mt-5 inline-block rounded-xl bg-brand px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            {banks.length > 0 ? "Add another account" : "Add bank account"}
          </Link>
        </Card>
      )}

      {tab === "security" && (
        <div className="mt-6 space-y-6">
          {/* Wired to POST /auth/change-password. */}
          <Card>
            <p className="flex items-center gap-2 font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/15 text-brand">
                <Icon name="lock" size={18} />
              </span>
              Password
            </p>
            <form action={formAction}>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={label}>Current Password</label>
                  <PasswordField
                    name="currentPassword"
                    placeholder="enter your current password"
                  />
                </div>
                <div>
                  <label className={label}>New Password</label>
                  <PasswordField
                    name="newPassword"
                    placeholder="create a new strong password"
                  />
                </div>
                <div>
                  <label className={label}>Confirm Password</label>
                  <PasswordField
                    name="confirmPassword"
                    placeholder="repeat the new password"
                  />
                </div>
              </div>
              {state && (
                <p
                  className={`mt-4 text-sm font-bold ${
                    state.ok ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {state.message}
                </p>
              )}
              <button
                type="submit"
                disabled={pending}
                className="mt-5 rounded-xl bg-brand px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {pending ? "Saving…" : "Save Password"}
              </button>
            </form>
          </Card>

          {/* Two-factor auth, active-session management and account closure
              have no endpoints and have been removed. */}
          <Card>
            <p className="font-bold">Sign out</p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-sm text-ink/60">End your session on this device.</p>
              <button
                onClick={signOut}
                disabled={signingOut}
                className="rounded-xl border border-red-300 px-5 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-50 disabled:opacity-60"
              >
                {signingOut ? "Signing out…" : "Log out"}
              </button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
