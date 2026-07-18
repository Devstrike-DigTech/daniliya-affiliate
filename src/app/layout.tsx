import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import DashboardShell from "@/components/DashboardShell";
import { apiFetchSafe } from "@/lib/api";
import type { AffiliateLinks, Me, Overview } from "@/lib/affiliate";
import "./globals.css";

// Fallback until the real Product Sans files are dropped in public/fonts/.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-fallback",
});

export const metadata: Metadata = {
  title: {
    default: "Affiliate Dashboard",
    template: "%s | Daniliya Affiliate",
  },
  description:
    "Track your earnings, payouts, links and leaderboard rank on the Daniliya affiliate programme.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // All null on the auth/onboarding pages (no session, or no affiliate profile
  // yet) — the shell renders those bare anyway.
  const [me, overview, links] = await Promise.all([
    apiFetchSafe<Me>("/auth/me"),
    apiFetchSafe<Overview>("/affiliate/overview"),
    apiFetchSafe<AffiliateLinks>("/affiliate/links"),
  ]);

  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        <DashboardShell
          user={me}
          code={overview?.code ?? null}
          masterLink={links?.master ?? null}
        >
          {children}
        </DashboardShell>
      </body>
    </html>
  );
}
