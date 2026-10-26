"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/** An endless band. Scrolling fast speeds it up and leans it into the scroll, then it settles. */
export function Marquee({ items, className, reverse, duration = 38 }: { items: ReactNode[]; className?: string; reverse?: boolean; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const track = ref.current!.querySelector<HTMLElement>(".marquee-track")!;
        const anims = track.getAnimations();
        const skew = gsap.quickTo(ref.current!, "skewX", { duration: 0.5, ease: "power3.out" });
        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            const v = gsap.utils.clamp(-5, 5, self.getVelocity() / 300);
            anims.forEach((a) => (a.playbackRate = 1 + Math.abs(v)));
            // Leans into the scroll, like it's being dragged.
            skew(gsap.utils.clamp(-12, 12, self.getVelocity() / -250));
          },
        });
        const settle = () => {
          anims.forEach((a) => gsap.to(a, { playbackRate: 1, duration: 0.8 }));
          skew(0);
        };
        ScrollTrigger.addEventListener("scrollEnd", settle);
        return () => {
          st.kill();
          ScrollTrigger.removeEventListener("scrollEnd", settle);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("flex overflow-hidden", reverse && "marquee-reverse", className)}>
      <div className="marquee-track flex w-max shrink-0 items-center" style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        {[...items, ...items].map((it, i) => (
          <span key={i} aria-hidden={i >= items.length} className="flex shrink-0 items-center">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
