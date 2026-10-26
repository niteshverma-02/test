"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Note } from "./Hand";

/* Words wrapped in *asterisks* light up in coral. */
const text =
  "Patients don't scroll past page one. They *Google* it, they *ask* *ChatGPT*, they *check* *the* *map* — and they trust whoever answers first. My job is simple: make sure that answer is *your* *clinic.*";

/**
 * A manifesto that reads itself: as the section scrolls through, each word
 * brightens from a ghost to full colour, the key words in coral.
 */
export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ").map((w) => ({ w: w.replace(/\*/g, ""), hot: w.startsWith("*") }));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.12, filter: "blur(6px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 55%", scrub: true },
          },
        );
        gsap.fromTo("[data-hotline]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 60%", end: "bottom 50%", scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-label="Manifesto" className="container-page py-14 lg:py-24">
      <p className="label flex items-center gap-3 text-[10px] text-muted">
        <span aria-hidden className="h-px w-10 bg-ember" /> The short version
      </p>
      <p className="mt-10 max-w-6xl text-[clamp(1.9rem,4.6vw,4.4rem)] font-medium leading-[1.08] tracking-[-0.03em]">
        {words.map((x, i) => (
          <span key={i} data-word className={cn("inline-block pr-[0.25em]", x.hot && "text-ember")}>
            {x.w}
          </span>
        ))}
      </p>
      <Note arrow="right" className="mt-8 -rotate-2">that&rsquo;s the whole job, really</Note>
      <span data-hotline aria-hidden className="mt-8 block h-px origin-left bg-gradient-to-r from-ember via-geo to-aeo" />
    </section>
  );
}
