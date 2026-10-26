import type { Metadata } from "next";
import {
  certifications,
  education,
  experience,
  showEducationScores,
} from "@/content/experience";
import { PageShell } from "@/components/layout/PageShell";
import { RevealText } from "@/components/motion/RevealText";
import { Btn, PageHead, SectionHead } from "@/components/report/ui";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Where Leesa Rai has worked and studied — SEO, AEO, off-page and local search roles.",
  alternates: { canonical: "/experience" },
};

/** Experience as a changelog: newest release on top, each role a version. */
export default function ExperiencePage() {
  return (
    <PageShell>
      <PageHead
        emblem="GEO"
        crumb="Experience"
        title={
          <>
            Change<span className="text-ember">log.</span>
          </>
        }
        deck="Every role, newest first — written like release notes: what shipped, what it touched."
        meta={[
          { k: "Roles", v: experience.length },
          { k: "Current", v: experience.find((e) => e.current)?.org ?? "—" },
          { k: "Since", v: "2024" },
          { k: "Focus", v: "SEO · AEO · GEO" },
        ]}
      />

      <section
        aria-labelledby="log-title"
        className="container-page pt-12 lg:pt-16"
      >
        <SectionHead
          num="01"
          label="Releases"
          id="log-title"
          title="Work history."
        />
        {/* A timeline: the rail fills with coral as you scroll, each role is a card hanging off a node. */}
        <ol className="relative mt-12 grid gap-6 pl-8 sm:pl-12">
          <span
            aria-hidden
            className="absolute bottom-2 left-[7px] top-2 w-px bg-line sm:left-[11px]"
          />
          <span
            aria-hidden
            className="fill-y absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-ember via-geo to-aeo sm:left-[11px]"
          />
          {experience.map((e, i) => (
            <li key={e.role + e.org} className="relative">
              <span
                aria-hidden
                className={`absolute -left-8 top-9 grid size-4 place-items-center rounded-full border-2 sm:-left-12 sm:size-6 ${e.current ? "border-ember bg-ember/30" : "border-line bg-bg"}`}
              >
                {e.current && (
                  <span className="size-1.5 animate-ping rounded-full bg-ember" />
                )}
              </span>
              <div className="panel grid gap-6 p-6 sm:p-8 lg:grid-cols-[14rem_1fr]">
                <div>
                  <p className="poster text-[clamp(2.6rem,5vw,4rem)]">
                    v{experience.length - i}.0
                    {e.current && (
                      <span className="ml-3 rounded-full bg-ember/15 px-2 py-1 align-middle font-mono text-[11px] font-normal tracking-normal text-ember">
                        ● live
                      </span>
                    )}
                  </p>
                  <p className="label mt-2 text-[10px] text-muted">
                    {e.period}
                  </p>
                </div>
                <div>
                  <RevealText
                    as="h2"
                    className="poster text-[clamp(1.8rem,3.2vw,2.8rem)]"
                  >
                    {e.role}
                  </RevealText>
                  <p className="mt-1 text-[16px] font-medium text-ember">
                    @ {e.org}
                  </p>
                  <p className="mt-4 max-w-2xl text-[16px] text-muted">
                    {e.summary}
                  </p>
                  <ul className="mt-5 grid gap-1.5 text-[15px]">
                    {e.highlights.map((h) => (
                      <li key={h} className="rise flex gap-3">
                        <span
                          aria-hidden
                          className="font-mono text-[12px] text-geo"
                        >
                          +
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {e.stack.map((s) => (
                      <li
                        key={s}
                        className="label rounded-full border border-line px-2.5 py-1 text-[10px]"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="edu-title"
        className="container-page py-14 lg:py-20"
      >
        <SectionHead
          num="02"
          label="Education & certification"
          id="edu-title"
          title="Foundations."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {education.map((ed) => (
            <div key={ed.level} className="panel p-6">
              <p className="poster text-[3rem] text-ember">{ed.year}</p>
              <p className="label mt-4 text-[10px] text-muted">{ed.level}</p>
              <p className="mt-1 text-[17px] font-semibold">{ed.field}</p>
              <p className="mt-2 text-[14px] text-muted">
                {ed.institution}
                {showEducationScores && ed.score && ` · ${ed.score}`}
              </p>
            </div>
          ))}
          {certifications.map((c) => (
            <div key={c.name} className="panel p-6">
              <p className="poster text-[3rem]">{c.year}</p>
              <p className="label mt-4 text-[10px] text-muted">
                Certificate · {c.issuer}
              </p>
              <p className="mt-1 text-[17px] font-semibold">{c.name}</p>
              {c.href && (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-[14px] text-link hover:underline"
                >
                  View certificate ↗
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Btn href="/contact">Work with me</Btn>
        </div>
      </section>
    </PageShell>
  );
}
