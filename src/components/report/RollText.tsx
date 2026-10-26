/**
 * Hover text that rolls: every letter slides up into an identical copy,
 * one after another (CSS in globals.css, triggered by the parent link/button).
 */
export function RollText({ children }: { children: string }) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <span className="sr-only">{children}</span>
      <span aria-hidden className="flex">
        {children.split("").map((ch, i) => (
          <span key={i} className="roll-ch relative" style={{ ["--i" as string]: i }}>
            <span className="block whitespace-pre">{ch}</span>
            <span className="absolute left-0 top-full block whitespace-pre">{ch}</span>
          </span>
        ))}
      </span>
    </span>
  );
}
