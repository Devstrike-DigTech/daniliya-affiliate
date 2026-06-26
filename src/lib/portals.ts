// Sibling portal apps the affiliate onboarding can redirect to.
export const portals = {
  influencer: process.env.NEXT_PUBLIC_INFLUENCER_URL || "http://localhost:3002",
  vendor: process.env.NEXT_PUBLIC_VENDOR_URL || "http://localhost:3003",
} as const;
