import type { ReactNode } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { Scramble } from "@/components/motion/Scramble";
import { cn } from "@/lib/cn";

/** Eyebrow + headline + gradient underline used at the top of each section. */
export function SectionTitle({
  eyebrow,
  title,
  align = "center",
  className,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  align?: "center" | "left";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto text-center" : "", className)}>
      <p className="eyebrow mark">
        <Scramble text={eyebrow} />
      </p>
      <RevealText as="h2" className={cn("headline mt-3 text-[clamp(2.25rem,5.5vw,4.5rem)]", align === "center" && "mx-auto max-w-3xl")}>
        {title}
      </RevealText>
      {/* Gradient underline that draws in as the title scrolls up. */}
      <span aria-hidden className={cn("draw-x mt-5 block h-1.5 w-20 rounded-full", align === "center" && "mx-auto")}>
        <span className="ig-gradient block size-full rounded-full" />
      </span>
      {children}
    </div>
  );
}
