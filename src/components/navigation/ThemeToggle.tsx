"use client";

import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import type { MouseEvent } from "react";
import { switchMode, useMode } from "@/lib/theme";
import { cn } from "@/lib/cn";

/**
 * Light / dark switch. Where the View Transitions API exists, the new
 * theme spreads out in a circle from the button; otherwise it swaps.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const mode = useMode();
  const next = mode === "dark" ? "light" : "dark";

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    switchMode(next, { x: e.clientX || window.innerWidth - 40, y: e.clientY || 26 });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={cn(
        "relative grid size-9 place-items-center overflow-hidden rounded-full text-fg transition-colors duration-300 hover:bg-surface-2",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={mode}
          initial={{ y: 16, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -16, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="grid place-items-center"
        >
          {mode === "dark" ? <Moon aria-hidden className="size-[18px]" strokeWidth={1.75} /> : <Sun aria-hidden className="size-[18px]" strokeWidth={1.75} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
