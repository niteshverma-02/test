"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { confetti } from "@/lib/confetti";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async (e) => {
        const { clientX: x, clientY: y } = e;
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          confetti({ x, y, count: 70, spread: 0.9 });
        } catch {
          setCopied(false);
        }
      }}
      className="inline-flex h-9 items-center gap-2 rounded-full bg-bg px-4 text-[13px] font-medium transition-colors hover:bg-surface-2"
    >
      {copied ? <Check aria-hidden className="size-3.5 text-accent" /> : <Copy aria-hidden className="size-3.5" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
