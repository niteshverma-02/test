import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { WordsIn } from "@/components/motion/WordsIn";
import { Scramble } from "@/components/motion/Scramble";
import { cn } from "@/lib/cn";
import type { EngineKind } from "@/components/three/EngineObject";
import { Emblem } from "./Emblem";
import { RollText } from "./RollText";
import { Odometer } from "./Odometer";
import { Magnetic } from "@/components/motion/Magnetic";

export type Engine = "SEO" | "AEO" | "GEO" | "LEADS";

/** One colour per engine, used for tags, bars and markers everywhere. */
export const engineBg: Record<Engine, string> = {
  SEO: "bg-seo text-ink",
  AEO: "bg-aeo text-bg",
  GEO: "bg-geo text-ink",
  LEADS: "bg-fg text-bg",
};
export const engineVar: Record<Engine, string> = {
  SEO: "var(--color-seo)",
  AEO: "var(--color-aeo)",
  GEO: "var(--color-geo)",
  LEADS: "var(--fg)",
};

export function EngineTag({ engine, className }: { engine: Engine; className?: string }) {
  return <span className={cn("label inline-flex h-6 items-center rounded-md px-2 text-[10px]", engineBg[engine], className)}>{engine}</span>;
}

/** "§ 02 — EVIDENCE" header row, then a poster title and an optional intro on the right. */
export function SectionHead({
  num,
  label,
  title,
  intro,
  id,
  className,
}: {
  num: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <header className={cn("relative", className)}>
      <p className="label inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-2 pr-4 text-[10px] backdrop-blur">
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-ember px-1.5 font-mono text-[10px] text-bg">{num}</span>
        <Scramble text={label} />
      </p>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-12">
        <WordsIn id={id} className="poster pb-[0.1em] text-[clamp(2.5rem,6vw,5.75rem)]">
          {title}
        </WordsIn>
        {intro && (
          <p className="max-w-md border-l-2 border-ember/60 pl-4 text-[16px] leading-relaxed text-muted lg:justify-self-end lg:mb-3">{intro}</p>
        )}
      </div>
      <span aria-hidden className="grow-x mt-8 block h-px bg-gradient-to-r from-ember/70 via-line to-transparent" />
    </header>
  );
}

/** Square button. Ink fills with vermilion on hover; the arrow slides out and back in. */
export function Btn({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "line";
  className?: string;
}) {
  const external = /^(https?:|mailto:)/.test(href);
  const Icon = external ? ArrowUpRight : ArrowRight;
  const cls = cn(
    "group label relative inline-flex h-13 max-w-full items-center gap-4 overflow-hidden rounded-xl px-5 sm:px-6 text-[12px] transition-colors duration-300",
    variant === "solid" ? "bg-fg text-bg" : "border border-fg text-fg hover:text-ink",
    className,
  );
  const inner = (
    <>
      <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-ember transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-y-100" />
      <span className="relative">{typeof children === "string" ? <RollText>{children}</RollText> : children}</span>
      <span className="relative grid size-4 overflow-hidden">
        <Icon aria-hidden className="col-start-1 row-start-1 size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-5" />
        <Icon aria-hidden className="col-start-1 row-start-1 size-4 -translate-x-5 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0" />
      </span>
    </>
  );
  if (external) {
    return (
      <Magnetic strength={0.2}>
        <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {inner}
        </a>
      </Magnetic>
    );
  }
  return (
    <Magnetic strength={0.2}>
      <Link href={href} className={cls}>
        {inner}
      </Link>
    </Magnetic>
  );
}

/** Top of an inner page: crumb row, giant poster title, one-line deck and meta cells. */
export function PageHead({
  crumb,
  title,
  deck,
  meta,
  emblem,
  children,
}: {
  crumb: string;
  /** A chrome 3D emblem floating in the side card. */
  emblem?: EngineKind;
  title: ReactNode;
  deck?: ReactNode;
  meta?: { k: string; v: ReactNode }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-clip pb-6 pt-[calc(var(--nav-h)+2rem)] lg:pt-[calc(var(--nav-h)+3.5rem)]">
      {/* Backdrop: hairline grid, two soft glows and the page name drifting huge and faint behind everything. */}
      <div aria-hidden className="ruled pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_30%_20%,#000,transparent_70%)]" />
      <span aria-hidden className="pointer-events-none absolute -left-40 -top-40 size-[44rem] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      <span aria-hidden className="pointer-events-none absolute -right-40 top-20 size-[36rem] rounded-full bg-[radial-gradient(closest-side,var(--glow-2),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden">
        <div className="marquee-track flex w-max [--marquee-duration:60s]">
          {[0, 1].map((k) => (
            <span key={k} className="poster whitespace-nowrap pr-[0.4em] text-[clamp(7rem,22vw,22rem)] leading-[0.8] text-transparent opacity-[0.07] [-webkit-text-stroke:1.5px_var(--fg)]">
              {crumb.split(" / ")[0]} · {crumb.split(" / ")[0]} ·
            </span>
          ))}
        </div>
      </div>

      <div className="container-page relative grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-end lg:gap-14">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="label inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 py-1.5 pl-3 pr-4 text-[10px] text-muted backdrop-blur">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-ember opacity-70" />
              <span className="relative size-2 rounded-full bg-ember" />
            </span>
            <Link href="/" className="hover:text-fg">
              Index
            </Link>
            <span aria-hidden>/</span>
            <span className="text-fg">{crumb}</span>
          </nav>
          <WordsIn as="h1" immediate className="poster mt-6 pb-[0.08em] text-[clamp(3rem,8.5vw,8.5rem)]">
            {title}
          </WordsIn>
          {deck && <p className="rise mt-6 max-w-2xl text-[clamp(1.125rem,1.7vw,1.35rem)] leading-snug text-muted">{deck}</p>}
          {children}
        </div>

        {(meta || emblem) && (
          <aside className="panel relative p-5">
            {emblem && <Emblem kind={emblem} className="relative -mx-5 -mt-5 mb-2 hidden h-44 lg:block" />}
            {meta && (
              <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2">
                {meta.map((m) => (
                  <div key={m.k} className="rounded-xl border border-line bg-bg/40 p-3.5">
                    <dt className="label text-[10px] text-muted">{m.k}</dt>
                    <dd
                      className={cn(
                        "mt-2 font-semibold leading-snug tracking-tight [overflow-wrap:anywhere]",
                        // Long values (roles, orgs) step down so they never spill out of their tile.
                        typeof m.v === "string" && m.v.length > 16 ? "text-[15px]" : "text-[clamp(1.05rem,1.4vw,1.35rem)]",
                      )}
                    >
                      {typeof m.v === "number" ? <Odometer value={String(m.v)} /> : m.v}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </aside>
        )}
      </div>
      <div aria-hidden className="container-page relative mt-12 lg:mt-16">
        <span className="grow-x block h-px bg-gradient-to-r from-ember/70 via-line to-transparent" />
      </div>
    </section>
  );
}
