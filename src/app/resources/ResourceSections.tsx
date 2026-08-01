"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import type { Resource } from "@/lib/affiliate";

/**
 * Renders a resource set as the three design sections — Brand creatives,
 * Ready-to-send scripts, Training videos — hiding any that are empty. Downloads
 * and video plays are plain links to the stored/ external URLs; scripts copy to
 * the clipboard.
 */
export default function ResourceSections({ resources }: { resources: Resource[] }) {
  const creatives = resources.filter((r) => r.type === "CREATIVE");
  const scripts = resources.filter((r) => r.type === "SCRIPT");
  const videos = resources.filter((r) => r.type === "VIDEO");

  if (resources.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-ink/15 py-12 text-center text-sm text-ink/45">
        No materials here yet — check back soon.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {creatives.length > 0 && (
        <Section title="Brand creatives">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {creatives.map((r) => (
              <CreativeCard key={r.id} r={r} />
            ))}
          </div>
        </Section>
      )}

      {scripts.length > 0 && (
        <Section title="Ready-to-send scripts">
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {scripts.map((r) => (
              <ScriptCard key={r.id} r={r} />
            ))}
          </div>
        </Section>
      )}

      {videos.length > 0 && (
        <Section title="Training videos">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((r) => (
              <VideoCard key={r.id} r={r} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2.5">
        <span className="h-3 w-3 rounded-full bg-brand" />
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

const isImage = (r: Resource) =>
  (r.fileFormat ?? "").toUpperCase() !== "PDF" &&
  /\.(png|jpe?g|webp|gif)$/i.test(r.fileUrl ?? "");

function CreativeCard({ r }: { r: Resource }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white">
      <div className="flex aspect-video items-center justify-center bg-ink/5">
        {isImage(r) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={r.fileUrl!} alt={r.title} className="h-full w-full object-cover" />
        ) : (
          <Icon name="download" size={26} className="text-ink/30" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-bold">{r.title}</p>
        <p className="mt-0.5 text-xs text-ink/50">
          {[r.fileFormat, r.fileMeta].filter(Boolean).join(" · ") || "File"}
        </p>
        <a
          href={r.fileUrl ?? "#"}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-coal py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          <Icon name="download" size={16} /> Download
        </a>
      </div>
    </div>
  );
}

function ScriptCard({ r }: { r: Resource }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(r.body ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — nothing to do but leave the text visible to copy by hand */
    }
  };
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white">
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-ink/60">
          <Icon name="send" size={15} /> Script
        </p>
        <p className="mt-2 font-bold">{r.title}</p>
        <p className="mt-2 flex-1 whitespace-pre-line text-sm text-ink/60">{r.body}</p>
        <button
          onClick={copy}
          className="mt-4 inline-flex items-center gap-2 self-start text-sm font-bold text-brand transition-opacity hover:opacity-80"
        >
          <Icon name={copied ? "check" : "copy"} size={16} /> {copied ? "Copied!" : "Copy script"}
        </button>
      </div>
      <div className="h-1.5 w-full bg-brand" />
    </div>
  );
}

function VideoCard({ r }: { r: Resource }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white">
      <a
        href={r.videoUrl ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex aspect-video items-center justify-center bg-ink/80"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-ink transition-transform group-hover:scale-110">
          <Icon name="play" size={20} />
        </span>
        {r.duration && (
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-bold text-white">
            {r.duration}
          </span>
        )}
      </a>
      <div className="flex items-center justify-between gap-3 p-4">
        <p className="min-w-0 truncate font-bold">{r.title}</p>
        <a
          href={r.videoUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          <Icon name="play" size={15} /> Play
        </a>
      </div>
    </div>
  );
}
