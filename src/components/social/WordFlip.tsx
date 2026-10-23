"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { motionAllowed } from "@/lib/motion-pref";

const words = ["worth following.", "go viral.", "unforgettable.", "stand out.", "trend."];

/** The hero's last words, flipping through what I do for brands. Screen readers get the first. */
export function WordFlip({ className }: { className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!motionAllowed()) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <span className={className}>
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden className="block [perspective:700px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[i]}
            className="serif ig-text inline-block origin-[50%_80%] whitespace-nowrap pb-[0.14em] pr-[0.08em]"
            initial={{ opacity: 0, y: "55%", rotateX: -85, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: "-55%", rotateX: 85, filter: "blur(10px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
