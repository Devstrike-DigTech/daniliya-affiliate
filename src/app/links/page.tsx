import type { Metadata } from "next";
import { PageHead } from "@/components/widgets";
import LinksView from "./LinksView";

export const metadata: Metadata = { title: "My Links" };

export default function LinksPage() {
  return (
    <>
      <PageHead
        title="My referral links"
        subtitle="Share these unique links — every sale credited to you earns commission."
      />
      <LinksView />
    </>
  );
}
