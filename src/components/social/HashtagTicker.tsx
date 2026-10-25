"use client";

import { useRef } from "react";
import { allTech } from "@/content/skills";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const tags = allTech.map((t) => `#${t.replace(/[^A-Za-z0-9]/g, "")}`);
const formats = [
  "Google AI Overviews",
  "Local 3-Pack",
  "AEO Schema",
  "GEO Citations",
  "GSC Analytics",
  "Doctor Authority",
  "E-E-A-T Signals",
  "Reddit Outreach",
];

function Row({ items, className, reverse }: { items: string[]; className?: string; reverse?: boolean }) {
  return (
    <div data-skew className={cn("marquee flex overflow-hidden py-4", reverse && "marquee-reverse", className)}>
      <div className="marquee-track flex w-max shrink-0 items-center gap-8 pr-8 [--marquee-duration:45s]">
        {[...items, ...items].map((t, i) => (
          <span key={`${t}-${i}`} aria-hidden={i >= items.length} className="flex items-center gap-8 whitespace-nowrap">
            <span className={i % 3 === 1 ? "serif text-[clamp(1.75rem,3.2vw,2.75rem)]" : "headline text-[clamp(1.5rem,2.6vw,2.25rem)]"}>{t}</span>
            <span aria-hidden className="text-[1.4rem]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Two crossing tape bands of hashtags and formats. They lean into the scroll and pause on hover. */
export function HashtagTicker() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-skew]");
        const skew = rows.map((r) => gsap.quickTo(r, "skewX", { duration: 0.6, ease: "power3.out" }));
        const lean = (v: number) => skew.forEach((s) => s(v));
        const st = ScrollTrigger.create({ onUpdate: (self) => lean(gsap.utils.clamp(-14, 14, self.getVelocity() / -220)) });
        const settle = () => lean(0);
        ScrollTrigger.addEventListener("scrollEnd", settle);
        return () => {
          st.kill();
          ScrollTrigger.removeEventListener("scrollEnd", settle);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-label="What I work with" className="relative overflow-hidden py-14">
      <div className="-mx-4 rotate-[-3deg]">
        <Row items={tags} className="bg-ink text-[#fdf0f5] shadow-[var(--shadow)]" />
      </div>
      <div className="-mx-4 -mt-3 rotate-[2deg]">
        <Row items={formats} reverse className="ig-gradient text-white shadow-[var(--shadow)]" />
      </div>
    </section>
  );
}
