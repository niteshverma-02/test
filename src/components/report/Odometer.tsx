"use client";

import { useEffect, useRef, useState } from "react";

const DIGITS = "0123456789";

/**
 * A number that rolls into place digit by digit, like a mechanical counter,
 * when it scrolls into view. Non-digit characters (+ . % K) stay still.
 * Renders the final value for no-JS and reduced motion.
 */
export function Odometer({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !document.documentElement.classList.contains("motion-ok")) return;
    setOn(false);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        // Next frame, so the zero position paints before rolling.
        requestAnimationFrame(() => setOn(true));
        io.disconnect();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let d = 0;
  return (
    <span ref={ref} className={`inline-flex items-end leading-none tabular-nums ${className ?? ""}`}>
      <span className="sr-only">{value}</span>
      {value.split("").map((ch, i) => {
        const n = DIGITS.indexOf(ch);
        if (n < 0)
          return (
            <span key={i} aria-hidden className="inline-block h-[1em] leading-none">
              {ch}
            </span>
          );
        const idx = d++;
        return (
          <span key={i} aria-hidden className="odo-col">
            <span className="odo-strip" style={{ transform: `translateY(-${on ? n : 0}em)`, ["--i" as string]: idx }}>
              {DIGITS.split("").map((x) => (
                <span key={x} className="block h-[1em]">
                  {x}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
