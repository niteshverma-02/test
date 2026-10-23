import type Lenis from "lenis";

/**
 * The Lenis instance lives outside React so any component can scroll
 * without context plumbing. It is null when smooth scrolling is off
 * (reduced motion, or before the provider mounts).
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function scrollToTarget(target: string | HTMLElement | number, opts: { immediate?: boolean } = {}) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (el === null) return;

  if (instance) {
    instance.scrollTo(el, { immediate: opts.immediate, duration: 1.4, offset: 0 });
  } else if (typeof el === "number") {
    window.scrollTo({ top: el, behavior: opts.immediate ? "auto" : "smooth" });
  } else {
    el.scrollIntoView({ behavior: opts.immediate ? "auto" : "smooth" });
  }
}
