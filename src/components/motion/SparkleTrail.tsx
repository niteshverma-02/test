"use client";

import { useEffect } from "react";
import { motionAllowed } from "@/lib/motion-pref";

const bits = ["✨", "❤️", "💖", "⭐", "🔥", "💫"];

/** A trail of tiny reactions behind the mouse. Fine pointers only; decorative. */
export function SparkleTrail() {
  useEffect(() => {
    if (!motionAllowed() || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let lx = 0;
    let ly = 0;
    let n = 0;
    const onMove = (e: PointerEvent) => {
      // One particle per ~70px of travel keeps it lively without clutter.
      if (Math.hypot(e.clientX - lx, e.clientY - ly) < 70) return;
      lx = e.clientX;
      ly = e.clientY;
      const el = document.createElement("span");
      el.className = "sparkle";
      el.setAttribute("aria-hidden", "true");
      el.textContent = bits[n++ % bits.length];
      el.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;font-size:${12 + Math.random() * 10}px;--dx:${(Math.random() - 0.5) * 60}px;--dy:${-30 - Math.random() * 50}px;--spin:${(Math.random() - 0.5) * 120}deg`;
      el.addEventListener("animationend", () => el.remove());
      document.body.append(el);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
