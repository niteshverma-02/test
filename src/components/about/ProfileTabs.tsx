"use client";

import { motion } from "motion/react";
import { AtSign, Grid3x3, Pin, StickyNote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getLenis } from "@/lib/scroll";
import { cn } from "@/lib/cn";

export const aboutTabs = [
  { id: "story", label: "Story", Icon: Grid3x3 },
  { id: "pinned", label: "Pinned", Icon: Pin },
  { id: "thread", label: "Thread", Icon: AtSign },
  { id: "notes", label: "Notes", Icon: StickyNote },
];

/** Instagram-style profile tabs that stick under the nav and follow the section in view. */
export function ProfileTabs() {
  const nav = useRef<HTMLElement>(null);
  const [active, setActive] = useState(aboutTabs[0].id);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-40% 0px -55% 0px" });
    aboutTabs.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el || !nav.current) return;
    // Land the section just under the sticky nav + tabs.
    const offset = -nav.current.getBoundingClientRect().bottom - 16;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset, duration: 1.2 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
  };

  return (
    <nav ref={nav} aria-label="About sections" className="sticky top-[var(--nav-h)] z-30 border-y border-line bg-[var(--glass)] backdrop-blur-xl backdrop-saturate-150">
      <ul className="container-page flex justify-center gap-5 max-[360px]:gap-3 sm:gap-14">
        {aboutTabs.map((t) => (
          <li key={t.id}>
            <a
              href={`#${t.id}`}
              onClick={(e) => {
                e.preventDefault();
                go(t.id);
              }}
              aria-current={active === t.id ? "location" : undefined}
              className={cn(
                "relative flex items-center gap-1.5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors sm:text-[12px]",
                active === t.id ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              <t.Icon aria-hidden className="size-3.5 max-[360px]:hidden" />
              {t.label}
              {active === t.id && <motion.span layoutId="about-tab" className="absolute inset-x-0 -top-px h-[2px] rounded-full" style={{ background: "var(--ig)" }} />}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
