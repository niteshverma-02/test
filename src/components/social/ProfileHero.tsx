import { profile } from "@/content/profile";
import { HeroIntro } from "@/components/home/HeroIntro";
import { cn } from "@/lib/cn";
import { ProfileCard } from "./ProfileCard";
import { WordFlip } from "./WordFlip";
import { Scene3D } from "@/components/three/Scene3D";
import { HeroGlow } from "./HeroGlow";
import { LiveSerpPhone } from "@/components/seo/LiveSerpPhone";

/* Reactions orbiting the simulator. Factual SEO wins. */
const bubbles = [
  { text: "✨ #1 in Google AI Overviews", className: "left-[-4%] top-[18%] sm:left-[-14%]", delay: "0s" },
  { text: "📈 +48.5% Organic Clicks (GSC)", className: "right-[-6%] top-[30%] sm:right-[-16%]", delay: "1.2s" },
  { text: "📍 Top 3 Local Map Pack Bangalore", className: "left-[-8%] top-[64%] sm:left-[-18%]", delay: "0.6s" },
];

/** Home hero: an editorial headline, an SEO profile card and the live search device. */
export function ProfileHero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-clip pb-16 pt-[calc(var(--nav-h)+2.5rem)] lg:pb-24 lg:pt-[calc(var(--nav-h)+4rem)]">
      <span aria-hidden className="ig-gradient drift absolute -right-40 -top-40 size-[34rem] rounded-full opacity-20 blur-[110px]" />
      <span aria-hidden className="ig-gradient drift absolute -bottom-48 -left-40 size-[28rem] rounded-full opacity-15 blur-[120px] [animation-delay:-8s]" />
      <HeroGlow />
      <Scene3D />

      <HeroIntro className="container-page relative z-10 grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        {/* min-w-0: the scrolling highlights row must not widen the column past the screen. */}
        <div className="min-w-0">
          <p data-hero-in className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/70 px-3.5 py-1.5 text-[13px] font-medium backdrop-blur">
            <span className="pulse-dot" aria-hidden />
            {profile.role}
          </p>
          <h1 id="hero-title" className="headline mt-6 text-[clamp(2.9rem,7.4vw,6.4rem)] leading-[1]">
            <span data-hero-name>
              Hi, I&rsquo;m {profile.identity.firstName}. I help doctors
            </span>{" "}
            <span data-hero-in className="block">
              <WordFlip />
            </span>
          </h1>
          <p data-hero-in className="mt-6 max-w-xl text-[clamp(1.0625rem,1.6vw,1.25rem)] text-muted">
            {profile.description}
          </p>
          <div data-hero-in className="mt-8 max-w-xl">
            <ProfileCard />
            <p className="mt-3 text-center text-[12px] text-muted sm:text-left">Explore healthcare SEO services &amp; rankings ↑</p>
          </div>
        </div>

        <div data-hero-in className="relative mx-auto w-[min(68vw,330px)]">
          <span aria-hidden className="absolute inset-[-12%] rounded-full border border-dashed border-line" />
          <span aria-hidden className="spin-slow absolute inset-[-24%] rounded-full border border-line" />
          <LiveSerpPhone />
          {bubbles.map((b, i) => (
            <span
              key={b.text}
              aria-hidden
              className={cn(
                "bob absolute z-10 whitespace-nowrap rounded-2xl border border-line bg-bg/90 px-3.5 py-2 text-[13px] font-semibold shadow-[var(--shadow)] backdrop-blur",
                i % 2 === 1 && "hidden sm:block",
                b.className,
              )}
              style={{ animationDelay: b.delay }}
            >
              {b.text}
            </span>
          ))}
        </div>
      </HeroIntro>
    </section>
  );
}
