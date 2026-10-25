import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, ChevronLeft } from "lucide-react";
import { categoryLabels, getAdjacentProject, getProject, projects } from "@/content/projects";
import { PageShell } from "@/components/layout/PageShell";
import { RevealText } from "@/components/motion/RevealText";
import { FadeIn } from "@/components/motion/FadeIn";
import { Aurora } from "@/components/ui/Aurora";
import { Button } from "@/components/ui/Button";
import { Chip, SampleBadge } from "@/components/ui/Chip";
import { ArtStage, ProjectArt } from "@/components/work/ProjectArt";
import { partMeta } from "@/components/work/parts";
import { Tilt } from "@/components/motion/Tilt";
import { LiveAccounts } from "@/components/social/LiveAccounts";
import { igAccounts } from "@/lib/instagram";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.name, description: project.summary },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getAdjacentProject(slug);
  const links = project.links.filter((l): l is { label: string; href: string } => l.href !== null);
  const accounts = igAccounts(project.links);

  return (
    <PageShell>
      <article>
        <header className="relative overflow-clip pb-12 pt-[calc(var(--nav-h)+3rem)] text-center lg:pt-[calc(var(--nav-h)+5rem)]">
          <Aurora subtle />
          <div className="container-page relative">
            <Link href="/work" className="mx-auto flex w-fit items-center gap-1 text-[15px] font-medium text-link hover:underline">
              <ChevronLeft aria-hidden className="size-4" /> All work
            </Link>
            {project.logo && (
              <span className="mx-auto mt-8 grid size-20 place-items-center overflow-hidden rounded-[22px] bg-white shadow-[var(--shadow)] ring-1 ring-line">
                <Image src={project.logo.src} alt={project.logo.alt} width={80} height={80} className="size-full object-contain" priority />
              </span>
            )}
            <p className={`eyebrow mark ${project.logo ? "mt-6" : "mt-8"}`}>
              {project.kind === "work" ? project.org : "Personal project"} · {categoryLabels[project.category]} · {project.year}
            </p>
            <RevealText as="h1" immediate className="headline mx-auto mt-3 max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)]">
              {project.name}
            </RevealText>
            <p className="mx-auto mt-5 max-w-xl text-[clamp(1.125rem,2vw,1.375rem)] text-muted">{project.summary}</p>
            {project.placeholder && <SampleBadge className="mt-4" />}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {project.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
            {links.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {links.map((l, i) => (
                  <Button key={l.href} href={l.href} variant={i === 0 ? "primary" : "secondary"}>
                    {l.label} <ArrowUpRight aria-hidden className="size-4" />
                  </Button>
                ))}
              </div>
            )}
          </div>
        </header>

        <section className="container-page">
          <ArtStage project={project} className="aspect-auto px-6 py-12 sm:px-16 sm:py-20">
            <Tilt max={4} className="mx-auto max-w-4xl">
              <ProjectArt project={project} priority />
            </Tilt>
          </ArtStage>
        </section>

        {accounts.length > 0 && (
          <section aria-labelledby="live-title" className="pt-20 lg:pt-28">
            <div className="container-page text-center">
              <p className="eyebrow mark">Live from Instagram</p>
              <h2 id="live-title" className="headline mt-3 text-[clamp(2rem,4.5vw,3.5rem)]">
                See the feeds, <span className="serif ig-text pr-[0.05em]">live.</span>
              </h2>
            </div>
            <div className="mt-8">
              <LiveAccounts accounts={accounts} />
            </div>
          </section>
        )}

        {project.parts && project.parts.length > 0 && (
          <section aria-labelledby="built-title" className="container-page pt-20 lg:pt-28">
            <h2 id="built-title" className="headline text-center text-[clamp(2rem,4.5vw,3.5rem)]">
              What I <span className="mark">built.</span>
            </h2>
            <FadeIn stagger className={`mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 ${project.parts.length >= 4 ? "lg:grid-cols-4" : project.parts.length === 3 ? "lg:grid-cols-3" : ""}`}>
              {project.parts.map((part) => {
                const { icon: Icon, name } = partMeta[part.kind];
                return (
                  <div key={part.label} className="card group/part p-7 transition-colors duration-500 hover:bg-volt hover:text-ink">
                    <span className="grid size-12 place-items-center rounded-2xl bg-bg text-fg transition-colors duration-500 group-hover/part:bg-ink group-hover/part:text-volt">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <p className="mt-6 text-[13px] font-semibold text-muted transition-colors group-hover/part:text-ink/60">{name}</p>
                    <h3 className="headline mt-1 text-[1.6rem]">{part.label}</h3>
                    <p className="mt-2 text-[15px] text-muted transition-colors group-hover/part:text-ink/70">{part.stack}</p>
                  </div>
                );
              })}
            </FadeIn>
          </section>
        )}

        <section className="container-page py-20 lg:py-28">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mark">The problem</p>
            <p className="headline mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)]">{project.problem}</p>
          </FadeIn>

          <FadeIn stagger className="mt-20 grid gap-4 md:grid-cols-2">
            <div className="card p-8">
              <p className="text-[13px] font-semibold text-muted">My role</p>
              <h2 className="headline mt-2 text-[1.75rem]">{project.role}</h2>
              <ul className="mt-6 space-y-3">
                {project.contributions.map((c) => (
                  <li key={c} className="flex gap-3 text-[16px]">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ig-gradient text-white">
                      <Check aria-hidden className="size-3" strokeWidth={3} />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-8">
              <p className="text-[13px] font-semibold text-muted">How it&rsquo;s built</p>
              <dl className="mt-4 divide-y divide-line">
                {project.architecture.map((a) => (
                  <div key={a.layer} className="py-4">
                    <dt className="text-[17px] font-semibold">{a.layer}</dt>
                    <dd className="mt-1 text-[15px] text-muted">{a.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeIn>

          <FadeIn stagger className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.challenges.map((c) => (
              <div key={c.title} className="card p-8">
                <p className="text-[13px] font-semibold text-muted">Challenge</p>
                <h3 className="headline mt-2 text-[1.5rem]">{c.title}</h3>
                <p className="mt-2 text-[15px] text-muted">{c.detail}</p>
              </div>
            ))}
          </FadeIn>

          {project.results.length > 0 && (
            <FadeIn className="card mt-4 p-8">
              <p className="text-[13px] font-semibold text-muted">Verified Outcomes</p>
              <ul className="mt-3 space-y-2 text-[17px]">
                {project.results.map((r) => (
                  <li key={r} className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-accent" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          )}

          {project.evidence && project.evidence.length > 0 && (
            <div className="mt-16">
              <div className="text-center sm:text-left">
                <p className="eyebrow mark">Evidence &amp; Proof</p>
                <h2 className="headline mt-2 text-[clamp(1.8rem,3.5vw,2.75rem)]">
                  Live verified <span className="serif ig-text pr-[0.06em]">screenshots.</span>
                </h2>
                <p className="mt-2 text-[15px] text-muted">
                  Actual Search Console graphs, Google AI Overview results, and organic ranking proof from this project.
                </p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {project.evidence.map((item) => (
                  <div
                    key={item.title}
                    className="group overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] w-full bg-surface-2">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover object-top"
                      />
                      <span className="absolute left-2.5 top-2.5 rounded-full bg-black/70 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
                        {item.badge}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="headline text-[16px] text-fg">{item.title}</h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="container-page pb-24 lg:pb-32">
          <Link href={`/work/${next.slug}`} className="group card flex items-center justify-between gap-6 p-8 sm:p-10">
            <div>
              <p className="text-[13px] font-semibold text-muted">Next project</p>
              <p className="headline mt-2 text-[clamp(2rem,4vw,3rem)]">{next.name}</p>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-fg text-bg transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight aria-hidden className="size-6" />
            </span>
          </Link>
        </section>
      </article>
    </PageShell>
  );
}
