"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Crown, Grid3x3, Plus, Send } from "lucide-react";
import { useState } from "react";
import { profile } from "@/content/profile";
import { services } from "@/content/services";
import { RevealText } from "@/components/motion/RevealText";
import { Scramble } from "@/components/motion/Scramble";
import { cn } from "@/lib/cn";
import { jumpTo, scrollToId, tints } from "./shared";

const tabs = [
  { label: "Posts", Icon: Grid3x3, target: "posts" },
  { label: "Tiers", Icon: Crown, target: "tiers" },
  { label: "DM", Icon: Send, target: "dm" },
];

/** A profile-page header for the services: headline, bio card, one highlight per service and the profile tabs. */
export function ServicesHero({ ways }: { ways: number }) {
  const [seen, setSeen] = useState<Set<number>>(() => new Set());
  const stats = [
    { v: services.length, k: "services" },
    { v: ways, k: "ways to work" },
    { v: profile.location.zoneLabel, k: "time zone" },
  ];

  const open = (i: number) => {
    setSeen((s) => new Set(s).add(i));
    jumpTo(i);
  };

  return (
    <section aria-labelledby="services-title" className="relative overflow-clip pt-[calc(var(--nav-h)+3.5rem)] lg:pt-[calc(var(--nav-h)+6rem)]">
      <span aria-hidden className="ig-gradient drift pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full opacity-25 blur-[120px]" />
      <span aria-hidden className="ig-gradient drift pointer-events-none absolute -left-48 top-1/3 size-[26rem] rounded-full opacity-15 blur-[120px] [animation-delay:-8s]" />

      <div className="container-page relative grid items-end gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
        <div className="min-w-0">
          <p className="eyebrow mark">
            <Scramble text="Services" />
          </p>
          <RevealText as="h1" id="services-title" immediate className="headline mt-5 text-[clamp(2.9rem,8.4vw,7rem)]">
            Strategy you can <span className="serif ig-text pr-[0.06em]">scroll through.</span>
          </RevealText>
          <RevealText as="p" immediate delay={0.25} className="mt-6 max-w-xl text-[clamp(1.0625rem,1.8vw,1.3rem)] leading-relaxed text-muted">
            Every business has different goals, audiences, and challenges. My services are built to help you show up with clarity, creativity, and consistency.
          </RevealText>
        </div>

        {/* Bio card */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 3 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.35 }}
          className="min-w-0 rounded-[28px] border border-line bg-bg/80 p-5 shadow-[var(--shadow)] backdrop-blur-md sm:p-6"
        >
          <div className="flex items-center gap-3 xs:gap-4 sm:gap-6">
            <span className="story-ring shrink-0">
              <span className="grid size-[4.5rem] place-items-center rounded-full bg-bg p-[3px] sm:size-20">
                <span className="ig-gradient grid size-full place-items-center rounded-full font-display text-[1.4rem] font-bold text-white sm:text-[1.6rem]">
                  {profile.identity.initials}
                </span>
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[16px] font-semibold tracking-tight">
                {profile.identity.handle} <span className="font-normal text-muted">/ services</span>
              </p>
              <dl className="mt-2 flex gap-3 sm:gap-6">
                {stats.map((s) => (
                  <div key={s.k} className="flex flex-col-reverse last:max-xs:hidden">
                    <dt className="whitespace-nowrap text-[11px] text-muted sm:text-[12px]">{s.k}</dt>
                    <dd className="text-[17px] font-bold leading-tight">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="mt-4 text-[14px] leading-relaxed">
            <p className="font-semibold">{profile.identity.name}</p>
            <p className="text-muted">{profile.role}</p>
            <p>✨ {profile.tagline}</p>
            {profile.availability.open && (
              <p className="mt-1 flex items-center gap-2 text-muted">
                <span aria-hidden className="pulse-dot" /> {profile.availability.label}
              </p>
            )}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Link
              href="/contact"
              className="ig-gradient shine inline-flex h-10 items-center justify-center rounded-xl text-[14px] font-semibold text-white transition-transform active:scale-95"
            >
              Book a service
            </Link>
            <button
              type="button"
              onClick={() => scrollToId("tiers")}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-surface-2 text-[14px] font-semibold transition-colors hover:bg-line"
            >
              Ways to work
            </button>
          </div>
        </motion.div>
      </div>

      {/* Highlights: one per service */}
      <div className="container-page relative mt-12 lg:mt-16">
        <ul
          data-lenis-prevent-horizontal
          aria-label="Service highlights"
          className="-mx-[var(--gutter)] flex gap-4 overflow-x-auto px-[var(--gutter)] pb-2 pt-1 [scrollbar-width:none] sm:gap-6 lg:justify-center [&::-webkit-scrollbar]:hidden"
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, scale: 0.4, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.5 + i * 0.07 }}
                className="shrink-0"
              >
                <button
                  type="button"
                  onClick={() => open(i)}
                  aria-label={`Jump to ${s.title}`}
                  data-cursor="View"
                  className="group flex w-[4.75rem] flex-col items-center gap-2 rounded-2xl sm:w-[5.5rem]"
                >
                  <span className={cn("rounded-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-105", seen.has(i) ? "p-[2.5px] ring-2 ring-line ring-inset" : "story-ring")}>
                    <span className="grid size-[4.25rem] place-items-center rounded-full bg-bg p-[3px] sm:size-20">
                      <span className="grid size-full place-items-center rounded-full text-white" style={{ background: tints[i % tints.length] }}>
                        <Icon aria-hidden className="size-6 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-rotate-12 group-hover:scale-110 sm:size-7" />
                      </span>
                    </span>
                  </span>
                  <span className="w-full truncate text-center text-[12px] font-medium sm:text-[13px]">{s.short}</span>
                </button>
              </motion.li>
            );
          })}
          <motion.li
            initial={{ opacity: 0, scale: 0.4, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.5 + services.length * 0.07 }}
            className="shrink-0"
          >
            <Link href="/contact" className="group flex w-[4.75rem] flex-col items-center gap-2 rounded-2xl sm:w-[5.5rem]">
              <span className="grid size-[4.5rem] place-items-center rounded-full border-2 border-dashed border-muted/40 text-muted transition-colors group-hover:border-fg group-hover:text-fg sm:size-[5.3rem]">
                <Plus aria-hidden className="size-6 transition-transform duration-500 group-hover:rotate-90" />
              </span>
              <span className="w-full truncate text-center text-[12px] font-medium text-muted sm:text-[13px]">Your idea</span>
            </Link>
          </motion.li>
        </ul>
      </div>

      {/* Profile tabs */}
      <nav aria-label="On this page" className="container-page relative mt-8">
        <ul className="flex justify-center gap-8 border-t border-line sm:gap-14">
          {tabs.map((t, i) => (
            <li key={t.label}>
              <button
                type="button"
                onClick={() => scrollToId(t.target)}
                className={cn(
                  "-mt-px flex items-center gap-1.5 border-t py-4 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors",
                  i === 0 ? "border-fg text-fg" : "border-transparent text-muted hover:text-fg",
                )}
              >
                <t.Icon aria-hidden className="size-3.5" />
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
