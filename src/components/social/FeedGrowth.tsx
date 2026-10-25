"use client";

import {
  ChevronDown,
  Grid3x3,
  Layers,
  Menu,
  Play,
  PlusSquare,
} from "lucide-react";
import { useRef, useState } from "react";
import { PhoneFrame } from "@/components/mocks/Mocks";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const steps = [
  {
    tag: "Profile",
    title: "A profile that says it all",
    text: "Research, positioning and a bio that tells the right people who you are — at a glance.",
  },
  {
    tag: "Stories",
    title: "Stories & highlights",
    text: "Everyday stories build trust. Highlights keep the best of them on your profile, forever.",
  },
  {
    tag: "Posts",
    title: "A feed with a plan",
    text: "Content pillars become reels and carousels — each with a hook, a purpose and a place in the grid.",
  },
  {
    tag: "Insights",
    title: "Learn, then grow",
    text: "Insights show what's working, and the next month of content gets sharper because of it.",
  },
];
// When each step starts on the scroll timeline (in timeline seconds).
const starts = [0, 2, 3.2, 7.8];
const highlights = ["Tips", "Reels", "FAQ", "Offers"];
const tints = [
  "#fa7e1e, #d62976",
  "#962fbf, #4f5bd5",
  "#feda75, #fa7e1e",
  "#d62976, #962fbf",
  "#4f5bd5, #d62976",
  "#fa7e1e, #feda75",
  "#962fbf, #d62976",
  "#d62976, #fa7e1e",
  "#4f5bd5, #962fbf",
];
const POSTS = tints.length;

/**
 * The home page's set piece: scroll, and an empty Instagram profile builds
 * itself — avatar, bio, highlights, posts, then insights — while the steps
 * beside it follow along. Pinned on every screen size. Illustrative only.
 */
