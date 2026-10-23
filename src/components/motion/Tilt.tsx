"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/** Tilts its child toward the cursor in 3D, with a moving sheen. Mouse only. */
export function Tilt({ children, className, max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const sheen = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const shine = sheen.current;
      if (!el || !shine) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.motion} and (hover: hover) and (pointer: fine)`, () => {
        gsap.set(el, { transformPerspective: 1100 });
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3.out" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3.out" });
        const host = el.parentElement ?? el;
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * max * 2);
          rx(-py * max * 2);
          gsap.to(shine, { opacity: 1, "--sx": `${(px + 0.5) * 100}%`, "--sy": `${(py + 0.5) * 100}%`, duration: 0.4 });
        };
        const leave = () => {
          rx(0);
          ry(0);
          gsap.to(shine, { opacity: 0, duration: 0.6 });
        };
        host.addEventListener("pointermove", move);
        host.addEventListener("pointerleave", leave);
        return () => {
          host.removeEventListener("pointermove", move);
          host.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative will-change-transform", className)}>
      {children}
      <span
        ref={sheen}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 mix-blend-soft-light [--sx:50%] [--sy:50%] [background:radial-gradient(circle_at_var(--sx)_var(--sy),rgba(255,255,255,0.7),transparent_45%)]"
      />
    </div>
  );
}
