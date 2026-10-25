"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Bookmark, Check, ChevronLeft, ChevronRight, Heart, MessageCircle, Send } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import type { services } from "@/content/services";
import { profile } from "@/content/profile";
import { StoryAvatar } from "@/components/mocks/Mocks";
import { motionAllowed } from "@/lib/motion-pref";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/cn";
import { postId, tints } from "./shared";

type Service = (typeof services)[number];
const SLIDES = 3;

/** A service as an Instagram post: a three-slide carousel, an action bar and a caption. */
export function ServicePost({ service, index, total }: { service: Service; index: number; total: number }) {
  const [slide, setSlide] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [burst, setBurst] = useState(0);
  const [open, setOpen] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const lastTap = useRef(0);
  const Icon = service.icon;
  const id = postId(index);
  const words = service.title.split(" ");
  const tint = tints[index % tints.length];
  const n = String(index + 1).padStart(2, "0");

  const go = (to: number) => {
    const el = track.current;
    if (!el) return;
    const k = Math.max(0, Math.min(SLIDES - 1, to));
    el.scrollTo({ left: k * el.clientWidth, behavior: motionAllowed() ? "smooth" : "auto" });
  };

  const like = () => {
    setLiked(true);
    setBurst((b) => b + 1);
  };

  // A click on the media within 300ms of the last one is a double-tap: always ends liked, like Instagram.
  const onMediaClick = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      like();
      lastTap.current = 0;
    } else lastTap.current = now;
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(slide + 1);
    else if (e.key === "ArrowLeft") go(slide - 1);
    else if (e.key === "Enter") like();
    else return;
    e.preventDefault();
  };

  const share = async () => {
    const url = `${location.origin}/services#${id}`;
    try {
      if (navigator.share) await navigator.share({ title: service.title, url });
      else {
        await navigator.clipboard.writeText(url);
        toast("Link copied — send it to your team");
      }
    } catch {
      // Share sheet dismissed; nothing to do.
    }
  };

  return (
    <article id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 overflow-hidden rounded-[26px] border border-line bg-bg shadow-[var(--shadow)]">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3">
        <StoryAvatar label={profile.identity.initials} className="size-9 text-[11px]" />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[14px] font-semibold">{profile.identity.handle}</p>
          <p className="truncate text-[12px] text-muted">{service.short} · Service {n}</p>
        </div>
        <span aria-hidden className="px-1 text-[18px] leading-none tracking-[0.1em] text-muted">
          •••
        </span>
      </header>

      {/* Media: a swipeable three-slide carousel */}
      {/* A size container: slide type scales with the post, not the viewport. */}
      <div className="@container relative">
        <div
          ref={track}
          data-carousel
          data-lenis-prevent-horizontal
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={`${service.title}: slide ${slide + 1} of ${SLIDES}. Use arrow keys to browse, Enter to like.`}
          onScroll={(e) => setSlide(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          onKeyDown={onKey}
          onClick={onMediaClick}
          className="flex aspect-[4/5] snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [touch-action:manipulation] focus-visible:outline-offset-[-3px] [&::-webkit-scrollbar]:hidden"
        >
          {/* 1 · Cover */}
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={`1 of ${SLIDES}`}
            className="relative flex w-full shrink-0 snap-center flex-col overflow-hidden p-[clamp(1.1rem,6.5cqi,1.75rem)] pb-12 text-white"
            style={{ background: tint }}
          >
            <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.4),transparent_55%)]" />
            <Icon aria-hidden strokeWidth={1} className="pointer-events-none absolute -bottom-[12%] -right-[14%] size-[78%] rotate-[-14deg] text-white/15" />
            <div className="relative flex items-center justify-between">
              <span className="grid size-14 place-items-center rounded-2xl bg-white/20 shadow-lg ring-1 ring-white/30 backdrop-blur-md">
                <Icon aria-hidden className="size-7" />
              </span>
              <span className="headline text-[13px] tracking-[0.18em] text-white/80">
                {n}/{String(total).padStart(2, "0")}
              </span>
            </div>
            <h3 id={`${id}-title`} className="headline relative mt-auto text-[clamp(1.75rem,12cqi,3.1rem)] leading-[0.95]">
              {words.slice(0, -1).join(" ")} <span className="serif">{words.at(-1)}</span>
            </h3>
            <span className="bob relative mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-[#1a0a12] shadow-lg">
              Swipe for the details <ChevronRight aria-hidden className="size-3.5" />
            </span>
          </div>

          {/* 2 · The idea */}
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={`2 of ${SLIDES}`}
            className="relative flex w-full shrink-0 snap-center flex-col overflow-hidden bg-[#fff7f9] p-[clamp(1.1rem,6.5cqi,1.75rem)] pb-11 text-[#1a0a12]"
          >
            <span aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full opacity-60 blur-3xl" style={{ background: tint }} />
            <p className="relative text-[12px] font-semibold uppercase tracking-[0.2em] text-[#6b3a4e]">The idea</p>
            <span aria-hidden className="serif relative mt-1 block h-[clamp(1.75rem,11cqi,3rem)] text-[clamp(3.5rem,20cqi,5.5rem)] leading-none" style={{ backgroundImage: tint, WebkitBackgroundClip: "text", color: "transparent" }}>
              &ldquo;
            </span>
            <p className="headline relative mt-2 text-[clamp(1rem,6.2cqi,1.7rem)] font-semibold leading-[1.18] tracking-[-0.025em]">
              {service.description}
            </p>
            <p className="relative mt-auto flex items-center gap-2 truncate pt-3 text-[12px] font-semibold">
              <StoryAvatar label={profile.identity.initials} className="size-6 text-[8px]" />
              {profile.identity.name} · @{profile.identity.handle}
            </p>
          </div>

          {/* 3 · Deliverables */}
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={`3 of ${SLIDES}`}
            className="relative flex w-full shrink-0 snap-center flex-col overflow-hidden bg-[#1a0a12] p-[clamp(1.1rem,6.5cqi,1.75rem)] pb-12 text-white"
          >
            <span aria-hidden className="absolute -bottom-24 -left-20 size-72 rounded-full opacity-70 blur-[70px]" style={{ background: tint }} />
            <p className="relative text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60">What you get</p>
            <p className="headline relative mt-1.5 text-[clamp(1.3rem,8cqi,2.1rem)]">
              The <span className="serif ig-text pr-[0.06em]">checklist.</span>
            </p>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ root: track, amount: 0.6 }}
              transition={{ staggerChildren: 0.08 }}
              className="relative mt-auto space-y-[clamp(0.3rem,2.4cqi,0.7rem)] pt-3"
            >
              {service.items.map((item) => (
                <motion.li
                  key={item}
                  variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className="flex items-start gap-2.5 text-[clamp(12.5px,4.4cqi,15px)] leading-snug text-white/90"
                >
                  <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full text-white" style={{ background: tint }}>
                    <Check aria-hidden className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Slide counter, arrows and the double-tap heart sit over the media. */}
        <span aria-hidden className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          {slide + 1}/{SLIDES}
        </span>
        <button
          type="button"
          onClick={() => go(slide - 1)}
          aria-label="Previous slide"
          className={cn(
            "absolute bottom-1 left-2.5 grid size-10 ring-1 ring-black/10 sm:bottom-1.5 sm:size-9 place-items-center rounded-full bg-white/90 text-[#1a0a12] shadow-md transition-[opacity,transform] hover:scale-110",
            slide === 0 && "pointer-events-none opacity-0",
          )}
          tabIndex={slide === 0 ? -1 : 0}
        >
          <ChevronLeft aria-hidden className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => go(slide + 1)}
          aria-label="Next slide"
          className={cn(
            "absolute bottom-1 right-2.5 grid size-10 ring-1 ring-black/10 sm:bottom-1.5 sm:size-9 place-items-center rounded-full bg-white/90 text-[#1a0a12] shadow-md transition-[opacity,transform] hover:scale-110",
            slide === SLIDES - 1 && "pointer-events-none opacity-0",
          )}
          tabIndex={slide === SLIDES - 1 ? -1 : 0}
        >
          <ChevronRight aria-hidden className="size-4" />
        </button>
        {/* Slide dots: 40px-tall hit areas so they work as tap targets on phones. */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          {Array.from({ length: SLIDES }, (_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => go(k)}
              aria-label={`Show slide ${k + 1}`}
              aria-current={slide === k}
              className="grid size-10 place-items-center"
            >
              <span className={cn("h-1.5 rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.12)] transition-all duration-300", slide === 1 ? (slide === k ? "w-4 bg-[#1a0a12]" : "w-1.5 bg-[#1a0a12]/30") : slide === k ? "w-4 bg-white" : "w-1.5 bg-white/55")} />
            </button>
          ))}
        </div>
        {burst > 0 && (
          <Heart
            key={burst}
            aria-hidden
            className="like-pop pointer-events-none absolute left-1/2 top-1/2 z-[2] -ml-14 -mt-14 size-28 fill-white text-white drop-shadow-[0_12px_30px_rgba(214,41,118,0.55)]"
          />
        )}
      </div>

      {/* Action bar */}
      <div className="relative flex items-center px-2 pt-1.5">
        <button
          type="button"
          onClick={() => (liked ? setLiked(false) : like())}
          aria-pressed={liked}
          aria-label={`Like ${service.title}`}
          className="grid size-11 place-items-center rounded-full transition-transform active:scale-75"
        >
          <motion.span key={String(liked)} initial={liked ? { scale: 0.4 } : false} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 12 }}>
            <Heart aria-hidden className={cn("size-[26px] transition-colors", liked && "fill-[#ff3040] text-[#ff3040]")} />
          </motion.span>
        </button>
        <Link href="/contact" aria-label={`Ask about ${service.title}`} className="grid size-11 place-items-center rounded-full transition-transform hover:scale-110">
          <MessageCircle aria-hidden className="size-[26px] -scale-x-100" />
        </Link>
        <button type="button" onClick={share} aria-label={`Share ${service.title}`} className="grid size-11 place-items-center rounded-full transition-transform hover:scale-110">
          <Send aria-hidden className="size-6" />
        </button>

        <button
          type="button"
          onClick={() => {
            setSaved((s) => !s);
            if (!saved) toast("Saved — it’ll be here when you’re ready");
          }}
          aria-pressed={saved}
          aria-label={`Save ${service.title}`}
          className="ml-auto grid size-11 place-items-center rounded-full transition-transform active:scale-75"
        >
          <Bookmark aria-hidden className={cn("size-[26px] transition-colors", saved && "fill-fg")} />
        </button>
      </div>

      {/* Caption */}
      <div className="px-4 pb-5 text-[14px] leading-relaxed">
        <p className="h-5 text-[13px] font-semibold" aria-live="polite">
          {liked ? (
            <>
              Liked by <span className="ig-text">you</span>
            </>
          ) : (
            <span className="font-normal text-muted">Double-tap the post to like it</span>
          )}
        </p>
        <div id={`${id}-caption`} className={cn("mt-1.5", !open && "line-clamp-2")}>
          <span className="font-semibold">{profile.identity.handle}</span> {service.description}
          {open && (
            <>
              <ul className="mt-3 space-y-1">
                {service.items.map((item) => (
                  <li key={item}>✦ {item}</li>
                ))}
              </ul>
              <p className="mt-3 text-accent">
                #{service.short.replace(/\s+/g, "")} #StrategyFirst #CreativityWithPurpose
              </p>
            </>
          )}
        </div>
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={`${id}-caption`}
            className="-ml-1 min-h-10 px-1 text-[14px] text-muted transition-colors hover:text-fg"
          >
            {open ? "less" : "… more"}
          </button>
          <Link
            href="/contact"
            className="group -mr-1 inline-flex min-h-10 items-center gap-1 px-1 text-[14px] font-semibold text-accent"
          >
            Book this <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-subtle">
          Service {index + 1} of {total}
        </p>
      </div>
    </article>
  );
}
