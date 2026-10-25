"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis, scrollToTarget, setLenis } from "@/lib/scroll";
import { motionAllowed } from "@/lib/motion-pref";

/**
 * Lenis driven by GSAP's ticker so ScrollTrigger and smooth scrolling
 * share one clock. Disabled entirely for reduced-motion visitors.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const firstRoute = useRef(true);

  useEffect(() => {
    if (!motionAllowed()) return;

    const lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.95, touchMultiplier: 1.4, autoRaf: false, stopInertiaOnNavigate: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // On client navigation: land on the hash target (or the top) and re-measure triggers.
  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    const id = window.location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (target) scrollToTarget(target, { immediate: true });
    else getLenis()?.scrollTo(0, { immediate: true, force: true });

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
