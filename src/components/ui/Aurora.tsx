import { cn } from "@/lib/cn";

/** Hairline grid that fades out from the top of a section. Decorative only. */
export function Aurora({ subtle = false, className }: { subtle?: boolean; className?: string }) {
  return <div aria-hidden className={cn("grid-lines pointer-events-none absolute inset-x-0 top-0 h-[80vh]", subtle && "opacity-70", className)} />;
}
