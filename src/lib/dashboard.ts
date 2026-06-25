// Dummy data for the affiliate dashboard. Figures mirror the Figma design
// (tiered-percentage commission model). Swap for real API data later.

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
  tierRate: 12, // % commission per sale at current tier
  bank: { name: "Access Bank", masked: "**** 7890", accountName: "Jane O." },
};

// The marketing site this portal links back to (Sign out, logo, etc.)
export const LANDING_URL =
  process.env.NEXT_PUBLIC_LANDING_URL || "http://localhost:3000";

const DOMAIN = "https://daniliya.com";
export const masterLink = `${DOMAIN}/products?ref=${affiliate.code}`;
export const productLink = (slug: string) =>
  `${DOMAIN}/products/${slug}?ref=${affiliate.code}`;

// dashboard uses a percentage commission per the design
export const DASH_RATE = 0.15;
export const earnOn = (price: number) => Math.round((price * DASH_RATE) / 50) * 50;

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
  { label: "Total earnings", value: "₦86,700", delta: "+18.2%", up: true, icon: "trending-up" },
  { label: "Pending payout", value: "₦6,525", sub: "Next Monday", icon: "wallet" },
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
  rate: "12%",
  current: "Silver",
  next: "Gold",
  pct: 62,
  toUnlock: "₦163,300",
};

export const recentSales = [
  { order: "S-10241", product: "The Builder's Handbook", commission: "₦2,250", status: "Pending" },
  { order: "S-10242", product: "Premium Laundry Starter Kit", commission: "₦2,250", status: "Pending" },
  { order: "S-10243", product: "Affiliate Success Course", commission: "₦2,250", status: "Paid" },
  { order: "S-10244", product: "Fumigation Service Voucher", commission: "₦2,250", status: "Paid" },
  { order: "S-10245", product: "Executive Hygiene Bundle", commission: "₦2,250", status: "Paid" },
] as const;

/* ── My Links ────────────────────────────────────────────── */
export const linkProducts = products.map((p) => ({
  slug: p.slug,
  title: p.title,
  category: p.category,
  price: p.price,
  image: p.image,
  earn: earnOn(p.price),
  link: productLink(p.slug),
}));

/* ── Earnings ────────────────────────────────────────────── */
export const earningsSummary = [
  { label: "Gross GMV", value: "₦186,000" },
  { label: "Commission Earned", value: "₦23,000" },
  { label: "Total Transactions", value: "29" },
];

const customers = ["Ada O.", "Bola K.", "Ifeanyi U.", "Ngozi M.", "Tunde A.", "Hauwa S."];
export const earningsRows = Array.from({ length: 9 }, (_, i) => ({
  order: `S-1024${i + 1}`,
  date: "2026-06-12",
  customer: customers[i % customers.length],
  product: "The Builder's Handbook",
  sale: "₦15,000",
  commission: "₦2,250",
  status: i % 3 === 0 ? "Pending" : "Paid",
}));

/* ── Payouts ─────────────────────────────────────────────── */
export const payoutStats = [
  { label: "Lifetime paid", value: "₦62,925" },
  { label: "Payouts to date", value: "4" },
  { label: "Avg. payout", value: "₦15,731" },
];

export const payoutRows = Array.from({ length: 4 }, (_, i) => ({
  reference: `DAN-PO-220${8 - i}`,
  date: "2026-06-12",
  method: "GTBank ****4421",
  amount: "₦14,250",
  status: "Paid",
}));

/* ── Referrals ───────────────────────────────────────────── */
export const referralStats = [
  { label: "Total customers", value: "20", icon: "users" },
  { label: "New this Month", value: "4", icon: "user" },
  { label: "Repeat buyers", value: "10", icon: "share" },
];

export const referralRows = [
  { name: "Bola K.", code: "DAN-462", orders: 1, spend: "₦35,000", commission: "₦14,250", last: "2026-06-09" },
  { name: "Tunde A.", code: "DAN-462", orders: 1, spend: "₦35,000", commission: "₦14,250", last: "2026-06-09" },
  { name: "Ada O.", code: "DAN-462", orders: 3, spend: "₦35,000", commission: "₦14,250", last: "2026-06-09" },
  { name: "Ifeanyi U.", code: "DAN-462", orders: 1, spend: "₦35,000", commission: "₦14,250", last: "2026-06-09" },
  { name: "Ngozi M.", code: "DAN-462", orders: 2, spend: "₦35,000", commission: "₦14,250", last: "2026-06-09" },
  { name: "Hauwa S.", code: "DAN-462", orders: 1, spend: "₦35,000", commission: "₦14,250", last: "2026-06-09" },
  { name: "Emeka K.", code: "DAN-462", orders: 1, spend: "₦35,000", commission: "₦14,250", last: "2026-06-09" },
];

/* ── Leaderboard ─────────────────────────────────────────── */
export const podium = [
  { rank: 2, name: "Ibrahim S.", earned: "₦192,000", avatar: 2 },
  { rank: 1, name: "Tunde A.", earned: "₦487,500", avatar: 1 },
  { rank: 3, name: "David A.", earned: "₦132,400", avatar: 3 },
];

export const leaderboardRows = Array.from({ length: 6 }, (_, i) => ({
  rank: i + 1,
  name: "Bola K.",
  code: "ADAE-7K2P",
  tier: "Platinum",
  sales: 142,
  earned: "₦487,500",
  you: i === 3,
}));

export const tierLadder = [
  { rate: "10%", label: "Bronze", req: "Requires ₦0 lifetime earnings", color: "bg-[#7C4A03] text-white" },
  { rate: "12%", label: "Silver", req: "Requires ₦50,000 lifetime earnings", color: "bg-ink/10 text-ink" },
  { rate: "15%", label: "Gold", req: "Requires ₦250,000 lifetime earnings", color: "bg-brand text-ink" },
  { rate: "20%", label: "Platinum", req: "Requires ₦1,000,000 lifetime earnings", color: "bg-navy text-white" },
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
