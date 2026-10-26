"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { proof, proofEngine, type ProofItem } from "@/content/proof";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { useMotionOk } from "@/components/three/webgl";
import { EngineTag, SectionHead, engineVar, type Engine } from "./ui";
import { Odometer } from "./Odometer";
import { Circled, Note } from "./Hand";
import { BrowserFrame, ExhibitDeck } from "./ExhibitDeck";

/* Verified, from the orthopaedic case study (six-month Search Console comparison + community channels). */
const kpis = [
  { to: 48.5, digits: 1, prefix: "+", suffix: "%", label: "Organic clicks", note: "1.32K → 1.96K · six-month GSC", engine: "SEO" as Engine },
  { to: 97.7, digits: 1, suffix: "K", label: "Impressions", note: "up from 85.2K", engine: "SEO" as Engine },
  { to: 2.0, digits: 1, suffix: "%", label: "Click-through rate", note: "up from 1.5%", engine: "SEO" as Engine },
  { to: 4, digits: 0, label: "International enquiries", note: "in one month via Reddit & Quora", engine: "GEO" as Engine },
];

const pairs = [
  { label: "Clicks", before: 1.32, after: 1.96, unit: "K", digits: 2 },
  { label: "Impressions", before: 85.2, after: 97.7, unit: "K", digits: 1 },
  { label: "CTR", before: 1.5, after: 2.0, unit: "%", digits: 1 },
];

const filters: ("ALL" | Engine)[] = ["ALL", "SEO", "AEO", "GEO", "LEADS"];
const letter = (i: number) => String.fromCharCode(65 + i);

/**
 * The receipts: big verified numbers, before/after bars, and every screenshot
 * as a lettered exhibit in a browser window, stacked in a deck the page scroll
 * deals through. With motion off the windows simply sit in a grid.
 */
export function Evidence({ num = "02", showHead = true }: { num?: string; showHead?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");
  const [open, setOpen] = useState<{ item: ProofItem; n: number } | null>(null);
  const deck = useMotionOk();

  const list = proof.map((p, n) => ({ p, n })).filter(({ p }) => filter === "ALL" || proofEngine[p.category] === filter);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from("[data-bar]", {
          scaleX: 0,
          transformOrigin: "0 50%",
          duration: 1.4,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-bars]", start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const show = (item: ProofItem, n: number) => {
    setOpen({ item, n });
    dialog.current?.showModal();
  };

  const filterRow = (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
      <p className="label text-[10px]">
        Exhibits <span className="text-muted">— {list.length} of {proof.length}</span>
      </p>
      <div role="group" aria-label="Filter evidence" className="flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn("label h-8 border px-3 text-[10px] backdrop-blur transition-colors", filter === f ? "border-fg bg-fg text-bg" : "border-line bg-bg/40 hover:border-fg")}
          >
            {f === "ALL" ? "All" : f}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section ref={ref} id="evidence" aria-labelledby="evidence-title" className="container-page py-12 lg:py-20">
      {showHead && (
        <SectionHead
          num={num}
          label="Evidence"
          id="evidence-title"
          title={
            <>
              The <Circled>receipts.</Circled>
            </>
          }
          intro="Every number here comes from a client's Google Search Console or a screenshot of the real result. Nothing estimated, nothing rounded up."
        />
      )}

      <div className="relative">
        <Note arrow="down-right" className="absolute -top-2 left-[34%] hidden rotate-3 lg:flex">100% real screenshots, zero mockups</Note>
      </div>
      <dl className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="group relative overflow-hidden panel p-5 sm:p-7">
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left transition-transform duration-700 group-hover:scale-y-[3]" style={{ background: engineVar[k.engine] }} />
            <span aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 size-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40" style={{ background: engineVar[k.engine] }} />
            <dt className="label text-[10px] text-muted">{k.label}</dt>
            <dd className="poster mt-4 text-[clamp(2.3rem,4vw,3.9rem)] tabular-nums">
              <Odometer value={`${k.prefix ?? ""}${k.to.toFixed(k.digits)}${k.suffix ?? ""}`} />
            </dd>
            <dd className="mt-3 text-[13px] text-muted">{k.note}</dd>
          </div>
        ))}
      </dl>

      <div data-bars className="panel mt-6 grid gap-8 p-5 sm:p-7 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="label text-[10px]">Before → after</p>
          <p className="mt-2 text-[14px] text-muted">Orthopaedic surgeon, Bangalore. Six-month Search Console comparison.</p>
        </div>
        <div className="space-y-5">
          {pairs.map((p) => (
            <div key={p.label} className="grid grid-cols-[6.5rem_1fr] items-center gap-4">
              <span className="label text-[10px]">{p.label}</span>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span data-bar className="h-3 bg-surface-2" style={{ width: `${(p.before / p.after) * 100 * 0.82}%` }} />
                  <span className="font-mono text-[12px] text-muted">
                    {p.before.toFixed(p.digits)}
                    {p.unit}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span data-bar className="h-3 bg-ember shadow-[0_0_24px_var(--glow)]" style={{ width: "82%" }} />
                  <span className="font-mono text-[12px] font-semibold">
                    {p.after.toFixed(p.digits)}
                    {p.unit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">{filterRow}</div>
      {deck ? (
        <ExhibitDeck key={filter} list={list} onOpen={show} />
      ) : (
        <ul className="mt-8 grid gap-8 md:grid-cols-2">
          {list.map(({ p, n }) => (
            <li key={p.id}>
              <button type="button" onClick={() => show(p, n)} className="block w-full text-left">
                <BrowserFrame item={p} />
              </button>
              <p className="label mt-4 flex items-center gap-2 text-[10px] text-muted">
                <EngineTag engine={proofEngine[p.category]} /> Exhibit {letter(n)}
              </p>
              <p className="mt-2 text-[17px] font-semibold">{p.title}</p>
              <p className="mt-1 font-mono text-[12px] text-ember">{p.metric}</p>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialog}
        data-lenis-prevent
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto max-h-[92svh] w-[min(72rem,94vw)] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-bg p-0 text-fg backdrop:bg-ink/85 backdrop:backdrop-blur-md"
      >
        {open && (
          <div className="grid lg:grid-cols-[1fr_20rem]">
            <div className="relative bg-surface-2">
              <Image src={open.item.src} alt={open.item.title} width={1600} height={1000} sizes="(min-width: 1024px) 52rem, 94vw" className="h-auto max-h-[80svh] w-full object-contain" />
            </div>
            <div className="flex flex-col gap-4 border-t border-line p-6 lg:border-l lg:border-t-0">
              <div className="flex items-center justify-between">
                <span className="label text-[10px]">Exhibit {letter(open.n)}</span>
                <button type="button" onClick={() => dialog.current?.close()} aria-label="Close" className="grid size-9 place-items-center rounded-lg border border-line hover:border-ember hover:text-ember">
                  <X aria-hidden className="size-4" />
                </button>
              </div>
              <EngineTag engine={proofEngine[open.item.category]} className="w-fit" />
              <h3 className="poster text-[2rem]">{open.item.title}</h3>
              <p className="font-mono text-[13px] text-ember">{open.item.metric}</p>
              <p className="text-[14px] text-muted">{open.item.description}</p>
              <p className="label mt-auto text-[10px] text-muted">{open.item.client}</p>
              {open.item.clientUrl && (
                <a href={open.item.clientUrl} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-1 text-[10px] text-link hover:underline">
                  Visit site <ArrowUpRight aria-hidden className="size-3" />
                </a>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
