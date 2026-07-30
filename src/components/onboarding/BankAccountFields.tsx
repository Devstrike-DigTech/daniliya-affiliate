"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";

export type Bank = { name: string; code: string };

const label = "mb-1.5 block text-sm font-bold";
const base =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";
const digits = (s: string) => s.replace(/\D/g, "");

/**
 * Bank + account-number fields for KYC. The bank list is searchable (Nigeria
 * has ~200 banks/MFBs), and once a bank and a 10-digit number are present the
 * account name is resolved live via /api/bank/resolve so the applicant confirms
 * whose account it is before submitting. The selected bank code and account
 * number travel to the server action through named fields, unchanged.
 */
export default function BankAccountFields({
  banks,
  banksError,
}: {
  banks: Bank[];
  banksError: boolean;
}) {
  const [query, setQuery] = useState("");
  const [bank, setBank] = useState<Bank | null>(null);
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState("");
  const [name, setName] = useState<string | null>(null);
  const [resolving, setResolving] = useState(false);
  const [err, setErr] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  const filtered = banks
    .filter((b) => b.name.toLowerCase().includes(query.trim().toLowerCase()))
    .slice(0, 60);

  // Close the dropdown on an outside click.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Resolve the account name once we have a bank and a full 10-digit number.
  useEffect(() => {
    setName(null);
    setErr("");
    if (!bank || account.length !== 10) return;

    let active = true;
    setResolving(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch("/api/bank/resolve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bankCode: bank.code, accountNumber: account }),
        });
        const data = await res.json().catch(() => null);
        if (!active) return;
        if (!res.ok) setErr(data?.error ?? "Could not verify that account.");
        else setName(data.accountName);
      } catch {
        if (active) setErr("Could not verify that account.");
      } finally {
        if (active) setResolving(false);
      }
    }, 500);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [bank, account]);

  return (
    <div>
      {/* Named fields the server action reads. */}
      <input type="hidden" name="bankCode" value={bank?.code ?? ""} />

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Searchable bank picker */}
        <div className="relative" ref={boxRef}>
          <label className={label}>
            Bank <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            disabled={banksError}
            onClick={() => setOpen((o) => !o)}
            className={`${base} flex items-center justify-between text-left ${bank ? "" : "text-ink/40"} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {bank ? bank.name : banksError ? "Bank list unavailable" : "Select your bank"}
            <Icon name="chevron-down" size={16} className="shrink-0 text-ink/45" />
          </button>

          {open && !banksError && (
            <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-ink/12 bg-white shadow-xl">
              <div className="border-b border-ink/8 p-2">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search banks…"
                  className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-brand"
                />
              </div>
              <ul className="max-h-56 overflow-y-auto py-1">
                {filtered.map((b) => (
                  <li key={b.code}>
                    <button
                      type="button"
                      onClick={() => {
                        setBank(b);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-brand/10 ${bank?.code === b.code ? "font-bold text-brand" : "text-ink/80"}`}
                    >
                      {b.name}
                      {bank?.code === b.code && <Icon name="check" size={14} />}
                    </button>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="px-3 py-3 text-center text-sm text-ink/45">No banks match “{query}”.</li>
                )}
              </ul>
            </div>
          )}
          {banksError && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              We couldn&apos;t load the bank list from the server.
            </p>
          )}
        </div>

        {/* Account number */}
        <div>
          <label className={label} htmlFor="accountNumber">
            Account Number <span className="text-red-500">*</span>
          </label>
          <input
            id="accountNumber"
            name="accountNumber"
            value={account}
            onChange={(e) => setAccount(digits(e.target.value).slice(0, 10))}
            inputMode="numeric"
            placeholder="10-digit bank account number"
            className={base}
          />
        </div>
      </div>

      {/* Live name-enquiry result */}
      <div className="mt-2 min-h-[1.25rem] text-xs">
        {resolving && (
          <span className="flex items-center gap-1.5 text-ink/55">
            <Icon name="clock" size={13} /> Verifying account…
          </span>
        )}
        {!resolving && name && (
          <span className="flex items-center gap-1.5 font-bold text-green-600">
            <Icon name="check" size={13} /> {name}
          </span>
        )}
        {!resolving && err && <span className="font-medium text-red-500">{err}</span>}
        {!resolving && !name && !err && (
          <span className="text-ink/45">
            Pick your bank and enter the account number — we&apos;ll confirm the name.
          </span>
        )}
      </div>
    </div>
  );
}
