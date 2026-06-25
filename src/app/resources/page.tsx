import type { Metadata } from "next";
import Icon from "@/components/Icon";
import CopyButton from "@/components/CopyButton";
import { Card, PageHead } from "@/components/widgets";
import { brandCreatives, scripts, trainingVideos } from "@/lib/dashboard";

export const metadata: Metadata = { title: "Resources" };

function GroupTag({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-sm font-bold">
      <span aria-hidden className="h-2 w-2 rounded-full bg-brand" />
      {children}
    </p>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <PageHead
        title="Marketing resources"
        subtitle="Branded creatives, scripts and training videos to help you sell with confidence."
      />

      {/* Brand creatives */}
      <div className="mt-8">
        <GroupTag>Brand Creatives</GroupTag>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brandCreatives.map((c) => (
            <Card key={c.title} className="p-4">
              <div className="flex aspect-video items-center justify-center rounded-xl bg-ink/5 text-ink/30">
                <Icon name="grid" size={28} />
              </div>
              <p className="mt-3 text-sm font-bold">{c.title}</p>
              <p className="text-xs text-ink/45">{c.meta}</p>
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-coal py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90">
                <Icon name="download" size={14} /> Download
              </button>
            </Card>
          ))}
        </div>
      </div>

      {/* Scripts */}
      <div className="mt-8">
        <GroupTag>Ready-to-send scripts</GroupTag>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {scripts.map((s) => (
            <Card key={s.title} className="flex flex-col">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/15 px-3 py-1 text-xs font-bold text-brand">
                <Icon name="copy" size={12} /> Script
              </span>
              <p className="mt-3 text-sm font-bold">{s.title}</p>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-ink/55">{s.body}</p>
              <CopyButton
                value={s.body}
                className="mt-4 justify-center rounded-xl bg-brand py-2.5 text-xs font-bold text-white"
              />
            </Card>
          ))}
        </div>
      </div>

      {/* Training videos */}
      <div className="mt-8">
        <GroupTag>Training videos</GroupTag>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {trainingVideos.map((v) => (
            <Card key={v.title} className="p-4">
              <div className="relative flex aspect-video items-center justify-center rounded-xl bg-ink/80">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-ink">
                  <Icon name="play" size={20} />
                </span>
                <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {v.length}
                </span>
              </div>
              <p className="mt-3 text-sm font-bold">{v.title}</p>
              <div className="mt-3 flex gap-2">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90">
                  <Icon name="play" size={13} /> Play
                </button>
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-ink/15 py-2.5 text-xs font-bold transition-colors hover:border-ink/30">
                  <Icon name="download" size={13} /> Download
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
