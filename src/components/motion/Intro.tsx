"use client";

import { useRef } from "react";
import { profile } from "@/content/profile";
import { gsap, useGSAP } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";
import { getLenis } from "@/lib/scroll";

/**
 * Opening curtain, once per session: a story ring draws itself, the name
 * rises letter by letter, a like counter runs to 100, then the curtain lifts.
 * Under two seconds; skipped for reduced motion and repeat visits.
 */
export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const name = profile.identity.name;

  useGSAP(
    () => {
      const el = ref.current;
      const html = document.documentElement;
      if (!el || !html.classList.contains("motion-ok") || html.classList.contains("intro-seen")) {
        markIntroDone();
        return;
      }
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {}

      html.style.overflow = "hidden";
      const counter = { v: 0 };
      const finish = () => {
        html.classList.add("intro-seen");
        html.style.overflow = "";
        getLenis()?.start();
      };

      const tl = gsap.timeline({ onComplete: finish });
      tl.fromTo("[data-intro-ring]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0)
        .fromTo("[data-intro-letter]", { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.035, ease: "expo.out" }, 0.1)
        .to(
          counter,
          {
            v: 100,
            duration: 1.3,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(counter.v));
            },
          },
          0,
        )
        .to("[data-intro-letter]", { yPercent: -115, duration: 0.5, stagger: 0.018, ease: "power3.in" }, 1.35)
        .to("[data-intro-fade]", { autoAlpha: 0, duration: 0.3 }, 1.4)
        .add(markIntroDone, 1.65)
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.95, ease: "expo.inOut" }, 1.5);

      return () => {
        tl.kill();
        finish();
        markIntroDone();
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden className="intro fixed inset-0 z-[95] flex-col items-center justify-center bg-ink text-[#f4f4f0] [clip-path:inset(0_0_0_0)]">
      <svg data-intro-fade viewBox="0 0 100 100" className="size-16">
        <defs>
          <linearGradient id="intro-ring" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#feda75" />
            <stop offset="0.35" stopColor="#fa7e1e" />
            <stop offset="0.65" stopColor="#d62976" />
            <stop offset="1" stopColor="#4f5bd5" />
          </linearGradient>
        </defs>
        <circle data-intro-ring cx="50" cy="50" r="44" fill="none" stroke="url(#intro-ring)" strokeWidth="5" pathLength={1} strokeDasharray="1" strokeLinecap="round" />
        <text x="50" y="59" textAnchor="middle" fontSize="28" fontWeight="700" fill="currentColor" letterSpacing="-1">
          {profile.identity.initials}
        </text>
      </svg>
      <p className="serif mt-8 flex overflow-clip text-[clamp(3.25rem,11vw,9rem)] leading-[1.1]">
        {name.split("").map((ch, i) => (
          <span key={i} data-intro-letter className="inline-block whitespace-pre">
            {ch}
          </span>
        ))}
      </p>
      <span data-intro-fade className="absolute bottom-8 right-[var(--gutter)] flex items-baseline gap-1">
        <span className="text-[clamp(1.5rem,3vw,2.5rem)] leading-none text-[#ff3b5c]">♥</span>
        <span ref={count} className="headline ig-text text-[clamp(3rem,7vw,5.5rem)] tabular-nums leading-none">
          0
        </span>
      </span>
      <span data-intro-fade className="absolute bottom-10 left-[var(--gutter)] text-[13px] font-medium text-white/50">
        Loading @{profile.identity.handle}&rsquo;s feed…
      </span>
    </div>
  );
}
