"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Bookmark, ChevronLeft, ChevronRight, Heart, MessageCircle, MoreHorizontal, Pin, Send } from "lucide-react";
import { useRef, useState } from "react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";

const { about } = profile;
const tints = ["#fa7e1e, #d62976", "#d62976, #962fbf", "#962fbf, #4f5bd5", "#4f5bd5, #d62976", "#1a0a12, #962fbf"];
// Cover, one slide per story paragraph, then a closing "save this" slide.
const slides = ["cover", ...about.story, "end"];

/** "My story" as an Instagram post opened on desktop: a text carousel beside its caption and comments. */
export function StoryPost() {
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [burst, setBurst] = useState(0);
  const [hearts, setHearts] = useState<Set<number>>(() => new Set());

  const goTo = (n: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: Math.max(0, Math.min(slides.length - 1, n)) * el.clientWidth, behavior: "smooth" });
  };
  const like = () => {
    setLiked(true);
    setBurst((b) => b + 1);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      aria-label="My story, as a carousel post"
      className="mx-auto grid max-w-6xl overflow-hidden rounded-[28px] border border-line bg-bg shadow-[var(--shadow)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
    >
      {/* Media: swipeable slides. */}
      <div className="relative min-w-0 bg-ink">
        <div
          ref={track}
          data-lenis-prevent-horizontal
          onScroll={(e) => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          onDoubleClick={like}
          className="flex aspect-[4/5] snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] lg:aspect-auto lg:h-[min(44rem,82svh)]"
        >
          {slides.map((s, k) => (
            <section
              key={k}
              aria-label={`Slide ${k + 1} of ${slides.length}`}
              className="relative flex w-full shrink-0 snap-center flex-col justify-between overflow-hidden p-7 text-white sm:p-10"
              style={{ background: `linear-gradient(150deg, ${tints[k % tints.length]})` }}
            >
              <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.3),transparent_55%)]" />
              <span aria-hidden className="drift absolute -bottom-24 -left-24 size-72 rounded-full bg-white/15 blur-3xl" />
              {s === "cover" ? (
                <>
                  <p className="relative text-[12px] font-semibold uppercase tracking-[0.18em] text-white/80">My story · {slides.length} slides</p>
                  <h2 className="headline relative text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.95]">
                    More than content. A strategy behind <span className="serif">every post.</span>
                  </h2>
                  <p className="relative flex items-center gap-2 text-[14px] font-semibold">
                    Swipe <span className="bob inline-block">→</span>
                  </p>
                </>
              ) : s === "end" ? (
                <>
                  <p className="relative text-[12px] font-semibold uppercase tracking-[0.18em] text-white/80">That&rsquo;s me</p>
                  <p className="serif relative text-[clamp(2.4rem,5vw,4rem)] leading-[1]">Save this for when your brand needs a plan. 🔖</p>
                  <Link href="/contact" className="relative w-fit rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-[#1a0a12] transition-transform hover:scale-105">
                    Let&rsquo;s talk →
                  </Link>
                </>
              ) : (
                <>
                  <p className="serif relative text-[clamp(4rem,9vw,7rem)] leading-none opacity-90">{String(k).padStart(2, "0")}</p>
                  <p className="relative text-[clamp(1.25rem,2.1vw,1.75rem)] font-medium leading-snug">{s}</p>
                  <p className="relative text-[12px] font-semibold text-white/75">
                    {k + 1}/{slides.length}
                  </p>
                </>
              )}
            </section>
          ))}
        </div>

        {/* Re-keyed so the heart replays on every like. */}
        {burst > 0 && (
          <Heart key={burst} aria-hidden className="like-pop pointer-events-none absolute left-1/2 top-1/2 -ml-14 -mt-14 size-28 fill-white text-white drop-shadow-xl" />
        )}
        {i > 0 && (
          <button type="button" onClick={() => goTo(i - 1)} aria-label="Previous slide" className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#1a0a12] shadow transition hover:scale-110">
            <ChevronLeft className="size-5" />
          </button>
        )}
        {i < slides.length - 1 && (
          <button type="button" onClick={() => goTo(i + 1)} aria-label="Next slide" className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#1a0a12] shadow transition hover:scale-110">
            <ChevronRight className="size-5" />
          </button>
        )}
        <div aria-hidden className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
          {slides.map((_, k) => (
            <span key={k} className={cn("h-1.5 rounded-full transition-all duration-500", k === i ? "w-5 bg-white" : "w-1.5 bg-white/50")} />
          ))}
        </div>
      </div>

      {/* Caption + comments. */}
      <div className="flex min-w-0 flex-col">
        <header className="flex items-center gap-3 border-b border-line px-5 py-3.5">
          <span className="story-ring shrink-0">
            <span className="ig-gradient grid size-9 place-items-center rounded-full border-2 border-bg text-[11px] font-bold text-white">{profile.identity.initials}</span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-semibold">{profile.identity.handle}</span>
            <span className="block text-[12px] text-muted">Original story</span>
          </span>
          <MoreHorizontal aria-hidden className="size-5 text-muted" />
        </header>

        <div className="min-w-0 flex-1 space-y-5 px-5 py-5">
          <p className="text-[15px] leading-relaxed">
            <span className="font-semibold">{profile.identity.handle}</span> {about.lede} <span className="text-[#3897f0]">#socialmedia #contentstrategy #branding</span>
          </p>
          <p className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-muted">
            <Pin aria-hidden className="size-3.5" /> What I bring to the table
          </p>
          <motion.ul initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ staggerChildren: 0.12 }} className="space-y-4">
            {about.bring.map((b, k) => (
              <motion.li
                key={b.title}
                variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}
                className="flex gap-3"
              >
                <span className="ig-gradient grid size-8 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white">{profile.identity.initials}</span>
                <p className="min-w-0 flex-1 text-[14px] leading-snug">
                  <span className="font-semibold">{profile.identity.handle}</span> <span className="font-semibold">{b.title}</span> — <span className="text-muted">{b.text}</span>
                </p>
                <button
                  type="button"
                  aria-pressed={hearts.has(k)}
                  aria-label={`Like "${b.title}"`}
                  onClick={() =>
                    setHearts((s) => {
                      const n = new Set(s);
                      if (!n.delete(k)) n.add(k);
                      return n;
                    })
                  }
                  className="shrink-0 self-start pt-0.5"
                >
                  <Heart className={cn("size-3.5 transition-transform", hearts.has(k) ? "scale-125 fill-[#ff3b5c] text-[#ff3b5c]" : "text-muted")} />
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="border-t border-line px-5 pb-4 pt-3">
          <div className="flex items-center gap-4">
            <button type="button" aria-pressed={liked} aria-label="Like" onClick={() => (liked ? setLiked(false) : like())}>
              <Heart className={cn("size-6 transition-transform active:scale-75", liked && "fill-[#ff3b5c] text-[#ff3b5c]")} />
            </button>
            <Link href="/contact" aria-label="Comment — message me">
              <MessageCircle className="size-6 -scale-x-100" />
            </Link>
            <Link href="/contact" aria-label="Send — message me">
              <Send className="size-6" />
            </Link>
            <button type="button" aria-pressed={saved} aria-label="Save" onClick={() => setSaved((v) => !v)} className="ml-auto">
              <Bookmark className={cn("size-6 transition-transform active:scale-75", saved && "fill-current")} />
            </button>
          </div>
          <p className="mt-2 h-5 text-[13px] font-semibold">{liked ? "Liked by you" : "Be the first to like this"}</p>
          <Link href="/contact" className="mt-2 flex h-11 items-center justify-between rounded-full border border-line pl-4 pr-1.5 text-[14px] text-muted transition-colors hover:border-fg/30">
            Add a comment… or slide into my DMs
            <span className="ig-gradient grid size-8 place-items-center rounded-full text-white">
              <Send aria-hidden className="size-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
