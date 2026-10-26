"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Heading entrance: each word flips up out of a blur in 3D, one after another,
 * when the heading scrolls into view. Text stays real and readable without JS.
 */
export function WordsIn({
  children,
  className,
  id,
  as: Tag = "h2",
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "h1" | "h2";
  /** Play on load (page titles) instead of on scroll. */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const split = SplitText.create(el, { type: "words", aria: "none" });
        gsap.set(el, { visibility: "visible" });
        // Animated words become their own layers, so a gradient on a parent can't paint through them: give each its own.
        split.words.forEach((w) => w.parentElement?.closest(".grad-text") && w.classList.add("grad-text"));
        gsap.set(el, { perspective: 900 });
        gsap.from(split.words, {
          yPercent: 90,
          rotateX: -75,
          opacity: 0,
          filter: "blur(12px)",
          transformOrigin: "50% 100%",
          duration: 1.1,
          stagger: 0.07,
          ease: "expo.out",
          clearProps: "filter",
          delay: immediate ? 0.15 : 0,
          scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
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
