import { cn } from "@/lib/cn";

/** Gradient initials badge — the site's logo. */
export function Monogram({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-7 place-items-center rounded-full ig-gradient text-[11px] font-bold tracking-tight text-ink",
        className,
      )}
    >
      {initials}
    </span>
  );
}
