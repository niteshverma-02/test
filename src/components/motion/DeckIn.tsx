"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/**
 * Children start stacked like a deck of cards and fan out into place when
 * scrolled into view. On phones (a swipe row) they fly in from the right.
 */
export function DeckIn({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const cards = gsap.utils.toArray<HTMLElement>(el.children);
      const mid = (cards.length - 1) / 2;
      const trigger = { trigger: el, start: "top 80%", once: true };
      const mm = gsap.matchMedia();
      mm.add(`${MQ.motion} and ${MQ.desktop}`, () => {
        gsap.from(cards, {
          xPercent: (i) => (mid - i) * 104,
          y: 140,
          rotate: (i) => (i - mid) * -9,
          scale: 0.82,
          duration: 1.5,
          stagger: { each: 0.07, from: "center" },
          ease: "expo.out",
          clearProps: "transform",
          scrollTrigger: trigger,
        });
      });
      mm.add(`${MQ.motion} and ${MQ.mobile}`, () => {
        gsap.from(cards, { x: 160, rotate: 7, autoAlpha: 0, duration: 1.2, stagger: 0.1, ease: "expo.out", clearProps: "transform", scrollTrigger: trigger });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
