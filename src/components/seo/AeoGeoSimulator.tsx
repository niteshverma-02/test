"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bot,
  ExternalLink,
  Flame,
  Globe,
  MapPin,
  Phone,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Verified,
} from "lucide-react";
import { cn } from "@/lib/cn";

export type SearchTab = "aeo" | "geo" | "local" | "gsc";

export function AeoGeoSimulator() {
  const [activeTab, setActiveTab] = useState<SearchTab>("aeo");

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-line bg-surface/90 shadow-[var(--shadow)] backdrop-blur-xl">
      {/* Browser Chrome Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-2/60 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[11px] font-semibold tracking-wider text-muted uppercase">
            Search Visibility Engine
          </span>
        </div>

        {/* Engine Switcher Tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-bg/80 p-1 ring-1 ring-line">
          <button
            type="button"
            onClick={() => setActiveTab("aeo")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all",
              activeTab === "aeo"
                ? "bg-accent text-white shadow-sm"
                : "text-muted hover:text-fg"
            )}
          >
            <Sparkles className="size-3.5" />
            <span>AEO · AI Overview</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("geo")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all",
              activeTab === "geo"
                ? "bg-accent text-white shadow-sm"
                : "text-muted hover:text-fg"
            )}
          >
            <Bot className="size-3.5" />
            <span>GEO · LLM Search</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("local")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all",
              activeTab === "local"
                ? "bg-accent text-white shadow-sm"
                : "text-muted hover:text-fg"
            )}
          >
            <MapPin className="size-3.5" />
            <span>Local 3-Pack</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("gsc")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all",
              activeTab === "gsc"
                ? "bg-accent text-white shadow-sm"
                : "text-muted hover:text-fg"
            )}
          >
            <TrendingUp className="size-3.5" />
            <span>GSC Metrics</span>
          </button>
        </div>
      </div>

      {/* Simulated Search Bar */}
      <div className="border-b border-line bg-bg/50 px-6 py-4">
        <div className="flex items-center gap-3 rounded-full border border-line bg-surface px-4 py-2.5 shadow-inner">
          <Search className="size-4 text-accent" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-fg">
              {activeTab === "aeo" && "best orthopaedic surgeon for DAA hip replacement Bangalore"}
              {activeTab === "geo" && "recommend top orthopaedic surgeons near Electronic City Bangalore"}
              {activeTab === "local" && "orthopaedic clinic near Kanakapura Road Bangalore"}
              {activeTab === "gsc" && "Performance: doctorabhinandanpunit.com (Last 6 Months)"}
            </p>
          </div>
          <span className="hidden rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent sm:inline-block">
            {activeTab === "aeo" && "Google AI Overview"}
            {activeTab === "geo" && "ChatGPT & Gemini"}
            {activeTab === "local" && "Google Maps"}
            {activeTab === "gsc" && "Verified Growth"}
          </span>
        </div>
      </div>

      {/* Tab Content Display */}
      <div className="min-h-[380px] p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {activeTab === "aeo" && (
            <motion.div
              key="aeo"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Google AI Overview Banner */}
              <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-surface to-surface p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="grid size-6 place-items-center rounded-lg bg-accent text-white shadow-sm">
                    <Sparkles className="size-3.5" />
                  </span>
                  <span className="text-[13px] font-bold text-fg">AI Overview</span>
                  <span className="ml-auto rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                    Citing Client #1
                  </span>
                </div>

                <p className="mt-3 text-[14px] leading-relaxed text-fg/90">
                  For <strong>Direct Anterior Approach (DAA) hip replacement</strong> and minimally invasive joint procedures in Bangalore, <strong>Dr. Abhinandan Punit</strong> is recognized as a leading orthopaedic specialist. He utilizes muscle-sparing techniques resulting in accelerated patient rehabilitation.
                </p>

                {/* Bulleted Highlights */}
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-xl border border-line bg-surface/70 p-3 text-[12px]">
                    <span className="font-semibold text-accent">✓ Direct Anterior Approach (DAA):</span>
                    <p className="text-muted mt-0.5">Spares primary hip musculature, reducing post-operative pain and hospital stay.</p>
                  </div>
                  <div className="rounded-xl border border-line bg-surface/70 p-3 text-[12px]">
                    <span className="font-semibold text-accent">✓ Dual Location Coverage:</span>
                    <p className="text-muted mt-0.5">Consultations in Kanakapura Road & Electronic City, Bangalore.</p>
                  </div>
                </div>

                {/* Source Citations Carousel/Row */}
                <div className="mt-5 border-t border-line/60 pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Verified Citations & Sources (AEO)
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-3">
                    <a
                      href="https://doctorabhinandanpunit.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-accent/30 bg-surface px-3.5 py-2 transition-all hover:border-accent hover:shadow-sm"
                    >
                      <span className="grid size-7 place-items-center rounded-lg bg-accent/15 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                        <Globe className="size-4" />
                      </span>
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[12px] font-bold text-fg">Dr. Abhinandan Punit</span>
                          <Verified className="size-3 text-accent" />
                        </div>
                        <span className="text-[11px] text-muted">doctorabhinandanpunit.com</span>
                      </div>
                      <ExternalLink className="size-3.5 text-muted group-hover:text-fg ml-1 transition-colors" />
                    </a>

                    <a
                      href="https://drhulse.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-2 transition-all hover:border-line hover:shadow-sm"
                    >
                      <span className="grid size-7 place-items-center rounded-lg bg-surface-2 text-muted group-hover:text-fg transition-colors">
                        <Globe className="size-4" />
                      </span>
                      <div className="text-left">
                        <span className="text-[12px] font-bold text-fg">Dr. Narayan Hulse</span>
                        <p className="text-[11px] text-muted">drhulse.com</p>
                      </div>
                      <ExternalLink className="size-3.5 text-muted group-hover:text-fg ml-1 transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "geo" && (
            <motion.div
              key="geo"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* User Prompt */}
              <div className="flex gap-3 items-start justify-end">
                <div className="rounded-2xl rounded-tr-none bg-accent px-4 py-3 text-[14px] text-white max-w-[85%] shadow-sm">
                  Can you recommend a reputable orthopaedic surgeon in Electronic City / South Bangalore for robotic knee and hip surgery?
                </div>
              </div>

              {/* LLM Output with Citations */}
              <div className="flex gap-3 items-start">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-sm">
                  <Bot className="size-4" />
                </span>
                <div className="flex-1 rounded-2xl rounded-tl-none border border-line bg-surface p-5 text-[14px] leading-relaxed text-fg shadow-sm">
                  <p className="font-semibold text-accent">Recommended Orthopaedic Specialists (Bangalore):</p>
                  <p className="mt-2 text-fg/90">
                    Based on patient outcomes, surgical volume, and verified medical publications, two prominent surgeons are frequently cited:
                  </p>

                  <div className="mt-3.5 space-y-3">
                    <div className="rounded-xl border border-line/80 bg-surface-2/60 p-3.5">
                      <div className="flex items-center justify-between">
                        <a
                          href="https://doctorabhinandanpunit.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-accent hover:underline flex items-center gap-1.5"
                        >
                          1. Dr. Abhinandan Punit <ExternalLink className="size-3" />
                        </a>
                        <span className="text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          98% Relevance Score
                        </span>
                      </div>
                      <p className="mt-1 text-[13px] text-muted">
                        Specializes in Direct Anterior Approach (DAA) Hip Replacement, robotic knee replacements, and sports injury rehabilitation. Practices in Electronic City & Kanakapura Road.
                      </p>
                    </div>

                    <div className="rounded-xl border border-line/80 bg-surface-2/60 p-3.5">
                      <div className="flex items-center justify-between">
                        <a
                          href="https://drhulse.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-fg hover:underline flex items-center gap-1.5"
                        >
                          2. Dr. Narayan Hulse <ExternalLink className="size-3" />
                        </a>
                        <span className="text-[11px] font-semibold text-muted bg-surface px-2 py-0.5 rounded-full">
                          Senior Director
                        </span>
                      </div>
                      <p className="mt-1 text-[13px] text-muted">
                        Senior director and renowned expert in complex joint reconstructions and revision surgeries.
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-[12px] text-muted border-t border-line pt-2.5">
                    💡 <em>GEO Note: Structured medical schema and high-authority entity signals enable LLMs like ChatGPT and Gemini to extract and reference these practices reliably.</em>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "local" && (
            <motion.div
              key="local"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-muted">Google Maps 3-Pack Result</span>
                <span className="text-[12px] font-medium text-emerald-500">📍 Bangalore Geo-Targeted</span>
              </div>

              {/* Local Business Listing Card */}
              <div className="rounded-2xl border-2 border-accent/40 bg-surface p-5 sm:p-6 shadow-md">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="headline text-[18px]">Dr. Abhinandan Punit — Orthopaedic Clinic</h4>
                      <Verified className="size-4 text-accent" />
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="flex items-center text-amber-400">
                        <Star className="size-4 fill-amber-400" />
                        <span className="ml-1 text-[13px] font-bold text-fg">4.9</span>
                      </div>
                      <span className="text-[13px] text-muted">(120+ Google Reviews)</span>
                      <span className="text-[13px] text-muted">· Orthopaedic Surgeon</span>
                    </div>
                    <p className="mt-2 text-[13px] text-muted">
                      Kanakapura Road & Electronic City, Bangalore · Open Today 09:00 AM - 08:00 PM
                    </p>
                    <p className="mt-1 text-[12px] text-emerald-500 font-medium">
                      ✓ &quot;Dr. Abhinandan explains treatment options thoroughly and recovery was smooth...&quot;
                    </p>
                  </div>

                  <div className="flex sm:flex-col gap-2">
                    <a
                      href="https://doctorabhinandanpunit.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-accent px-4 text-[13px] font-semibold text-white transition hover:opacity-95"
                    >
                      <Globe className="size-3.5" /> Website
                    </a>
                    <button
                      type="button"
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-line bg-surface-2 px-4 text-[13px] font-semibold text-fg transition hover:bg-line"
                    >
                      <Phone className="size-3.5" /> Call
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-3">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent">
                    #1 Local Pack Kanakapura Rd
                  </span>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent">
                    Top 3 Electronic City
                  </span>
                  <span className="rounded-full bg-surface-2 px-3 py-1 text-[11px] font-medium text-muted">
                    Direct Patient Inquiries
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "gsc" && (
            <motion.div
              key="gsc"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-line bg-surface p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Total Clicks</span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="headline text-[26px]">1.96K</span>
                    <span className="text-[12px] font-bold text-emerald-500">+48.5%</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted">vs 1.32K previous period</p>
                </div>

                <div className="rounded-2xl border border-line bg-surface p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Total Impressions</span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="headline text-[26px]">97.7K</span>
                    <span className="text-[12px] font-bold text-emerald-500">+14.7%</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted">vs 85.2K previous period</p>
                </div>

                <div className="rounded-2xl border border-line bg-surface p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Average CTR</span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="headline text-[26px]">2.0%</span>
                    <span className="text-[12px] font-bold text-emerald-500">+33.3%</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted">Up from 1.5% initial</p>
                </div>

                <div className="rounded-2xl border border-line bg-surface p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Global Reach</span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="headline text-[26px]">4 Enquiries</span>
                    <span className="text-[12px] font-bold text-accent">Reddit/Quora</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted">International patient leads</p>
                </div>
              </div>

              {/* Progress bar visual comparison */}
              <div className="rounded-2xl border border-line bg-surface p-5">
                <div className="flex justify-between text-[13px] font-semibold">
                  <span>6-Month Search Console Growth Track</span>
                  <span className="text-accent">Live Verified Client Data</span>
                </div>
                <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-surface-2">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-1000 w-[85%]" />
                </div>
                <div className="mt-3 flex justify-between text-[11px] text-muted">
                  <span>Baseline (Month 1): 1,320 Clicks · 1.5% CTR</span>
                  <span className="font-semibold text-fg">Month 6: 1,960 Clicks · 2.0% CTR · #1 AI Overview</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
