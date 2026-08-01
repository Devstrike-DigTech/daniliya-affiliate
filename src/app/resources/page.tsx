import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { PageHead } from "@/components/widgets";
import { apiFetchSafe } from "@/lib/api";
import type { ResourcesLanding } from "@/lib/affiliate";
import ResourceSections from "./ResourceSections";

export const metadata: Metadata = { title: "Resources" };

export default async function ResourcesPage() {
  const data = await apiFetchSafe<ResourcesLanding>("/affiliate/resources");
  const global = data?.global ?? [];
  const products = data?.products ?? [];
  const empty = global.length === 0 && products.length === 0;

  return (
    <>
      <PageHead
        title="Marketing resources"
        subtitle="Creatives, scripts and training to help you sell with confidence."
      />

      {empty ? (
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-ink/10 bg-white px-6 py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/15 text-brand">
            <Icon name="book" size={26} />
          </span>
          <p className="mt-5 text-lg font-bold">The resource library is coming soon</p>
          <p className="mt-2 max-w-md text-sm text-ink/55">
            Daniliya&apos;s marketing team is putting together branded creatives,
            ready-to-send scripts and training walkthroughs. They&apos;ll appear here
            as soon as they&apos;re published.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/links" className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90">
              <Icon name="link" size={16} /> Get your referral links
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-12">
          {/* Global resources apply to every product. */}
          {global.length > 0 && <ResourceSections resources={global} />}

          {products.length > 0 && (
            <section>
              <div className="mb-4 flex items-center gap-2.5">
                <span className="h-3 w-3 rounded-full bg-brand" />
                <h2 className="text-lg font-bold">Product kits</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((p) => (
                  <Link
                    key={p.id}
                    href={`/resources/${p.id}`}
                    className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-4 transition-colors hover:border-brand/40"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-ink/5">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                      ) : (
                        <Icon name="package" size={22} className="text-ink/30" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold">{p.title}</p>
                      <p className="text-xs text-ink/50">
                        {p.count} material{p.count === 1 ? "" : "s"}
                      </p>
                    </div>
                    <Icon name="arrow-right" size={18} className="text-ink/30 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
}
