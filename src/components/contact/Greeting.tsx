"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Avatar } from "./Avatar";

const lines = [
  "Hey, I’m Tanu 👋",
  "Tell me about your brand: where it is today, and where you’d like it to be.",
  "Pick a topic below and drop me a message ✨",
];
// How long Tanu "types" before each bubble lands.
const typingMs = [800, 1500, 1100];

const pop = {
  initial: { opacity: 0, y: 14, scale: 0.6 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { type: "spring", stiffness: 420, damping: 26 },
  style: { transformOrigin: "0% 100%" },
} as const;

/** Tanu's opening messages, typed in one by one once the thread scrolls into view. */
export function Greeting() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || shown >= lines.length) return;
    const instant = !document.documentElement.classList.contains("motion-ok");
    const id = window.setTimeout(() => setShown(shown + 1), instant ? 0 : typingMs[shown]);
    return () => window.clearTimeout(id);
  }, [inView, shown]);

  const typing = inView && shown < lines.length;
  const total = shown + (typing ? 1 : 0);
  // IG groups consecutive bubbles: tight corners where they stack.
  const corners = (i: number) => cn(i > 0 && "rounded-tl-md", i < total - 1 && "rounded-bl-md");

  return (
    <div ref={ref} className="flex min-h-[10.5rem] items-end gap-2 sm:min-h-[8.5rem]">
      <Avatar className={cn("size-7 text-[10px] transition-opacity duration-300", total ? "opacity-100" : "opacity-0")} />
      <ul aria-label="Messages from Tanu" className="flex min-w-0 flex-col items-start gap-[3px]">
        {lines.slice(0, shown).map((text, i) => (
          <motion.li
            key={text}
            {...pop}
            className={cn("max-w-[min(100%,26rem)] rounded-[22px] bg-surface-2 px-4 py-2.5 text-[15px] leading-snug text-fg", corners(i))}
          >
            {text}
          </motion.li>
        ))}
        {typing && (
          <motion.li key="typing" aria-hidden {...pop} className={cn("flex items-center gap-1 rounded-[22px] bg-surface-2 px-4 py-3.5", corners(shown))}>
            {[0, 1, 2].map((d) => (
              <span key={d} className="typing-dot size-2 rounded-full bg-muted" style={{ animationDelay: `${d * 0.18}s` }} />
            ))}
          </motion.li>
        )}
      </ul>
    </div>
  );
}
