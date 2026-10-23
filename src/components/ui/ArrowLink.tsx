import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Apple-style text link: "Learn more ›". External URLs open in a new tab.
 * A null href renders nothing, so unset links simply don't appear.
 */
export function ArrowLink({ href, children, className }: { href: string | null; children: ReactNode; className?: string }) {
  if (href === null) return null;
  const cls = cn(
    "group inline-flex items-center gap-0.5 bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-[position:0_100%] bg-no-repeat pb-0.5 font-medium text-link transition-[background-size] duration-500 ease-[var(--ease-expo)] hover:bg-[length:100%_1.5px]",
    className,
  );
  const inner = (
    <>
      {children}
      <ChevronRight aria-hidden className="size-[1em] transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.25} />
    </>
  );

  if (/^(https?:|mailto:|tel:)/.test(href)) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
        {newTab && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
