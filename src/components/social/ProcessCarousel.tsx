"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { stages } from "@/content/process";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useScrollRide } from "@/components/motion/useScrollRide";
import { RevealText } from "@/components/motion/RevealText";

const tints = ["#feda75, #fa7e1e", "#fa7e1e, #d62976", "#d62976, #962fbf", "#962fbf, #4f5bd5", "#4f5bd5, #d62976", "#1a0a12, #962fbf"];

const last = stages.length - 1;

/** My process as a carousel post: scroll-driven on desktop, swipeable on phones, arrows everywhere. */
export function ProcessCarousel() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  // Desktop: the section pins and the page scroll drives the slides sideways, so a mouse wheel just works.
  const ride = useScrollRide(section, track, { count: stages.length, onIndex: setActive, swing: true });

  useGSAP(() => {
    const el = track.current!;
    const slides = gsap.utils.toArray<HTMLElement>(el.children);
    const mm = gsap.matchMedia();
    // Phones: native swipe; slides deal in from the right.
    mm.add(`${MQ.motion} and ${MQ.mobile}`, () => {
      gsap.from(slides, {
        x: 260,
        rotate: 8,
        autoAlpha: 0,
        duration: 1.3,
        stagger: 0.09,
        ease: "expo.out",
        clearProps: "transform",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });
    return () => mm.revert();
  });

  const slideWidth = () => {
    const first = track.current?.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + parseFloat(getComputedStyle(track.current!).columnGap || "0") : 1;
  };
  // Step from the real scroll position: near the end, "active" runs ahead of it.
  const step = (dir: 1 | -1) => {
    if (ride.go(active + dir)) return;
    const el = track.current;
    if (el) el.scrollTo({ left: (Math.round(el.scrollLeft / slideWidth()) + dir) * slideWidth(), behavior: "smooth" });
  };

  return (
    <section ref={section} aria-labelledby="process-title" className="overflow-clip py-20 lg:pb-10 lg:pt-[calc(var(--nav-h)+1.5rem)]">
      <div className="container-page flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow mark">My process</p>
          <RevealText as="h2" id="process-title" className="headline mt-3 max-w-2xl text-[clamp(2.4rem,5.5vw,4.5rem)]">
            From brief to <span className="serif ig-text pr-[0.05em]">brand growth.</span>
          </RevealText>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-semibold tabular-nums text-muted" aria-live="polite">
            {active + 1} / {stages.length}
          </span>
          <button type="button" onClick={() => step(-1)} disabled={active === 0} aria-label="Previous step" className="grid size-11 place-items-center rounded-full border border-line transition hover:bg-surface-2 disabled:opacity-40">
            <ArrowLeft className="size-4" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={active === last} aria-label="Next step" className="grid size-11 place-items-center rounded-full border border-line transition hover:bg-surface-2 disabled:opacity-40">
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <ol
        ref={track}
        onScroll={(e) => {
          const el = e.currentTarget;
          // Several slides fit on wide screens, so the last ones can't reach the start edge.
          const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
          setActive(atEnd ? last : Math.round(el.scrollLeft / slideWidth()));
        }}
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-gutter pb-4 [scrollbar-width:none] lg:px-[max(var(--gutter),calc((100vw-80rem)/2+var(--gutter)))]"
        data-lenis-prevent-horizontal
      >
        {stages.map((s, i) => (
          <li
            key={s.id}
            className="shine relative flex aspect-[4/5] w-[78vw] max-w-[400px] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] p-7 text-white sm:w-[44vw] lg:w-[min(30vw,calc((100svh-26rem)*0.8))] lg:scroll-ml-[max(var(--gutter),calc((100vw-80rem)/2+var(--gutter)))]"
            style={{ background: `linear-gradient(155deg, ${tints[i % tints.length]})` }}
          >
            <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.3),transparent_55%)]" />
            <p className="serif relative text-[clamp(4rem,9vw,6.5rem)] leading-none opacity-90">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="headline relative mt-auto text-[clamp(2rem,3.4vw,2.75rem)]">{s.title}</h3>
            <p className="relative mt-3 text-[16px] leading-snug text-white/90">{s.text}</p>
            <p className="relative mt-6 flex items-center justify-between border-t border-white/25 pt-4 text-[12px] font-semibold">
              @{profile.identity.handle}
              <span className="text-white/75">{i === 0 ? "Swipe →" : i === stages.length - 1 ? "Save for later 🔖" : `${i + 1}/${stages.length}`}</span>
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex justify-center gap-1.5" aria-hidden>
        {stages.map((s, i) => (
          <span key={s.id} className={cn("h-1.5 rounded-full transition-all duration-500", i === active ? "ig-gradient w-6" : "w-1.5 bg-line")} />
        ))}
      </div>
    </section>
  );
}
