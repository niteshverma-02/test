"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** A soft Instagram-gradient light that trails the pointer across the hero. Fine pointers only; decorative. */
export function HeroGlow() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const mm = gsap.matchMedia();
    mm.add(`${MQ.motion} and (hover: hover) and (pointer: fine)`, () => {
      const x = gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" });
      const y = gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        x(e.clientX - r.left - el.offsetWidth / 2);
        y(e.clientY - r.top - el.offsetHeight / 2);
        gsap.to(el, { opacity: 0.55, duration: 0.6 });
      };
      const leave = () => gsap.to(el, { opacity: 0, duration: 0.8 });
      host.addEventListener("pointermove", move);
      host.addEventListener("pointerleave", leave);
      return () => {
        host.removeEventListener("pointermove", move);
        host.removeEventListener("pointerleave", leave);
      };
    });
    return () => mm.revert();
  });

  return <span ref={ref} aria-hidden className="pointer-events-none absolute left-0 top-0 size-[36rem] rounded-full opacity-0 blur-[90px]" style={{ background: "var(--ig)" }} />;
}
