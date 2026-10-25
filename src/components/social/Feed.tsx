"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Grid3x3, Heart, Layers, MessageCircle, Music, Play, Radio, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { RevealText } from "@/components/motion/RevealText";

/* Sample hooks in the formats Tanu writes. Counts are illustrative. */
const posts = [
  { type: "Reel", Icon: Play, hook: "POV: your content finally has a plan.", tint: "#fa7e1e, #d62976", likes: "12.4k", comments: "318" },
  { type: "Carousel", Icon: Layers, hook: "Swipe → 5 caption formulas that get saves.", tint: "#d62976, #962fbf", likes: "3.9k", comments: "142" },
  { type: "Reel", Icon: Play, hook: "Doctor myth #3, busted in 15 seconds.", tint: "#4f5bd5, #962fbf", likes: "8.1k", comments: "264" },
  { type: "Story", Icon: Radio, hook: "Poll: which post should go live tonight?", tint: "#feda75, #fa7e1e", likes: "1.2k", comments: "96" },
  { type: "Carousel", Icon: Layers, hook: "Your bio is losing you clients. Fix it in 3 lines.", tint: "#962fbf, #fa7e1e", likes: "5.6k", comments: "201" },
  { type: "Ad", Icon: Sparkles, hook: "Launch week: one offer, three audiences.", tint: "#d62976, #4f5bd5", likes: "2.7k", comments: "88" },
];

const tabs = [
  { label: "All", Icon: Grid3x3, match: () => true },
  { label: "Reels", Icon: Play, match: (t: string) => t === "Reel" },
  { label: "Carousels", Icon: Layers, match: (t: string) => t === "Carousel" },
  { label: "Stories & Ads", Icon: Radio, match: (t: string) => t === "Story" || t === "Ad" },
];

/** A profile grid of the formats I create, with Instagram-style tabs and hover stats. */
export function Feed() {
  const [tab, setTab] = useState(0);
  const [liked, setLiked] = useState<Set<string>>(() => new Set());
  const toggle = (hook: string) =>
    setLiked((s) => {
      const n = new Set(s);
      if (!n.delete(hook)) n.add(hook);
      return n;
    });
  const shown = posts.filter((p) => tabs[tab].match(p.type));

  return (
    <section aria-labelledby="feed-title" className="container-page py-20 lg:py-28">
      <div className="text-center">
        <p className="eyebrow mark">The feed</p>
        <RevealText as="h2" id="feed-title" className="headline mx-auto mt-3 max-w-3xl text-[clamp(2.4rem,5.5vw,4.5rem)]">
          Content made to <span className="serif ig-text pr-[0.05em]">stop the scroll.</span>
        </RevealText>
        <p className="mx-auto mt-5 max-w-xl text-[17px] text-muted">Reels, carousels, stories and ads — every format with a hook, a purpose and a plan.</p>
      </div>

      <div className="mx-auto mt-12 max-w-5xl border-t border-line">
        <div className="flex justify-center gap-6 sm:gap-12">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setTab(i)}
              aria-pressed={tab === i}
              className={cn(
                "relative -mt-px flex items-center gap-1.5 border-t py-4 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors sm:text-[12px]",
                tab === i ? "border-fg text-fg" : "border-transparent text-muted hover:text-fg",
              )}
            >
              <t.Icon aria-hidden className="size-3.5" />
              <span className={cn(i > 0 && "max-sm:sr-only")}>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tiles pop in one by one when the grid scrolls into view; later tab changes reuse the same variants. */}
        <motion.ul
          layout
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.09 }}
          className="grid grid-cols-2 gap-1.5 sm:gap-3 md:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.li
                key={p.hook}
                layout
                variants={{
                  hidden: { opacity: 0, scale: 0.6, y: 60, rotate: i % 2 ? 8 : -8 },
                  show: { opacity: 1, scale: 1, y: 0, rotate: 0 },
                }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <button
                  type="button"
                  onClick={() => toggle(p.hook)}
                  // Two clicks toggle twice; a double-tap should always end liked, like Instagram.
                  onDoubleClick={() => setLiked((s) => new Set(s).add(p.hook))}
                  aria-pressed={liked.has(p.hook)}
                  aria-label={`Like: ${p.hook}`}
                  data-cursor="Like"
                  className={cn(
                    "shine group relative flex aspect-[4/5] w-full flex-col overflow-hidden rounded-xl p-4 text-left text-white transition-transform duration-700 ease-[var(--ease-expo)] hover:z-10 hover:scale-[1.03] sm:rounded-2xl sm:p-6",
                    i % 2 ? "hover:rotate-1" : "hover:-rotate-1",
                  )}
                  style={{ background: `linear-gradient(150deg, ${p.tint})` }}
                >
                  <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.35),transparent_60%)]" />
                  <span className="relative flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest sm:text-[12px]">
                    <span>
                      {p.type}
                      {p.type === "Ad" && <span className="ml-1.5 font-medium normal-case tracking-normal text-white/75">· Sponsored</span>}
                    </span>
                    <span className="flex items-center gap-2">
                      <Heart aria-hidden className={cn("size-4 transition-transform", liked.has(p.hook) && "scale-125 fill-[#ff3b5c] text-[#ff3b5c]")} />
                      <p.Icon aria-hidden className={cn("size-4", p.type === "Reel" && "fill-white")} />
                    </span>
                  </span>
                  {liked.has(p.hook) && (
                    <Heart aria-hidden className="like-pop pointer-events-none absolute left-1/2 top-1/2 z-[2] -ml-12 -mt-12 size-24 fill-white text-white drop-shadow-xl" />
                  )}
                  <span className="serif relative mt-auto block text-[clamp(1.25rem,2.8vw,2.3rem)] leading-[1.02]">{p.hook}</span>
                  <FormatDetails type={p.type} />
                  <span className="absolute inset-0 flex items-center justify-center gap-6 bg-black/45 text-[15px] font-bold opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-1.5">
                      <Heart aria-hidden className="size-5 fill-white" /> {liked.has(p.hook) ? "You + " : ""}
                      {p.likes}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle aria-hidden className="size-5 fill-white" /> {p.comments}
                    </span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
      <p className="mt-8 text-center text-[13px] text-muted">
        Tap a post to like it — or double-tap anywhere on this site. <span aria-hidden>❤️</span>
      </p>
    </section>
  );
}

