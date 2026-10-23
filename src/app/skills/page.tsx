import type { Metadata } from "next";
import { categoryLabels, skills, type SkillCategory } from "@/content/skills";
import { PageShell } from "@/components/layout/PageShell";
import { PopIn } from "@/components/motion/PopIn";
import { PageHero } from "@/components/ui/PageHero";
import { Spotlight } from "@/components/ui/Spotlight";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProcessMap } from "@/components/skills/ProcessMap";

export const metadata: Metadata = {
  title: "Skills",
  description: "Strategy, content, platforms, branding, analytics and ads — the skills behind every campaign.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  const groups = Object.keys(categoryLabels) as SkillCategory[];
  return (
    <PageShell>
      <PageHero
        eyebrow="Skills"
        title={
          <>
            Everything it takes to <span className="serif ig-text pr-[0.06em]">grow a brand.</span>
          </>
        }
        sub="From the first idea to the final insight."
      />

      <section className="container-page pb-20 lg:pb-28">
        <PopIn className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <Spotlight key={g} className="p-7 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <h2 className="headline text-[clamp(1.4rem,2.2vw,1.75rem)]">{categoryLabels[g]}</h2>
                <span aria-hidden className="headline text-outline text-[2rem] leading-none opacity-40 transition-opacity duration-500 group-hover/spot:opacity-100">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="mt-6 space-y-4">
                {skills
                  .filter((s) => s.category === g)
                  .map((s) => (
                    <li key={s.name}>
                      <div className="flex justify-between text-[15px] font-medium">
                        {s.name}
                        <span className="text-muted">{s.level ?? 3}/5</span>
                      </div>
                      {/* The bar fills as it scrolls into view (CSS scroll timeline). */}
                      <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-surface-2">
                        <span className="draw-x block h-full" style={{ width: `${(s.level ?? 3) * 20}%` }}>
                          <span className="ig-gradient block size-full rounded-full" />
                        </span>
                      </span>
                    </li>
                  ))}
              </ul>
            </Spotlight>
          ))}
        </PopIn>
      </section>

      <section className="container-page pb-24 lg:pb-32">
        <SectionTitle
          eyebrow="How I work"
          title={
            <>
              Scroll through <span className="serif ig-text pr-[0.06em]">the process.</span>
            </>
          }
        />
        <div className="mt-12 lg:mt-20">
          <ProcessMap />
        </div>
      </section>
    </PageShell>
  );
}
