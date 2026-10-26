"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import { categoryLabels, projects } from "@/content/projects";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/* One mood per case, so each card in the stack reads as its own chapter. */
const tones = [
  { glow: "var(--ember)", chip: "bg-ember/15 text-ember" },
  { glow: "var(--aeo)", chip: "bg-aeo/15 text-aeo" },
  { glow: "var(--geo)", chip: "bg-geo/15 text-geo" },
];

/**
 * Case studies as a stacking deck: each card sticks near the top, the next one
 * slides up over it and the one underneath shrinks back and dims. Every card
 * leads with one big verified number and its real screenshot in a 3D-tilted
 * browser window that straightens on hover.
 */
export function CaseCards() {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MQ.motion} and (min-width: 768px)`, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-case]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.firstElementChild, {
            scale: 0.92,
            filter: "brightness(0.7)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top 85%", end: "top 20%", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative grid gap-6 md:gap-[12vh]">
      {projects.map((p, i) => {
        const shot = p.evidence?.[0];
        const tone = tones[i % tones.length];
        const badges = p.evidence?.slice(0, 3).map((e) => e.badge) ?? p.stack.slice(0, 3);
        return (
          <li key={p.slug} data-case className="md:sticky" style={{ top: `calc(var(--nav-h) + 1.25rem + ${i * 1.5}rem)` }}>
            <Link
              href={`/work/${p.slug}`}
              data-cursor="Read case"
              className="group relative block origin-top overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-[0_40px_120px_-50px_rgba(0,0,0,0.8)] will-change-transform"
            >
              {/* Mood light in the case's colour. */}
              <span aria-hidden className="pointer-events-none absolute -right-32 -top-32 size-[38rem] rounded-full opacity-25 blur-3xl" style={{ background: `radial-gradient(closest-side, ${tone.glow}, transparent)` }} />
              <span aria-hidden className="ruled pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(90deg,#000,transparent_60%)]" />

              <div className="relative grid gap-8 p-6 sm:p-10 lg:min-h-[34rem] lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12 lg:p-14">
                <div className="flex min-w-0 flex-col">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="label rounded-full border border-line bg-bg/50 px-3 py-1.5 text-[10px]">
                      Case {String(i + 1).padStart(2, "0")} <span className="text-subtle">/ {String(projects.length).padStart(2, "0")}</span>
                    </span>
                    <span className={cn("label rounded-full px-3 py-1.5 text-[10px]", tone.chip)}>{categoryLabels[p.category]}</span>
                    <span className="label text-[10px] text-muted">{p.year}</span>
                  </div>

                  <h3 className="poster mt-6 text-[clamp(2.1rem,4.4vw,4rem)]">{p.name.split(" — ")[0]}</h3>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">{p.summary}</p>

                  {p.highlight ? (
                    <div className="mt-8 flex items-end gap-4 border-l-2 pl-5" style={{ borderColor: tone.glow }}>
                      <span className="poster text-[clamp(3.6rem,7vw,6.5rem)] leading-[0.85]" style={{ color: tone.glow }}>
                        {p.highlight.value}
                      </span>
                      <span className="mb-2 max-w-[13rem] text-[14px] leading-snug text-muted">{p.highlight.label}</span>
                    </div>
                  ) : (
                    p.hook && (
                      <p className="hand mt-8 border-l-2 pl-5 text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight" style={{ borderColor: tone.glow, color: tone.glow }}>
                        &ldquo;{p.hook}&rdquo;
                      </p>
                    )
                  )}

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {badges.map((b) => (
                      <li key={b} className="label rounded-full border border-line bg-bg/40 px-3 py-1.5 text-[10px] text-muted">
                        {b}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-fg py-2 pl-5 pr-2 text-[14px] font-semibold text-bg transition-colors duration-300 group-hover:bg-ember">
                    Read the case study
                    <span className="grid size-8 place-items-center rounded-full bg-bg text-fg transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight aria-hidden className="size-4" />
                    </span>
                  </span>
                </div>

                {/* The proof, in a browser window tilted in 3D; it squares up on hover. */}
                <div className="[perspective:1600px]">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f1628] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-[var(--ease-expo)] [transform:rotateY(-14deg)_rotateX(6deg)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)]">
                    <div className="flex items-center gap-3 border-b border-white/10 bg-[#161f36] px-4 py-2.5">
                      <span className="flex gap-1.5">
                        <span className="size-2.5 rounded-full bg-[#ff7a59]" />
                        <span className="size-2.5 rounded-full bg-[#f2c879]" />
                        <span className="size-2.5 rounded-full bg-[#7fb7ff]" />
                      </span>
                      <span className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-[#0a1020] px-3 py-1 font-mono text-[11px] text-[#a9b1c6]">
                        <Lock aria-hidden className="size-3 shrink-0 text-[#7fb7ff]" />
                        <span className="truncate">{p.links.find((l) => l.href)?.href?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? (shot?.src.includes("reddit") ? "reddit.com" : "google.com/search")}</span>
                      </span>
                    </div>
                    <div className="relative aspect-[16/10]">
                      {shot ? (
                        <>
                          <Image src={shot.src} alt="" aria-hidden fill sizes="20vw" className="scale-110 object-cover opacity-50 blur-2xl" />
                          <Image src={shot.src} alt={shot.title} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-contain p-3" />
                        </>
                      ) : (
                        <div className="absolute inset-0 grid place-items-center p-8" style={{ background: `radial-gradient(circle at 30% 20%, color-mix(in oklab, ${tone.glow} 35%, transparent), #0a1020 70%)` }}>
                          <div className="w-full max-w-sm space-y-3">
                            {p.architecture.map((a, k) => (
                              <div key={a.layer} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                                <span className="font-mono text-[11px] text-[#a9b1c6]">0{k + 1}</span>
                                <span className="text-[14px] font-semibold text-[#f5f1ea]">{a.layer}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
