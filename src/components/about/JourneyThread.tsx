"use client";

import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";
import { useRef } from "react";
import { profile } from "@/content/profile";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

type Step = { when: string; title: string; text: string };

/** The journey as a Threads-style thread: one post per year, joined by a line that draws as you scroll. */
export function JourneyThread({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo("[data-line]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 60%", scrub: true } });
        gsap.utils.toArray<HTMLElement>("[data-post]").forEach((post) =>
          gsap.from(post, { x: 50, autoAlpha: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: post, start: "top 85%", once: true } }),
        );
        gsap.utils.toArray<HTMLElement>("[data-dot]").forEach((dot) =>
          gsap.from(dot, { scale: 0, rotate: -120, duration: 0.9, ease: "back.out(2)", scrollTrigger: { trigger: dot, start: "top 85%", once: true } }),
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative mx-auto max-w-2xl">
      <span aria-hidden className="absolute bottom-8 left-[23px] top-8 w-[2px] rounded-full bg-line" />
      <span aria-hidden data-line className="absolute bottom-8 left-[23px] top-8 w-[2px] origin-top rounded-full" style={{ background: "var(--ig)" }} />
      {steps.map((s, i) => {
        const now = i === steps.length - 1;
        return (
          <li key={s.when} className="relative flex gap-4 pb-10 last:pb-0">
            <span data-dot className="story-ring relative z-10 h-fit shrink-0">
              <span className="ig-gradient grid size-[42px] place-items-center rounded-full border-[3px] border-bg text-[11px] font-bold text-white">{profile.identity.initials}</span>
            </span>
            <article data-post className="min-w-0 flex-1 rounded-3xl border border-line bg-bg p-5 shadow-[var(--shadow)] transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-1 sm:p-6">
              <p className="flex flex-wrap items-center gap-x-2 text-[14px]">
                <span className="font-semibold">{profile.identity.handle}</span>
                <span className="text-muted">· {s.when}</span>
                {now && (
                  <span className="ml-auto flex items-center gap-1.5 rounded-full bg-[#ff3b5c] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    <span className="pulse-dot size-1.5! bg-white!" aria-hidden /> Now
                  </span>
                )}
              </p>
              <h3 className="headline mt-2 text-[clamp(1.35rem,2.4vw,1.75rem)]">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{s.text}</p>
              <span aria-hidden className="mt-4 flex gap-5 text-muted">
                <Heart className="size-[18px]" />
                <MessageCircle className="size-[18px] -scale-x-100" />
                <Repeat2 className="size-[18px]" />
                <Send className="size-[18px]" />
              </span>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
