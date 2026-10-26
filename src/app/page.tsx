import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/report/Hero";
import { Statement } from "@/components/report/Statement";
import { Marquee } from "@/components/report/Marquee";
import { Engines } from "@/components/report/Engines";
import { Evidence } from "@/components/report/Evidence";
import { CaseCards } from "@/components/report/CaseCards";
import { ProcessRail } from "@/components/report/ProcessRail";
import { ServiceIndex } from "@/components/report/ServiceIndex";
import { Closing } from "@/components/report/Closing";
import { Btn, SectionHead } from "@/components/report/ui";

const queries = [
  "orthopaedic surgeon near me",
  "is knee replacement safe at 70?",
  "best clinic open now",
  "hip surgery recovery time",
  "dentist with good reviews",
  "who treats sports injuries?",
];

export default function HomePage() {
  return (
    <PageShell>
      <Hero />

      <Marquee
        className="border-y border-fg bg-fg py-4 text-bg"
        items={queries.map((q, i) => (
          <span key={q} className="flex items-center gap-6 pr-6">
            <span className="font-mono text-[11px] opacity-60">Q{String(i + 1).padStart(2, "0")}</span>
            <span className="poster text-[clamp(1.8rem,3.4vw,3rem)]">&ldquo;{q}&rdquo;</span>
            <span aria-hidden className="size-2.5 bg-ember" />
          </span>
        ))}
      />

      <Statement />

      <Engines />

      {/* Oversized outline band that leans and speeds up with the scroll. */}
      <Marquee
        reverse
        duration={30}
        className="py-6"
        items={["Rank", "Answer", "Recommend", "Get found"].map((w, i) => (
          <span key={w} className="flex items-center gap-8 pr-8">
            <span className={i % 2 ? "poster text-[clamp(4rem,11vw,10rem)] text-ember" : "poster text-[clamp(4rem,11vw,10rem)] text-transparent [-webkit-text-stroke:1.5px_var(--fg)]"}>{w}</span>
            <svg viewBox="0 0 24 24" aria-hidden className="size-[clamp(2rem,4vw,3.5rem)] text-geo">
              <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      />

      <Evidence />

      <section aria-labelledby="cases-title" className="container-page py-12 lg:py-20">
        <SectionHead
          num="03"
          label="Case studies"
          id="cases-title"
          title={
            <>
              Ranked <span className="grad-text">results.</span>
            </>
          }
          intro="Doctors, clinics and community campaigns — each one a real search problem with a measurable answer."
        />
        <div className="mt-10">
          <CaseCards />
        </div>
      </section>

      <ProcessRail />

      <section aria-labelledby="services-title" className="container-page py-12 lg:py-20">
        <SectionHead num="05" label="Services" id="services-title" title="What I optimise." intro="Seven ways in. Pick one, or let the audit tell us where the biggest gap is." />
        <div className="mt-10">
          <ServiceIndex />
        </div>
        <div className="mt-10">
          <Btn href="/services" variant="line">
            All services
          </Btn>
        </div>
      </section>

      <Closing />
    </PageShell>
  );
}
