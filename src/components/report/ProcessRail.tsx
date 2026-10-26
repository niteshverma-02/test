"use client";

import { useRef, useState } from "react";
import { stages } from "@/content/process";
import { useScrollRide } from "@/components/motion/useScrollRide";
import { cn } from "@/lib/cn";
import { SectionHead } from "./ui";

const tones = ["bg-surface/70 backdrop-blur", "bg-surface-2/70 backdrop-blur", "bg-aeo text-ink", "bg-surface/70 backdrop-blur", "bg-ember text-ink", "bg-geo text-ink"];

/**
 * The six-stage process as a crawl path. Desktop pins the section and the
 * wheel drives the panels sideways while a crawler dot walks the path; phones swipe.
 */
export function ProcessRail({ num = "04" }: { num?: string }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  useScrollRide(section, track, { count: stages.length, onIndex: setActive });

  return (
    <section ref={section} aria-labelledby="process-title" className="overflow-clip py-14 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-16">
      <div className="container-page">
        <SectionHead
          num={num}
          label="The process"
          id="process-title"
          title={
            <>
              Crawl. Index. <span className="text-geo">Rank.</span>
            </>
          }
        />
        <div aria-hidden className="relative mt-10 hidden h-6 lg:block">
          <span className="absolute inset-x-0 top-1/2 h-px bg-fg" />
          {stages.map((s, i) => (
            <span
              key={s.id}
              className={cn("absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 border border-fg transition-colors", i <= active ? "bg-fg" : "bg-bg")}
              style={{ left: `${(i / (stages.length - 1)) * 100}%` }}
            />
          ))}
          <span
            className="absolute top-1/2 grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center bg-ember font-mono text-[10px] text-white transition-[left] duration-500 ease-[var(--ease-expo)]"
            style={{ left: `${(active / (stages.length - 1)) * 100}%` }}
          >
            {active + 1}
          </span>
        </div>
      </div>

      <ol
        ref={track}
        data-lenis-prevent-horizontal
        className="mt-10 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-0 overflow-x-auto px-gutter [scrollbar-width:none] lg:px-[max(var(--gutter),calc((100vw-88rem)/2+var(--gutter)))]"
      >
        {stages.map((s, i) => (
          <li
            key={s.id}
            className={cn(
              "mr-4 flex aspect-[4/5] w-[80vw] max-w-[24rem] shrink-0 snap-start flex-col rounded-3xl border border-line p-7 sm:w-[44vw] lg:w-[min(28vw,calc((100svh-24rem)*0.8))]",
              tones[i],
            )}
          >
            <div className="flex items-center justify-between">
              <span className="label text-[10px]">Stage</span>
              <span className="label text-[10px] opacity-70">{i === stages.length - 1 ? "↺ repeat" : "→ next"}</span>
            </div>
            <p className="poster mt-4 text-[clamp(5rem,8vw,7rem)]">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="poster mt-auto text-[clamp(1.7rem,2.4vw,2.3rem)]">{s.title}</h3>
            <p className="mt-3 text-[15px] leading-snug opacity-85">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
