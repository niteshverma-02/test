"use client";

import { useEffect, useRef } from "react";
import { motionAllowed } from "@/lib/motion-pref";

/**
 * A two-part cursor: a coral dot that tracks the pointer exactly and a ring
 * that trails it. Over links and buttons the ring swells and shows a label
 * (from data-cursor, else "Open"). Fine pointers only; the native cursor is
 * hidden only while this runs.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!motionAllowed() || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const d = dot.current!;
    const r = ring.current!;
    const l = label.current!;
    const html = document.documentElement;
    html.classList.add("has-cursor");
    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let rx = x;
    let ry = y;
    let big = false;
    let raf = 0;

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      d.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      r.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${big ? 1 : 0.42})`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = (e.target as Element).closest<HTMLElement>("a, button, summary, [role=button], label, [data-cursor]");
      const typing = (e.target as Element).closest("input, textarea, select");
      big = !!t && !typing;
      l.textContent = big ? (t?.dataset.cursor ?? "Open") : "";
      d.style.opacity = typing ? "0" : "1";
      r.style.opacity = typing ? "0" : "1";
    };
    const onDown = () => r.animate([{ scale: 1 }, { scale: 0.85 }, { scale: 1 }], { duration: 300 });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[110] hidden [.has-cursor_&]:block">
      <div ref={dot} className="absolute left-0 top-0 size-2 rounded-full bg-ember" />
      <div
        ref={ring}
        className="absolute left-0 top-0 grid size-[84px] place-items-center rounded-full border border-fg/40 bg-fg/[0.06] backdrop-blur-[2px] transition-[background-color,border-color] duration-300 [transition-property:background-color,border-color]"
      >
        <span ref={label} className="label text-[10px] text-fg" />
      </div>
    </div>
  );
}
