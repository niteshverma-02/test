import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/content/navigation";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { LocalTime } from "@/components/ui/LocalTime";
import { Magnetic } from "@/components/motion/Magnetic";
import { Note } from "./Hand";

// Cached so the build-time year doesn't make every page dynamic (Cache Components).
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

/** A spinning circular badge: "BOOK A FREE SEO AUDIT" orbits an arrow. */
function AuditBadge() {
  return (
    <Magnetic strength={0.3}>
      <Link href="/contact" data-cursor="Let's talk" aria-label="Book a free SEO audit" className="group relative grid size-40 place-items-center sm:size-48">
        <svg viewBox="0 0 200 200" aria-hidden className="spin-slow absolute inset-0 size-full text-fg">
          <defs>
            <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <text className="fill-current font-mono text-[13px] uppercase tracking-[0.32em]">
            <textPath href="#badge-circle">Book a free SEO audit · Book a free SEO audit ·</textPath>
          </text>
        </svg>
        <span className="grid size-20 place-items-center rounded-full bg-ember text-bg transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-110 sm:size-24">
          <ArrowUpRight aria-hidden className="size-8 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </Link>
    </Magnetic>
  );
}

/** Navy footer: a closing ask with a spinning badge, link columns, and the name filling with coral as it scrolls in. */
export async function Footer() {
  const year = await currentYear();
  const social = profile.social.filter((s): s is { label: string; href: string } => s.href !== null);
  const col = "label text-[10px] text-subtle";
  const link = "link-draw group inline-flex items-center gap-1 text-[15px] text-muted transition-colors hover:text-fg";

  return (
    <footer className="relative z-10 overflow-clip border-t border-line">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 size-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />

      <div className="container-page relative grid items-center gap-10 pt-20 lg:grid-cols-[1fr_auto] lg:pt-28">
        <div>
          <p className="label flex items-center gap-3 text-[10px] text-muted">
            <span aria-hidden className="blink size-1.5 rounded-full bg-geo" /> {profile.availability.label}
          </p>
          <p className="poster mt-6 text-[clamp(2.6rem,6vw,5.5rem)]">
            Got a page that <br className="hidden sm:block" />
            should <span className="text-ember">rank?</span>
          </p>
          <a
            href={`mailto:${profile.contact.email}`}
            className="mt-8 inline-flex items-center gap-2 break-all text-[clamp(1.1rem,2.2vw,1.6rem)] text-fg underline decoration-line decoration-1 underline-offset-8 transition-colors hover:text-ember hover:decoration-ember"
          >
            {profile.contact.email}
          </a>
        </div>
        <div className="relative">
          <Note arrow="down-right" className="absolute -left-36 -top-8 hidden -rotate-6 lg:flex">say hi :)</Note>
          <AuditBadge />
        </div>
      </div>

      <div className="container-page relative mt-20 grid grid-cols-2 gap-10 border-t border-line pt-10 md:grid-cols-4">
        <nav aria-label="Footer">
          <p className={col}>Navigate</p>
          <ul className="mt-4 space-y-2">
            {navigation.map((n) => (
              <li key={n.href} className="rise">
                <Link href={n.href} className={link}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className={col}>Case studies</p>
          <ul className="mt-4 space-y-2">
            {projects.map((p) => (
              <li key={p.slug} className="rise">
                <Link href={`/work/${p.slug}`} className={link}>
                  {p.name.split(" — ")[0]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={col}>Contact</p>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={`mailto:${profile.contact.email}`} className={link}>
                Email
              </a>
            </li>
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                  {s.label} <ArrowUpRight aria-hidden className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={col}>Local time</p>
          <p className="mt-4 font-mono text-[15px] text-fg">
            <LocalTime timeZone={profile.location.timezone} />
          </p>
          <p className="mt-1 text-[14px] text-muted">
            {profile.location.zoneLabel} · {profile.location.label}
          </p>
        </div>
      </div>

      <p aria-hidden className="fill-name poster relative mt-10 select-none whitespace-nowrap pb-[0.04em] pt-[0.06em] text-center text-[19vw] leading-[0.9]">
        {profile.identity.name}
      </p>

      <div className="container-page relative flex flex-wrap items-center justify-between gap-3 border-t border-line py-6">
        <span className="label text-[10px] text-subtle">
          © {year} {profile.identity.name} · {profile.role}
        </span>
        <a href="#main" className="label inline-flex items-center gap-2 text-[10px] text-muted hover:text-ember">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
