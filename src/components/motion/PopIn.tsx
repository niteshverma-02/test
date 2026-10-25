"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * Direct children pop up like posts landing in a feed: a springy rise with
 * a little tilt, staggered across the grid. Works for any number of rows.
 */
export function PopIn({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "ul" | "ol" }) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(el.children, {
          y: 90,
          scale: 0.86,
          rotate: (i) => (i % 2 ? 5 : -5),
          autoAlpha: 0,
          duration: 1.1,
          ease: "back.out(1.5)",
          stagger: { each: 0.09, grid: "auto", from: "start" },
          clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
