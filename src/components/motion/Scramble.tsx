"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/** Short label that decodes itself when it scrolls into view, and again on hover. */
export function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const run = () => gsap.to(el, { duration: 0.8, ease: "none", scrambleText: { text, chars: CHARS, speed: 0.7 } });
        gsap.to(el, {
          duration: 1,
          ease: "none",
          scrambleText: { text, chars: CHARS, speed: 0.6, revealDelay: 0.2 },
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        });
        el.addEventListener("pointerenter", run);
        return () => el.removeEventListener("pointerenter", run);
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [text] },
  );

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
