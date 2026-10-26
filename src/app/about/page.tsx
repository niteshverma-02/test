import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { platforms } from "@/content/experience";
import { PageShell } from "@/components/layout/PageShell";
import { RevealText } from "@/components/motion/RevealText";
import { Btn, PageHead, SectionHead } from "@/components/report/ui";
import { Note } from "@/components/report/Hand";

export const metadata: Metadata = {
  title: "About",
  description:
    "Leesa Rai is a healthcare SEO, AEO & GEO specialist in India helping doctors and local businesses get found on Google, in AI answers and on the map.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { about, identity, role, location, availability } = profile;
  const facts = [
    { k: "Name", v: identity.name },
    { k: "Occupation", v: role },
    { k: "Specialises in", v: about.interests.join(" · ") },
    { k: "Based in", v: `${location.label} (${location.zoneLabel})` },
    { k: "Works with", v: "Doctors, clinics & local businesses" },
    { k: "Instruments", v: platforms.map((p) => p.name).join(" · ") },
    { k: "Status", v: availability.label },
  ];

  return (
    <PageShell>
      <PageHead
        emblem="GEO"
        crumb="About"
        title={
          <>
            The <span className="text-ember">analyst.</span>
          </>
        }
        deck={about.lede}
        meta={[
          { k: "Based in", v: location.label },
          { k: "Focus", v: "Healthcare search" },
          { k: "Since", v: "2024" },
          { k: "Status", v: "Open to work" },
        ]}
      />

      <section aria-labelledby="entity-title" className="container-page pt-12 lg:pt-16">
        <SectionHead
          num="01"
          label="Entity card"
          id="entity-title"
          title="How AI should see me."
          intro="GEO starts with a clear entity. This is the card I'd want ChatGPT, Gemini or Google to hold about me — so I keep it exact."
        />
        <div className="relative">
          <Note arrow="down-right" className="absolute -top-2 left-[24rem] hidden rotate-2 lg:flex">yep, that&rsquo;s me</Note>
        </div>
        <div className="panel mt-12 grid lg:grid-cols-[22rem_1fr]">
          <div className="relative grid aspect-[16/7] place-items-center overflow-hidden bg-ember text-ink sm:aspect-[3/1] lg:aspect-auto">
            <span aria-hidden className="ruled absolute inset-0 opacity-30" />
            <span className="poster relative text-[clamp(8rem,22vw,14rem)]">{identity.initials}</span>
            <span className="label absolute bottom-4 left-4 flex items-center gap-2 text-[10px]">
              <span className="relative size-2 rounded-full bg-ink">
                <span className="ping text-ink" />
              </span>
              Entity · Person
            </span>
          </div>
          <dl className="border-t border-line lg:border-l lg:border-t-0">
            {facts.map((f) => (
              <div key={f.k} className="grid gap-1 border-b border-line px-6 py-4 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="label text-[10px] text-muted">{f.k}</dt>
                <dd className="text-[16px]">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="story-title" className="container-page pt-14 lg:pt-20">
        <SectionHead num="02" label="Story" id="story-title" title="Why search." />
        <RevealText as="p" className="mt-12 max-w-4xl text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium leading-[1.2] tracking-tight">
          <span className="marker">&ldquo;{about.quote}&rdquo;</span>
        </RevealText>
        <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-3">
          {about.story.map((p, i) => (
            <p key={i} className="text-[16px] text-muted">
              <span className="font-mono text-[11px] text-fg">0{i + 1} — </span>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section aria-labelledby="bring-title" className="container-page pt-14 lg:pt-20">
        <SectionHead num="03" label="What I bring" id="bring-title" title="How I think." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {about.bring.map((b, i) => (
            <article key={b.title} className="group panel p-6 transition-colors duration-500 hover:bg-fg hover:text-bg">
              <p className="poster text-[4rem] text-ember">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 text-[18px] font-semibold leading-snug">{b.title}</h3>
              <p className="mt-2 text-[14px] opacity-75">{b.text}</p>
            </article>
          ))}
        </div>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {about.principles.map((p, i) => (
            <li key={p.title} className="border-t-4 border-seo pt-4">
              <p className="label text-[10px] text-muted">Principle {i + 1}</p>
              <p className="mt-2 text-[17px] font-semibold">{p.title}</p>
              <p className="mt-1 text-[14px] text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="journey-title" className="container-page pt-14 lg:pt-20">
        <SectionHead num="04" label="Journey" id="journey-title" title="The climb." />
        <ol className="relative mt-12 border-l border-line">
          {about.journey.map((j, i) => (
            <li key={j.title} className="rise relative grid gap-2 pb-10 pl-8 sm:grid-cols-[8rem_1fr] sm:gap-8">
              <span aria-hidden className={`absolute -left-[7px] top-2 size-3.5 border border-fg ${i === about.journey.length - 1 ? "bg-ember" : "bg-bg"}`} />
              <p className="poster text-[2.2rem]">{j.when}</p>
              <div>
                <h3 className="text-[19px] font-semibold">{j.title}</h3>
                <p className="mt-1 max-w-xl text-[15px] text-muted">{j.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="off-title" className="container-page py-14 lg:py-20">
        <SectionHead num="05" label="Off the clock" id="off-title" title="Also true." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {about.funFacts.map((f) => (
            <li key={f.text} className="rise flex gap-4 panel p-6">
              <span aria-hidden className="text-[2rem] leading-none">
                {f.emoji}
              </span>
              <div>
                <p className="font-semibold">{f.text}</p>
                <p className="mt-1 text-[14px] text-muted">{f.detail}</p>
              </div>
            </li>
          ))}
        </ul>
        <ul className="mt-8 flex flex-wrap gap-2">
          {about.hobbies.map((h) => (
            <li key={h} className="label rounded-full border border-line px-4 py-2 text-[10px]">
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Btn href="/contact">Say hello</Btn>
        </div>
      </section>
    </PageShell>
  );
}
