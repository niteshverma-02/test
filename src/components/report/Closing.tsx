import { profile } from "@/content/profile";
import { RevealText } from "@/components/motion/RevealText";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "./Marquee";
import { Btn } from "./ui";
import { Emblem } from "./Emblem";

const tools = ["Google Search Console", "Google Business Profile", "GA4", "Ahrefs", "SEMrush", "Schema.org", "AI Overviews", "ChatGPT", "Gemini", "Perplexity", "Reddit", "Quora"];

/** Toolkit band, then the closing ask: one giant line and the email. */
export function Closing() {
  return (
    <section aria-labelledby="closing-title" className="relative overflow-clip">
      <Marquee
        className="border-y border-fg bg-geo py-3 text-ink"
        items={tools.map((t) => (
          <span key={t} className="poster flex items-center gap-6 pr-6 text-[clamp(1.6rem,3vw,2.6rem)]">
            {t}
            <span aria-hidden className="font-mono text-[14px]">✕</span>
          </span>
        ))}
      />
      <div className="container-page relative py-12 lg:py-20">
        <Emblem kind="SEO" className="absolute -top-6 right-0 hidden size-[30rem] lg:block" />
        <p className="label text-[10px] text-muted">§ 06 — Next step</p>
        <RevealText as="h2" id="closing-title" className="poster relative mt-6 text-[clamp(3rem,9vw,8.5rem)]">
          Let&rsquo;s get you <span className="text-ember">found.</span>
        </RevealText>
        <div className="mt-12 grid gap-8 border-t border-line pt-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <a href={`mailto:${profile.contact.email}`} className="w-fit text-[clamp(1.4rem,3.4vw,2.8rem)] font-medium underline decoration-1 underline-offset-[0.2em] hover:text-ember">
            {profile.contact.email}
          </a>
          <Magnetic>
            <Btn href="/contact">Start with a free audit</Btn>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
