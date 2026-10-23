"use client";

import { useRef, type RefObject } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";

type Options = {
  /** Number of items in the row, for the index callback and `go`. */
  count: number;
  onIndex: (i: number) => void;
  /** ScrollTrigger start for the pin, e.g. "top top" or "center center". */
  start?: string;
  /** Items swing in flat from a 3D turn as they enter. */
  swing?: boolean;
};

/**
 * Desktop: pins `pin` and turns page scroll into sideways travel of `track`,
 * so a plain mouse wheel drives a horizontal row. Phones keep a native swipe row.
 * `go(i)` scrolls the page to item i and returns false when nothing is pinned.
 */
export function useScrollRide(pin: RefObject<HTMLElement | null>, track: RefObject<HTMLElement | null>, { count, onIndex, start = "top top", swing = false }: Options) {
  const pinned = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el || !pin.current) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.motion} and ${MQ.desktop}`, () => {
        gsap.set(el, { overflow: "visible" });
        const dist = () => Math.max(0, el.scrollWidth - el.clientWidth);
        const ride = gsap.to(el, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: pin.current,
            pin: true,
            start,
            end: () => `+=${dist() * 1.4}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => onIndex(Math.round(self.progress * (count - 1))),
          },
        });
        pinned.current = ride.scrollTrigger ?? null;
        if (swing) {
          gsap.utils.toArray<HTMLElement>(el.children).forEach((item) =>
            gsap.fromTo(
              item,
              { rotateY: -32, scale: 0.84, transformPerspective: 1200 },
              { rotateY: 0, scale: 1, ease: "none", scrollTrigger: { trigger: item, containerAnimation: ride, start: "left right", end: "left 55%", scrub: true } },
            ),
          );
        }
        // The pin adds page height; triggers further down need re-measuring.
        const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          cancelAnimationFrame(raf);
          pinned.current = null;
        };
      });
      return () => mm.revert();
    },
    { dependencies: [count, start, swing] },
  );

  const go = (i: number) => {
    const st = pinned.current;
    if (!st) return false;
    const y = st.start + ((st.end - st.start) * Math.min(count - 1, Math.max(0, i))) / Math.max(1, count - 1);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
    return true;
  };

  return { go };
}
