"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/cn";

type Fact = { emoji: string; text: string; detail: string };

/** Fun facts as Instagram Notes: a thought bubble over each avatar. Tap one to read more. */
export function NotesWall({ facts }: { facts: Fact[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:gap-x-8">
      {facts.map((f, i) => (
        <motion.li
          key={f.text}
          initial={{ opacity: 0, y: 40, scale: 0.7 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 200, damping: 16, delay: (i % 3) * 0.1 }}
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="group flex w-full flex-col items-center gap-3 text-center"
          >
            <span
              className={cn(
                "bob relative w-full max-w-[15rem] rounded-[22px] bg-bg px-4 py-3 text-[14px] font-medium leading-snug shadow-[var(--shadow)] ring-1 ring-line transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:-rotate-2",
                "after:absolute after:-bottom-1.5 after:left-1/2 after:size-3 after:-translate-x-1/2 after:rotate-45 after:bg-bg after:content-['']",
              )}
              style={{ animationDelay: `${-i * 0.7}s` }}
            >
              <span className="block font-semibold">{f.text}</span>
              <motion.span
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                className="block overflow-hidden text-[13px] font-normal text-muted"
              >
                <span className="block pt-1">{f.detail}</span>
              </motion.span>
            </span>
            <span className="story-ring transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-110">
              <span className="grid size-16 place-items-center rounded-full border-[3px] border-bg bg-surface-2 text-[1.75rem] sm:size-20 sm:text-[2.1rem]">
                <span aria-hidden>{f.emoji}</span>
              </span>
            </span>
            <span className="text-[12px] text-muted">{open === i ? "Tap to close" : "Tap to read"}</span>
          </button>
        </motion.li>
      ))}
    </ul>
  );
}
