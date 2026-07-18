"use client";

import { useId, useRef, useState } from "react";
import Icon from "@/components/Icon";

const ACCEPT = ".png,.jpg,.jpeg,.pdf";
const ACCEPT_TYPES = ["image/png", "image/jpeg", "application/pdf"];
const MAX_MB = 5;

function prettySize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Click + drag-drop file upload with type/size validation and a
 * selected-file chip. Reports the chosen file (or null) to the parent.
 *
 * UNUSED. The KYC step used to render this, but it only ever selected a file —
 * nothing uploaded it, and its "ready to submit" chip implied otherwise. The
 * API has no upload endpoint and wants a URL for `govIdUrl`, so KYC now asks
 * for a link. Wire this back up once an upload endpoint exists. */
export default function FileDropzone({
  onChange,
  invalid = false,
}: {
  onChange: (file: File | null) => void;
  invalid?: boolean;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const accept = (f: File | undefined) => {
    if (!f) return;
    if (!ACCEPT_TYPES.includes(f.type)) {
      setErr("Use a PNG, JPG or PDF file.");
      setFile(null);
      onChange(null);
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setErr(`File is too large — keep it under ${MAX_MB}MB.`);
      setFile(null);
      onChange(null);
      return;
    }
    setErr(null);
    setFile(f);
    onChange(f);
  };

  const clear = () => {
    setFile(null);
    setErr(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  if (file) {
    return (
      <div className="mt-3 flex items-center gap-3 rounded-xl border border-ink/15 bg-white p-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 text-brand">
          <Icon name="check" size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{file.name}</p>
          <p className="text-xs text-ink/50">{prettySize(file.size)} · ready to submit</p>
        </div>
        <button
          type="button"
          onClick={clear}
          aria-label="Remove file"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/40 transition-colors hover:bg-ink/5 hover:text-red-500"
        >
          <Icon name="close" size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          accept(e.dataTransfer.files?.[0]);
        }}
        className={`flex cursor-pointer flex-col items-center rounded-xl border border-dashed px-4 py-9 text-center transition-colors ${
          dragging
            ? "border-brand bg-brand/5"
            : invalid || err
              ? "border-red-400 bg-red-50/40"
              : "border-ink/25 hover:border-brand/60"
        }`}
      >
        <Icon name="upload" size={22} className="text-ink/50" />
        <p className="mt-2 text-sm font-bold">
          Upload NIN slip, Driver&apos;s licence, or Voter&apos;s card
        </p>
        <p className="mt-1 text-xs text-ink/45">
          PNG, JPG or PDF · max {MAX_MB}MB · drag &amp; drop or click
        </p>
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          onChange={(e) => accept(e.target.files?.[0])}
        />
      </label>
      {(err || invalid) && (
        <p className="mt-1.5 text-xs font-medium text-red-500">
          {err ?? "Please upload a government-issued ID."}
        </p>
      )}
    </div>
  );
}
