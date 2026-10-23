import type { CSSProperties } from "react";

/**
 * Label that rolls up into a fresh copy of itself, letter by letter, when
 * its link or button is hovered or focused. Pure CSS (see `.roll-ch`).
 */
export function RollText({ children }: { children: string }) {
  const row = (copy: boolean) => (
    <span aria-hidden className={copy ? "absolute left-0 top-full flex" : "flex"}>
      {children.split("").map((ch, i) => (
        <span key={i} className="roll-ch" style={{ "--i": i } as CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
  return (
    <span className="relative inline-flex overflow-hidden">
      <span className="sr-only">{children}</span>
      {row(false)}
      {row(true)}
    </span>
  );
}
