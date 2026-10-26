"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="grid min-h-svh place-items-center px-gutter text-center">
      <div>
        <p className="label text-[10px] text-muted">Status 500 · Crawl error</p>
        <h1 className="poster mt-4 text-[clamp(3rem,10vw,7rem)]">Something broke.</h1>
        <p className="mt-3 text-muted">Please try again.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button type="button" onClick={reset} className="label h-12 bg-fg px-6 text-[11px] text-bg hover:bg-ember">
            Try again
          </button>
          <Link href="/" className="font-medium text-link hover:underline">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
