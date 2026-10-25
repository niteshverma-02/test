import type { Metadata } from "next";
import { Pin } from "lucide-react";
import { profile } from "@/content/profile";
import { PageShell } from "@/components/layout/PageShell";
import { PopIn } from "@/components/motion/PopIn";
import { RevealText } from "@/components/motion/RevealText";
import { Aurora } from "@/components/ui/Aurora";
import { Scene3D } from "@/components/three/Scene3D";
import { AboutProfile } from "@/components/about/AboutProfile";
import { ProfileTabs } from "@/components/about/ProfileTabs";
import { StoryPost } from "@/components/about/StoryPost";
import { ScrubQuote } from "@/components/about/ScrubQuote";
import { JourneyThread } from "@/components/about/JourneyThread";
import { NotesWall } from "@/components/about/NotesWall";

export const metadata: Metadata = {
  title: "About",
  description:
    "Healthcare SEO & Local SEO Specialist from India — helping doctors and businesses improve search visibility through SEO and AI search optimization.",
  alternates: { canonical: "/about" },
};

const pinTints = ["#2563eb, #06b6d4 55%, #10b981", "#6366f1, #8b5cf6", "#10b981, #06b6d4"];

function Heading({ id, eyebrow, children }: { id: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="text-center">
      <p className="eyebrow mark">{eyebrow}</p>
      <RevealText as="h2" id={id} className="headline mx-auto mt-3 max-w-3xl text-[clamp(2.2rem,5.5vw,4.25rem)]">
        {children}
      </RevealText>
    </div>
  );
}

/** About, as Leesa's own profile: header, highlights, tabs, a carousel post, pinned posts, a thread and notes. */
export default function AboutPage() {
  const { about } = profile;
  return (
    <PageShell>
      <section className="relative overflow-clip pb-12 pt-[calc(var(--nav-h)+3.5rem)] lg:pb-16 lg:pt-[calc(var(--nav-h)+5.5rem)]">
        <Aurora subtle />
        <Scene3D density="few" />
        <div className="container-page relative z-10">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow mark">About</p>
            <RevealText as="h1" immediate className="headline mt-3 text-[clamp(2.6rem,7vw,5.75rem)]">
              The person behind <span className="serif ig-text pr-[0.06em]">the rankings.</span>
            </RevealText>
            <div className="mt-16 sm:mt-14">
              <AboutProfile />
            </div>
          </div>
        </div>
      </section>

      <ProfileTabs />

      <section id="story" aria-labelledby="story-title" className="container-page py-20 lg:py-28">
        <Heading id="story-title" eyebrow="My story">
          Swipe through <span className="serif ig-text pr-[0.06em]">how it started.</span>
        </Heading>
        <div className="mt-12 lg:mt-16">
          <StoryPost />
        </div>
      </section>

      <section id="pinned" aria-labelledby="pinned-title" className="container-page pb-20 lg:pb-28">
        <Heading id="pinned-title" eyebrow="📌 Pinned">
          The three things <span className="serif ig-text pr-[0.06em]">I never skip.</span>
        </Heading>
        <PopIn className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-3 lg:mt-16 lg:gap-6">
          {about.principles.map((p, i) => (
            <article
              key={p.title}
              className="shine group relative flex aspect-[4/5] flex-col overflow-hidden rounded-[28px] p-6 text-white shadow-[var(--shadow)] transition-transform duration-700 ease-[var(--ease-expo)] hover:-translate-y-2 hover:rotate-[-1deg] max-sm:aspect-[5/4] lg:p-8"
              style={{ background: `linear-gradient(155deg, ${pinTints[i % pinTints.length]})` }}
            >
              <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.35),transparent_55%)]" />
              <span className="relative flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.16em]">
                Pinned post
                <Pin aria-hidden className="size-4 rotate-45 transition-transform duration-500 group-hover:rotate-0" />
              </span>
              <span aria-hidden className="serif relative mt-4 text-[clamp(3.5rem,7vw,5.5rem)] leading-none opacity-80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="headline relative mt-auto text-[clamp(1.6rem,2.6vw,2.25rem)]">{p.title}</h3>
              <p className="relative mt-2 text-[15px] leading-snug text-white/90">{p.text}</p>
            </article>
          ))}
        </PopIn>
        <div className="mx-auto mt-20 max-w-5xl lg:mt-28">
          <ScrubQuote text={about.quote} />
          <p className="mt-6 text-center text-[14px] text-muted">
            — {profile.identity.handle}, <span className="serif text-[1.15em]">my marketing philosophy</span>
          </p>
        </div>
      </section>

      <section id="thread" aria-labelledby="thread-title" className="container-page pb-20 lg:pb-28">
        <Heading id="thread-title" eyebrow="Thread">
          How I <span className="serif ig-text pr-[0.06em]">got here.</span>
        </Heading>
        <div className="mt-12 lg:mt-16">
          <JourneyThread steps={about.journey} />
        </div>
      </section>

      <section id="notes" aria-labelledby="notes-title" className="container-page pb-24 lg:pb-32">
        <Heading id="notes-title" eyebrow="Notes">
          The person behind <span className="serif ig-text pr-[0.06em]">the strategy.</span>
        </Heading>
        <div className="mx-auto mt-16 max-w-5xl lg:mt-20">
          <NotesWall facts={about.funFacts} />
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl gap-4 md:grid-cols-2">
          <div className="rounded-[28px] border border-line bg-surface p-7 sm:p-8">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">Following</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {about.interests.map((it) => (
                <li
                  key={it}
                  className="rounded-full border border-line bg-bg px-3.5 py-1.5 text-[14px] font-medium text-[#3897f0] transition-transform duration-300 hover:-translate-y-0.5 hover:-rotate-2"
                >
                  #{it.replace(/[^A-Za-z0-9]/g, "")}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] border border-line bg-surface p-7 sm:p-8">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">Off the clock</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {about.hobbies.map((it) => (
                <li key={it} className="ig-gradient rounded-full px-3.5 py-1.5 text-[14px] font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 hover:rotate-2">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
