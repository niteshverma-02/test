"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { services } from "@/content/services";
import { RevealText } from "@/components/motion/RevealText";
import { cn } from "@/lib/cn";
import { ServicePost } from "./ServicePost";
import { jumpTo, postId, tints } from "./shared";

/**
 * The services as a feed. Desktop: a sticky "menu" beside a staggered
 * two-column feed, its active row following whichever post is in view.
 * Phones: one centred column, like the app.
 */
export function ServiceFeed() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(services.findIndex((_, k) => postId(k) === e.target.id));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    services.forEach((_, i) => {
      const el = document.getElementById(postId(i));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="feed-title" id="posts" className="container-page scroll-mt-24 pb-24 pt-6 lg:pb-32">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)] xl:gap-20">
        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow mark">The feed</p>
          <RevealText as="h2" id="feed-title" className="headline mt-4 text-[clamp(2.2rem,5vw,3.4rem)]">
            Seven services, <span className="serif ig-text pr-[0.06em]">one strategy.</span>
          </RevealText>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted">
            Each post is a service. Explore the scope and deliverables, choose what your practice needs, and let&rsquo;s get started.
          </p>

          <nav aria-label="Services" className="mt-8 hidden lg:block">
            <ol className="border-t border-line">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <li key={s.title} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-current={active === i ? "true" : undefined}
                      className={cn(
                        "group flex w-full items-center gap-3 py-3 text-left transition-colors",
                        active === i ? "text-fg" : "text-muted hover:text-fg",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-xl text-white transition-[transform,opacity] duration-500 ease-[var(--ease-expo)]",
                          active === i ? "scale-100 opacity-100" : "scale-75 opacity-40 group-hover:opacity-80",
                        )}
                        style={{ background: tints[i % tints.length] }}
                      >
                        <Icon aria-hidden className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[15px] font-medium">{s.title}</span>
                      <span aria-hidden className="headline text-[12px] tabular-nums tracking-[0.1em] opacity-60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <p className="mt-6 max-w-md rounded-2xl bg-surface p-4 text-[13px] leading-relaxed text-muted">
            <span className="font-semibold text-fg">Good to know · </span>
            The precise scope of SEO, paid advertising, reporting, and content production will be agreed upon before a project begins.
          </p>
        </aside>

        {/* Even posts sit lower on wide screens: an editorial stagger instead of a flat grid. */}
        <div className="mx-auto grid w-full min-w-0 max-w-[470px] gap-10 md:max-w-none md:grid-cols-2 md:gap-x-6 md:gap-y-12 md:pb-36 xl:gap-x-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 70, rotate: i % 2 ? 2.5 : -2.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 140, damping: 20 }}
              className="min-w-0 md:even:translate-y-36"
            >
              <ServicePost service={s} index={i} total={services.length} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
