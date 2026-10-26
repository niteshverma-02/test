"use client";

import { useEffect, useState, type RefObject } from "react";

/** True when the browser can create a WebGL context. Checked once, after mount. */
export function useWebGL() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- feature detection must run in the browser
      setOk(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

/** Whether an element is on screen, so off-screen canvases can stop rendering. */
export function useOnScreen(ref: RefObject<Element | null>, margin = "200px") {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return on;
}

/** Reads a CSS custom property from <html> (theme-aware colours for WebGL). */
export function cssVar(name: string, fallback: string) {
  if (typeof document === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

/** Whether animations are on — read after mount so server and client markup match. */
export function useMotionOk() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the motion class lives on <html>, only readable in the browser
    setOk(document.documentElement.classList.contains("motion-ok"));
  }, []);
  return ok;
}
