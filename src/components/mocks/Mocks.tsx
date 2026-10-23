import { BadgeCheck, Bookmark, Ellipsis, Eye, Heart, Layers, MessageCircle, Music, Play, Repeat2, Send, ThumbsUp, TrendingUp, UserPlus } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * Illustrations of the kind of social content Tanu creates. They behave
 * like screenshots: fixed colours, identical in light and dark mode.
 * Numbers are illustrative, not client results.
 */

type Tint = [string, string];
const defaultTint: Tint = ["#fa7e1e", "#d62976"];
const grad = ([a, b]: Tint, deg = 135): CSSProperties => ({ background: `linear-gradient(${deg}deg, ${a}, ${b})` });

function Lights() {
  return (
    <span className="flex gap-1.5" aria-hidden>
      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
      <span className="size-2.5 rounded-full bg-[#febc2e]" />
      <span className="size-2.5 rounded-full bg-[#28c840]" />
    </span>
  );
}

/** Window chrome for screenshots and web mocks. */
export function BrowserFrame({ children, url, className }: { children: ReactNode; url?: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)] ring-1 ring-black/5", className)}>
      <div className="flex items-center gap-3 border-b border-black/5 bg-[#f6f6f7] px-4 py-2.5">
        <Lights />
        {url && <span className="mx-auto max-w-[60%] truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-[#86868b]">{url}</span>}
      </div>
      {children}
    </div>
  );
}

/** A modern phone frame. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative aspect-[9/19.2] rounded-[2.6rem] bg-[#0b0b0c] p-[7px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/10", className)}>
      <div className="relative h-full overflow-hidden rounded-[2.15rem] bg-white text-[#1d1d1f]">
        <span className="absolute left-1/2 top-2 z-10 h-[18px] w-[34%] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}

/** Avatar inside an unseen-story ring. */
export function StoryAvatar({ label, className, tint = defaultTint }: { label: string; className?: string; tint?: Tint }) {
  return (
    <span className={cn("story-ring inline-block shrink-0", className)}>
      <span className="grid size-full place-items-center rounded-full bg-white p-[2px]">
        <span className="grid size-full place-items-center rounded-full text-[0.8em] font-bold text-white" style={grad(tint)}>
          {label}
        </span>
      </span>
    </span>
  );
}

/** Hearts drifting up, like a live stream. Decorative. */
export function FloatingHearts({ className }: { className?: string }) {
  const hearts = [
    { c: "#ff3b5c", d: "0s", x: "-30%", s: "1" },
    { c: "#fa7e1e", d: "0.8s", x: "40%", s: "0.75" },
    { c: "#d62976", d: "1.5s", x: "-10%", s: "0.9" },
    { c: "#962fbf", d: "2.3s", x: "30%", s: "0.7" },
  ];
  return (
    <span aria-hidden className={cn("pointer-events-none absolute", className)}>
      {hearts.map((h) => (
        <Heart
          key={h.d}
          className="float-up absolute bottom-0 left-0 size-6"
          fill={h.c}
          stroke="none"
          style={{ animationDelay: h.d, scale: h.s, "--dx": h.x } as CSSProperties}
        />
      ))}
    </span>
  );
}

