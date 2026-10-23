import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Chip({ children, className, title }: { children: ReactNode; className?: string; title?: string }) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-bg px-3.5 py-1.5 text-[13px] font-medium text-fg",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small badge for content still marked as sample. */
export function SampleBadge({ className }: { className?: string }) {
  return (
    <span
      title="Sample project — replace in src/content/projects.ts"
      className={cn("inline-flex items-center rounded-full bg-fg/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-fg/70", className)}
    >
      Sample
    </span>
  );
}
