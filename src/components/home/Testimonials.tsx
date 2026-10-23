import { testimonials } from "@/content/testimonials";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/motion/FadeIn";

/** Real words from real people — renders nothing until there are some. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="words-title" className="container-page py-20 lg:py-28">
      <SectionTitle eyebrow="Kind words" title={<span id="words-title">From people I&rsquo;ve built with.</span>} />
      <FadeIn stagger className="mt-14 grid gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.name} className="card flex flex-col p-8 sm:p-10">
            <span aria-hidden className="headline text-[5rem] leading-[0.6] text-accent">&ldquo;</span>
            <blockquote className="mt-4 text-[clamp(1.15rem,2vw,1.4rem)] leading-snug">{t.quote}</blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full ig-gradient text-[14px] font-bold text-ink">
                {t.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <span>
                <span className="block font-semibold">{t.href ? <a href={t.href} target="_blank" rel="noopener noreferrer" className="hover:underline">{t.name}</a> : t.name}</span>
                <span className="block text-[14px] text-muted">
                  {t.role} · {t.org}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </FadeIn>
    </section>
  );
}
