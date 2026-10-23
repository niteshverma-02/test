"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Animate direct children one after another. */
  stagger?: boolean;
};

/** Rise-and-fade on scroll for blocks that aren't headlines. */
export function FadeIn({ children, className, delay = 0, stagger = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(stagger ? el.children : el, {
          y: 36,
          autoAlpha: 0,
          duration: 1.1,
          delay,
          stagger: stagger ? 0.08 : 0,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
