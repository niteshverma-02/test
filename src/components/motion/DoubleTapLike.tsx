"use client";

import { useEffect } from "react";
import { motionAllowed } from "@/lib/motion-pref";

const heart = `<svg viewBox="0 0 24 24" width="96" height="96" style="filter:drop-shadow(0 12px 24px rgba(214,41,118,.45))"><defs><linearGradient id="like-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fa7e1e"/><stop offset=".5" stop-color="#d62976"/><stop offset="1" stop-color="#962fbf"/></linearGradient></defs><path fill="url(#like-g)" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.4h2c.7-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21Z"/></svg>`;

/** Double-click (or double-tap) anywhere for an Instagram-style like. Decorative. */
export function DoubleTapLike() {
  useEffect(() => {
    const onDouble = (e: MouseEvent) => {
      if (!motionAllowed() || (e.target as Element).closest("input, textarea, select, [contenteditable]")) return;
      const el = document.createElement("span");
      el.className = "like-burst";
      el.setAttribute("aria-hidden", "true");
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.innerHTML = heart;
      el.addEventListener("animationend", () => el.remove());
      document.body.append(el);
    };
    window.addEventListener("dblclick", onDouble);
    return () => window.removeEventListener("dblclick", onDouble);
  }, []);
  return null;
}
