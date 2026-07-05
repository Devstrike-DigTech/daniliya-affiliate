"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Icon from "@/components/Icon";
import PasswordField from "@/components/PasswordField";
import { Card } from "@/components/widgets";
import { affiliate, kycCard } from "@/lib/dashboard";

const field =
  "w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm outline-none focus:border-brand";
const label = "mb-1.5 block text-sm font-bold";

const TABS = [
  { key: "personal", label: "Personal & KYC" },
  { key: "bank", label: "Bank details" },
  { key: "security", label: "Security" },
  { key: "notification", label: "Notification" },
];

export default function ProfileTabs() {
  const params = useSearchParams();
  const [tab, setTab] = useState(params.get("tab") ?? "personal");

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
          <Card className="mt-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label}>Full Name</label>
                <input className={field} defaultValue={affiliate.fullName} />
              </div>
              <div>
                <label className={label}>Email</label>
                <input className={field} defaultValue={affiliate.email} />
              </div>
              <div>
                <label className={label}>Phone</label>
                <input className={field} defaultValue={affiliate.phone} />
              </div>
              <div>
                <label className={label}>Date of birth</label>
                <input className={field} defaultValue={affiliate.dob} />
              </div>
            </div>
          </Card>

          <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-coal p-6 text-white">
              <p className="flex items-center gap-2 text-sm font-bold text-brand">
                <Icon name="shield-check" size={15} /> KYC status
              </p>
              <p className="mt-2 flex items-center gap-2 text-lg font-bold text-green-400">
                {kycCard.status} <Icon name="check" size={16} />
              </p>
              <p className="mt-1 text-xs text-white/55">
                All identity documents have been approved.
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                {[
                  ["NIN", kycCard.nin],
                  ["BVN", kycCard.bvn],
                  ["Government ID", kycCard.govId],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between rounded-lg bg-white/5 px-3 py-2">
                    <dt className="text-white/55">{k}</dt>
                    <dd className="font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Card>
              <p className="text-sm text-ink/55">Affiliate code</p>
              <p className="mt-1 text-2xl font-bold">{affiliate.code}</p>
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
          <div className="mt-5 space-y-5">
            <div>
              <label className={label}>Bank Name</label>
              <select className={field} defaultValue={affiliate.bank.name}>
                <option>{affiliate.bank.name}</option>
                <option>GTBank</option>
                <option>UBA</option>
                <option>Zenith Bank</option>
              </select>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label}>Account Number</label>
                <input className={field} defaultValue="1234567890" />
              </div>
              <div>
                <label className={label}>Account Name</label>
                <input className={field} defaultValue={affiliate.fullName} />
              </div>
            </div>
            <button className="rounded-xl bg-brand px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Save Details
            </button>
          </div>
        </Card>
      )}

      {tab === "security" && (
        <div className="mt-6 space-y-6">
          <Card>
            <p className="flex items-center gap-2 font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/15 text-brand">
                <Icon name="lock" size={18} />
              </span>
              Password
            </p>
            <p className="mt-1 text-xs text-ink/45">Last changed 2 weeks ago</p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label}>Current Password</label>
                <PasswordField placeholder="enter your current password" />
              </div>
              <div>
                <label className={label}>New Password</label>
                <PasswordField placeholder="create a new strong password" />
              </div>
              <div>
                <label className={label}>Confirm Password</label>
                <PasswordField placeholder="repeat the new password" />
              </div>
            </div>
            <button className="mt-5 rounded-xl bg-brand px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Save Password
            </button>
          </Card>

          {[
            ["Two-factor authentication", "Add an extra layer via SMS or authenticator", "Enable"],
            ["Active sessions", "2 devices currently signed in", "Manage"],
          ].map(([t, d, a]) => (
            <Card key={t} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-bold">{t}</p>
                <p className="text-sm text-ink/50">{d}</p>
              </div>
              <button className="rounded-xl border border-ink/20 px-5 py-2.5 text-sm font-bold transition-colors hover:border-ink">
                {a}
              </button>
            </Card>
          ))}

          <Card>
            <p className="font-bold">Danger Zone</p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-sm">Sign out</p>
              <button className="rounded-xl border border-red-300 px-5 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-50">
                Log out
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between gap-4">
              <p className="text-sm">Leave Daniliya</p>
              <button className="rounded-xl bg-red-100 px-5 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-200">
                Close my account
              </button>
            </div>
          </Card>
        </div>
      )}

      {tab === "notification" && (
        <Card className="mt-6">
          <p className="font-bold">Notification preferences</p>
          <p className="text-sm text-ink/50">Choose how Daniliya keeps you in the loop.</p>
          <div className="mt-5 divide-y divide-ink/10">
            {[
              ["Email me when I make a sale", "When someone buys through your link", true],
              ["WhatsApp alert on payout", "Every Monday when your commission is paid", true],
              ["Weekly performance digest", "A summary of your clicks, sales and earnings", false],
              ["New product launches", "New creatives, scripts and offers", false],
            ].map(([t, d, on]) => (
              <label key={t as string} className="flex cursor-pointer items-center justify-between gap-4 py-4">
                <span>
                  <span className="block text-sm font-bold">{t}</span>
                  <span className="block text-xs text-ink/50">{d}</span>
                </span>
                <span
                  className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-brand" : "bg-ink/15"}`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${on ? "left-[22px]" : "left-0.5"}`}
                  />
                </span>
              </label>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}
