"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Heart, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { services } from "@/content/services";
import { profile } from "@/content/profile";
import { StoryAvatar } from "@/components/mocks/Mocks";
import { getLenis } from "@/lib/scroll";
import { cn } from "@/lib/cn";

type Story = (typeof services)[number];

const backgrounds = [
  "linear-gradient(160deg, #feda75, #fa7e1e 45%, #d62976)",
  "linear-gradient(160deg, #fa7e1e, #d62976 55%, #962fbf)",
  "linear-gradient(160deg, #d62976, #962fbf 60%, #4f5bd5)",
  "linear-gradient(160deg, #962fbf, #4f5bd5 60%, #2b3a9e)",
  "linear-gradient(160deg, #4f5bd5, #962fbf 50%, #d62976)",
  "linear-gradient(160deg, #1a0a12, #962fbf 70%, #fa7e1e)",
];

/**
 * Full-screen stories, Instagram-style: bars fill and advance on their own,
 * tap the left/right of the card to step, hold to pause, Esc to close.
 * With reduced motion the bars stay still and stories only change on tap.
 */
export function StoryViewer({ stories, start, onClose }: { stories: readonly Story[]; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const [paused, setPaused] = useState(false);
  const [liked, setLiked] = useState<Set<number>>(() => new Set());
  const dialog = useRef<HTMLDivElement>(null);
  const story = stories[i];
  const Icon = story.icon;

  const next = useCallback(() => (i + 1 < stories.length ? setI(i + 1) : onClose()), [i, stories.length, onClose]);
  const prev = useCallback(() => setI((v) => Math.max(0, v - 1)), []);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    dialog.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    return () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
      opener?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Tab" && dialog.current) {
        const items = dialog.current.querySelectorAll<HTMLElement>("a, button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  const toggleLike = () =>
    setLiked((s) => {
      const n = new Set(s);
      if (!n.delete(i)) n.add(i);
      return n;
    });

  // Portalled: ancestors with transforms or backdrop blur would trap a fixed overlay.
  return createPortal(
    <motion.div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`Story ${i + 1} of ${stories.length}: ${story.title}`}
      className="fixed inset-0 z-[96] grid place-items-center bg-[#0b0508]/90 p-3 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      data-lenis-prevent
    >
      <button
        type="button"
        onClick={prev}
        disabled={i === 0}
        aria-label="Previous story"
        className="absolute left-[max(1rem,calc(50%-min(44svh,380px)*0.5625-5rem))] hidden size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-0 md:grid"
      >
        <ChevronLeft className="size-5" />
      </button>

      <motion.article
        key="card"
        initial={{ scale: 0.86, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative flex aspect-[9/16] h-[min(88svh,760px)] max-w-full select-none flex-col overflow-hidden rounded-[28px] text-white shadow-2xl"
        style={{ background: backgrounds[i % backgrounds.length] }}
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onPointerLeave={() => setPaused(false)}
      >
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.35),transparent_55%)]" />

        {/* Progress */}
        <div className="relative z-20 flex gap-1 px-3 pt-3" aria-hidden>
          {stories.map((s, k) => (
            <span key={s.title} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/35">
              {k < i && <span className="block h-full bg-white" />}
              {k === i && (
                <span
                  key={i}
                  className="story-fill block h-full origin-left bg-white"
                  style={{ animationPlayState: paused ? "paused" : "running" }}
                  onAnimationEnd={next}
                />
              )}
            </span>
          ))}
        </div>

        {/* Header */}
        <div className="relative z-20 flex items-center gap-2.5 px-3 pt-3">
          <StoryAvatar label={profile.identity.initials} className="size-8 text-[10px]" />
          <p className="text-[13px] font-semibold">
            {profile.identity.handle} <span className="font-normal text-white/70">· Services</span>
          </p>
          <button data-close type="button" onClick={onClose} aria-label="Close stories" className="ml-auto grid size-9 place-items-center rounded-full hover:bg-white/15">
            <X className="size-5" />
          </button>
        </div>

        {/* Tap zones */}
        <button type="button" tabIndex={-1} aria-hidden onClick={prev} className="absolute inset-y-0 left-0 z-10 w-[30%] cursor-w-resize" />
        <button type="button" tabIndex={-1} aria-hidden onClick={next} className="absolute inset-y-0 right-0 z-10 w-[70%] cursor-e-resize" />

        {/* Body */}
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none relative flex flex-1 flex-col justify-center px-6"
        >
          <span className="grid size-14 place-items-center rounded-2xl bg-white/20 backdrop-blur">
            <Icon aria-hidden className="size-7" />
          </span>
          <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/75">
            {String(i + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
          </p>
          <h2 className="headline mt-2 text-[clamp(1.9rem,4.4svh,2.6rem)] leading-[1.02]">{story.title}</h2>
          <p className="mt-3 text-[15px] leading-snug text-white/85">{story.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {story.items.slice(0, 4).map((it, k) => (
              <motion.li
                key={it}
                initial={{ opacity: 0, scale: 0.6, rotate: k % 2 ? 6 : -6 }}
                animate={{ opacity: 1, scale: 1, rotate: k % 2 ? 2 : -2 }}
                transition={{ delay: 0.25 + k * 0.08, type: "spring", stiffness: 300, damping: 18 }}
                className="rounded-lg bg-white px-2.5 py-1 text-[12px] font-semibold text-[#1a0a12] shadow-lg"
              >
                {it}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Reply bar */}
        <div className="relative z-20 flex items-center gap-2 p-3">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex h-11 flex-1 items-center rounded-full border border-white/60 px-4 text-[14px] text-white/90 transition hover:bg-white/10"
          >
            Send message…
          </Link>
          <button
            type="button"
            onClick={toggleLike}
            aria-pressed={liked.has(i)}
            aria-label="Like this story"
            className="grid size-11 place-items-center rounded-full transition-transform active:scale-75"
          >
            <Heart className={cn("size-6 transition-colors", liked.has(i) && "fill-[#ff3b5c] text-[#ff3b5c]")} />
          </button>
          <Link href="/services" onClick={onClose} aria-label="See all services" className="grid size-11 place-items-center rounded-full">
            <Send className="size-6" />
          </Link>
        </div>
      </motion.article>

      <button
        type="button"
        onClick={next}
        aria-label={i + 1 < stories.length ? "Next story" : "Close stories"}
        className="absolute right-[max(1rem,calc(50%-min(44svh,380px)*0.5625-5rem))] hidden size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:grid"
      >
        <ChevronRight className="size-5" />
      </button>
    </motion.div>,
    document.body,
  );
}
