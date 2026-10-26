import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * The human touch: hand-written margin notes and pen marks. Every stroke uses
 * `.draw-in`, so it draws itself as it scrolls into view (CSS scroll timeline).
 */

const arrows = {
  // Curls down and to the left.
  "down-left": "M54 4 C 40 6, 20 14, 14 34 M14 34 L 9 25 M14 34 L 22 29",
  // Curls down and to the right.
  "down-right": "M6 4 C 20 6, 40 14, 46 34 M46 34 L 38 29 M46 34 L 51 25",
  // Swoops right.
  right: "M4 22 C 18 6, 38 6, 54 20 M54 20 L 45 20 M54 20 L 50 11",
} as const;

/** A hand-written note with a little pen arrow. Decorative, so hidden from screen readers. */
export function Note({ children, arrow = "down-left", className }: { children: ReactNode; arrow?: keyof typeof arrows; className?: string }) {
  return (
    <span aria-hidden className={cn("hand pointer-events-none flex select-none items-start gap-1 text-[clamp(1.2rem,1.6vw,1.55rem)] text-geo", className)}>
      {arrow === "down-right" && <Arrow d={arrows[arrow]} />}
      <span className="max-w-[16ch]">{children}</span>
      {arrow !== "down-right" && <Arrow d={arrows[arrow]} />}
    </span>
  );
}

function Arrow({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 60 40" className="mt-2 h-8 w-12 shrink-0">
      <path className="draw-in" pathLength={1} d={d} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Rings a word with a loose hand-drawn ellipse. */
export function Circled({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg aria-hidden viewBox="0 0 200 80" preserveAspectRatio="none" className={cn("pointer-events-none absolute -left-[7%] -top-[16%] h-[132%] w-[114%] text-ember", className)}>
        <path
          className="draw-in"
          pathLength={1}
          d="M32 12 C 82 0, 168 2, 190 28 C 206 56, 146 78, 92 76 C 36 74, 4 56, 11 33 C 17 16, 52 8, 116 10"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

/** A wavy pen underline under a word. */
export function Squiggle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg aria-hidden viewBox="0 0 200 16" preserveAspectRatio="none" className={cn("pointer-events-none absolute -bottom-[0.18em] left-0 h-[0.32em] w-full text-geo", className)}>
        <path className="draw-in" pathLength={1} d="M2 10 Q 14 2, 26 9 T 50 9 T 74 9 T 98 9 T 122 9 T 146 9 T 170 9 T 198 7" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}
