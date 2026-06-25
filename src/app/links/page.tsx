import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import CopyButton from "@/components/CopyButton";
import { PageHead } from "@/components/widgets";
import { linkProducts, masterLink, naira } from "@/lib/dashboard";

export const metadata: Metadata = { title: "My Links" };

export default function LinksPage() {
  return (
    <>
      <PageHead
        title="My referral links"
        subtitle="Share these unique links — every sale credited to you earns commission."
      />

      {/* Master link */}
      <div className="mt-6 rounded-2xl bg-coal p-6 text-white">
        <p className="text-sm font-bold">Master link</p>
        <p className="text-xs text-white/55">Use this for general promotion. Lands customers on the shop.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <span className="flex-1 truncate rounded-xl bg-white/5 px-4 py-3 text-sm text-white/80">
            {masterLink}
          </span>
          <div className="flex gap-2">
            <CopyButton value={masterLink} className="rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white" />
            <button className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-white/20">
              <Icon name="share" size={15} /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Product links */}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {linkProducts.map((p) => (
          <div key={p.slug} className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-4">
            <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
              <Image src={p.image} alt={p.title} fill sizes="80px" className="object-cover" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wide text-ink/40">{p.category}</p>
              <p className="truncate text-sm font-bold">{p.title}</p>
              <p className="mt-0.5 flex items-center gap-2 text-sm">
                <span className="font-bold">{naira(p.price)}</span>
                <span className="rounded-full bg-brand/15 px-2 py-0.5 text-xs font-bold text-brand">
                  You earn {naira(p.earn)}
                </span>
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="min-w-0 flex-1 truncate rounded-lg bg-ink/5 px-3 py-2 text-xs text-ink/55">
                  {p.link}
                </span>
                <CopyButton value={p.link} className="shrink-0 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
