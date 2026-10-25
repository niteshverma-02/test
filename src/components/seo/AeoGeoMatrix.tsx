"use client";

import { useState } from "react";
import {
  Bot,
  Brain,
  CheckCircle2,
  FileCode2,
  Globe,
  Layers,
  MapPin,
  MessageSquare,
  Search,
  Sparkles,
  Stethoscope,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { RevealText } from "@/components/motion/RevealText";
import { cn } from "@/lib/cn";

const frameworks = [
  {
    id: "seo",
    name: "Healthcare & Local SEO",
    tagline: "Found where patients search first.",
    icon: Stethoscope,
    tint: "from-blue-600 to-cyan-500",
    badge: "Traditional Search",
    description:
      "Aligning doctor expertise, medical treatments, and local practice locations with how patients search across Google Search and Maps.",
    pillars: [
      {
        title: "Patient Intent Keyword Mapping",
        desc: "Targeting high-intent medical queries (e.g., 'DAA hip replacement Bangalore', 'knee surgeon Electronic City') rather than vague generic terms.",
      },
      {
        title: "Google Business Profile & 3-Pack",
        desc: "Complete local profile optimization, geo-tagged clinical posts, review strategy, and local citation consistency across healthcare directories.",
      },
      {
        title: "Clinical E-E-A-T Architecture",
        desc: "Demonstrating Experience, Expertise, Authoritativeness, and Trustworthiness through verified qualifications, surgeon bios, and structured doctor schema.",
      },
    ],
  },
  {
    id: "aeo",
    name: "AEO · Answer Engine Optimization",
    tagline: "Cited directly in Google AI Overviews.",
    icon: Sparkles,
    tint: "from-purple-600 to-indigo-600",
    badge: "AI Overviews & Perplexity",
    description:
      "Formatting clinical content with structured clarity, conversational Q&A schema, and high citation authority so AI answer engines quote the doctor as their primary source.",
    pillars: [
      {
        title: "Google AI Overview Optimization",
        desc: "Structuring procedure pages and symptom guides into clear, concise answers that Google's Gemini models extract directly into the search overview box.",
      },
      {
        title: "Conversational & FAQ Schema",
        desc: "Transforming medical FAQs into machine-readable JSON-LD schema with concise, factual answers to patient questions.",
      },
      {
        title: "Direct Answer Placement",
        desc: "Placing immediate, medically sound answer definitions at the very top of treatment pages to secure zero-click and snippet features.",
      },
    ],
  },
  {
    id: "geo",
    name: "GEO · Generative Engine Optimization",
    tagline: "Recommended by ChatGPT, Gemini & Claude.",
    icon: Bot,
    tint: "from-pink-600 to-rose-500",
    badge: "LLM Generative Discovery",
    description:
      "Building multi-source entity authority so when patients ask conversational AI assistants for doctor recommendations, the practice is consistently cited.",
    pillars: [
      {
        title: "Entity Authority Co-Citations",
        desc: "Establishing entity relationships between the doctor's name, their surgical specialty, hospital affiliations, and published outcomes.",
      },
      {
        title: "Reddit & Quora Community Authority",
        desc: "Providing value-led clinical insights on high-intent healthcare discussion threads where LLMs scrape and synthesize real human consensus.",
      },
      {
        title: "Multi-Platform Corroboration",
        desc: "Ensuring doctor credentials, clinic addresses, and specializations are uniformly corroborated across medical registers, journals, and local media.",
      },
    ],
  },
];

export function AeoGeoMatrix() {
  const [selected, setSelected] = useState<string>("aeo");
  const current = frameworks.find((f) => f.id === selected) || frameworks[1];
  const Icon = current.icon;

  return (
    <section aria-labelledby="framework-title" className="container-page py-20 lg:py-28">
      <div className="text-center">
        <p className="eyebrow mark">The Tri-Engine Methodology</p>
        <RevealText as="h2" id="framework-title" className="headline mx-auto mt-4 max-w-3xl text-[clamp(2.4rem,5.5vw,4.5rem)]">
          Mastering <span className="serif ig-text pr-[0.06em]">SEO, AEO &amp; GEO.</span>
        </RevealText>
        <p className="mx-auto mt-5 max-w-xl text-[17px] text-muted">
          Search has evolved beyond ten blue links. I position doctors and clinics where modern patients actually look: traditional Google Search, AI Overviews, and Generative LLM answers.
        </p>
      </div>

      {/* Tabs */}
      <div className="mx-auto mt-12 flex max-w-3xl justify-center gap-2 sm:gap-4">
        {frameworks.map((f) => {
          const TabIcon = f.icon;
          const isActive = selected === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelected(f.id)}
              className={cn(
                "group flex flex-1 items-center justify-center gap-2.5 rounded-2xl border p-3.5 sm:px-6 sm:py-4 transition-all duration-300 text-left",
                isActive
                  ? "border-accent bg-surface shadow-[var(--shadow)] ring-2 ring-accent/20"
                  : "border-line bg-surface/50 hover:bg-surface hover:border-line"
              )}
            >
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-xl transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-br text-white shadow-sm " + f.tint
                    : "bg-surface-2 text-muted group-hover:text-fg"
                )}
              >
                <TabIcon className="size-4.5" />
              </span>
              <div className="hidden sm:block min-w-0">
                <span className="block truncate text-[14px] font-bold text-fg">{f.name.split("·")[0]}</span>
                <span className="block truncate text-[11px] text-muted">{f.badge}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Framework Showcase Box */}
      <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-[32px] border border-line bg-surface p-7 sm:p-10 shadow-[var(--shadow)]">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
          <div className="flex items-center gap-4">
            <span
              className={cn(
                "grid size-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-md",
                current.tint
              )}
            >
              <Icon className="size-7" />
            </span>
            <div>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-[12px] font-semibold text-accent">
                {current.badge}
              </span>
              <h3 className="headline mt-1.5 text-[clamp(1.75rem,3vw,2.4rem)]">{current.name}</h3>
            </div>
          </div>
          <p className="serif text-[18px] text-accent font-medium sm:text-right">{current.tagline}</p>
        </div>

        <p className="mt-6 text-[16px] leading-relaxed text-fg/90">{current.description}</p>

        {/* 3 Pillars for the chosen Framework */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {current.pillars.map((p, i) => (
            <div key={p.title} className="rounded-2xl border border-line bg-surface-2/60 p-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] font-bold text-accent uppercase tracking-wider">
                  Phase 0{i + 1}
                </span>
                <h4 className="headline mt-2 text-[17px] text-fg">{p.title}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.desc}</p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold text-accent">
                <CheckCircle2 className="size-3.5" /> Clinical Implementation
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
