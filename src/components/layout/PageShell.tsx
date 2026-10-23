import { ViewTransition, type ReactNode } from "react";

/** Wraps each page so route changes play the page-out / page-in transition. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <main id="main" tabIndex={-1} className="relative z-10 bg-bg outline-none">
        {children}
      </main>
    </ViewTransition>
  );
}
