"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { BookOpen, Coffee, Mail, MapPin, Smile, Sparkles, Target, Zap } from "lucide-react";
import { useState } from "react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { platforms } from "@/content/experience";
import { igAccounts } from "@/lib/instagram";
import { LinkedinIcon } from "@/components/ui/SocialIcons";
import { StoryViewer } from "@/components/social/StoryViewer";
import { LocalTime } from "@/components/ui/LocalTime";
import { confetti } from "@/lib/confetti";
import { cn } from "@/lib/cn";

const { about } = profile;
const linkedin = profile.social.find((s) => s.label === "LinkedIn")?.href;

// Every number is counted from the site's own content.
const stats = [
  { v: projects.length, k: "case studies" },
  { v: projects.reduce((n, p) => n + igAccounts(p.links).length, 0), k: "client accounts" },
  { v: platforms.length, k: "platforms" },
];

/* About-me highlights, in the shape StoryViewer plays. */
const highlights = [
  { icon: BookOpen, short: "My story", title: "How I got here", description: about.lede, items: about.journey.slice(-4).map((j) => `${j.when} — ${j.title}`) },
  { icon: Target, short: "Values", title: "What I stand for", description: about.quote, items: about.principles.map((p) => p.title) },
  { icon: Sparkles, short: "Expertise", title: "What I'm good at", description: "The areas I work in every day.", items: about.interests },
  { icon: Smile, short: "Fun facts", title: "A little about me", description: "The person behind the strategy.", items: about.funFacts.map((f) => `${f.emoji} ${f.text}`) },
  { icon: Coffee, short: "Off duty", title: "Off the clock", description: "Where a lot of my ideas come from.", items: about.hobbies },
  { icon: Zap, short: "Now", title: profile.focus, description: profile.availability.label, items: about.bring.map((b) => b.title) },
];

/** An Instagram web profile header: avatar, stats, bio, buttons and highlights that open as stories. */
export function AboutProfile() {
  const [open, setOpen] = useState<number | null>(null);
  const [seen, setSeen] = useState<Set<number>>(() => new Set());
  const show = (i: number) => {
    setOpen(i);
    setSeen((s) => new Set(s).add(i));
  };

  return (
    <div className="relative">
      <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr] sm:gap-12 lg:gap-16">
        <div className="relative mx-auto sm:mx-0">
          {/* An IG "note" floating above the avatar. */}
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 300, damping: 18 }}
            className="bob absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-bg px-3.5 py-2 text-[13px] font-medium shadow-[var(--shadow)] ring-1 ring-line after:absolute after:-bottom-1.5 after:left-1/2 after:size-3 after:-translate-x-1/2 after:rotate-45 after:bg-bg after:content-['']"
          >
            {profile.availability.open ? "🟢 " : ""}
            {profile.availability.label}
          </motion.span>
          <button
            type="button"
            onClick={() => show(0)}
            aria-label="Watch my story"
            data-cursor="Watch"
            className={cn("rounded-full transition-transform duration-500 ease-[var(--ease-expo)] hover:scale-105", seen.size ? "p-[3px] ring-2 ring-line ring-inset" : "story-ring")}
            style={{ padding: seen.size ? undefined : 5 }}
          >
            <span className="grid size-36 place-items-center rounded-full bg-bg p-[5px] sm:size-44">
              <span className="ig-gradient relative grid size-full place-items-center overflow-hidden rounded-full font-display text-[3.4rem] font-bold text-white sm:text-[4rem]">
                <span aria-hidden className="drift absolute -left-1/4 -top-1/4 size-3/4 rounded-full bg-white/30 blur-2xl" />
                <span className="relative">{profile.identity.initials}</span>
              </span>
            </span>
          </button>
        </div>

        <div className="min-w-0 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <p className="flex items-center gap-2 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-tight">
              {profile.identity.handle}
              <span className="grid size-6 place-items-center rounded-full bg-[#3897f0] text-white" title="It's really me">
                <Sparkles aria-hidden className="size-3.5" />
                <span className="sr-only">(that&rsquo;s me, {profile.identity.name})</span>
              </span>
            </p>
            <div className="flex gap-2">
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    confetti({ x: r.left + r.width / 2, y: r.top, count: 90 });
                  }}
                  className="ig-gradient shine inline-flex h-9 items-center gap-1.5 rounded-lg px-4 text-[14px] font-semibold text-white"
                >
                  <LinkedinIcon aria-hidden className="size-3.5" /> Follow
                </a>
              )}
              <Link href="/contact" className="inline-flex h-9 items-center rounded-lg bg-surface-2 px-4 text-[14px] font-semibold transition-colors hover:bg-line">
                Message
              </Link>
              <a
                href={`mailto:${profile.contact.email}`}
                aria-label="Email me"
                className="grid size-9 place-items-center rounded-lg bg-surface-2 transition-colors hover:bg-line"
              >
                <Mail aria-hidden className="size-4" />
              </a>
            </div>
          </div>

          <dl className="mt-6 flex justify-center gap-8 sm:justify-start sm:gap-10">
            {stats.map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex flex-col-reverse items-center gap-0.5 sm:flex-row-reverse sm:justify-end sm:gap-1.5"
              >
                <dt className="text-[13px] text-muted sm:text-[16px] sm:text-fg">{s.k}</dt>
                <dd className="text-[20px] font-bold sm:text-[16px] sm:font-semibold">{s.v}</dd>
              </motion.div>
            ))}
          </dl>

          <div className="mt-5 space-y-0.5 text-[15px] leading-relaxed">
            <p className="font-semibold">{profile.identity.name}</p>
            <p className="text-muted">{profile.role}</p>
            <p>{about.lede}</p>
            <p className="flex items-center justify-center gap-1.5 text-muted sm:justify-start">
              <MapPin aria-hidden className="size-3.5" /> {profile.location.label} ·{" "}
              <LocalTime timeZone={profile.location.timezone} className="tabular-nums" /> {profile.location.zoneLabel}
            </p>
          </div>
        </div>
      </div>

      <ul className="mx-[calc(var(--gutter)*-1)] mt-10 flex gap-5 overflow-x-auto px-gutter pb-2 [scrollbar-width:none] sm:mx-0 sm:gap-8 sm:px-0" data-lenis-prevent-horizontal>
        {highlights.map((h, i) => (
          <motion.li
            key={h.short}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.07, type: "spring", stiffness: 260, damping: 18 }}
          >
            <button type="button" onClick={() => show(i)} aria-label={`Highlight: ${h.title}`} className="group flex w-[4.75rem] flex-col items-center gap-2 sm:w-24">
              <span className={cn("rounded-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-1.5 group-hover:rotate-6", seen.has(i) ? "p-[2.5px] ring-2 ring-line ring-inset" : "story-ring")}>
                <span className="grid size-[4.25rem] place-items-center rounded-full bg-bg p-[3px] sm:size-[5.25rem]">
                  <span className="grid size-full place-items-center rounded-full bg-surface-2 transition-colors group-hover:bg-surface">
                    <h.icon aria-hidden className="size-6 sm:size-7" />
                  </span>
                </span>
              </span>
              <span className="w-full truncate text-center text-[12px] font-semibold">{h.short}</span>
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>{open !== null && <StoryViewer stories={highlights} start={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </div>
  );
}
