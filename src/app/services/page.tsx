import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Compass, Heart, Mail, MessageCircle, Repeat2, Send, Target } from "lucide-react";
import { profile } from "@/content/profile";
import { PageShell } from "@/components/layout/PageShell";
import { DeckIn } from "@/components/motion/DeckIn";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealText } from "@/components/motion/RevealText";
import { StoryAvatar } from "@/components/mocks/Mocks";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceFeed } from "@/components/services/ServiceFeed";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Social media management, content strategy, personal branding, and Meta Ads — services by Tanu Rai designed around your brand's goals.",
  alternates: { canonical: "/services" },
};

const workStyles = [
  {
    Icon: Repeat2,
    tag: "Ongoing",
    title: "Monthly Retainer",
    description:
      "For businesses that need ongoing social media management and content support. A consistent, long-term partnership.",
    best: "Growing brands needing regular content",
    cta: "Subscribe monthly",
  },
  {
    Icon: Target,
    tag: "Scoped",
    title: "Project-Based",
    description:
      "For defined projects such as content strategy, profile optimisation, or campaign planning. Scoped, focused, and delivered.",
    best: "One-off content audits or campaign launches",
    cta: "Start a project",
  },
  {
    Icon: Compass,
    tag: "Advice",
    title: "Consultation",
    description:
      "For businesses that need guidance, content direction, or a fresh perspective on their current digital presence.",
    best: "Brands wanting strategy advice",
    cta: "Book a chat",
  },
];

export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesHero ways={workStyles.length} />
      <ServiceFeed />

      {/* Engagement models as subscription tiers */}
      <section id="tiers" aria-labelledby="tiers-title" className="container-page scroll-mt-24 pb-24 lg:pb-32">
        <div className="text-center">
          <p className="eyebrow mark">Subscribe</p>
          <RevealText as="h2" id="tiers-title" className="headline mx-auto mt-4 max-w-3xl text-[clamp(2.4rem,5.5vw,4.5rem)]">
            How we can <span className="serif ig-text pr-[0.06em]">work together.</span>
          </RevealText>
          <p className="mx-auto mt-5 max-w-lg text-[17px] text-muted">Three ways in. Pick the one that matches where your brand is right now.</p>
        </div>

        <DeckIn className="mt-14 grid gap-4 md:grid-cols-3 lg:gap-6">
          {workStyles.map((w, i) => {
            const featured = i === 0;
            return (
              <article
                key={w.title}
                className={`group relative flex min-w-0 flex-col overflow-hidden rounded-[28px] p-6 transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-2 sm:p-8 md:p-6 lg:p-8 ${
                  featured ? "bg-ink text-[#fdf0f5]" : "border border-line bg-surface"
                }`}
              >
                {featured && <span aria-hidden className="drift absolute -right-20 -top-20 size-64 rounded-full bg-[#962fbf] opacity-50 blur-[80px]" />}
                <div className="relative flex items-center justify-between gap-3">
                  <span className="ig-gradient grid size-12 shrink-0 place-items-center rounded-2xl text-white shadow-lg">
                    <w.Icon aria-hidden className="size-6" />
                  </span>
                  <span className={`truncate rounded-full px-3 py-1 text-[12px] font-semibold ${featured ? "bg-white/10 text-white/80" : "bg-bg text-muted"}`}>
                    Tier {String(i + 1).padStart(2, "0")} · {w.tag}
                  </span>
                </div>
                <h3 className="headline relative mt-8 text-[clamp(1.75rem,3vw,2.25rem)]">{w.title}</h3>
                <p className={`relative mt-3 text-[15px] leading-relaxed ${featured ? "text-white/75" : "text-muted"}`}>{w.description}</p>
                <p className={`relative mt-auto border-t pt-4 text-[13px] ${featured ? "border-white/15 text-white/70" : "border-line text-muted"}`}>
                  <span className={`font-semibold ${featured ? "text-white" : "text-fg"}`}>Best for · </span>
                  {w.best}
                </p>
                <Link
                  href="/contact"
                  className={`relative mt-6 inline-flex h-12 items-center justify-center gap-1.5 rounded-xl text-[15px] font-semibold transition-transform active:scale-95 ${
                    featured ? "ig-gradient shine text-white" : "bg-fg text-bg"
                  }`}
                >
                  {w.cta} <ChevronRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </article>
            );
          })}
        </DeckIn>
      </section>

      {/* Closing CTA as a sponsored post, laid out like Instagram's desktop post view */}
      <section id="dm" aria-labelledby="dm-title" className="container-page scroll-mt-24 pb-24 lg:pb-32">
        <FadeIn className="relative mx-auto grid max-w-5xl overflow-hidden rounded-[32px] border border-line bg-bg shadow-[var(--shadow)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          {/* Media */}
          <div className="relative flex min-h-[340px] min-w-0 flex-col justify-end overflow-hidden bg-ink p-7 text-[#fdf0f5] sm:min-h-[420px] sm:p-10">
            <span aria-hidden className="drift absolute -left-24 -top-24 size-96 rounded-full bg-[#d62976] opacity-60 blur-[90px]" />
            <span aria-hidden className="drift absolute -bottom-32 -right-24 size-96 rounded-full bg-[#4f5bd5] opacity-60 blur-[100px] [animation-delay:-8s]" />
            {["💬", "✨", "📈"].map((e, i) => (
              <span
                key={e}
                aria-hidden
                className="bob absolute text-[2rem] sm:text-[2.5rem]"
                style={{ right: `${10 + i * 16}%`, top: `${12 + (i % 2) * 12}%`, animationDelay: `${i * -1.4}s` }}
              >
                {e}
              </span>
            ))}
            <p className="relative text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70">Ready to start?</p>
            <RevealText as="h2" id="dm-title" className="headline relative mt-3 text-[clamp(2.4rem,6vw,4.25rem)]">
              Tell me about <span className="serif ig-text pr-[0.06em]">your project.</span>
            </RevealText>
          </div>

          {/* Post side */}
          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <StoryAvatar label={profile.identity.initials} className="size-9 text-[11px]" />
              <div className="min-w-0 leading-tight">
                <p className="truncate text-[14px] font-semibold">{profile.identity.handle}</p>
                <p className="text-[12px] text-muted">Sponsored</p>
              </div>
            </div>
            {/* The ad's call-to-action strip */}
            <Link
              href="/contact"
              className="ig-gradient shine group flex min-h-14 items-center justify-between gap-3 px-5 text-[15px] font-semibold text-white"
            >
              Let&rsquo;s Discuss Your Project
              <ChevronRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="flex-1 px-5 py-5 text-[15px] leading-relaxed">
              <p>
                <span className="font-semibold">{profile.identity.handle}</span> Whether you&rsquo;re building a brand from scratch or improving an existing
                social presence, let&rsquo;s start a conversation.
              </p>
              <p className="mt-3 break-words text-accent">#ContentStrategy #SocialMediaManagement #PersonalBranding</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line px-5 py-3">
              <span aria-hidden className="flex items-center gap-4">
                <Heart className="size-6" />
                <MessageCircle className="size-6 -scale-x-100" />
                <Send className="size-6" />
              </span>
              <a
                href={`mailto:${profile.contact.email}`}
                className="ml-auto inline-flex min-h-10 min-w-0 items-center gap-2 rounded-full bg-surface px-4 text-[13px] font-medium transition-colors hover:bg-surface-2"
              >
                <Mail aria-hidden className="size-4 shrink-0" />
                <span className="truncate">{profile.contact.email}</span>
              </a>
            </div>
          </div>
        </FadeIn>
      </section>
    </PageShell>
  );
}
