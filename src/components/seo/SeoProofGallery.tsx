"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BarChart2,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Eye,
  Maximize2,
  MessageSquare,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { RevealText } from "@/components/motion/RevealText";
import { cn } from "@/lib/cn";

export interface ProofItem {
  id: string;
  category: "gsc" | "aeo" | "geo" | "rankings" | "leads";
  title: string;
  client: string;
  clientUrl?: string;
  badge: string;
  metric: string;
  description: string;
  src: string;
}

const proofData: ProofItem[] = [
  {
    id: "gsc-growth",
    category: "gsc",
    title: "Google Search Console 6-Month Growth",
    client: "Dr. Abhinandan Punit",
    clientUrl: "https://doctorabhinandanpunit.com/",
    badge: "GSC Verified",
    metric: "Clicks: 1.32K → 1.96K (+48.5%)",
    description:
      "Six-month verified Search Console data showing clicks climbing to 1.96K and impressions reaching 97.7K. Average CTR jumped from 1.5% to 2.0% across target orthopaedic queries.",
    src: "/screenshots/gsc.png",
  },
  {
    id: "aeo-overview-1",
    category: "aeo",
    title: "Google AI Overview #1 Recommendation",
    client: "Dr. Abhinandan Punit",
    clientUrl: "https://doctorabhinandanpunit.com/",
    badge: "AEO Optimization",
    metric: "Top AI Overview Result",
    description:
      "Doctor website featured prominently inside Google AI Overview for targeted orthopaedic surgical queries in Electronic City and South Bangalore.",
    src: "/screenshots/aeo-result.png",
  },
  {
    id: "aeo-overview-2",
    category: "aeo",
    title: "AI Overview Answer Engine Placement",
    client: "Dr. Abhinandan Punit",
    clientUrl: "https://doctorabhinandanpunit.com/",
    badge: "AEO Citation",
    metric: "Primary Source Cited",
    description:
      "Structured clinical FAQ schema and patient symptom guides allow Google Gemini to extract direct treatment explanations with website citations.",
    src: "/screenshots/aeo-results-2.png",
  },
  {
    id: "ai-search-health",
    category: "aeo",
    title: "Healthcare Search AI Discoverability",
    client: "Dr. Abhinandan Punit",
    clientUrl: "https://doctorabhinandanpunit.com/",
    badge: "Medical AI Search",
    metric: "Zero-Click Discovery",
    description:
      "Treatment-specific medical queries returning the client website as an authoritative reference in AI search summaries.",
    src: "/screenshots/ai-search-health.png",
  },
  {
    id: "chatgpt-mention",
    category: "geo",
    title: "ChatGPT Generative Engine Mention",
    client: "Dr. Abhinandan Punit",
    clientUrl: "https://doctorabhinandanpunit.com/",
    badge: "GEO / ChatGPT",
    metric: "Organically Recommended",
    description:
      "When users ask ChatGPT for top orthopaedic and knee surgeons in Bangalore, Dr. Abhinandan is recommended due to multi-source entity authority building.",
    src: "/screenshots/chatgpt-mention.png",
  },
  {
    id: "geo-mentions",
    category: "geo",
    title: "Gemini & LLM Cross-Engine Citations",
    client: "Dr. Abhinandan Punit & Dr. Hulse",
    badge: "GEO / Gemini",
    metric: "Entity Level Authority",
    description:
      "Corroborated clinical credentials and hospital affiliations make the doctors discoverable across multimodal AI search engines.",
    src: "/screenshots/geo-mentions.png",
  },
  {
    id: "orthocare-dashboard",
    category: "gsc",
    title: "Orthocare Performance Analytics Dashboard",
    client: "Healthcare Practice Analytics",
    badge: "Analytics Tracking",
    metric: "End-to-End Search Funnel",
    description:
      "Detailed organic performance tracking measuring treatment keyword impressions, map interactions, and appointment inquiries.",
    src: "/screenshots/orthocare-analytics.png",
  },
  {
    id: "seo-keyword-ranking",
    category: "rankings",
    title: "Top 3 Treatment Keyword Rankings",
    client: "Dr. Abhinandan Punit",
    clientUrl: "https://doctorabhinandanpunit.com/",
    badge: "Organic Search",
    metric: "Page 1 Medical Ranking",
    description:
      "Competitive orthopaedic surgery terms secured on Page 1 of Google organic search targeting Bangalore South and Electronic City.",
    src: "/screenshots/seo-keywords-ranking.png",
  },
  {
    id: "reddit-patient-msg",
    category: "leads",
    title: "International Patient Enquiry via Reddit",
    client: "Off-Page Community SEO",
    badge: "Reddit Off-Page",
    metric: "4 Enquiries / Month",
    description:
      "Direct message received from a foreign patient seeking treatment in India after reading value-led medical advice contributed on healthcare subreddits.",
    src: "/screenshots/reddit-patient-msg.png",
  },
  {
    id: "reddit-chat",
    category: "leads",
    title: "Community Value Consultation Chat",
    client: "Off-Page Community SEO",
    badge: "Quora & Reddit",
    metric: "Direct Clinical Trust",
    description:
      "Authentic, non-promotional answers on medical discussion boards driving high-trust patient consults directly to the doctor.",
    src: "/screenshots/reddit-chat.png",
  },
];