/** Instagram-style profile: header, highlights and a post grid. */
export function ProfileMock({ className, tint = defaultTint, handle = "your.brand" }: { className?: string; tint?: Tint; handle?: string }) {
  const stats = [
    ["248", "posts"],
    ["18.2k", "followers"],
    ["312", "following"],
  ];
  const highlights = ["Tips", "Reels", "Myths", "FAQ"];
  return (
    <div className={cn("rounded-2xl bg-white p-4 text-[#1d1d1f] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)] ring-1 ring-black/5", className)}>
      <div className="flex items-center gap-4">
        <StoryAvatar label={handle.slice(0, 2).toUpperCase()} tint={tint} className="size-14 text-[15px]" />
        <div className="grid flex-1 grid-cols-3 text-center">
          {stats.map(([v, k]) => (
            <span key={k}>
              <span className="block text-[13px] font-bold">{v}</span>
              <span className="block text-[9px] text-[#86868b]">{k}</span>
            </span>
          ))}
        </div>
      </div>
      <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold">
        {handle} <BadgeCheck className="size-3 fill-[#0095f6] text-white" />
      </p>
      <span className="mt-1 block h-1.5 w-3/4 rounded-full bg-[#efefef]" />
      <div className="mt-3 flex gap-3">
        {highlights.map((h, i) => (
          <span key={h} className="flex flex-col items-center gap-1">
            <span className="size-9 rounded-full p-[2px] ring-1 ring-[#dbdbdb]">
              <span className="block size-full rounded-full" style={grad(tint, 45 + i * 60)} />
            </span>
            <span className="text-[8px] text-[#737373]">{h}</span>
          </span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-0.5 overflow-hidden rounded-lg">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="rise-in relative grid aspect-[4/5] place-items-center" style={{ ...grad(tint, 30 + i * 55), opacity: 0.55 + (i % 3) * 0.15 }}>
            {i % 3 === 0 ? <Play className="absolute right-1 top-1 size-3 fill-white text-white" /> : i % 3 === 1 ? <Layers className="absolute right-1 top-1 size-3 text-white" /> : null}
            <span className="h-1 w-1/2 rounded-full bg-white/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** A Reel on a phone: hook on screen, action rail, hearts floating up. */
export function ReelPhoneMock({ className, tint = defaultTint, hook = "3 things your brand is getting wrong on Instagram" }: { className?: string; tint?: Tint; hook?: ReactNode }) {
  const actions = [
    { Icon: Heart, v: "12.4k", fill: true },
    { Icon: MessageCircle, v: "318" },
    { Icon: Send, v: "1.1k" },
    { Icon: Bookmark, v: "2k" },
  ];
  return (
    <PhoneFrame className={className}>
      <div className="relative flex h-full flex-col p-3 pt-9 text-white" style={grad(tint, 165)}>
        <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
        <p className="relative text-[11px] font-bold">Reels</p>
        <p className="relative my-auto rounded-xl bg-black/25 p-3 text-[clamp(11px,1.1vw,15px)] font-extrabold leading-tight backdrop-blur-sm">{hook}</p>
        <div className="relative flex items-end gap-2">
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold">
              <span className="size-5 rounded-full bg-white/90" /> your.brand
              <span className="rounded-md border border-white/70 px-1.5 text-[8px]">Follow</span>
            </p>
            <p className="mt-1 truncate text-[9px] text-white/85">Save this for later ✨ #socialmedia</p>
            <p className="mt-1 flex items-center gap-1 text-[8px] text-white/80">
              <Music className="size-2.5" /> Original audio
            </p>
          </div>
          <div className="relative flex flex-col items-center gap-2.5">
            <FloatingHearts className="bottom-full left-1 h-24 w-6" />
            {actions.map(({ Icon, v, fill }) => (
              <span key={v} className="flex flex-col items-center">
                <Icon className={cn("size-4", fill && "fill-[#ff3b5c] text-[#ff3b5c]")} />
                <span className="text-[8px] font-semibold">{v}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/** A LinkedIn-style post with a carousel slide. */
export function PostMock({ className, tint = defaultTint }: { className?: string; tint?: Tint }) {
  return (
    <div className={cn("rounded-2xl bg-white p-4 text-[#1d1d1f] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)] ring-1 ring-black/5", className)}>
      <div className="flex items-center gap-2.5">
        <span className="size-9 rounded-full" style={grad(tint)} />
        <span className="min-w-0 flex-1">
          <span className="block text-[12px] font-semibold">Brand Voice Co.</span>
          <span className="block truncate text-[9px] text-[#86868b]">Marketing · SEO · Content</span>
        </span>
        <Ellipsis className="size-4 text-[#86868b]" />
      </div>
      <p className="mt-3 text-[11px] leading-snug">SEO isn&rsquo;t dead. It just moved to social. Here&rsquo;s how search works on Instagram now 👇</p>
      <div className="relative mt-3 overflow-hidden rounded-xl p-4 text-white" style={grad(tint, 150)}>
        <p className="text-[9px] font-semibold uppercase tracking-widest opacity-80">1 / 6</p>
        <p className="mt-1 text-[17px] font-extrabold leading-tight">Keywords go in your captions.</p>
        <div className="mt-3 flex gap-1">
          {[1, 0, 0, 0, 0, 0].map((on, i) => (
            <span key={i} className={cn("h-1 flex-1 rounded-full", on ? "bg-white" : "bg-white/35")} />
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-2.5 text-[10px] font-semibold text-[#5e5e5e]">
        <span className="flex items-center gap-1">
          <ThumbsUp className="size-3.5" /> 864
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="size-3.5" /> 92
        </span>
        <span className="flex items-center gap-1">
          <Repeat2 className="size-3.5" /> 41
        </span>
        <span className="flex items-center gap-1">
          <Send className="size-3.5" /> Send
        </span>
      </div>
    </div>
  );
}

/** Reach chart with a few headline stats. */
export function InsightsMock({ className, tint = defaultTint }: { className?: string; tint?: Tint }) {
  const stats = [
    { Icon: Eye, k: "Reach", v: "48.2k" },
    { Icon: Heart, k: "Engaged", v: "6.9k" },
    { Icon: UserPlus, k: "Follows", v: "+1.3k" },
  ];
  return (
    <div className={cn("rounded-2xl bg-white p-4 text-[#1d1d1f] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)] ring-1 ring-black/5", className)}>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-bold">Insights · 30 days</p>
        <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white" style={grad(tint)}>
          <TrendingUp className="size-3" /> 38%
        </span>
      </div>
      <svg viewBox="0 0 240 80" className="mt-3 h-auto w-full" aria-hidden>
        <path d="M0 66 C25 60 40 64 62 52 S100 46 124 36 170 26 190 18 222 8 240 6 L240 80 L0 80 Z" fill={tint[1]} fillOpacity="0.12" />
        <path d="M0 66 C25 60 40 64 62 52 S100 46 124 36 170 26 190 18 222 8 240 6" pathLength={1} className="draw-in" fill="none" stroke={tint[1]} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="240" cy="6" r="4" fill={tint[0]} />
      </svg>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {stats.map(({ Icon, k, v }) => (
          <div key={k} className="rounded-xl bg-[#f7f7f8] p-2">
            <Icon className="size-3 text-[#86868b]" />
            <p className="mt-1 text-[12px] font-bold">{v}</p>
            <p className="text-[9px] text-[#86868b]">{k}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
