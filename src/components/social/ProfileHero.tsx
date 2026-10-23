import { profile } from "@/content/profile";
import { HeroIntro } from "@/components/home/HeroIntro";
import { cn } from "@/lib/cn";
import { ProfileCard } from "./ProfileCard";
import { WordFlip } from "./WordFlip";
import { Scene3D } from "@/components/three/Scene3D";
import { HeroGlow } from "./HeroGlow";
import { LiveReel } from "./LiveReel";

/* Reactions orbiting the phone. Illustrative. */
const bubbles = [
  { text: "❤️ 2,481 likes", className: "left-[-4%] top-[22%] sm:left-[-12%]", delay: "0s" },
  { text: "💬 “Obsessed with this!”", className: "right-[-6%] top-[34%] sm:right-[-18%]", delay: "1.2s" },
  { text: "🔥 Trending in Reels", className: "left-[-8%] top-[62%] sm:left-[-20%]", delay: "0.6s" },
];

/** Home hero: an editorial headline, a social profile card and a live Reel. */
export function ProfileHero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-clip pb-16 pt-[calc(var(--nav-h)+2.5rem)] lg:pb-24 lg:pt-[calc(var(--nav-h)+4rem)]">
      <span aria-hidden className="ig-gradient drift absolute -right-40 -top-40 size-[34rem] rounded-full opacity-25 blur-[110px]" />
      <span aria-hidden className="ig-gradient drift absolute -bottom-48 -left-40 size-[28rem] rounded-full opacity-15 blur-[120px] [animation-delay:-8s]" />
      <HeroGlow />
      <Scene3D />

      <HeroIntro className="container-page relative z-10 grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* min-w-0: the scrolling highlights row must not widen the column past the screen. */}
        <div className="min-w-0">
          <p data-hero-in className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/70 px-3.5 py-1.5 text-[13px] font-medium backdrop-blur">
            <span className="pulse-dot" aria-hidden />
            {profile.role}
          </p>
          <h1 id="hero-title" className="headline mt-6 text-[clamp(2.9rem,7.4vw,6.4rem)] leading-[1]">
            <span data-hero-name>
              Hi, I&rsquo;m {profile.identity.firstName}. I make brands
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
            <p className="mt-3 text-center text-[12px] text-muted sm:text-left">Tap the stories to see what I do ↑</p>
          </div>
        </div>

        <div data-hero-in className="relative mx-auto w-[min(68vw,330px)]">
          <span aria-hidden className="absolute inset-[-12%] rounded-full border border-dashed border-line" />
          <span aria-hidden className="spin-slow absolute inset-[-24%] rounded-full border border-line" />
          <LiveReel />
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
