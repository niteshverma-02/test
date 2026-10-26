import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { categoryLabels, getAdjacentProject, getProject, projects } from "@/content/projects";
import { PageShell } from "@/components/layout/PageShell";
import { RevealText } from "@/components/motion/RevealText";
import { Btn, PageHead } from "@/components/report/ui";

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

function Block({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="scroll-mt-24 border-t border-line pt-5">
      <p className="label text-[10px] text-muted">§ {n}</p>
      <h2 id={`${id}-t`} className="poster mt-3 text-[clamp(2.2rem,4vw,3.4rem)]">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

/** A case study laid out as a report: sticky contents on the left, numbered sections on the right. */
export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getAdjacentProject(slug);
  const links = project.links.filter((l): l is { label: string; href: string } => l.href !== null);

  const sections = [
    { id: "problem", label: "The problem" },
    { id: "work", label: "What I did" },
    { id: "layers", label: "How it was built" },
    { id: "challenges", label: "Challenges" },
    ...(project.results.length ? [{ id: "results", label: "Results" }] : []),
    ...(project.evidence?.length ? [{ id: "evidence", label: "Evidence" }] : []),
  ];
  const n = (id: string) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  return (
    <PageShell>
      <article>
        <PageHead
        emblem="SEO"
          crumb={`Work / ${categoryLabels[project.category]}`}
          title={project.name.split(" — ")[0]}
          deck={project.summary}
          meta={[
            { k: "Role", v: project.role },
            { k: "Year", v: project.year },
            { k: "Type", v: categoryLabels[project.category] },
            { k: "Org", v: project.org ?? "Client project" },
          ]}
        >
          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map((l) => (
                <Btn key={l.href} href={l.href} variant="line">
                  {l.label}
                </Btn>
              ))}
            </div>
          )}
        </PageHead>

        <div className="container-page grid gap-12 py-20 lg:grid-cols-[14rem_1fr] lg:gap-20 lg:py-28">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="label text-[10px] text-muted">Contents</p>
            <ol className="mt-4 space-y-2 border-l border-line pl-4 text-[14px]">
              {sections.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="flex gap-2 hover:text-ember">
                    <span className="font-mono text-[11px] text-muted">{n(t.id)}</span>
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
            <p className="label mt-8 text-[10px] text-muted">Stack</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <li key={s} className="label rounded-full border border-line px-2.5 py-1 text-[10px]">
                  {s}
                </li>
              ))}
            </ul>
          </aside>

          <div className="min-w-0 space-y-20">
            <Block id="problem" n={n("problem")} title="The problem">
              <RevealText as="p" className="max-w-3xl text-[clamp(1.25rem,2.2vw,1.75rem)] leading-snug">
                {project.problem}
              </RevealText>
              {project.hook && <p className="poster mt-8 max-w-3xl text-[clamp(1.6rem,3vw,2.4rem)] text-ember">&ldquo;{project.hook}&rdquo;</p>}
            </Block>

            <Block id="work" n={n("work")} title="What I did">
              <ol className="border-t border-line">
                {project.contributions.map((c, i) => (
                  <li key={c} className="rise grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-4 text-[16px]">
                    <span className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {c}
                  </li>
                ))}
              </ol>
            </Block>

            <Block id="layers" n={n("layers")} title="How it was built">
              <div className="grid gap-4 sm:grid-cols-2">
                {project.architecture.map((a, i) => (
                  <div key={a.layer} className="panel p-6">
                    <p className="label text-[10px] text-muted">Layer {i + 1}</p>
                    <p className="poster mt-3 text-[1.8rem]">{a.layer}</p>
                    <p className="mt-2 text-[15px] text-muted">{a.detail}</p>
                  </div>
                ))}
              </div>
            </Block>

            <Block id="challenges" n={n("challenges")} title="Challenges">
              <dl className="grid gap-6 md:grid-cols-3">
                {project.challenges.map((c) => (
                  <div key={c.title} className="border-t-4 border-ember pt-4">
                    <dt className="text-[17px] font-semibold">{c.title}</dt>
                    <dd className="mt-2 text-[15px] text-muted">{c.detail}</dd>
                  </div>
                ))}
              </dl>
            </Block>

            {project.results.length > 0 && (
              <Block id="results" n={n("results")} title="Results">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {project.results.map((r) => (
                    <li key={r} className="panel rise flex gap-3 p-5 text-[15px]">
                      <span aria-hidden className="text-ember">
                        ▲
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="label mt-4 text-[10px] text-muted">Verified results only — nothing estimated.</p>
              </Block>
            )}

            {project.evidence && project.evidence.length > 0 && (
              <Block id="evidence" n={n("evidence")} title="Evidence">
                <ul className="grid gap-6 md:grid-cols-2">
                  {project.evidence.map((e, i) => (
                    <li key={e.src} className="panel">
                      <p className="flex items-center justify-between gap-3 border-b border-line px-3 py-2">
                        <span className="label shrink-0 text-[10px]">Exhibit {String.fromCharCode(65 + i)}</span>
                        <span className="truncate font-mono text-[11px] text-ember">{e.badge}</span>
                      </p>
                      <a href={e.src} target="_blank" rel="noopener noreferrer" className="clip-up relative block aspect-[4/3] bg-surface-2" aria-label={`Open ${e.title} full size`}>
                        <Image src={e.src} alt={e.title} fill sizes="(min-width: 768px) 40vw, 90vw" className="object-contain" />
                      </a>
                      <div className="p-4">
                        <p className="text-[15px] font-semibold">{e.title}</p>
                        <p className="mt-1 text-[13px] text-muted">{e.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Block>
            )}
          </div>
        </div>

        <Link href={`/work/${next.slug}`} className="group block border-t border-fg bg-fg text-bg">
          <div className="container-page flex items-center justify-between gap-6 py-14 lg:py-20">
            <div className="min-w-0">
              <p className="label text-[10px] opacity-60">Next result</p>
              <p className="poster mt-3 truncate text-[clamp(2.4rem,7vw,6rem)] transition-colors group-hover:text-ember">{next.name.split(" — ")[0]}</p>
            </div>
            <span className="grid size-16 shrink-0 place-items-center border border-bg transition-[transform,background-color] duration-500 group-hover:rotate-45 group-hover:bg-ember">
              <ArrowUpRight aria-hidden className="size-7" />
            </span>
          </div>
        </Link>
      </article>
    </PageShell>
  );
}
