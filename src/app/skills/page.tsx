import type { Metadata } from "next";
import { categoryLabels, skills, type SkillCategory } from "@/content/skills";
import { platforms } from "@/content/experience";
import { PageShell } from "@/components/layout/PageShell";
import { ProcessRail } from "@/components/report/ProcessRail";
import { EngineTag, PageHead, SectionHead, engineVar, type Engine } from "@/components/report/ui";

export const metadata: Metadata = {
  title: "Skills",
  description: "Healthcare SEO, local search, AEO & GEO, website audits, keyword research, and off-page marketing — skills by Leesa Rai.",
  alternates: { canonical: "/skills" },
};

/* Which engine each skill area mostly serves — drives the bar colour. */
const engineOf: Record<SkillCategory, Engine> = {
  seo: "SEO",
  technical: "SEO",
  local: "GEO",
  offpage: "GEO",
  aeo: "AEO",
  content: "AEO",
  tools: "LEADS",
};

export default function SkillsPage() {
  const groups = Object.keys(categoryLabels) as SkillCategory[];
  return (
    <PageShell>
      <PageHead
        emblem="SEO"
        crumb="Skills"
        title={
          <>
            Skill <span className="grad-text">matrix.</span>
          </>
        }
        deck="From technical audits and keyword research to AI search discoverability — rated honestly, one to five."
        meta={[
          { k: "Areas", v: groups.length },
          { k: "Skills", v: skills.length },
          { k: "Scale", v: "1 — 5" },
          { k: "Updated", v: "2026" },
        ]}
      />

      <section aria-labelledby="matrix-title" className="container-page pt-12 lg:pt-16">
        <SectionHead num="01" label="Matrix" id="matrix-title" title="Strength by area." intro="Bars fill as they scroll in. Colour shows which engine the skill feeds." />
        <div className="mt-12 border-t border-line">
          {groups.map((g, i) => (
            <div key={g} className="rise grid gap-6 border-b border-line py-8 lg:grid-cols-[18rem_1fr]">
              <div className="flex items-start gap-4">
                <span className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="poster text-[clamp(1.8rem,3vw,2.6rem)]">{categoryLabels[g]}</h2>
                  <EngineTag engine={engineOf[g]} className="mt-3" />
                </div>
              </div>
              <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
                {skills
                  .filter((s) => s.category === g)
                  .map((s) => {
                    const level = s.level ?? 3;
                    return (
                      <li key={s.name}>
                        <div className="flex justify-between gap-4 text-[15px]">
                          <span>{s.name}</span>
                          <span className="font-mono text-[12px] text-muted">{level}/5</span>
                        </div>
                        <span className="relative mt-2 block h-2.5 bg-surface-2">
                          <span className="grow-x absolute inset-y-0 left-0" style={{ width: `${level * 20}%`, background: engineVar[engineOf[g]] }} />
                          {/* Five segments, like a signal meter. */}
                          <span aria-hidden className="absolute inset-0 grid grid-cols-5">
                            {[0, 1, 2, 3, 4].map((k) => (
                              <span key={k} className="border-r-2 border-bg last:border-r-0" />
                            ))}
                          </span>
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="tools-title" className="container-page pt-14 lg:pt-20">
        <SectionHead num="02" label="Instruments" id="tools-title" title="Daily tools." />
        <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((p) => (
            <div key={p.name} className="panel p-6">
              <dt className="poster text-[1.8rem]">{p.name}</dt>
              <dd className="label mt-3 text-[10px] text-muted">{p.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <ProcessRail num="03" />
    </PageShell>
  );
}
