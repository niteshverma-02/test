"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const lines = [
  { text: "Google Search ✦ AI Overviews ✦ Local 3-Pack ✦ Rankings ✦ Clicks ✦", style: "outline", dir: -1 },
  { text: "Don’t just get indexed. Get discovered. ✨", style: "serif", dir: 1 },
  { text: "SEO ✦ AEO ✦ GEO ✦ Citations ✦ Authority ✦ Patients ✦", style: "solid", dir: -1 },
];

/** Giant lines that slide against each other as you scroll past. */
export function ScrollStopper() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((line) => {
          const dir = Number(line.dataset.line);
          gsap.fromTo(
            line,
            { xPercent: dir > 0 ? -35 : 0 },
            { xPercent: dir > 0 ? 0 : -35, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.6 } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-label="Stop scrolling. Start growing." className="overflow-hidden py-16 lg:py-24">
      {lines.map((l) => (
        <p
          key={l.text}
          aria-hidden
          data-line={l.dir}
          className={cn(
            "w-max whitespace-nowrap leading-[1.05]",
            l.style === "serif" ? "serif ig-text pb-[0.15em] pr-[0.1em] text-[clamp(4rem,13vw,11rem)]" : "headline text-[clamp(3.5rem,11vw,9.5rem)]",
            l.style === "outline" && "text-bg [-webkit-text-stroke:4px_var(--color-fg)] [paint-order:stroke_fill]",
            l.dir > 0 && "-translate-x-[2%]",
          )}
        >
          {l.text}
        </p>
      ))}
    </section>
  );
}
