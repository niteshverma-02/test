/**
 * Verified evidence: real screenshots from Search Console, AI Overviews,
 * ChatGPT/Gemini and community channels. Add new proof here only with a screenshot.
 */
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

export const proof: ProofItem[] = [
  {
    id: "gsc-growth",
    category: "gsc",
    title: "Google Search Console 6‑Month Growth",
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
    title: "Gemini & LLM Cross‑Engine Citations",
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
    title: "Page 1 Treatment Keyword Rankings",
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
    metric: "4 Enquiries in One Month",
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

/** Which engine each kind of proof belongs to (drives colour and filters). */
export const proofEngine: Record<ProofItem["category"], "SEO" | "AEO" | "GEO" | "LEADS"> = {
  gsc: "SEO",
  rankings: "SEO",
  aeo: "AEO",
  geo: "GEO",
  leads: "LEADS",
};
