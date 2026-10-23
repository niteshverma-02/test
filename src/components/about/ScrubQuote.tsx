"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/** A big statement whose words light up one by one as it scrolls through the screen. "right ___" pairs get the gradient. */
export function ScrubQuote({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.14, filter: "blur(2px)" },
          { opacity: 1, filter: "blur(0px)", stagger: 0.05, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className="headline text-center text-[clamp(1.9rem,4.6vw,4rem)] leading-[1.08]">
      {words.map((w, i) => {
        const accent = w.toLowerCase() === "right" || words[i - 1]?.toLowerCase() === "right";
        return (
          <span key={i} data-word className={cn("inline-block", accent && "serif ig-text pr-[0.06em]")}>
            {w}
            {i < words.length - 1 && " "}
          </span>
        );
      })}
    </p>
  );
}
