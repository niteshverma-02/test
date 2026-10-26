"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { cn } from "@/lib/cn";
import { useOnScreen, useWebGL } from "@/components/three/webgl";
import { Btn, EngineTag, type Engine } from "./ui";
import { RankTracker } from "./RankTracker";
import { Note } from "./Hand";

// three.js is client-only and heavy: load it after the page, never on the server.
const HeroLens = dynamic(() => import("@/components/three/HeroLens"), { ssr: false });

const lines: { word: string; engine: Engine; note: string; style: string }[] = [
  { word: "Searched.", engine: "SEO", note: "Ranked on Google", style: "" },
  { word: "Answered.", engine: "AEO", note: "Cited in AI Overviews", style: "text-ember" },
  { word: "Found.", engine: "GEO", note: "Recommended by ChatGPT & Gemini", style: "hollow [-webkit-text-stroke-width:2px]" },
];

/**
 * Home hero: three poster lines rendered in WebGL with a glass magnifying lens
 * that refracts them as it follows the pointer. The same lines exist in the DOM
 * underneath — they are what you see without WebGL, and they fade out once the 3D is ready.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const gl = useWebGL();
  const onScreen = useOnScreen(ref, "0px");
  const [ready, setReady] = useState(false);
  const [intro, setIntro] = useState(false);

  // The 3D mounts once the intro loader has lifted, so its own entrance is seen.
  useEffect(() => onIntroDone(() => setIntro(true)), []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const words = gsap.utils.toArray<HTMLElement>("[data-hero-chars]");
        const splits = words.map((w) => SplitText.create(w, { type: "chars", mask: "chars" }));
        gsap.set(words, { visibility: "visible" });
        const tl = gsap.timeline({ delay: 0.15, paused: true });
        splits.forEach((s, i) => tl.from(s.chars, { yPercent: 110, duration: 1.1, stagger: 0.04, ease: "expo.out" }, i * 0.14));
        tl.from("[data-hero-tag]", { autoAlpha: 0, x: -16, duration: 0.8, stagger: 0.12 }, 0.7)
          .from("[data-hero-rule]", { scaleX: 0, transformOrigin: "0 50%", duration: 1.4, stagger: 0.1, ease: "expo.inOut" }, 0.1)
          .from("[data-hero-in]", { autoAlpha: 0, y: 24, duration: 1, stagger: 0.08 }, 0.9);
        // Start when the intro loader lifts (immediately when there is none).
        const off = onIntroDone(() => tl.play());
        return () => {
          off();
          splits.forEach((s) => s.revert());
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-clip pt-[var(--nav-h)]">
      <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 size-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />

      <div className="container-page relative">
        <div className="label grid grid-cols-2 gap-x-4 gap-y-2 border-b border-line py-3 text-[10px] lg:grid-cols-4">
          <span>Visibility report — Nº 01</span>
          <span className="text-right sm:text-left">Healthcare · Local · AI search</span>
          <span className="hidden lg:block">
            {profile.location.label} / {profile.location.zoneLabel}
          </span>
          <span className="hidden items-center justify-end gap-2 lg:flex">
            <span aria-hidden className="blink size-1.5 bg-ember" /> {profile.availability.label}
          </span>
        </div>

        <h1 id="hero-title" className="sr-only">
          {profile.identity.name} — {profile.role}. Searched, answered, found.
        </h1>

        <div aria-hidden className="@container relative mt-6 aspect-[1/0.62] sm:aspect-[1/0.47] lg:mt-8">
          <Note className="absolute -top-2 right-0 z-10 hidden -rotate-6 lg:flex">psst — move the lens over the words</Note>
          {gl && intro && <HeroLens eventSource={ref} active={onScreen} onReady={() => setReady(true)} />}
          <div className="pointer-events-none relative grid h-full grid-rows-3">
            {lines.map((l) => (
              <div key={l.word} className="relative flex items-center justify-between">
                <span data-hero-rule className="absolute inset-x-0 bottom-0 h-px bg-line" />
                <span data-hero-chars className={cn("poster block text-[16.5cqw] leading-none sm:text-[13cqw]", l.style, ready && "!opacity-0")}>
                  {l.word}
                </span>
                <span data-hero-tag className="mb-3 hidden items-center gap-3 self-end sm:flex">
                  <EngineTag engine={l.engine} />
                  <span className="label text-[10px] text-muted">{l.note}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 sm:hidden">
          {lines.map((l) => (
            <li key={l.word} className="flex items-center gap-2">
              <EngineTag engine={l.engine} />
              <span className="label text-[10px] text-muted">{l.note}</span>
            </li>
          ))}
        </ul>

        <div className="grid gap-10 py-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16 lg:py-14">
          <div data-hero-in className="max-w-xl">
            <p className="text-[clamp(1.125rem,1.7vw,1.35rem)] leading-snug">
              I&rsquo;m <strong className="font-semibold">{profile.identity.name}</strong> — I make doctors and local businesses the answer when patients search on{" "}
              <span className="marker [--marker:var(--seo)]">Google</span>, ask <span className="marker [--marker:var(--aeo)]">AI</span>, or look at the{" "}
              <span className="marker">map</span>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href="/work">See the evidence</Btn>
              <Btn href="/contact" variant="line">
                Book an audit
              </Btn>
            </div>
            <p className="label mt-10 flex items-center gap-2 text-[10px] text-muted">
              <span aria-hidden className="caret">
                ▼
              </span>{" "}
              Move the lens · scroll to crawl
            </p>
          </div>
          <div data-hero-in>
            <RankTracker className="w-full lg:w-[27rem]" />
          </div>
        </div>
      </div>
    </section>
  );
}