export function FeedGrowth() {
  const section = useRef<HTMLElement>(null);
  // Without motion the finished profile simply shows, so start from the end.
  const [step, setStep] = useState(steps.length - 1);
  const [posts, setPosts] = useState(POSTS);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        setStep(0);
        setPosts(0);
        const q = gsap.utils.selector(section);
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section.current,
            pin: true,
            start: "top top",
            end: "+=2600",
            scrub: 0.7,
          },
          // The timeline's own update, not the trigger's: with scrub it lags the scroll, and the UI must match what's drawn.
          onUpdate: () => {
            const t = tl.time();
            setStep(starts.findLastIndex((s) => t >= s));
            setPosts(
              t < starts[2]
                ? 0
                : Math.min(POSTS, Math.floor((t - starts[2]) / 0.5) + 1),
            );
          },
        });
        tl.fromTo(
          q("[data-fg-avatar]"),
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(2)" },
          0,
        )
          .fromTo(
            q("[data-fg-ring]"),
            { opacity: 0, rotate: -90 },
            { opacity: 1, rotate: 0, duration: 0.8 },
            0.3,
          )
          .to(q("[data-fg-skel]"), { opacity: 0, duration: 0.4 }, 1)
          .fromTo(
            q("[data-fg-bio]"),
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
            1.1,
          )
          .fromTo(
            q("[data-fg-hl]"),
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              stagger: 0.18,
              ease: "back.out(2.4)",
            },
            starts[1],
          )
          .fromTo(
            q("[data-fg-post]"),
            { scale: 0, opacity: 0, rotate: (i) => (i % 2 ? 14 : -14) },
            {
              scale: 1,
              opacity: 1,
              rotate: 0,
              duration: 0.5,
              stagger: 0.5,
              ease: "back.out(1.8)",
            },
            starts[2],
          )
          .fromTo(
            q("[data-fg-insights]"),
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.8 },
            starts[3],
          )
          .fromTo(
            q("[data-fg-line]"),
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.4, ease: "none" },
            starts[3] + 0.4,
          )
          .fromTo(
            q("[data-fg-trend]"),
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
            starts[3] + 1.2,
          )
          .to({}, { duration: 0.6 });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      aria-labelledby="grow-title"
      className="relative overflow-hidden bg-ink text-[#fdf0f5]"
    >
      <span
        aria-hidden
        className="ig-gradient drift absolute -left-40 top-10 size-[30rem] rounded-full opacity-30 blur-[120px]"
      />
      <span
        aria-hidden
        className="ig-gradient drift absolute -bottom-40 right-0 size-[26rem] rounded-full opacity-25 blur-[120px] [animation-delay:-7s]"
      />

      <div className="container-page relative grid min-h-[100svh] items-center gap-6 pb-8 pt-[calc(var(--nav-h)+1.5rem)] lg:grid-cols-[1fr_auto] lg:gap-16 lg:py-[calc(var(--nav-h)+1rem)]">
        <div className="min-w-0">
          <p className="eyebrow mark">Watch it grow</p>
          <h2
            id="grow-title"
            className="headline mt-3 text-[clamp(2rem,5.2vw,4.5rem)] leading-[0.98]"
          >
            From empty profile to{" "}
            <span className="serif ig-text pr-[0.06em]">
              a feed people follow.
            </span>
          </h2>

          {/* Phones: only the active step, swapping in place. */}
          <div
            className="relative mt-5 h-[5.5rem] lg:hidden"
            aria-live="polite"
          >
            {steps.map((s, i) => (
              <p
                key={s.tag}
                className={cn(
                  "absolute inset-0 transition-all duration-500",
                  i === step
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0",
                )}
              >
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60">
                  {String(i + 1).padStart(2, "0")} · {s.tag}
                </span>
                <span className="mt-1 block text-[15px] leading-snug text-white/85">
                  {s.text}
                </span>
              </p>
            ))}
          </div>

          {/* Desktop: the whole list, the active step lit. */}
          <ol className="mt-10 hidden max-w-xl space-y-2 lg:block">
            {steps.map((s, i) => (
              <li
                key={s.tag}
                aria-current={i === step ? "step" : undefined}
                className={cn(
                  "relative rounded-3xl px-6 py-4 transition-all duration-500",
                  i === step ? "bg-white/10 opacity-100" : "opacity-40",
                )}
              >
                <span
                  className={cn(
                    "absolute inset-y-4 left-0 w-[3px] rounded-full transition-opacity",
                    i === step ? "opacity-100" : "opacity-0",
                  )}
                  style={{ background: "var(--ig)" }}
                />
                <p className="flex items-baseline gap-3">
                  <span
                    className={cn(
                      "serif text-[1.6rem] leading-none",
                      i === step && "ig-text",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[19px] font-semibold">{s.title}</span>
                </p>
                <p
                  className={cn(
                    "overflow-hidden text-[15px] leading-snug text-white/70 transition-all duration-500",
                    i === step ? "mt-2 max-h-24" : "max-h-0",
                  )}
                >
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div
          aria-hidden
          className="relative mx-auto w-[min(230px,calc((100svh-25rem)*0.47))] lg:w-[min(310px,calc((100svh-8rem)*0.47))]"
        >
          <span className="ig-gradient absolute inset-[-10%] rounded-full opacity-40 blur-3xl" />
          <PhoneFrame className="relative w-full">
            <ProfileScreen posts={posts} />
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}

/** The phone's screen: an Instagram profile in its build-up states. Sizes are in container units so it scales with the phone. */
function ProfileScreen({ posts }: { posts: number }) {
  return (
    // cqw on an element resolves against its *ancestor* container, so the container is this outer wrapper.
    <div className="h-full [container-type:inline-size]">
      <div className="relative flex h-full flex-col px-[4cqw] pt-[13cqw]">
        <div className="flex items-center justify-between text-[4.6cqw] font-bold">
          <span className="flex items-center gap-[1cqw]">
            your.brand <ChevronDown className="size-[4cqw]" />
          </span>
          <span className="flex gap-[3cqw]">
            <PlusSquare className="size-[5.5cqw]" />
            <Menu className="size-[5.5cqw]" />
          </span>
        </div>

        <div className="mt-[4cqw] flex items-center gap-[4cqw]">
          <span className="relative grid size-[21cqw] shrink-0 place-items-center rounded-full bg-[#efefef]">
            <span data-fg-ring className="story-ring absolute inset-0" />
            <span
              data-fg-avatar
              className="ig-gradient relative grid size-[85%] place-items-center rounded-full border-[0.8cqw] border-white text-[6cqw] font-bold text-white"
            >
              YB
            </span>
          </span>
          <div className="grid flex-1 grid-cols-3 text-center leading-tight">
            <span>
              <span className="block text-[4.4cqw] font-bold tabular-nums">
                {posts}
              </span>
              <span className="text-[3cqw] text-[#737373]">posts</span>
            </span>
            <span>
              <span className="block text-[4.4cqw] font-bold">4</span>
              <span className="text-[3cqw] text-[#737373]">highlights</span>
            </span>
            <span data-fg-trend className="grid place-items-center">
              <span className="rounded-full bg-[#e7f8ee] px-[2cqw] py-[0.6cqw] text-[3cqw] font-bold text-[#0a8a43]">
                Reach ↗
              </span>
            </span>
          </div>
        </div>

        <div className="relative mt-[3cqw] min-h-[13cqw] text-[3.3cqw] leading-snug">
          <span
            data-fg-skel
            className="absolute inset-0 space-y-[1.5cqw] pt-[0.5cqw]"
          >
            <span className="block h-[2.6cqw] w-1/2 rounded-full bg-[#efefef]" />
            <span className="block h-[2.6cqw] w-3/4 rounded-full bg-[#efefef]" />
            <span className="block h-[2.6cqw] w-2/5 rounded-full bg-[#efefef]" />
          </span>
          <p data-fg-bio className="font-semibold">
            Your Brand
          </p>
          <p data-fg-bio>Helping you feel better, one post at a time ✨</p>
          <p data-fg-bio className="text-[#00376b]">
            🔗 yourbrand.com
          </p>
        </div>

        <div className="mt-[3cqw] grid grid-cols-2 gap-[1.5cqw] text-[3.3cqw] font-semibold">
          <span className="rounded-[1.8cqw] bg-[#0095f6] py-[1.6cqw] text-center text-white">
            Follow
          </span>
          <span className="rounded-[1.8cqw] bg-[#efefef] py-[1.6cqw] text-center">
            Message
          </span>
        </div>

        <div className="mt-[3.5cqw] flex gap-[3.5cqw]">
          {highlights.map((h, i) => (
            <span
              key={h}
              data-fg-hl
              className="flex flex-col items-center gap-[1cqw]"
            >
              <span className="grid size-[14cqw] place-items-center rounded-full border border-[#dbdbdb] p-[0.6cqw]">
                <span
                  className="block size-full rounded-full"
                  style={{
                    background: `linear-gradient(150deg, ${tints[i * 2]})`,
                  }}
                />
              </span>
              <span className="text-[2.8cqw]">{h}</span>
            </span>
          ))}
        </div>

        <div className="mt-[3cqw] flex justify-around border-t border-[#efefef] py-[2cqw] text-[#262626]">
          <Grid3x3 className="size-[5cqw]" />
          <Play className="size-[5cqw] opacity-40" />
          <Layers className="size-[5cqw] opacity-40" />
        </div>

        <div className="-mx-[4cqw] grid grid-cols-3 gap-[0.5cqw]">
          {tints.map((t, i) => (
            <span
              key={t + i}
              data-fg-post
              className="relative aspect-square"
              style={{ background: `linear-gradient(150deg, ${t})` }}
            >
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]" />
              {i % 3 === 0 ? (
                <Play className="absolute right-[1.5cqw] top-[1.5cqw] size-[4cqw] fill-white text-white" />
              ) : i % 3 === 1 ? (
                <Layers className="absolute right-[1.5cqw] top-[1.5cqw] size-[4cqw] text-white" />
              ) : null}
            </span>
          ))}
        </div>

        <div
          data-fg-insights
          className="absolute inset-x-[3cqw] bottom-[3cqw] rounded-[4cqw] bg-white p-[4cqw] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.35)]"
        >
          <p className="flex items-center justify-between text-[3.6cqw] font-bold">
            Insights{" "}
            <span className="text-[3cqw] font-semibold text-[#0a8a43]">
              Reach trending up ↗
            </span>
          </p>
          <svg
            viewBox="0 0 100 32"
            className="mt-[2cqw] h-[14cqw] w-full overflow-visible"
          >
            <defs>
              <linearGradient id="fg-line" x1="0" x2="1">
                <stop offset="0" stopColor="#fa7e1e" />
                <stop offset="0.5" stopColor="#d62976" />
                <stop offset="1" stopColor="#4f5bd5" />
              </linearGradient>
            </defs>
            <path
              data-fg-line
              pathLength={1}
              strokeDasharray="1 1"
              d="M2 28 C 14 27, 20 24, 30 23 S 46 19, 56 15 S 74 11, 82 7 S 94 3, 98 2"
              fill="none"
              stroke="url(#fg-line)"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
