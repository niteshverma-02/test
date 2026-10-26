"use client";

import { useEffect } from "react";
import { motionAllowed } from "@/lib/motion-pref";

/**
 * Pointer effects for `.panel` cards (styles in globals.css): a spotlight that
 * follows the pointer, and a gentle 3D tilt toward it. Fine pointers only.
 */
export function Spotlight() {
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const tilt = motionAllowed();
    let last: HTMLElement | null = null;
    const reset = (el: HTMLElement | null) => {
      el?.style.setProperty("--rx", "0deg");
      el?.style.setProperty("--ry", "0deg");
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element).closest<HTMLElement>(".panel");
      if (el !== last) {
        reset(last);
        last = el;
      }
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      if (!tilt) return;
      // Smaller cards tilt more; wide panels barely move.
      const max = Math.max(1.2, Math.min(6, 2400 / r.width));
      el.style.setProperty("--rx", `${(0.5 - y / r.height) * max}deg`);
      el.style.setProperty("--ry", `${(x / r.width - 0.5) * max}deg`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
