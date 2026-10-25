import type { Metadata } from "next";
import { Award, GraduationCap } from "lucide-react";
import { certifications, education, showEducationScores } from "@/content/experience";
import { profile } from "@/content/profile";
import { PageShell } from "@/components/layout/PageShell";
import { DeckIn } from "@/components/motion/DeckIn";
import { PopIn } from "@/components/motion/PopIn";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ExperienceStack } from "@/components/experience/ExperienceStack";

export const metadata: Metadata = {
  title: "Experience",
  description: "Where I've worked and studied.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Experience"
        title={
          <>
            Where I&rsquo;ve <span className="serif ig-text pr-[0.06em]">worked.</span>
          </>
        }
        sub="Client projects, formal training, and a habit of always learning."
      >
        {profile.cv.href && (
          <div className="mt-8 flex justify-center">
            <Button href={profile.cv.href} variant="secondary">
              {profile.cv.label}
            </Button>
          </div>
        )}
      </PageHero>

      <section className="container-page pb-20 lg:pb-28">
        <ExperienceStack />
      </section>

      <section className="container-page pb-24 lg:pb-32">
        <SectionTitle
          eyebrow="Education"
          title={
            <>
              Where I <span className="serif ig-text pr-[0.06em]">studied.</span>
            </>
          }
        />
        <PopIn className="mt-14 grid gap-4 md:grid-cols-3">
          {education.map((ed, i) => (
            <div key={ed.level} className="card group ig-edge shine p-8">
              <div className="flex items-center justify-between">
                <span className="headline text-outline text-[3.5rem] leading-none transition-[-webkit-text-stroke-color] duration-500 group-hover:[-webkit-text-stroke-color:var(--color-accent)]">
                  {ed.year}
                </span>
                {i === 0 && (
                  <span className="wiggle grid size-10 place-items-center rounded-full bg-bg">
                    <GraduationCap aria-hidden className="size-5" />
                  </span>
                )}
              </div>
              <p className="mt-6 text-[13px] font-semibold text-muted">{ed.level}</p>
              <h3 className="mt-1 text-[19px] font-semibold leading-snug tracking-tight">{ed.field}</h3>
              <p className="mt-3 text-[15px] text-muted">
                {ed.institution} · {ed.board}
                {showEducationScores && ed.score && ` · ${ed.score}`}
              </p>
            </div>
          ))}
        </PopIn>
      </section>
      <section aria-labelledby="certs-title" className="container-page pb-24 lg:pb-32">
        <SectionTitle eyebrow="Certifications" title={
            <span id="certs-title">
              Always <span className="serif ig-text pr-[0.06em]">learning.</span>
            </span>
          } />
        <DeckIn className="mt-14 grid gap-4 md:grid-cols-3">
          {certifications.map((c, i) => (
            <div
              key={c.name}
              className={`card group ig-edge shine p-8 transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-2 ${i % 2 ? "hover:rotate-1" : "hover:-rotate-1"}`}
            >
              <span className="grid size-14 place-items-center rounded-2xl ig-gradient text-white transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-rotate-12 group-hover:scale-110">
                <Award aria-hidden className="size-7" />
              </span>
              <p className="mt-6 text-[13px] font-semibold text-muted">
                {c.issuer} · {c.year}
              </p>
              <h3 className="headline mt-1 text-[1.5rem] leading-tight">{c.name}</h3>
              {c.href && (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-[15px] font-medium text-link underline-offset-4 hover:underline">
                  View certificate
                </a>
              )}
            </div>
          ))}
        </DeckIn>
      </section>
    </PageShell>
  );
}
