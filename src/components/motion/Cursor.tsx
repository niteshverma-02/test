"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useFinePointer } from "@/hooks/use-media-query";
import { motionAllowed } from "@/lib/motion-pref";

/**
 * A follower ring for mouse users. The native cursor stays; the ring grows
 * over links and shows a verb over elements marked `data-cursor="View"`.
 */
export function Cursor() {
  const fine = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const label = labelRef.current;
    if (!fine || !el || !label) return;

    const speed = motionAllowed() ? 0.4 : 0.01;
    const xTo = gsap.quickTo(el, "x", { duration: speed, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: speed, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      xTo(e.clientX);
      yTo(e.clientY);
      el.dataset.visible = "true";
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        el.dataset.mode = "label";
        label.textContent = labelled.dataset.cursor ?? "";
      } else if (target?.closest("a, button, [role='button'], input, textarea, select, label")) {
        el.dataset.mode = "link";
      } else {
        el.dataset.mode = "";
      }
    };
    const onLeave = () => {
      el.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      data-visible="false"
      className="group pointer-events-none fixed left-0 top-0 z-[90] opacity-0 transition-opacity duration-300 data-[visible=true]:opacity-100"
    >
      <div
        className="absolute left-0 top-0 grid size-20 -translate-x-1/2 -translate-y-1/2 scale-[0.24] place-items-center rounded-full border-2 border-white mix-blend-difference transition-[transform,background,border-color] duration-500 ease-[var(--ease-expo)]
          group-data-[mode=link]:scale-[0.55]
          group-data-[mode=label]:scale-100 group-data-[mode=label]:border-transparent group-data-[mode=label]:bg-volt group-data-[mode=label]:mix-blend-normal"
      >
        <span ref={labelRef} className="text-[12px] font-semibold text-ink opacity-0 transition-opacity duration-300 group-data-[mode=label]:opacity-100" />
      </div>
    </div>
  );
}
