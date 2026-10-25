"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { scrollToTarget } from "@/lib/scroll";

const R = 22;
const C = 2 * Math.PI * R;

/** Floating "back to top" whose ring fills as you read down the page. */
export function ScrollTop() {
  const ref = useRef<HTMLButtonElement>(null);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, scrollY / max) : 0;
      ring.current?.setAttribute("stroke-dashoffset", String(C * (1 - p)));
      if (ref.current) ref.current.dataset.show = String(scrollY > innerHeight * 0.8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      data-show="false"
      aria-label="Back to top"
      onClick={() => {
        scrollToTarget(0);
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="group fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-5 lg:bottom-6 z-[70] grid size-[52px] translate-y-6 scale-75 place-items-center rounded-full bg-ink text-[#f4f4f0] opacity-0 shadow-[var(--shadow)] ring-1 ring-white/10 transition-[opacity,transform] duration-500 ease-[var(--ease-expo)] pointer-events-none data-[show=true]:pointer-events-auto data-[show=true]:translate-y-0 data-[show=true]:scale-100 data-[show=true]:opacity-100 hover:!scale-110 sm:right-6"
    >
      <svg viewBox="0 0 52 52" aria-hidden className="absolute inset-0 size-full -rotate-90">
        <circle cx="26" cy="26" r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" />
        <circle ref={ring} cx="26" cy="26" r={R} fill="none" stroke="#d62976" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C} />
      </svg>
      <ArrowUp aria-hidden className="relative size-5 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-0.5" />
    </button>
  );
}
