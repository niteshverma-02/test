import Link from "next/link";
import { Heart, MessageCircle, Play, Send } from "lucide-react";
import { categoryLabels, projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { DeckIn } from "@/components/motion/DeckIn";
import { RevealText } from "@/components/motion/RevealText";
import { ArrowLink } from "@/components/ui/ArrowLink";

/** Case studies as vertical Reels. Each opens the full project page. */
export function CaseReels() {
  return (
    <section id="work" aria-labelledby="reels-title" className="py-20 lg:py-28">
      <div className="container-page flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow mark">Case studies</p>
          <RevealText as="h2" id="reels-title" className="headline mt-3 max-w-2xl text-[clamp(2.4rem,5.5vw,4.5rem)]">
            Brands I&rsquo;ve helped <span className="serif ig-text pr-[0.05em]">grow.</span>
          </RevealText>
        </div>
        <ArrowLink href="/work" className="text-[17px]">
          All projects
        </ArrowLink>
      </div>

      <DeckIn
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-gutter pb-4 [scrollbar-width:none] lg:mx-auto lg:grid lg:max-w-[80rem] lg:grid-cols-3 lg:gap-6 lg:overflow-visible"
      >
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            data-cursor="Watch"
            className="shine group relative flex aspect-[9/16] max-h-[680px] w-[78vw] max-w-[340px] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] p-5 text-white shadow-[var(--shadow)] transition-transform duration-700 ease-[var(--ease-expo)] hover:-translate-y-2 sm:w-[46vw] lg:w-auto lg:max-w-none"
            style={{ background: `linear-gradient(165deg, ${p.tint[0]}, ${p.tint[1]} 60%, #1a0a12)` }}
          >
            <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_25%_12%,rgba(255,255,255,0.4),transparent_55%)]" />
            <span aria-hidden className="relative flex gap-1">
              {projects.map((q, k) => (
                <span key={q.slug} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/35">
                  {k < i && <span className="block h-full w-full bg-white" />}
                  {k === i && <span className="block h-full w-[8%] bg-white transition-[width] duration-[1.6s] ease-linear group-hover:w-full" />}
                </span>
              ))}
            </span>
            <p className="relative mt-4 flex items-center gap-2 text-[12px] font-semibold">
              <span className="ig-gradient grid size-7 place-items-center rounded-full text-[10px] ring-2 ring-white/80">{profile.identity.initials}</span>
              {profile.identity.handle}
              <span className="font-normal text-white/70">· {categoryLabels[p.category]}</span>
            </p>

            <span aria-hidden className="relative m-auto grid size-16 scale-75 place-items-center rounded-full bg-white/25 opacity-0 backdrop-blur transition duration-500 ease-[var(--ease-expo)] group-hover:scale-100 group-hover:opacity-100">
              <Play className="size-7 translate-x-0.5 fill-white" />
            </span>

            <div className="relative flex items-end gap-3">
              <div className="min-w-0 flex-1">
                <p className="serif text-[clamp(1.6rem,2.3vw,2.1rem)] leading-[1.05]">{p.hook ?? p.summary}</p>
                <h3 className="mt-3 text-[15px] font-bold">{p.name}</h3>
                <p className="mt-0.5 text-[12px] text-white/75">{p.role}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 3).map((t) => (
                    <li key={t} className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <span aria-hidden className="flex flex-col items-center gap-4 pb-1">
                <Heart className="size-6 transition-colors group-hover:fill-[#ff3b5c] group-hover:text-[#ff3b5c]" />
                <MessageCircle className="size-6" />
                <Send className="size-6" />
              </span>
            </div>
          </Link>
        ))}
      </DeckIn>
    </section>
  );
}
