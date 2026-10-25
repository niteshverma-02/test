import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { ArrowUpRight, ChevronDown, Clock, Info, Mail, MapPin, Phone, Sparkles, SquarePen, Video } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { profile } from "@/content/profile";
import { contactDelivery } from "@/lib/site";
import { cn } from "@/lib/cn";
import { PageShell } from "@/components/layout/PageShell";
import { RevealText } from "@/components/motion/RevealText";
import { Aurora } from "@/components/ui/Aurora";
import { LocalTime } from "@/components/ui/LocalTime";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { Avatar } from "@/components/contact/Avatar";
import { Greeting } from "@/components/contact/Greeting";

export const metadata: Metadata = {
  title: "Contact",
  description: "Let's talk about your search visibility. Reach out to Leesa Rai for healthcare SEO, local search optimization, and AI discoverability.",
  alternates: { canonical: "/contact" },
};

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const socialIcons: Record<string, { icon: Icon; tint: string }> = {
  LinkedIn: { icon: LinkedinIcon, tint: "bg-[#0a66c2]" },
  Instagram: { icon: InstagramIcon, tint: "ig-gradient" },
};

const tips = ["Your brand and who it's for", "The platforms you're on today", "What you'd like to change, and by when"];

/** An Instagram "note": a little thought bubble floating above an avatar. */
function Note({ icon: Icon, note, label }: { icon: Icon; note: ReactNode; label: string }) {
  return (
    <li className="flex w-[4.75rem] shrink-0 sm:w-[5.5rem] flex-col items-center">
      <div className="flex h-14 items-end">
        <p className="relative z-10 -mb-3 max-w-full rounded-2xl bg-bg px-2.5 py-1.5 text-center text-[11px] font-medium leading-tight text-fg shadow-[0_6px_18px_-6px_rgba(26,10,18,0.28)]">
          {note}
          <span aria-hidden className="absolute -bottom-1 left-4 size-2 rounded-full bg-bg" />
          <span aria-hidden className="absolute -bottom-2.5 left-3 size-1 rounded-full bg-bg" />
        </p>
      </div>
      <span aria-hidden className="grid size-16 place-items-center rounded-full border border-line bg-surface-2 text-muted">
        <Icon className="size-6" />
      </span>
      <span className="mt-1.5 text-[12px] text-muted">{label}</span>
    </li>
  );
}

