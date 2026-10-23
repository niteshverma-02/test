"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";

type Props = {
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
  id?: string;
};

/**
 * Masked line reveal. SplitText keeps an aria-label on the element, so
 * screen readers get the sentence rather than fragments, and re-splits
 * on resize so line breaks stay correct.
 */
export function RevealText({ as = "div", children, className, delay = 0, immediate = false, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });
            return gsap.from(self.lines, {
              yPercent: 112,
              duration: 1.25,
              stagger: 0.085,
              delay,
              ease: "expo.out",
              scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
            });
          },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className} data-reveal-load={immediate ? "" : undefined}>
      {children}
    </Tag>
  );
}
