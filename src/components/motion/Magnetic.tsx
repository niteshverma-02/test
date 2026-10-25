"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/** Pulls its child toward the pointer. The outer span is measured, the inner one moves. */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const outer = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const o = outer.current;
      const i = inner.current;
      if (!o || !i) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.motion} and (hover: hover) and (pointer: fine)`, () => {
        const xTo = gsap.quickTo(i, "x", { duration: 0.7, ease: "power3.out" });
        const yTo = gsap.quickTo(i, "y", { duration: 0.7, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = o.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        o.addEventListener("pointermove", move);
        o.addEventListener("pointerleave", leave);
        return () => {
          o.removeEventListener("pointermove", move);
          o.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: outer },
  );

  return (
    <span ref={outer} className={cn("inline-block", className)}>
      <span ref={inner} className="inline-block">
        {children}
      </span>
    </span>
  );
}
