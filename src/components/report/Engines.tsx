"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useOnScreen, useWebGL } from "@/components/three/webgl";
import { SectionHead, type Engine } from "./ui";
import { Note, Squiggle } from "./Hand";

const EngineObject = dynamic(() => import("@/components/three/EngineObject"), { ssr: false });

const engines: { key: Exclude<Engine, "LEADS">; name: string; promise: string; points: string[]; proof: string; tint: string; glow: string }[] = [
  {
    key: "SEO",
    name: "Search Engine Optimisation",
    promise: "Be the result Google ranks.",
    points: ["Treatment & specialty keyword research", "Technical audits, crawlability, indexing", "On-page, internal links & E-E-A-T", "Search Console tracking"],
    proof: "+48.5% clicks in six months (GSC)",
    tint: "#ff7a59",
    glow: "var(--seo)",
  },
  {
    key: "AEO",
    name: "Answer Engine Optimisation",
    promise: "Be the answer AI quotes.",
    points: ["FAQ & conversational content", "Schema & structured data", "Clear, citable medical answers", "Google AI Overviews visibility"],
    proof: "Cited in Google AI Overviews",
    tint: "#7fb7ff",
    glow: "var(--aeo)",
  },
  {
    key: "GEO",
    name: "Generative Engine Optimisation",
    promise: "Be the name AI recommends.",
    points: ["Entity & brand-mention building", "Reddit & Quora authority", "Citations & NAP consistency", "Google Business Profile & Maps"],
    proof: "Recommended by ChatGPT & Gemini",
    tint: "#f2c879",
    glow: "var(--geo)",
  },
];

/** The three engines, each with a liquid-chrome emblem in WebGL that heats up when its panel is active. */
export function Engines() {
  const [active, setActive] = useState(0);
  const row = useRef<HTMLDivElement>(null);
  const gl = useWebGL();
  const on = useOnScreen(row);

  return (
    <section aria-labelledby="engines-title" className="container-page py-12 lg:py-20">
      <SectionHead
        num="01"
        label="The method"
        id="engines-title"
        title={
          <>
            Three engines. <br />
            One <Squiggle className="text-ember">patient.</Squiggle>
          </>
        }
        intro="Patients don't only Google anymore — they ask ChatGPT and check the map. I optimise for all three, so the same doctor shows up wherever the question is asked."
      />

      <div className="relative">
        <Note arrow="down-right" className="absolute top-2 left-[40%] hidden -rotate-3 lg:flex">most SEOs stop at the first one</Note>
      </div>
      <div ref={row} className="mt-20 grid gap-4 lg:grid-cols-3">
        {engines.map((e, i) => {
          const hot = active === i;
          return (
            <article
              key={e.key}
              tabIndex={0}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-label={`${e.key} — ${e.name}`}
              className={cn(
                "group relative flex flex-col overflow-hidden panel outline-none transition-colors duration-700 md:flex-row lg:flex-col",
                hot ? "bg-surface" : "bg-transparent",
              )}
            >
              <span aria-hidden className={cn("absolute inset-x-0 top-0 h-[3px] origin-left transition-transform duration-700 ease-[var(--ease-expo)]", hot ? "scale-x-100" : "scale-x-0")} style={{ background: e.glow }} />
              <div className="relative h-60 shrink-0 sm:h-72 md:h-auto md:min-h-72 md:w-[42%] lg:h-72 lg:w-auto">
                <span
                  aria-hidden
                  className={cn("absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-700", hot ? "opacity-30" : "opacity-0")}
                  style={{ background: e.glow }}
                />
                {gl ? (
                  <EngineObject kind={e.key} active={hot} tint={e.tint} render={on} />
                ) : (
                  <p aria-hidden className="poster grid h-full place-items-center text-[8rem] text-subtle">
                    {e.key}
                  </p>
                )}
                <span className="absolute left-6 top-5 font-mono text-[12px] text-muted">0{i + 1}</span>
                <span className="label absolute left-14 right-6 top-5 text-right text-[10px] text-muted">{e.name}</span>
              </div>

              <div className="relative flex flex-1 flex-col p-6 pt-0 sm:p-8 sm:pt-0">
                <p className="poster text-[clamp(3.4rem,5.6vw,5.2rem)]" style={{ color: hot ? e.glow : undefined }}>
                  {e.key}
                </p>
                <p className="poster mt-3 text-[clamp(1.35rem,1.8vw,1.7rem)]">{e.promise}</p>
                <ul className="mt-5 grid gap-2 text-[14px] text-muted">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden className="text-ember">
                        →
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="label mt-auto pt-8 text-[10px]">
                  <span className="inline-block rounded-full border border-line px-3 py-1">Proof · {e.proof}</span>
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
