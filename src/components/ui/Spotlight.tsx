"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Rounded card whose edge lights up in the Instagram gradient where the mouse is. Touch devices just get the card.
 */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
        ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={cn(
        "group/spot card shine isolate transition-[transform,box-shadow] duration-500 ease-[var(--ease-apple)] hover:-translate-y-1.5 hover:shadow-[var(--shadow)] [--mx:50%] [--my:50%]",
        className,
      )}
    >
      {/* Soft glow inside the card plus a gradient edge, both following the cursor. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100 [background:radial-gradient(320px_circle_at_var(--mx)_var(--my),color-mix(in_oklab,var(--color-volt)_14%,transparent),transparent_70%)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100 [mask:radial-gradient(260px_circle_at_var(--mx)_var(--my),#000,transparent_70%)_intersect,linear-gradient(#000,#000)_content-box_exclude,linear-gradient(#000,#000)] p-[2px] [background:var(--ig)]"
      />
      {children}
    </div>
  );
}