export default function ContactPage() {
  const delivery = contactDelivery() !== null;
  const { email } = profile.contact;
  const { identity, location, availability } = profile;
  const socials = profile.social.flatMap((s) => (s.href && socialIcons[s.label] ? [{ ...s, href: s.href, ...socialIcons[s.label] }] : []));
  const channels = [
    { label: "Email", href: `mailto:${email}`, icon: Mail as Icon, tint: "ig-gradient", external: false },
    ...socials.map((s) => ({ ...s, external: true })),
  ];

  return (
    <PageShell>
      <section className="relative overflow-clip pb-10 pt-[calc(var(--nav-h)+3.5rem)] lg:pb-14 lg:pt-[calc(var(--nav-h)+6rem)]">
        <Aurora subtle />
        <div className="container-page relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end lg:gap-12">
          <div>
            <p className="eyebrow mark w-fit">Contact</p>
            <RevealText as="h1" immediate className="headline mt-4 text-[clamp(2.5rem,7.2vw,5.75rem)]">
              Message requests <span className="serif ig-text pr-[0.06em]">{availability.open ? "are open." : "welcome."}</span>
            </RevealText>
          </div>
          <RevealText as="p" immediate delay={0.25} className="max-w-md text-[clamp(1.0625rem,1.6vw,1.25rem)] text-muted lg:pb-3">
            Tell me about your brand: where it is today and where you want it to go. Pick a topic, type it like a DM, hit send.
          </RevealText>
        </div>
      </section>

      <section aria-label="Direct messages" className="container-page relative pb-24 lg:pb-32">
        <span
          aria-hidden
          className="ig-gradient drift pointer-events-none absolute left-[20%] top-10 size-[22rem] rounded-full opacity-25 blur-[110px] sm:size-[30rem]"
        />
        <div className="relative grid overflow-hidden rounded-[28px] border border-line bg-bg shadow-[var(--shadow)] lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] lg:rounded-[36px] xl:grid-cols-[minmax(0,370px)_minmax(0,1fr)]">
          {/* Inbox. Phones and tablets: one "notes" row above the chat. Desktop: the full left pane. */}
          <aside aria-label="Inbox" className="flex min-w-0 flex-col border-b border-line bg-surface/60 lg:border-b-0 lg:border-r">
            <div className="contents">
              <div className="hidden items-center justify-between px-6 pb-1 pt-6 lg:flex">
                <p className="flex items-center gap-1 text-[18px] font-bold tracking-tight">
                  {identity.handle} <ChevronDown aria-hidden className="size-4" />
                </p>
                <SquarePen aria-hidden className="size-5" />
              </div>

              <ul aria-label="Notes" className="flex gap-1 overflow-x-auto px-3 pb-4 pt-2 [scrollbar-width:none] sm:px-5 lg:pt-3">
                <Note icon={MapPin} note={`📍 ${location.label}`} label="Based in" />
                <Note
                  icon={Clock}
                  note={
                    <span className="tabular-nums">
                      <LocalTime timeZone={location.timezone} /> {location.zoneLabel}
                    </span>
                  }
                  label="Local time"
                />
                {availability.open && <Note icon={Sparkles} note={`${availability.label} ✨`} label="Status" />}
                {/* Channels sit in the row as "active now" avatars until the full list has room. */}
                {channels.map((c) => (
                  <li key={c.label} className="flex w-[4.75rem] shrink-0 sm:w-[5.5rem] flex-col items-center lg:hidden">
                    <a
                      href={c.href}
                      {...(c.external && { target: "_blank", rel: "noopener noreferrer" })}
                      className="group mt-14 flex flex-col items-center rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "grid size-16 place-items-center rounded-full text-white transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-1",
                          c.tint,
                        )}
                      >
                        <c.icon className="size-6" />
                      </span>
                      <span className="mt-1.5 text-[12px] font-medium">{c.label}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="hidden px-3 pb-6 lg:block">
                <div className="flex items-baseline justify-between px-3 pb-2 pt-3">
                  <h2 className="text-[16px] font-bold">Messages</h2>
                  <span className="text-[13px] font-semibold text-muted">Channels</span>
                </div>
                <ul className="grid grid-cols-1 gap-1">
                  <li>
                    <a href="#dm-thread" aria-current="true" className="flex items-center gap-3 rounded-2xl bg-surface-2 px-3 py-2.5">
                      <Avatar ring active className="size-14 text-[15px]" />
                      <span className="min-w-0">
                        <span className="block text-[15px] font-semibold">{identity.name}</span>
                        <span className="block truncate text-[13px] text-muted">Say hi 👋 · Active now</span>
                      </span>
                    </a>
                  </li>
                  <li className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-surface-2/60">
                    <span aria-hidden className="ig-gradient grid size-14 shrink-0 place-items-center rounded-full text-white">
                      <Mail className="size-6" />
                    </span>
                    <a href={`mailto:${email}`} className="min-w-0 flex-1 rounded-lg hover:underline">
                      <span className="block text-[15px] font-semibold">Email</span>
                      <span className="block truncate text-[13px] text-muted">{email}</span>
                    </a>
                    <CopyEmail email={email} />
                  </li>
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-surface-2/60"
                      >
                        <span aria-hidden className={cn("grid size-14 shrink-0 place-items-center rounded-full text-white", s.tint)}>
                          <s.icon className="size-6" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[15px] font-semibold">{s.label}</span>
                          <span className="block truncate text-[13px] text-muted">Connect with {identity.firstName}</span>
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 text-muted transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Fills the quiet end of the inbox with something useful. */}
            <div className="mx-6 mb-6 mt-auto hidden rounded-3xl border border-dashed border-accent/30 bg-bg/70 p-5 lg:block">
              <p className="text-[13px] font-semibold">💡 Worth including</p>
              <ul className="mt-2 grid gap-1.5 text-[13px] text-muted">
                {tips.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-(image:--ig)" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* The open conversation. */}
          <div className="flex min-w-0 flex-col">
            <header className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-6">
              <Avatar ring className="size-11 text-[13px]" />
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-[15px] font-semibold">{identity.handle}</h2>
                <p className="flex items-center gap-1.5 text-[12px] text-muted">
                  <span aria-hidden className="size-2 rounded-full bg-[#22c55e]" /> Active now
                </p>
              </div>
              <div aria-hidden className="flex items-center gap-4 sm:gap-5">
                <Phone className="size-[22px]" />
                <Video className="size-6" />
                <Info className="hidden size-[22px] sm:block" />
              </div>
            </header>

            <div id="dm-thread" className="flex flex-1 flex-col px-4 pb-6 pt-8 sm:px-8 sm:pb-8 lg:px-10">
              <div className="flex flex-col items-center text-center">
                <Avatar ring className="size-24 text-[26px]" />
                <p className="mt-3 text-[20px] font-bold tracking-tight">{identity.name}</p>
                <p className="text-[14px] text-muted">
                  {identity.handle} · {profile.role}
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link
                    href="/about"
                    className="inline-flex h-10 items-center rounded-xl bg-surface-2 px-4 text-[14px] font-semibold transition-transform active:scale-95"
                  >
                    View profile
                  </Link>
                  <span className="lg:hidden [&>button]:h-10 [&>button]:rounded-xl [&>button]:bg-surface-2">
                    <CopyEmail email={email} />
                  </span>
                </div>
                <p className="mt-8 text-[12px] font-medium text-muted">
                  Today <LocalTime timeZone={location.timezone} className="tabular-nums" />
                </p>
              </div>

              <div className="mt-4">
                <Greeting />
              </div>
              <ContactForm delivery={delivery} email={email} />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
