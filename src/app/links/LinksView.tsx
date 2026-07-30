"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Icon from "@/components/Icon";
import CopyButton from "@/components/CopyButton";
import { COMMISSION_PER_SALE, naira } from "@/lib/dashboard";
import { money, type AffiliateLinks } from "@/lib/affiliate";

/** `navigator.share` never changes at runtime, so there is nothing to watch. */
const NO_SUBSCRIBE = () => () => {};

export default function LinksView({ master, products }: AffiliateLinks) {
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.title.toLowerCase().includes(q));
  }, [products, query]);

  // Native share sheet where the browser supports it. Read through
  // useSyncExternalStore so the server snapshot is `false` and hydration
  // matches; where it's unavailable the button isn't rendered and Copy is the
  // fallback.
  const canShare = useSyncExternalStore(
    NO_SUBSCRIBE,
    () => typeof navigator.share === "function",
    () => false,
  );

  const share = async (url: string, title: string) => {
    try {
      await navigator.share({ title, url });
    } catch {
      /* user dismissed the sheet — nothing to do */
    }
  };

  return (
    <>
      {/* Master link */}
      <div className="mt-6 rounded-2xl bg-coal p-6 text-white">
        <p className="text-sm font-bold">Master link</p>
        <p className="text-xs text-white/55">
          Use this for general promotion. Lands customers on the shop.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <span className="flex-1 truncate rounded-xl bg-white/5 px-4 py-3 text-sm text-white/80">
            {master}
          </span>
          <div className="flex gap-2">
            <CopyButton
              value={master}
              className="rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white"
            />
            {canShare && (
              <button
                onClick={() => share(master, "Shop Daniliya")}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-white/20"
              >
                <Icon name="share" size={15} /> Share
              </button>
            )}
          </div>
        </div>
        {/* The QR panel was removed: nothing in the stack generates a real QR
            code, and the placeholder icon read as a scannable one. */}
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

      {/* Product links. GET /affiliate/links returns title, price and link
          only — no image and no category — so the thumbnail and the category
          eyebrow that used to sit here are gone. */}
      {list.length === 0 ? (
        <p className="mt-10 text-center text-sm text-ink/50">
          {products.length === 0
            ? "No products are available to promote yet."
            : `No product links match “${query}”.`}
        </p>
      ) : (
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {list.map((p) => (
            <div key={p.link} className="rounded-2xl border border-ink/10 bg-white p-4">
              <p className="truncate text-sm font-bold">{p.title}</p>
              <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm">
                <span className="font-bold">{naira(money(p.price))}</span>
                <span className="rounded-full bg-brand/15 px-2 py-0.5 text-xs font-bold text-brand">
                  You earn {naira(COMMISSION_PER_SALE)}
                </span>
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="min-w-0 flex-1 truncate rounded-lg bg-ink/5 px-3 py-2 text-xs text-ink/55">
                  {p.link}
                </span>
                {canShare && (
                  <button
                    onClick={() => share(p.link, p.title)}
                    aria-label={`Share ${p.title}`}
                    className="shrink-0 rounded-lg border border-ink/15 px-3 py-2 text-xs font-bold transition-colors hover:border-ink/30"
                  >
                    <Icon name="share" size={13} />
                  </button>
                )}
                <CopyButton
                  value={p.link}
                  className="shrink-0 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
