import Link from "next/link";
import { ArrowUpRight, BarChart2, Globe, Search, Sparkles, TrendingUp } from "lucide-react";
import { categoryLabels, projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { DeckIn } from "@/components/motion/DeckIn";
import { RevealText } from "@/components/motion/RevealText";
import { ArrowLink } from "@/components/ui/ArrowLink";

/** Case studies as SEO & Search Performance Cards. */
export function CaseReels() {
  return (
    <section id="work" aria-labelledby="reels-title" className="py-20 lg:py-28">
      <div className="container-page flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow mark">Healthcare SEO Case Studies</p>
          <RevealText as="h2" id="reels-title" className="headline mt-3 max-w-2xl text-[clamp(2.4rem,5.5vw,4.5rem)]">
            Doctors &amp; practices I&rsquo;ve helped <span className="serif ig-text pr-[0.05em]">rank.</span>
          </RevealText>
        </div>
        <ArrowLink href="/work" className="text-[17px]">
          All projects &amp; evidence
        </ArrowLink>
      </div>

      <DeckIn
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-gutter pb-4 [scrollbar-width:none] lg:mx-auto lg:grid lg:max-w-[80rem] lg:grid-cols-3 lg:gap-6 lg:overflow-visible"
      >
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            data-cursor="View Case Study"
            className="shine group relative flex aspect-[9/16] max-h-[680px] w-[78vw] max-w-[340px] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] p-6 text-white shadow-[var(--shadow)] transition-transform duration-700 ease-[var(--ease-expo)] hover:-translate-y-2 sm:w-[46vw] lg:w-auto lg:max-w-none"
            style={{ background: `linear-gradient(165deg, ${p.tint[0]}, ${p.tint[1]} 65%, #090d16)` }}
          >
            <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_25%_12%,rgba(255,255,255,0.4),transparent_55%)]" />

            <div className="relative flex items-center justify-between border-b border-white/20 pb-3">
              <p className="flex items-center gap-2 text-[12px] font-semibold">
                <span className="ig-gradient grid size-7 place-items-center rounded-full text-[10px] ring-2 ring-white/80">
                  {profile.identity.initials}
                </span>
                {profile.identity.handle}
              </p>
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur">
                {categoryLabels[p.category]}
              </span>
            </div>

            <span aria-hidden className="relative m-auto grid size-16 scale-75 place-items-center rounded-full bg-white/20 opacity-0 backdrop-blur transition duration-500 ease-[var(--ease-expo)] group-hover:scale-100 group-hover:opacity-100">
              <ArrowUpRight className="size-7 text-white" />
            </span>

            <div className="relative flex items-end gap-3 mt-auto">
              <div className="min-w-0 flex-1">
                <p className="serif text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.1]">{p.hook ?? p.summary}</p>
                <h3 className="mt-3 text-[16px] font-bold">{p.name}</h3>
                <p className="mt-0.5 text-[12px] text-white/80">{p.role}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 3).map((t) => (
                    <li key={t} className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <span aria-hidden className="flex flex-col items-center gap-3 pb-1">
                <span className="grid size-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur">
                  <TrendingUp className="size-4" />
                </span>
                <span className="grid size-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur">
                  <Sparkles className="size-4" />
                </span>
                <span className="grid size-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur">
                  <Globe className="size-4" />
                </span>
              </span>
            </div>
          </Link>
        ))}
      </DeckIn>
    </section>
  );
}