/** The small UI that tells formats apart at a glance: reel audio + progress, carousel dots, a story poll, an ad's CTA bar. */
function FormatDetails({ type }: { type: string }) {
  if (type === "Reel")
    return (
      <span aria-hidden className="relative mt-3 block">
        <span className="flex items-center gap-1.5 text-[11px] text-white/85">
          <Music className="size-3" /> Original audio
        </span>
        <span className="mt-2 block h-[3px] overflow-hidden rounded-full bg-white/30">
          <span className="reel-progress block h-full bg-white" />
        </span>
      </span>
    );
  if (type === "Carousel")
    return (
      <span aria-hidden className="relative mt-3 flex items-center justify-between">
        <span className="flex gap-1">
          {[0, 1, 2, 3, 4].map((k) => (
            <span key={k} className={cn("size-1.5 rounded-full", k ? "bg-white/45" : "bg-white")} />
          ))}
        </span>
        <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-semibold">1/5</span>
      </span>
    );
  if (type === "Story")
    return (
      <span aria-hidden className="relative mt-3 grid grid-cols-2 gap-1 rounded-xl bg-white p-1 text-[10px] font-bold text-[#1a0a12] shadow-lg sm:gap-1.5 sm:p-1.5 sm:text-[12px]">
        <span className="rounded-lg bg-[#f1f1f1] py-1.5 text-center transition-colors group-hover:bg-[#ffe3ec]">Reel 🎬</span>
        <span className="rounded-lg bg-[#f1f1f1] py-1.5 text-center">Carousel 📚</span>
      </span>
    );
  if (type === "Ad")
    return (
      <span aria-hidden className="relative -mx-4 -mb-4 mt-3 flex items-center justify-between bg-white/95 px-4 py-2.5 text-[12px] font-semibold text-[#1a0a12] sm:-mx-6 sm:-mb-6 sm:px-6 sm:text-[13px]">
        Learn more <ChevronRight className="size-4" />
      </span>
    );
  return null;
}
