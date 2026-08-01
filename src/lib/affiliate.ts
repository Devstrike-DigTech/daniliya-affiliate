/**
 * Response shapes for the affiliate dashboard endpoints, verified against the
 * running API. Every money field is a STRING on the wire — always run it
 * through `money()` before formatting.
 */

/** GET /auth/me */
export type Me = {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  createdAt: string;
};

/** GET /affiliate/overview */
export type Overview = {
  code: string;
  tier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
  lifetimeEarnings: string;
  pending: string;
  conversions: number;
  isActive: boolean;
};

/** GET /affiliate/links — note: title/price/link only. No slug, id or image. */
export type AffiliateLinks = {
  master: string;
  products: { title: string; price: string; link: string }[];
};

/** The commission lifecycle on a referred order. */
export type CommissionStatus =
  | "PENDING"
  | "CONFIRMED"
  | "DISBURSED"
  | "REVERSED";

/** GET /affiliate/earnings */
export type Earnings = {
  summary: { grossGmv: string; commissionEarned: string; transactions: number };
  records: {
    order: string;
    sale: string;
    commission: string;
    status: CommissionStatus;
    date: string;
  }[];
};

/** GET /affiliate/referrals — first name only, no email/avatar/location. */
export type Referrals = {
  summary: { customers: number; totalOrders: number };
  rows: { name: string; orders: number; spend: string; last: string }[];
};

/** GET /affiliate/leaderboard — `myRank` is null when outside the top list. */
export type Leaderboard = {
  top: { rank: number; name: string; code: string; earned: string; you: boolean }[];
  myRank: number | null;
};

/** GET /me/payouts */
export type Payouts = {
  walletBalance: string;
  /** Below this, confirmed commission rolls over to the next weekly run. */
  minPayout: string;
  /** ISO — the next Monday auto-payout date. */
  nextPayoutDate: string;
  lifetimePaid: string;
  payoutsToDate: number;
  avgPayout: string;
  history: {
    batch: string;
    amount: string;
    status: string;
    scheduledDate: string | null;
  }[];
};

/** GET /me/bank-accounts */
export type BankAccount = {
  id: string;
  accountNumber: string;
  bankCode: string;
  bankName?: string | null;
  accountName?: string | null;
  isDefault: boolean;
};

/** GET /kyc/me */
export type KycMe = { status: string | null; submitted: boolean };

/* ── Formatting ──────────────────────────────────────────── */

/** Money arrives as a string ("20000"). Coerce safely; bad input reads as 0. */
export const money = (v: string | number | null | undefined): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

/** "2026-07-18T14:32:30.676Z" → "18 Jul 2026". Server-rendered, so stable. */
export const shortDate = (iso: string | null | undefined): string => {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString("en-NG", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      });
};

/** "PENDING" → "Pending" for display; the API value stays the source of truth. */
export const titleCase = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
