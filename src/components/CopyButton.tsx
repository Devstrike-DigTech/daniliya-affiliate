"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

/** Copies `value` to the clipboard, showing a brief "Copied" state. */
export default function CopyButton({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-2 transition-opacity hover:opacity-90 ${className}`}
    >
      <Icon name={copied ? "check" : "copy"} size={15} />
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
