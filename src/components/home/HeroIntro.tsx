"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";

/**
 * Hero entrance, played once the intro curtain lifts: the headline rises
 * letter by letter, then each `[data-hero-in]` fades up out of a blur.
 */
export function HeroIntro({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const name = root.querySelector<HTMLElement>("[data-hero-name]");
      const items = root.querySelectorAll("[data-hero-in]");
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ paused: true });
        let split: SplitText | null = null;
        if (name) {
          // Names that render their own letters (KineticName) are already masked per word.
          const own = name.querySelectorAll("[data-char]");
          const chars = own.length ? Array.from(own) : (split = SplitText.create(name, { type: "words,chars", mask: "chars" })).chars;
          gsap.set(name, { opacity: 1 });
          tl.fromTo(chars, { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.035, ease: "expo.out" }, 0);
        }
        tl.fromTo(
          items,
          { opacity: 0, y: 28, filter: "blur(14px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, stagger: 0.08, ease: "expo.out", clearProps: "filter" },
          0.25,
        );
        const off = onIntroDone(() => tl.play());

        // Letters hop when the pointer brushes past them.
        const hop = (e: Event) => {
          const c = e.currentTarget as HTMLElement;
          if (!tl.isActive() && !gsap.isTweening(c)) gsap.fromTo(c, { y: 0, rotate: 0 }, { y: -16, rotate: gsap.utils.random(-12, 12), duration: 0.22, yoyo: true, repeat: 1, ease: "power2.out" });
        };
        // The masks hop, not the letters, so a letter never gets clipped by its own mask.
        const hoppers = split && matchMedia("(hover: hover) and (pointer: fine)").matches ? (split.masks as HTMLElement[]) : [];
        hoppers.forEach((c) => c.addEventListener("pointerenter", hop));

        // Leaving the hero: the whole block sinks back and fades, like closing a story.
        gsap.to(root, {
          scale: 0.9,
          y: -60,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: { trigger: root.parentElement, start: "top top", end: "bottom top", scrub: true },
        });

        return () => {
          off();
          hoppers.forEach((c) => c.removeEventListener("pointerenter", hop));
          split?.revert();
        };
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
