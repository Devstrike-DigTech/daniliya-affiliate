import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Card, PageHead } from "@/components/widgets";

export const metadata: Metadata = { title: "Resources" };

/**
 * There is no resources endpoint. The brand creatives, ready-to-send scripts
 * and training videos this page used to show were local dummy arrays with no
 * files behind them — the Download and Play buttons could never have worked.
 * Rather than leave assets that read as real, the page states plainly that the
 * library isn't published yet and points at the tools that do exist.
 */
export default function ResourcesPage() {
  return (
    <>
      <PageHead
        title="Marketing resources"
        subtitle="Creatives, scripts and training to help you sell with confidence."
      />

      <Card className="mt-6 flex flex-col items-center px-6 py-14 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/15 text-brand">
          <Icon name="book" size={26} />
        </span>
        <p className="mt-5 text-lg font-bold">The resource library is coming soon</p>
        <p className="mt-2 max-w-md text-sm text-ink/55">
          Daniliya&apos;s marketing team is putting together branded creatives,
          ready-to-send scripts and training walkthroughs. They&apos;ll appear
          here as soon as they&apos;re published — nothing is available to
          download yet.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/links"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            <Icon name="link" size={16} /> Get your referral links
          </Link>
          <Link
            href="/join/tutorial"
            className="inline-flex items-center gap-2 rounded-xl border border-ink/15 px-5 py-3 text-sm font-bold transition-colors hover:border-ink/30"
          >
            <Icon name="book" size={16} /> Revisit the training lessons
          </Link>
        </div>
      </Card>
    </>
  );
}
