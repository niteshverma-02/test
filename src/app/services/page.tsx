import type { Metadata } from "next";
import { services } from "@/content/services";
import { PageShell } from "@/components/layout/PageShell";
import { ServiceIndex } from "@/components/report/ServiceIndex";
import { Btn, PageHead, SectionHead } from "@/components/report/ui";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Healthcare & Local SEO, AEO & GEO, Website Audits, and Content Strategy — services by Leesa Rai designed to help doctors and businesses get found on Google.",
  alternates: { canonical: "/services" },
};

const workStyles = [
  {
    tag: "Ongoing",
    title: "Monthly retainer",
    description: "For doctors and clinics needing ongoing healthcare SEO, Google Business Profile management, local citations, and AI search visibility.",
    best: "Practices wanting continuous search growth",
  },
  {
    tag: "Scoped",
    title: "Project-based",
    description: "For defined projects such as a complete website SEO audit, technical health overhaul, or targeted AEO/GEO content architecture.",
    best: "Clinics launching new websites or fixing audits",
  },
  {
    tag: "Advice",
    title: "Consultation",
    description: "For healthcare brands and businesses that need strategic search guidance, competitor analysis, or local visibility direction.",
    best: "Founders wanting direct SEO advice",
  },
];

/* Written to be quotable: short, direct answers — the same format AI engines lift into answers. */
const faqs = [
  {
    q: "What is the difference between SEO, AEO and GEO?",
    a: "SEO helps your pages rank in Google's regular results and the local map pack. AEO (Answer Engine Optimisation) shapes your content so Google's AI Overviews and other answer boxes can quote it. GEO (Generative Engine Optimisation) builds the mentions and signals that lead ChatGPT, Gemini and Perplexity to recommend you by name.",
  },
  {
    q: "Why does a doctor need AEO and GEO, not only SEO?",
    a: "Patients increasingly ask AI tools questions like “who is a good knee surgeon near me?” and act on the answer without clicking ten links. If your practice isn't part of that answer, you are invisible at the moment of decision.",
  },
  {
    q: "How long does healthcare SEO take to show results?",
    a: "Technical fixes and Google Business Profile improvements can show movement within weeks; content and authority work typically compounds over three to six months. Progress is tracked in Google Search Console from day one.",
  },
  {
    q: "Where do you start with a new clinic?",
    a: "With an audit: website health, how patients search for your specialty and location, what competitors rank for, and how AI tools currently describe you. That becomes a prioritised plan.",
  },
  {
    q: "Do you use black-hat or paid link schemes?",
    a: "No. All work is white-hat: genuine content, real community participation, accurate citations and ethical outreach — the kind of authority that lasts and keeps medical trust intact.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function ServicesPage() {
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }} />
      <PageHead
        emblem="AEO"
        crumb="Services"
        title={
          <>
            Services<span className="text-ember">.</span>
          </>
        }
        deck="Search visibility for doctors, clinics and local businesses — across Google, AI answers and the map."
        meta={[
          { k: "Services", v: services.length },
          { k: "Ways to work", v: workStyles.length },
          { k: "Engines", v: "SEO · AEO · GEO" },
          { k: "Approach", v: "White-hat only" },
        ]}
      />

      <section aria-labelledby="list-title" className="container-page pt-12 lg:pt-16">
        <SectionHead num="01" label="Index" id="list-title" title="What I optimise." intro="Open any line for the full scope." />
        <div className="mt-12">
          <ServiceIndex openFirst />
        </div>
      </section>

      <section aria-labelledby="ways-title" className="container-page pt-14 lg:pt-20">
        <SectionHead num="02" label="Engagement" id="ways-title" title="Ways to work." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {workStyles.map((w, i) => (
            <article key={w.title} className="group relative flex flex-col overflow-hidden panel p-7">
              <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-fg transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-y-100" />
              <div className="relative flex flex-1 flex-col transition-colors duration-300 group-hover:text-bg">
                <div className="flex items-center justify-between">
                  <span className="label text-[10px]">{w.tag}</span>
                  <span className="font-mono text-[12px]">0{i + 1}</span>
                </div>
                <h3 className="poster mt-10 text-[clamp(2.4rem,4vw,3.4rem)]">{w.title}</h3>
                <p className="mt-4 text-[15px] opacity-80">{w.description}</p>
                <p className="label mt-auto pt-8 text-[10px]">
                  <span className="text-ember">Best for →</span> {w.best}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-title" className="container-page py-14 lg:py-20">
        <SectionHead num="03" label="FAQ" id="faq-title" title="Questions, answered." intro="Marked up as FAQPage schema — the format answer engines read." />
        <div className="mt-12 border-t border-line">
          {faqs.map((f, i) => (
            <details key={f.q} name="faq" className="acc rise group border-b border-line">
              <summary className="grid cursor-pointer list-none grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 hover:text-ember [&::-webkit-details-marker]:hidden">
                <span className="font-mono text-[12px]">Q{i + 1}</span>
                <span className="text-[clamp(1.1rem,2vw,1.4rem)] font-medium">{f.q}</span>
                <span aria-hidden className="font-mono text-[18px] transition-transform duration-500 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-8 pl-[4rem] text-[16px] text-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-12">
          <Btn href="/contact">Ask your own question</Btn>
        </div>
      </section>
    </PageShell>
  );
}
