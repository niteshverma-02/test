import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { proof } from "@/content/proof";
import { PageShell } from "@/components/layout/PageShell";
import { CaseCards } from "@/components/report/CaseCards";
import { Evidence } from "@/components/report/Evidence";
import { PageHead, SectionHead } from "@/components/report/ui";

export const metadata: Metadata = {
  title: "Work & Proof",
  description: "Healthcare SEO case studies, verified Google Search Console growth, AI Overview results, and client evidence by Leesa Rai.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <PageShell>
      <PageHead
        emblem="SEO"
        crumb="Work"
        title={
          <>
            Work &amp; <span className="text-ember">proof.</span>
          </>
        }
        deck="Case studies from doctors and clinics, plus every verified screenshot — Search Console, AI Overviews, ChatGPT, Gemini and real patient enquiries."
        meta={[
          { k: "Case studies", v: projects.length },
          { k: "Exhibits", v: proof.length },
          { k: "Focus", v: "Healthcare" },
          { k: "Period", v: "2025 — now" },
        ]}
      />

      <section aria-labelledby="cases-title" className="container-page pt-12 lg:pt-16">
        <SectionHead
          num="01"
          label="Case studies"
          id="cases-title"
          title={
            <>
              Ranked <span className="grad-text">results.</span>
            </>
          }
          intro="Doctors, clinics and community campaigns — each one a real search problem with a measurable answer."
        />
        <div className="mt-12">
          <CaseCards />
        </div>
      </section>

      <Evidence />
    </PageShell>
  );
}
