"use client";

import { useEffect, useState } from "react";
import { motionAllowed } from "@/lib/motion-pref";
import { cn } from "@/lib/cn";
import { EngineTag, type Engine } from "./ui";

const ROW = 44;

const queries: { q: string; e: Engine }[] = [
  { q: "orthopaedic surgeon near me", e: "GEO" },
  { q: "knee replacement cost bangalore", e: "SEO" },
  { q: "is DAA hip surgery safe?", e: "AEO" },
  { q: "best hip surgeon electronic city", e: "GEO" },
  { q: "ACL tear recovery time", e: "AEO" },
  { q: "joint pain specialist", e: "SEO" },
];

/**
 * A rank-tracker table that keeps reshuffling: every couple of seconds one
 * query climbs. Clearly marked as demo data — the real numbers are in the evidence section.
 */
export function RankTracker({ className }: { className?: string }) {
  const [order, setOrder] = useState(() => queries.map((_, i) => i));
  const [moved, setMoved] = useState<{ i: number; by: number } | null>(null);

  useEffect(() => {
    if (!motionAllowed()) return;
    let cur = queries.map((_, i) => i);
    const t = setInterval(() => {
      const next = [...cur];
      const from = 1 + Math.floor(Math.random() * (next.length - 1));
      const by = Math.min(from, 1 + Math.floor(Math.random() * 3));
      const [item] = next.splice(from, 1);
      next.splice(from - by, 0, item);
      cur = next;
      setOrder(next);
      setMoved({ i: item, by });
    }, 2300);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-line bg-surface/70 backdrop-blur", className)}>
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <p className="label text-[10px]">Rank tracker</p>
        <p className="label flex items-center gap-2 text-[10px] text-muted">
          <span aria-hidden className="blink size-1.5 bg-ember" /> Live · demo data
        </p>
      </div>
      <div className="label grid grid-cols-[2.5rem_1fr_3.5rem_3rem] border-b border-line px-4 py-2 text-[10px] text-muted">
        <span>Pos</span>
        <span>Query</span>
        <span>Engine</span>
        <span className="text-right">Δ</span>
      </div>
      <ol className="relative" style={{ height: queries.length * ROW }} aria-label="Sample tracked queries">
        {queries.map((row, i) => {
          const pos = order.indexOf(i);
          const up = moved?.i === i;
          return (
            <li
              key={row.q}
              className={cn(
                "absolute inset-x-0 top-0 grid h-[44px] grid-cols-[2.5rem_1fr_3.5rem_3rem] items-center border-b border-line px-4 text-[13px] transition-[transform,background-color] duration-700 ease-[var(--ease-expo)]",
                up && "z-10 bg-fg text-bg",
              )}
              style={{ transform: `translateY(${pos * ROW}px)` }}
            >
              <span className="poster text-[20px] leading-none">{pos + 1}</span>
              <span className="truncate pr-2">{row.q}</span>
              <span>
                <EngineTag engine={row.e} />
              </span>
              <span className={cn("text-right font-mono text-[12px]", up ? "text-geo" : "text-subtle")}>{up ? `▲${moved.by}` : "—"}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
