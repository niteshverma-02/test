"use client";

import { AnimatePresence, motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useToast } from "@/lib/toast";

/** Pill that slides up from the bottom edge for quick confirmations. */
export function Toaster() {
  const t = useToast();
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] lg:bottom-6 z-[90] flex justify-center px-gutter">
      <AnimatePresence>
        {t && (
          <motion.p
            key={t.id}
            initial={{ y: 40, opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ y: 20, opacity: 0, scale: 0.95, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="flex items-center gap-2 rounded-full ig-gradient px-5 py-3 text-[14px] font-semibold text-ink shadow-[var(--shadow)] ring-1 ring-ink/10"
          >
            <Sparkles aria-hidden className="size-4" />
            {t.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
