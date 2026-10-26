import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { contactDelivery } from "@/lib/site";
import { PageShell } from "@/components/layout/PageShell";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { LocalTime } from "@/components/ui/LocalTime";
import { QueryForm } from "@/components/report/QueryForm";
import { PageHead } from "@/components/report/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Let's talk about your search visibility. Reach out to Leesa Rai for healthcare SEO, local search optimization, and AI discoverability.",
  alternates: { canonical: "/contact" },
};

const tips = ["Your practice and specialty", "Where patients should find you (city, area)", "What you've tried so far, and your goal"];

export default function ContactPage() {
  const delivery = contactDelivery() !== null;
  const { email } = profile.contact;
  const socials = profile.social.filter((s): s is { label: string; href: string } => s.href !== null);

  return (
    <PageShell>
      <PageHead
        emblem="AEO"
        crumb="Contact"
        title={
          <>
            Run a <span className="text-ember">query.</span>
          </>
        }
        deck="Tell me where you want to be found. I'll reply with what's in the way — and what to fix first."
        meta={[
          { k: "Based in", v: profile.location.label },
          { k: "Local time", v: <LocalTime timeZone={profile.location.timezone} /> },
          { k: "Status", v: "Open to projects" },
          { k: "Best way", v: "Email" },
        ]}
      />

      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_22rem] lg:gap-16 lg:py-24">
        <QueryForm delivery={delivery} email={email} />

        <aside className="space-y-10">
          <div>
            <p className="label text-[10px] text-muted">Direct</p>
            <a href={`mailto:${email}`} className="mt-3 block break-all text-[20px] font-medium hover:text-ember">
              {email}
            </a>
            <div className="mt-3">
              <CopyEmail email={email} />
            </div>
          </div>
          <div>
            <p className="label text-[10px] text-muted">Helpful to include</p>
            <ol className="mt-3 space-y-2 text-[15px]">
              {tips.map((t, i) => (
                <li key={t} className="flex gap-3 border-b border-line pb-2">
                  <span className="font-mono text-[11px] text-ember">0{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="label text-[10px] text-muted">Local time</p>
            <p className="mt-2 font-mono text-[15px]">
              <LocalTime timeZone={profile.location.timezone} /> {profile.location.zoneLabel} · {profile.location.label}
            </p>
            <p className="label mt-3 flex items-center gap-2 text-[10px]">
              <span aria-hidden className="blink size-1.5 bg-geo" /> {profile.availability.label}
            </p>
          </div>
          {socials.length > 0 && (
            <div>
              <p className="label text-[10px] text-muted">Elsewhere</p>
              <ul className="mt-3 space-y-1">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-[16px] hover:text-ember">
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>
    </PageShell>
  );
}
