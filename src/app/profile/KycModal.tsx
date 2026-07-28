"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import BankAccountFields, { type Bank } from "@/components/onboarding/BankAccountFields";
import { submitKycFromSettings, type KycFormState } from "./actions";

const label = "mb-1.5 block text-sm font-bold";
const base =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";

const ID_TYPES = [
  { code: "NIN", label: "National ID (NIN)" },
  { code: "BVN", label: "Bank Verification Number (BVN)" },
  { code: "DRIVERS_LICENSE", label: "Driver's licence" },
  { code: "PASSPORT", label: "International passport" },
  { code: "VOTER_ID", label: "Voter's card" },
];

/**
 * Complete verification / add a payout account without leaving Settings.
 * `needsKyc` shows the identity fields; without it the modal just adds a bank
 * account. On success the profile is revalidated and the modal closes.
 */
export default function KycModal({
  bankList,
  needsKyc,
  onClose,
}: {
  bankList: Bank[];
  needsKyc: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<KycFormState, FormData>(
    submitKycFromSettings,
    null,
  );

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
      onClose();
    }
  }, [state, router, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/50" aria-hidden onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={needsKyc ? "Complete verification" : "Add a payout account"}
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-paper p-6 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-bold">
              {needsKyc ? "Complete verification" : "Add a payout account"}
            </p>
            <p className="mt-1 text-sm text-ink/55">
              {needsKyc
                ? "Add your payout account and verify your identity to unlock payouts."
                : "Payouts are sent to this account."}
            </p>
          </div>
          <button onClick={onClose} className="text-ink/40 hover:text-ink" aria-label="Close">
            <Icon name="close" size={20} />
          </button>
        </div>

        <form action={formAction} className="mt-5">
          <p className="font-bold">Payout account</p>
          <div className="mt-3">
            <BankAccountFields banks={bankList} banksError={bankList.length === 0} />
          </div>

          {needsKyc && (
            <>
              <p className="mt-6 font-bold">Identity verification</p>
              <p className="mt-1 text-xs text-ink/50">
                We verify your ID number against the issuing authority instantly.
                It is sent securely for the check and never stored in full.
              </p>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="idType">
                    ID type <span className="text-red-500">*</span>
                  </label>
                  <select id="idType" name="idType" defaultValue="" className={base} required>
                    <option value="" disabled>Select your ID type</option>
                    {ID_TYPES.map((t) => (
                      <option key={t.code} value={t.code}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="idNumber">
                    ID number <span className="text-red-500">*</span>
                  </label>
                  <input id="idNumber" name="idNumber" className={base} placeholder="Enter the number on your ID" autoComplete="off" required />
                </div>
                <div>
                  <label className={label} htmlFor="dob">Date of birth</label>
                  <input id="dob" name="dob" type="date" className={base} max="2010-01-01" />
                </div>
              </div>
            </>
          )}

          {state?.error && (
            <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {state.error}
            </p>
          )}

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button type="button" onClick={onClose} className="rounded-xl border border-ink/15 py-3 text-sm font-bold transition-colors hover:bg-ink/5">
              Cancel
            </button>
            <button type="submit" disabled={pending} className="rounded-xl bg-brand py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60">
              {pending ? "Submitting…" : needsKyc ? "Verify & save" : "Add account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
