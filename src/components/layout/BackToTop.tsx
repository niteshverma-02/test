"use client";

import { ArrowUp } from "lucide-react";
import { scrollToTarget } from "@/lib/scroll";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        scrollToTarget(0);
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="inline-flex items-center gap-1.5 transition-colors hover:text-fg"
    >
      Back to top
      <ArrowUp aria-hidden className="size-3.5" />
    </button>
  );
}
