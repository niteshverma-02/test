"use client";

import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { MapPin, Sparkles } from "lucide-react";
import { useState } from "react";
import { profile } from "@/content/profile";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { platforms } from "@/content/experience";
import { LinkedinIcon } from "@/components/ui/SocialIcons";
import { StoryViewer } from "./StoryViewer";
import { cn } from "@/lib/cn";
import { confetti } from "@/lib/confetti";

// Counts come from the site's own content, so they're always true.
const stats = [
  { v: projects.length, k: "case studies" },
  { v: services.length, k: "services" },
  { v: platforms.length, k: "platforms" },
];

/** An Instagram-style profile header. The avatar and highlights open the services as stories. */
export function ProfileCard({ className }: { className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [seen, setSeen] = useState<Set<number>>(() => new Set());
  const linkedin = profile.social.find((s) => s.label === "LinkedIn")?.href;

  const show = (i: number) => {
    setOpen(i);
    setSeen((s) => new Set(s).add(i));
  };

  return (
    <div className={cn("rounded-[28px] border border-line bg-bg/80 p-5 shadow-[var(--shadow)] backdrop-blur-md sm:p-7", className)}>
      <div className="flex items-center gap-5 sm:gap-7">
        <button
          type="button"
          onClick={() => show(0)}
          aria-label="Watch my services as stories"
          data-cursor="Watch"
          className={cn("shrink-0 rounded-full transition-transform duration-500 ease-[var(--ease-expo)] hover:scale-105", seen.size ? "p-[2.5px] ring-2 ring-line ring-inset" : "story-ring")}
        >
          <span className="grid size-20 place-items-center rounded-full bg-bg p-[3px] sm:size-24">
            <span className="ig-gradient grid size-full place-items-center rounded-full font-display text-[1.6rem] font-bold text-white sm:text-[1.9rem]">
              {profile.identity.initials}
            </span>
          </span>
        </button>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-[17px] font-semibold tracking-tight">
            {profile.identity.handle}
            <Sparkles aria-hidden className="size-4 text-[#d62976]" />
          </p>
          <dl className="mt-2 flex gap-4 sm:gap-7">
            {stats.map((s) => (
              <div key={s.k}>
                <dt className="sr-only">{s.k}</dt>
                <dd className="text-[18px] font-bold leading-none">{s.v}</dd>
                <span aria-hidden className="whitespace-nowrap text-[12px] text-muted">
                  {s.k}
                </span>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-4 text-[14px] leading-relaxed">
        <p className="font-semibold">{profile.identity.name}</p>
        <p className="text-muted">{profile.role}</p>
        <p>✨ {profile.tagline}</p>
        <p className="flex items-center gap-1 text-muted">
          <MapPin aria-hidden className="size-3.5" /> {profile.location.label} · {profile.availability.label}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              confetti({ x: r.left + r.width / 2, y: r.top, count: 90 });
            }}
            className="ig-gradient shine flex h-10 items-center justify-center gap-2 rounded-xl text-[14px] font-semibold text-white transition-transform active:scale-95"
          >
            <LinkedinIcon aria-hidden className="size-4" /> Follow
          </a>
        )}
        <Link
          href="/contact"
          className={cn("flex h-10 items-center justify-center rounded-xl bg-surface-2 text-[14px] font-semibold transition-transform active:scale-95", !linkedin && "col-span-2")}
        >
          Message
        </Link>
      </div>

      <ul className="-mx-1 mt-5 flex gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:gap-4">
        {services.map((s, i) => (
          <li key={s.title}>
            <button type="button" onClick={() => show(i)} className="group flex w-16 flex-col items-center gap-1.5" aria-label={`Story: ${s.title}`}>
              <span className={cn("rounded-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-1", seen.has(i) ? "p-[2.5px] ring-2 ring-line ring-inset" : "story-ring")}>
                <span className="grid size-14 place-items-center rounded-full bg-bg p-[3px]">
                  <span className="grid size-full place-items-center rounded-full bg-surface-2">
                    <s.icon aria-hidden className="size-5" />
                  </span>
                </span>
              </span>
              <span className="w-full truncate text-center text-[11px] font-medium">{s.short}</span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>{open !== null && <StoryViewer stories={services} start={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </div>
  );
}
