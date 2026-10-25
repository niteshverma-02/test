"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Search, Sparkles, TrendingUp, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { categoryLabels, projects } from "@/content/projects";
import { igHandle } from "@/lib/instagram";
import { InstagramIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/cn";
import { Tilt } from "@/components/motion/Tilt";

type Tile =
  | { kind: "project"; key: string; group: string; text: string; project: (typeof projects)[number] }
  | { kind: "account"; key: string; group: string; text: string; label: string; href: string; handle: string | null; tint: [string, string] };

// One tall case-study tile per project, then a square tile for every client account it links to.
const tiles: Tile[] = projects.flatMap((p) => {
  const group = categoryLabels[p.category];
  const head: Tile = { kind: "project", key: p.slug, group, text: `${p.name} ${p.hook ?? ""} ${p.summary} ${group}`, project: p };
  const accounts = p.links.flatMap((l): Tile[] => {
    if (!l.href) return [];
    const handle = igHandle(l.href);
    return [{ kind: "account", key: l.href, group, text: `${l.label} ${handle ?? ""} ${group}`, label: l.label, href: l.href, handle, tint: p.tint }];
  });
  return [head, ...accounts];
});
const groups = ["All", ...new Set(tiles.map((t) => t.group))];
const initials = (s: string) =>
  s
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w) && !/^dr\.?$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

/** The work as an Instagram Explore page: search, topic chips, and a grid of case studies and the real accounts behind them. */
export function ExploreGrid() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("All");
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return tiles.filter((t) => (group === "All" || t.group === group) && (!needle || t.text.toLowerCase().includes(needle)));
  }, [q, group]);

  return (
    <div>
      <div className="mx-auto max-w-3xl">
        <label className="group/search relative flex h-14 items-center gap-3 rounded-2xl border border-line bg-surface px-5 shadow-[var(--shadow)] transition-colors focus-within:border-fg/30 sm:h-16">
          <Search aria-hidden className="size-5 shrink-0 text-muted transition-transform group-focus-within/search:scale-110" />
          <span className="sr-only">Search the work</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search brands, doctors, topics…"
            className="h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-muted sm:text-[17px] [&::-webkit-search-cancel-button]:hidden"
          />
          {q && (
            <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="grid size-8 place-items-center rounded-full bg-surface-2">
              <X className="size-4" />
            </button>
          )}
        </label>
        <div className="mt-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Topic">
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={group === g}
              onClick={() => setGroup(g)}
              className={cn(
                "relative h-10 rounded-full px-4 text-[14px] font-semibold transition-colors",
                group === g ? "text-white" : "border border-line hover:bg-surface-2",
              )}
            >
              {group === g && <motion.span layoutId="explore-chip" className="absolute inset-0 rounded-full" style={{ background: "var(--ig)" }} transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative">{g}</span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-center text-[13px] text-muted" aria-live="polite">
          {shown.length} {shown.length === 1 ? "result" : "results"}
        </p>
      </div>

      <motion.ul layout className="mt-10 grid grid-flow-dense grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-3 lg:mt-14 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {shown.map((t, i) => (
            <motion.li
              key={t.key}
              layout
              initial={{ opacity: 0, scale: 0.7, rotate: i % 2 ? 6 : -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 260, damping: 24, delay: Math.min(i, 10) * 0.035 }}
              className={cn("min-w-0", t.kind === "project" && "row-span-2 lg:col-span-2")}
            >
              {t.kind === "project" ? <ProjectTile tile={t} /> : <AccountTile tile={t} />}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {shown.length === 0 && (
        <div className="py-16 text-center">
          <p className="serif text-[2rem]">Nothing for &ldquo;{q}&rdquo; yet.</p>
          <button
            type="button"
            onClick={() => {
              setQ("");
              setGroup("All");
            }}
            className="mt-4 rounded-full border border-line px-5 py-2 text-[14px] font-semibold hover:bg-surface-2"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectTile({ tile }: { tile: Extract<Tile, { kind: "project" }> }) {
  const p = tile.project;
  const accounts = p.links.filter((l) => l.href).length;
  return (
    <Tilt max={5} className="h-full rounded-xl sm:rounded-[22px]">
      <Link
        href={`/work/${p.slug}`}
        data-cursor="Watch"
        className="shine group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-xl p-4 text-white sm:rounded-[22px] sm:p-6 lg:p-8"
        style={{ background: `linear-gradient(165deg, ${p.tint[0]}, ${p.tint[1]} 60%, #1a0a12)` }}
      >
        <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_25%_12%,rgba(255,255,255,0.4),transparent_55%)] transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-125" />
        {/* Story bars: they fill on hover, like a reel starting. */}
        <span aria-hidden className="relative flex gap-1">
          {[0, 1, 2].map((k) => (
            <span key={k} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/35">
              <span
                className="block h-full origin-left scale-x-0 bg-white transition-transform ease-linear group-hover:scale-x-100"
                style={{ transitionDuration: "0.9s", transitionDelay: `${k * 0.9}s` }}
              />
            </span>
          ))}
        </span>
        <span className="relative mt-4 flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-[12px]">
          <span className="truncate">{tile.group}</span>
          <TrendingUp aria-hidden className="size-4 shrink-0 text-accent" />
        </span>
        <span className="serif relative my-auto block py-6 text-[clamp(1.35rem,3.2vw,3.25rem)] leading-[1.05]">{p.hook ?? p.summary}</span>
        <span className="relative block">
          <span className="block text-[14px] font-bold sm:text-[16px]">{p.name}</span>
          <span className="mt-1 flex flex-wrap items-center gap-x-2 text-[12px] text-white/80">
            {p.year}
            {accounts > 0 && <span>· {accounts} accounts</span>}
          </span>
          <span aria-hidden className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
            {p.stack.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur">
                {t}
              </span>
            ))}
          </span>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-[12px] font-semibold backdrop-blur transition-colors group-hover:bg-white group-hover:text-[#1a0a12]">
            View case study <ArrowUpRight aria-hidden className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </span>
      </Link>
    </Tilt>
  );
}

// Instagram's profile embed laid out at this width puts its header above y≈150px and the post grid below it.
const EMBED_W = 400;
const HEADER_H = 152;

/** The real profile, rendered at a fixed width, scaled to the tile and cropped to its post grid. Decoration: the tile links out. */
function LivePreview({ handle, label }: { handle: string; label: string }) {
  const box = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / EMBED_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <span ref={box} aria-hidden className="absolute inset-0 overflow-hidden transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-110">
      {scale > 0 && (
        <iframe
          src={`https://www.instagram.com/${handle}/embed/`}
          title={`${label}'s latest posts`}
          tabIndex={-1}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin"
          className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
          style={{ width: EMBED_W, height: EMBED_W + HEADER_H, transform: `scale(${scale}) translateY(-${HEADER_H}px)` }}
        />
      )}
    </span>
  );
}

