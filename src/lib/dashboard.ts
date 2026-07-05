// Dummy data for the affiliate dashboard. Figures mirror the confirmed
// commission model: a FLAT ₦10,000 per confirmed sale (not tiered %).
// Tiers are loyalty ranks (status + perks), not commission rates.
// Swap for real API data later.

import { products } from "@/lib/data";

export const affiliate = {
  firstName: "Jane",
  fullName: "Jane Winslet",
  initials: "JW",
  code: "DEX-GXY7",
  email: "jane@gmail.com",
  phone: "0813 857 3848",
  dob: "08/09/1996",
  tier: "Silver",
  bank: { name: "Access Bank", masked: "**** 7890", accountName: "Jane O." },
};

// The marketing site this portal links back to (Sign out, logo, etc.)
export const LANDING_URL =
  process.env.NEXT_PUBLIC_LANDING_URL || "http://localhost:3000";

const DOMAIN = "https://daniliya.com";
export const masterLink = `${DOMAIN}/products?ref=${affiliate.code}`;
export const productLink = (slug: string) =>
  `${DOMAIN}/products/${slug}?ref=${affiliate.code}`;

// Flat commission: every confirmed sale earns ₦10,000, regardless of product.
export const COMMISSION_PER_SALE = 10000;
export const earnOn = (_price?: number) => COMMISSION_PER_SALE;

export const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

/* ── Sidebar nav ─────────────────────────────────────────── */
export const dashboardNav = [
  { href: "/", label: "Overview", icon: "grid" },
  { href: "/links", label: "My Links", icon: "link" },
  { href: "/earnings", label: "Earnings", icon: "chart" },
  { href: "/payouts", label: "Payouts", icon: "wallet" },
  { href: "/referrals", label: "Referrals", icon: "users" },
  { href: "/leaderboard", label: "Leaderboard", icon: "trophy" },
  { href: "/resources", label: "Resources", icon: "book" },
];

/* ── Overview ────────────────────────────────────────────── */
export const overviewStats = [
  { label: "Total earnings", value: "₦460,000", delta: "+18.2%", up: true, icon: "trending-up" },
  { label: "Pending payout", value: "₦50,000", sub: "Next Monday", icon: "wallet" },
  { label: "Clicks this week", value: "648", delta: "+24%", up: true, icon: "sparkle" },
  { label: "Conversions", value: "7.1%", sub: "46 sales", icon: "grid" },
];

export const weeklySales = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 95 },
  { day: "Wed", value: 150 },
  { day: "Thur", value: 78 },
  { day: "Fri", value: 138 },
  { day: "Sat", value: 200 },
  { day: "Sun", value: 110 },
];

export const tierProgress = {
  current: "Silver",
  next: "Gold",
  pct: 62,
  toUnlock: "₦163,300",
};

export const recentSales = [
  { order: "S-10241", product: "The Builder's Handbook", commission: "₦10,000", status: "Pending" },
  { order: "S-10242", product: "Premium Laundry Starter Kit", commission: "₦10,000", status: "Pending" },
  { order: "S-10243", product: "Affiliate Success Course", commission: "₦10,000", status: "Paid" },
  { order: "S-10244", product: "Fumigation Service Voucher", commission: "₦10,000", status: "Paid" },
  { order: "S-10245", product: "Executive Hygiene Bundle", commission: "₦10,000", status: "Paid" },
] as const;

/* ── My Links ────────────────────────────────────────────── */
export const linkProducts = products.map((p) => ({
  slug: p.slug,
  title: p.title,
  category: p.category,
  price: p.price,
  image: p.image,
  earn: COMMISSION_PER_SALE,
  link: productLink(p.slug),
}));

/* ── Earnings ────────────────────────────────────────────── */
export const earningsSummary = [
  { label: "Gross GMV", value: "₦435,000" },
  { label: "Commission Earned", value: "₦290,000" },
  { label: "Total Transactions", value: "29" },
];

const customers = ["Ada O.", "Bola K.", "Ifeanyi U.", "Ngozi M.", "Tunde A.", "Hauwa S."];
export const earningsRows = Array.from({ length: 9 }, (_, i) => ({
  order: `S-1024${i + 1}`,
  date: "2026-06-12",
  customer: customers[i % customers.length],
  product: "The Builder's Handbook",
  sale: "₦15,000",
  commission: "₦10,000",
  status: i % 3 === 0 ? "Pending" : "Paid",
}));

/* ── Payouts ─────────────────────────────────────────────── */
export const payoutStats = [
  { label: "Lifetime paid", value: "₦120,000" },
  { label: "Payouts to date", value: "4" },
  { label: "Avg. payout", value: "₦30,000" },
];

