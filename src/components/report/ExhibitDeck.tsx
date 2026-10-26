"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Lock, Maximize2, RotateCw } from "lucide-react";
import { proofEngine, type ProofItem } from "@/content/proof";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { EngineTag } from "./ui";

const letter = (i: number) => String.fromCharCode(65 + i);

/** The address each screenshot was taken on, shown in its browser bar. */
function urlFor(p: ProofItem) {
  const src = p.src;
  if (src.includes("gsc")) return "search.google.com/search-console/performance";
  if (src.includes("chatgpt")) return "chatgpt.com";
  if (src.includes("geo-mentions")) return "gemini.google.com/app";
  if (src.includes("reddit")) return "reddit.com/chat";
  if (src.includes("whatsapp")) return "web.whatsapp.com";
  if (src.includes("orthocare")) return "business.google.com/insights";
  return "google.com/search";
}

/** A screenshot inside a realistic browser window. */
export function BrowserFrame({ item, priority, className }: { item: ProofItem; priority?: boolean; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-white/10 bg-[#0f1628] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.75)]", className)}>
      <div className="flex items-center gap-3 border-b border-white/10 bg-[#161f36] px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#ff7a59]" />
          <span className="size-3 rounded-full bg-[#f2c879]" />
          <span className="size-3 rounded-full bg-[#7fb7ff]" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-[#0a1020] px-3 py-1.5 font-mono text-[11px] text-[#a9b1c6]">
          <Lock aria-hidden className="size-3 shrink-0 text-[#7fb7ff]" />
          <span className="truncate">{urlFor(item)}</span>
        </span>
        <RotateCw aria-hidden className="hidden size-3.5 text-[#6e7894] sm:block" />
      </div>
      {/* The whole screenshot is shown (contain); a blurred copy of it fills the rest of the frame. */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0a1020]">
        <Image src={item.src} alt="" aria-hidden fill sizes="10vw" className="scale-110 object-cover opacity-50 blur-2xl" />
        <Image src={item.src} alt={item.title} fill priority={priority} sizes="(min-width: 1024px) 50vw, 92vw" className="object-contain p-2 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] sm:p-3" />
      </div>
    </div>
  );
}

/**
 * The exhibits as a deck of browser windows. The section pins while you scroll:
 * the front window flies up and away, the next one rises into place, and the
 * caption beside it updates. Clicking any window opens it full size.
 */
export function ExhibitDeck({ list, onOpen }: { list: { p: ProofItem; n: number }[]; onOpen: (p: ProofItem, n: number) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = list.length;

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      const mm = gsap.matchMedia();
      const layout = (p: number) => {
        cards.forEach((c, i) => {
          const d = i - p;
          if (d < 0) {
            // Gone: lifts off the top of the stack, tilting away.
            const t = Math.min(1, -d);
            gsap.set(c, { yPercent: -140 * t, rotate: -8 * t, scale: 1 - 0.06 * t, opacity: Math.max(0, 1 - t * 1.8), zIndex: 100 + i, filter: "brightness(1)" });
          } else {
            // Waiting: stacked behind, each a little lower, smaller and darker.
            gsap.set(c, {
              yPercent: 0,
              y: d * 26,
              rotate: 0,
              scale: 1 - Math.min(d, 4) * 0.055,
              opacity: d > 3.2 ? 0 : 1,
              zIndex: 100 - i,
              filter: `brightness(${1 - Math.min(d, 3) * 0.22})`,
            });
          }
        });
      };
      layout(0);
      mm.add(MQ.motion, () => {
        const st = ScrollTrigger.create({
          trigger: wrap.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress * (count - 1);
            layout(p);
            const a = Math.min(count - 1, Math.round(p));
            setActive((prev) => (prev === a ? prev : a));
          },
        });
        // This section adds a lot of page height after mount; re-measure every later trigger (pins below it).
        const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          cancelAnimationFrame(raf);
          st.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: wrap, dependencies: [count] },
  );

  const cur = list[Math.min(active, count - 1)];
  if (!cur) return null;

  return (
    <div ref={wrap} className="relative mt-10" style={{ height: `${Math.max(1, count) * 55 + 30}svh` }}>
      <div className="sticky top-[var(--nav-h)] flex h-[calc(100svh-var(--nav-h))] items-center">
        <div className="grid w-full items-center gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <div key={cur.p.id} className="exhibit-in">
              <p className="label flex flex-wrap items-center gap-3 text-[10px] text-muted">
                <EngineTag engine={proofEngine[cur.p.category]} /> Exhibit {letter(cur.n)}
              </p>
              <h3 className="poster mt-4 text-[clamp(1.8rem,3vw,2.9rem)] [text-wrap:balance]">{cur.p.title}</h3>
              <p className="mt-4 inline-block rounded-lg bg-ember/15 px-3 py-1.5 font-mono text-[13px] text-ember">{cur.p.metric}</p>
              <p className="mt-4 hidden max-w-md text-[15px] leading-relaxed text-muted sm:block">{cur.p.description}</p>
              <p className="label mt-4 text-[10px] text-subtle">{cur.p.client}</p>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <p className="poster text-[clamp(2.6rem,4.6vw,4rem)] tabular-nums">
                {String(active + 1).padStart(2, "0")}
                <span className="text-subtle">/{String(count).padStart(2, "0")}</span>
              </p>
              <button
                type="button"
                onClick={() => onOpen(cur.p, cur.n)}
                className="label inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface/60 px-4 text-[10px] backdrop-blur transition-colors hover:border-ember hover:text-ember"
              >
                <Maximize2 aria-hidden className="size-3.5" /> Open full size
              </button>
            </div>
            <div className="mt-6 flex gap-1.5" aria-hidden>
              {list.map(({ p }, i) => (
                <span key={p.id} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", i <= active ? "bg-ember" : "bg-line")} />
              ))}
            </div>
          </div>

          <div className="relative order-1 mb-16 aspect-[16/11] lg:order-2 lg:mb-0">
            {list.map(({ p, n }, i) => (
              <button
                key={p.id}
                type="button"
                data-card
                onClick={() => onOpen(p, n)}
                aria-label={`Open exhibit ${letter(n)}: ${p.title}`}
                tabIndex={i === active ? 0 : -1}
                className="absolute inset-x-0 top-0 origin-bottom text-left will-change-transform"
              >
                <BrowserFrame item={p} priority={i < 2} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