function AccountTile({ tile }: { tile: Extract<Tile, { kind: "account" }> }) {
  const isWeb = tile.href.startsWith("http") && !tile.href.includes("instagram.com") && !tile.href.includes("linkedin.com");
  const domain = isWeb ? new URL(tile.href).hostname.replace(/^www\./, "") : null;
  const tint = `linear-gradient(150deg, ${tile.tint[0]}, ${tile.tint[1]})`;
  return (
    <a
      href={tile.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${tile.label} (${domain ?? "Client link"})`}
      className="group relative block aspect-square overflow-hidden rounded-xl border border-line bg-surface sm:rounded-[22px] transition-all hover:border-accent hover:shadow-lg"
    >
      {/* Tinted tile with initials */}
      <span
        aria-hidden
        className="absolute inset-0 grid place-items-center"
        style={{ background: `linear-gradient(150deg, color-mix(in srgb, ${tile.tint[0]} 16%, var(--bg)), color-mix(in srgb, ${tile.tint[1]} 22%, var(--bg)))` }}
      >
        <span className="story-ring">
          <span className="grid size-12 place-items-center rounded-full border-[3px] border-bg text-[14px] font-bold text-white sm:size-16 sm:text-[18px]" style={{ background: tint }}>
            {initials(tile.label) || "★"}
          </span>
        </span>
      </span>
      {tile.handle && <LivePreview handle={tile.handle} label={tile.label} />}
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <span aria-hidden className="absolute inset-0 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-40" style={{ background: tint }} />
      <span className="absolute right-2.5 top-2.5 rounded-md bg-white/95 px-2 py-1 text-[11px] font-bold text-slate-900 shadow-sm sm:right-3 sm:top-3">
        {domain ? "Live Site" : tile.handle ? "Instagram" : "Website"}
      </span>
      <span className="absolute inset-x-0 bottom-0 flex items-end gap-2 p-2.5 text-white sm:p-4">
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12px] font-semibold sm:text-[15px]">{tile.label}</span>
          <span className="block truncate text-[11px] text-white/80 sm:text-[12px]">{domain ?? (tile.handle ? `@${tile.handle}` : "Client Website")}</span>
        </span>
        <span className="hidden size-8 shrink-0 translate-y-2 place-items-center rounded-full bg-white text-slate-900 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:grid">
          <ArrowUpRight aria-hidden className="size-4" />
        </span>
      </span>
    </a>
  );
}

/** Every client account as a story ring, drifting past like a stories tray. Decorative copy of the grid's links. */
export function BrandStories() {
  const accounts = tiles.filter((t): t is Extract<Tile, { kind: "account" }> => t.kind === "account");
  return (
    <div className="marquee flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul className="marquee-track flex w-max shrink-0 gap-5 pr-5 [--marquee-duration:50s] sm:gap-7 sm:pr-7">
        {[...accounts, ...accounts].map((a, i) => (
          <li key={`${a.key}-${i}`} aria-hidden={i >= accounts.length || undefined}>
            <a href={a.href} target="_blank" rel="noopener noreferrer" tabIndex={i >= accounts.length ? -1 : undefined} className="group flex w-20 flex-col items-center gap-1.5 sm:w-24">
              <span className="story-ring transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:scale-110">
                <span
                  className="grid size-[3.75rem] place-items-center rounded-full border-[3px] border-bg text-[15px] font-bold text-white sm:size-[4.5rem] sm:text-[17px]"
                  style={{ background: `linear-gradient(150deg, ${a.tint[0]}, ${a.tint[1]})` }}
                >
                  {initials(a.label) || "★"}
                </span>
              </span>
              <span className="w-full truncate text-center text-[11px] font-medium sm:text-[12px]">{a.handle ?? a.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
