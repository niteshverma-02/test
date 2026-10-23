import Link from "next/link";
import { navigation } from "@/content/navigation";
import { profile } from "@/content/profile";
import { LocalTime } from "@/components/ui/LocalTime";
import { Monogram } from "@/components/ui/Monogram";
import { BackToTop } from "./BackToTop";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

/** Small, quiet footer — Apple-style. */
export async function SiteFooter() {
  const year = await currentYear();
  const links = [
    { label: "Email", href: `mailto:${profile.contact.email}` },
    ...profile.social.filter((s): s is { label: string; href: string } => s.href !== null),
    ...(profile.cv.href ? [{ label: "Resume", href: profile.cv.href }] : []),
  ];

  return (
    <footer className="border-t border-line bg-surface text-[13px] text-muted">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5 text-fg">
            <Monogram initials={profile.identity.initials} />
            <span className="text-[15px] font-semibold tracking-tight">{profile.identity.name}</span>
          </Link>
          <p className="mt-3 max-w-[16rem]">{profile.role}. {profile.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <p className="font-semibold text-fg">Pages</p>
          <ul className="mt-3 space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-semibold text-fg">Connect</p>
          <ul className="mt-3 space-y-2">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="transition-colors hover:text-fg"
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-fg">Local time</p>
          <p className="mt-3 tabular-nums">
            <LocalTime timeZone={profile.location.timezone} /> {profile.location.zoneLabel}
          </p>
          <p className="mt-1">{profile.location.label}</p>
        </div>
      </div>

      <div className="container-page pb-10 text-center">
        <p className="text-[13px] font-medium">Let&rsquo;s be mutuals ✨</p>
        <Link href="/contact" className="serif ig-text mt-1 inline-block pr-[0.06em] text-[clamp(3.5rem,13vw,11rem)] leading-[1.05] transition-transform duration-700 ease-[var(--ease-expo)] hover:scale-[1.03]">
          @{profile.identity.handle}
        </Link>
      </div>

      <div className="container-page flex flex-col gap-3 border-t border-line py-5 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.identity.name}. Built with Next.js.
        </p>
        <BackToTop />
      </div>
    </footer>
  );
}
