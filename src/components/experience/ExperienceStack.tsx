"use client";

import { useRef } from "react";
import { experience } from "@/content/experience";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { Chip } from "@/components/ui/Chip";

/**
 * Roles as a deck of cards. On large screens each card sticks under the
 * nav and the next one slides over it, tipping the one below back.
 * Phones get a plain list.
 */
export function ExperienceStack() {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.motion} and ${MQ.desktop}`, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-stack-item]", root);
        items.forEach((item, i) => {
          const next = items[i + 1];
          if (!next) return;
          const card = item.querySelector("[data-stack-card]");
          const dim = item.querySelector("[data-stack-dim]");
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: next, start: "top 85%", end: "top 25%", scrub: true },
          });
          tl.to(card, { scale: 0.9, rotateX: -10, transformPerspective: 1200, transformOrigin: "50% 0%", duration: 1 }, 0).to(
            dim,
            { opacity: 0.55, duration: 1 },
            0,
          );
        });
        items.forEach((item) => {
          gsap.from(item.querySelector("[data-stack-card]"), {
            y: 120,
            rotate: 2,
            autoAlpha: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: item, start: "top 92%", once: true },
          });
        });
      });
      mm.add(`${MQ.motion} and ${MQ.mobile}`, () => {
        gsap.utils.toArray<HTMLElement>("[data-stack-card]", root).forEach((card, i) => {
          gsap.from(card, {
            y: 80,
            rotate: i % 2 ? -3 : 3,
            autoAlpha: 0,
            duration: 1.1,
            ease: "back.out(1.4)",
            clearProps: "transform",
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          });
        });
      });
      // Highlights tick in one by one and the tool chips pop, at every size.
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>("[data-stack-card]", root).forEach((card) => {
          const trigger = { trigger: card, start: "top 70%", once: true };
          gsap.from(card.querySelectorAll("[data-hl]"), { x: -24, autoAlpha: 0, duration: 0.8, stagger: 0.08, delay: 0.2, ease: "expo.out", scrollTrigger: trigger });
          gsap.from(card.querySelectorAll("[data-chip]"), { scale: 0.4, autoAlpha: 0, duration: 0.6, stagger: 0.05, delay: 0.5, ease: "back.out(2.5)", scrollTrigger: trigger });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative mx-auto max-w-5xl space-y-6 lg:space-y-[14vh]">
      {experience.map((e, i) => (
        <li
          key={e.org + e.period}
          data-stack-item
          className="lg:sticky"
          style={{ top: `calc(var(--nav-h) + 2rem + ${i * 18}px)` }}
        >
          <article data-stack-card className="card ig-edge isolate grid gap-8 p-7 sm:p-10 lg:min-h-[420px] lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:p-14">
            <span aria-hidden className="story-ring absolute right-6 top-6 size-12 lg:right-10 lg:top-10">
              <span className="grid size-full place-items-center rounded-full border-2 border-surface ig-gradient text-[13px] font-bold text-white">
                {e.org
                  .split(" ")
                  .filter((w) => /^[a-z]/i.test(w))
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="headline text-outline text-[clamp(3.5rem,7vw,6rem)] leading-none">{String(i + 1).padStart(2, "0")}</span>
                {e.current && (
                  <span className="inline-flex items-center gap-2 rounded-full ig-gradient px-3 py-1 text-[11px] font-semibold text-white">
                    <span className="pulse-dot" aria-hidden /> Current
                  </span>
                )}
              </div>
              <h2 className="headline mt-6 text-[clamp(1.75rem,3.4vw,2.75rem)]">{e.role}</h2>
              <p className="mt-1 text-[19px] font-medium text-muted">{e.org}</p>
              <p className="mt-auto pt-6 text-[14px] font-medium tabular-nums text-muted">{e.period}</p>
            </div>
            <div className="flex flex-col justify-center lg:pr-12">
              <p className="text-[19px] leading-snug">{e.summary}</p>
              {e.highlights.length > 0 && (
                <ul className="mt-5 space-y-2 text-[16px] text-muted">
                  {e.highlights.map((h) => (
                    <li key={h} data-hl className="flex gap-3">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full ig-gradient" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              {e.stack.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {e.stack.map((s) => (
                    <span key={s} data-chip className="inline-block">
                      <Chip className="transition-transform duration-300 hover:-translate-y-0.5 hover:-rotate-2">{s}</Chip>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <span data-stack-dim aria-hidden className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] bg-bg opacity-0" />
          </article>
        </li>
      ))}
    </ol>
  );
}