export const payoutRows = Array.from({ length: 4 }, (_, i) => ({
  reference: `DAN-PO-220${8 - i}`,
  date: "2026-06-12",
  method: "GTBank ****4421",
  amount: "₦30,000",
  status: "Paid",
}));

/* ── Referrals ───────────────────────────────────────────── */
export const referralStats = [
  { label: "Total customers", value: "20", icon: "users" },
  { label: "New this Month", value: "4", icon: "user" },
  { label: "Repeat buyers", value: "10", icon: "share" },
];

export const referralRows = [
  { name: "Bola K.", code: "DAN-462", orders: 1, spend: "₦15,000", commission: "₦10,000", last: "2026-06-09" },
  { name: "Tunde A.", code: "DAN-462", orders: 1, spend: "₦15,000", commission: "₦10,000", last: "2026-06-09" },
  { name: "Ada O.", code: "DAN-462", orders: 3, spend: "₦45,000", commission: "₦30,000", last: "2026-06-09" },
  { name: "Ifeanyi U.", code: "DAN-462", orders: 1, spend: "₦15,000", commission: "₦10,000", last: "2026-06-09" },
  { name: "Ngozi M.", code: "DAN-462", orders: 2, spend: "₦30,000", commission: "₦20,000", last: "2026-06-09" },
  { name: "Hauwa S.", code: "DAN-462", orders: 1, spend: "₦15,000", commission: "₦10,000", last: "2026-06-09" },
  { name: "Emeka K.", code: "DAN-462", orders: 1, spend: "₦15,000", commission: "₦10,000", last: "2026-06-09" },
];

/* ── Leaderboard ─────────────────────────────────────────── */
export const podium = [
  { rank: 2, name: "Ibrahim S.", earned: "₦920,000", avatar: 2 },
  { rank: 1, name: "Tunde A.", earned: "₦1,450,000", avatar: 1 },
  { rank: 3, name: "David A.", earned: "₦610,000", avatar: 3 },
];

export const leaderboardRows = Array.from({ length: 6 }, (_, i) => ({
  rank: i + 1,
  name: "Bola K.",
  code: "ADAE-7K2P",
  tier: "Platinum",
  sales: 142,
  earned: "₦1,420,000",
  you: i === 3,
}));

// Loyalty ranks earned by lifetime earnings — commission stays flat ₦10,000.
// Higher tiers unlock perks, not a higher rate.
export const tierLadder = [
  { perk: "Standard payouts", label: "Bronze", req: "Requires ₦0 lifetime earnings", color: "bg-[#7C4A03] text-white" },
  { perk: "Priority support", label: "Silver", req: "Requires ₦50,000 lifetime earnings", color: "bg-ink/10 text-ink" },
  { perk: "Featured placement", label: "Gold", req: "Requires ₦250,000 lifetime earnings", color: "bg-brand text-ink" },
  { perk: "Dedicated manager", label: "Platinum", req: "Requires ₦1,000,000 lifetime earnings", color: "bg-[#6d3fa0] text-white" },
];

/* ── Resources ───────────────────────────────────────────── */
export const brandCreatives = [
  { title: "WhatsApp status banner", meta: "PNG · 1080×1920" },
  { title: "Instagram product carousel", meta: "PNG · 1080×1080 (5 slides)" },
  { title: "Twitter / X promo card", meta: "PNG · 1600×900" },
  { title: "Brand guidelines (1-pager)", meta: "PDF · 480KB" },
];

export const scripts = [
  {
    title: "WhatsApp broadcast — Business Book",
    body: "Just finished reading The Builder's Handbook and it's a game-changer for anyone serious about building income streams in Nigeria 📈. If you want my link to grab it (cheaper than Amazon), reply BOOK and I'll send it 👇",
  },
  {
    title: "Instagram caption — Laundry Kit",
    body: "The premium laundry starter kit is how I started a dry-cleaning side hustle today. Detergents, garment bags, hangers — everything looks executive from day one. Tap the link in my bio to get yours 🧺 #DaniliyaCommunity",
  },
  {
    title: "Voice-note pitch (60 sec)",
    body: "Hey, real quick — I'm now an official Daniliya affiliate. They handle premium cleaning, dry cleaning, plus a marketplace of products and courses. I get rewarded whenever you order through my link, and you get the exact same price.",
  },
];

export const trainingVideos = [
  { title: "How to share links that convert", length: "6:42" },
  { title: "Posting your first WhatsApp broadcast", length: "6:42" },
  { title: "Building a 100-buyer audience", length: "6:42" },
];

/* ── Profile ─────────────────────────────────────────────── */
export const kycCard = {
  status: "Verified",
  nin: "**** 8343",
  bvn: "**** 3928",
  govId: "NINSLP.png",
};
