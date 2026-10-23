"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import type { IgAccount } from "@/lib/instagram";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { useScrollRide } from "@/components/motion/useScrollRide";

/**
 * Real client profiles, embedded live from Instagram (their latest posts and
 * reels). On desktop the row pins and page scroll carries it sideways; on
 * phones it's a swipe row. Iframes load lazily as they near the screen.
 */
export function LiveAccounts({ accounts }: { accounts: IgAccount[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  // The embed the visitor clicked into; the rest stay shielded so the wheel scrolls the page.
  const [browsing, setBrowsing] = useState<string | null>(null);
  const ride = useScrollRide(wrap, row, { count: accounts.length, onIndex: setActive, start: "center center" });
  const nudge = (dir: 1 | -1) => {
    if (!ride.go(active + dir)) row.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <div ref={wrap} className="py-4">
      <div className="container-page flex items-center justify-end gap-2">
        <span className="mr-1 text-[13px] font-semibold tabular-nums text-muted" aria-live="polite">
          {active + 1} / {accounts.length}
        </span>
        <button type="button" onClick={() => nudge(-1)} aria-label="Previous accounts" className="grid size-11 place-items-center rounded-full border border-line transition hover:bg-surface-2">
          <ArrowLeft className="size-4" />
        </button>
        <button type="button" onClick={() => nudge(1)} aria-label="More accounts" className="grid size-11 place-items-center rounded-full border border-line transition hover:bg-surface-2">
          <ArrowRight className="size-4" />
        </button>
      </div>
      <ul
        ref={row}
        // Sideways swipes stay with the row; vertical wheel still scrolls the page.
        data-lenis-prevent-horizontal
        onScroll={(e) => {
          const el = e.currentTarget;
          const step = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 1;
          setActive(Math.min(accounts.length - 1, Math.round(el.scrollLeft / (step + 20))));
        }}
        className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-gutter pb-6 [scrollbar-width:none] lg:px-[max(var(--gutter),calc((100vw-80rem)/2+var(--gutter)))]"
      >
        {accounts.map((a, i) => (
          <motion.li
            key={a.handle}
            initial={{ opacity: 0, y: 60, rotate: i % 2 ? 4 : -4, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 160, damping: 20, delay: Math.min(i, 4) * 0.08 }}
            className="w-[min(84vw,340px)] shrink-0 snap-start lg:scroll-ml-[max(var(--gutter),calc((100vw-80rem)/2+var(--gutter)))]"
          >
            <article className="group overflow-hidden rounded-[28px] border border-line bg-bg shadow-[var(--shadow)] transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-2">
              <header className="flex items-center gap-3 px-4 py-3">
                <span className="story-ring shrink-0">
                  <span className="grid size-9 place-items-center rounded-full bg-bg">
                    <InstagramIcon aria-hidden className="size-4" />
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold">{a.label}</span>
                  <span className="block truncate text-[12px] text-muted">@{a.handle}</span>
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-[#ff3b5c] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  <span className="pulse-dot size-1.5! bg-white!" aria-hidden /> Live
                </span>
              </header>
              <div className="relative h-[470px] bg-white" onMouseLeave={() => setBrowsing(null)}>
                <span aria-hidden className="absolute inset-0 grid place-items-center text-[13px] text-[#86868b]">
                  Loading @{a.handle}…
                </span>
                <iframe
                  src={`https://www.instagram.com/${a.handle}/embed/`}
                  title={`${a.label} on Instagram`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                  className="relative size-full border-0"
                />
                {/* An iframe swallows wheel and swipe events, so it sits under a shield until clicked. */}
                {browsing !== a.handle && (
                  <button
                    type="button"
                    onClick={() => setBrowsing(a.handle)}
                    aria-label={`Browse @${a.handle}'s feed`}
                    className="group/shield absolute inset-0 z-10 flex items-end justify-center pb-5"
                  >
                    <span className="rounded-full bg-black/75 px-4 py-2 text-[12px] font-semibold text-white backdrop-blur transition-opacity lg:opacity-0 lg:group-hover/shield:opacity-100">
                      Tap to browse the feed
                    </span>
                  </button>
                )}
              </div>
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ig-gradient shine flex h-11 items-center justify-center gap-1.5 text-[14px] font-semibold text-white"
              >
                Open on Instagram <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </article>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
