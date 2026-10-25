import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { RollText } from "@/components/motion/RollText";

type Variant = "primary" | "secondary" | "gradient" | "ink";

// Hover: a solid fill rises from the bottom edge — no gradients, no glow.
const rise = "bg-no-repeat bg-bottom [background-size:100%_0%] hover:[background-size:100%_100%]";
const styles: Record<Variant, string> = {
  primary: `bg-fg text-bg [background-image:linear-gradient(var(--color-volt),var(--color-volt))] ${rise} hover:text-ink`,
  secondary: `bg-surface text-fg [background-image:linear-gradient(var(--color-volt),var(--color-volt))] ${rise} hover:text-ink`,
  gradient: `bg-volt text-ink [background-image:linear-gradient(var(--color-ink),var(--color-ink))] ${rise} hover:text-[#f4f4f0]`,
  // For use on volt surfaces, in either mode.
  ink: `bg-ink text-[#f4f4f0] [background-image:linear-gradient(#ffffff,#ffffff)] ${rise} hover:text-ink`,
};

/** Pill button. Renders a Link for internal hrefs, an <a> for external ones. */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[color,background-size,transform] duration-500 ease-[var(--ease-apple)] active:scale-[0.97]",
    size === "sm" && "h-8 px-4 text-[13px]",
    size === "md" && "h-11 px-6 text-[15px]",
    size === "lg" && "h-14 px-8 text-[17px]",
    styles[variant],
    className,
  );
  const label = typeof children === "string" ? <RollText>{children}</RollText> : children;
  if (/^(https?:|mailto:)/.test(href)) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}
