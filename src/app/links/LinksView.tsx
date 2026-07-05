"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import CopyButton from "@/components/CopyButton";
import { linkProducts, masterLink, naira } from "@/lib/dashboard";

export default function LinksView() {
  const [showQr, setShowQr] = useState(false);
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return linkProducts;
    return linkProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
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
            <button
              onClick={() => setShowQr((v) => !v)}
              aria-label="Show QR code"
              aria-pressed={showQr}
              className={`inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                showQr ? "bg-brand text-white" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Icon name="qr" size={16} />
            </button>
          </div>
        </div>

        {showQr && (
          <div className="mt-4 flex items-center gap-4 rounded-xl bg-white/5 p-4">
            <span className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-white text-ink">
              <Icon name="qr" size={72} />
            </span>
            <div>
              <p className="text-sm font-bold">Scan to open your master link</p>
              <p className="mt-1 text-xs text-white/60">
                Add it to flyers, business cards or your WhatsApp status. Point a
                phone camera to open the shop with your referral applied.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <label className="mt-6 flex items-center gap-2.5 rounded-xl border border-ink/15 bg-white px-4 py-3">
        <Icon name="search" size={16} className="text-ink/40" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your product links..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-ink/35"
        />
      </label>

      {/* Product links */}
      {list.length === 0 ? (
        <p className="mt-10 text-center text-sm text-ink/50">
          No product links match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {list.map((p) => (
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
      )}
    </>
  );
}