const categories = [
  { id: "all", label: "All Evidence" },
  { id: "gsc", label: "Search Console (GSC)" },
  { id: "aeo", label: "Google AI Overviews (AEO)" },
  { id: "geo", label: "ChatGPT & Gemini (GEO)" },
  { id: "rankings", label: "Keyword Rankings" },
  { id: "leads", label: "Reddit/Quora Leads" },
];

export function SeoProofGallery() {
  const [filter, setFilter] = useState("all");
  const [activeModal, setActiveModal] = useState<ProofItem | null>(null);

  const filtered = filter === "all" ? proofData : proofData.filter((p) => p.category === filter);

  return (
    <section id="proof" aria-labelledby="proof-title" className="container-page py-20 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow mark">Verified Proof &amp; Results</p>
          <RevealText as="h2" id="proof-title" className="headline mt-3 max-w-2xl text-[clamp(2.4rem,5.5vw,4.5rem)]">
            Data that proves <span className="serif ig-text pr-[0.05em]">the rankings.</span>
          </RevealText>
        </div>
        <p className="max-w-md text-[16px] text-muted">
          Actual Google Search Console data, Google AI Overview results, ChatGPT citations, and patient consultation evidence from client campaigns.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setFilter(c.id)}
            className={cn(
              "h-10 shrink-0 rounded-full px-5 text-[13px] font-semibold transition-all duration-300",
              filter === c.id
                ? "bg-accent text-white shadow-sm"
                : "border border-line bg-surface hover:bg-surface-2 text-muted hover:text-fg"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid of Proof Cards */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="group relative flex flex-col overflow-hidden rounded-[26px] border border-line bg-surface transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow)]"
          >
            {/* Image Preview with Hover Overlay */}
            <div
              className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2 cursor-pointer"
              onClick={() => setActiveModal(item)}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 grid place-items-center">
                <span className="flex items-center gap-2 rounded-full bg-black/75 px-4 py-2 text-[12px] font-semibold text-white backdrop-blur">
                  <Maximize2 className="size-3.5" /> View Proof
                </span>
              </div>
              <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                {item.badge}
              </span>
            </div>

            {/* Info Body */}
            <div className="flex flex-1 flex-col p-6">
              <span className="text-[12px] font-bold text-accent">{item.metric}</span>
              <h3 className="headline mt-1.5 text-[18px] text-fg leading-snug">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.description}</p>

              <div className="mt-auto border-t border-line pt-4 flex items-center justify-between">
                <span className="text-[12px] font-medium text-fg truncate">{item.client}</span>
                {item.clientUrl && (
                  <a
                    href={item.clientUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[12px] font-semibold text-accent hover:underline"
                  >
                    Visit Client <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal / Lightbox for viewing full proof screenshot */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative max-h-[92vh] max-w-4xl w-full overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-[11px] font-bold text-accent">
                  {activeModal.badge}
                </span>
                <h3 className="headline mt-1.5 text-[20px] text-fg">{activeModal.title}</h3>
                <p className="text-[13px] text-muted">{activeModal.metric} · {activeModal.client}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Close modal"
                className="grid size-10 place-items-center rounded-full border border-line bg-surface-2 transition hover:bg-line"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="relative mt-4 aspect-[16/10] max-h-[62vh] w-full overflow-auto rounded-2xl bg-black/10">
              <Image
                src={activeModal.src}
                alt={activeModal.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
              <p className="text-[13px] text-muted max-w-xl">{activeModal.description}</p>
              {activeModal.clientUrl && (
                <a
                  href={activeModal.clientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-xl bg-accent px-4 text-[13px] font-semibold text-white hover:opacity-95"
                >
                  Visit Client Website <ExternalLink className="size-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
