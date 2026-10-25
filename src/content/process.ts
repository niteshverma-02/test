/** Leesa Rai's Healthcare SEO & Search Growth Process — six clear stages from her Google Doc. */

export type NodeId = "research" | "strategy" | "create" | "publish" | "analytics" | "brand" | "audience" | "calendar";
export type EdgeId =
  | "research-strategy"
  | "strategy-create"
  | "strategy-calendar"
  | "create-publish"
  | "publish-analytics"
  | "analytics-strategy"
  | "brand-strategy"
  | "audience-research";

export const systemNodes: Record<NodeId, { label: string; sub: string; x: number; y: number; w: number }> = {
  audience: { label: "Doctor Expertise", sub: "Specialty · Treatments", x: 16, y: 120, w: 138 },
  brand: { label: "Patient Audience", sub: "Location · Search Intent", x: 16, y: 300, w: 138 },
  research: { label: "SEO Audit", sub: "UI/UX · Health · Tech", x: 188, y: 36, w: 160 },
  calendar: { label: "E-E-A-T Signals", sub: "Trust · Medical Quality", x: 372, y: 36, w: 160 },
  strategy: { label: "Keyword Strategy", sub: "Competitors · Intent", x: 188, y: 210, w: 160 },
  create: { label: "AEO & GEO", sub: "AI Overviews · FAQs", x: 372, y: 210, w: 160 },
  publish: { label: "Off-Page SEO", sub: "Reddit · Quora · Links", x: 280, y: 384, w: 160 },
  analytics: { label: "Search Console", sub: "Clicks · Impressions · GBP", x: 566, y: 210, w: 138 },
};

export const NODE_H = 58;

export const systemEdges: Record<EdgeId, string> = {
  "audience-research": "M154 150 L176 65 Q180 59 186 59 L188 59",
  "brand-strategy": "M154 330 L180 239 Q184 233 188 233",
  "research-strategy": "M268 94 L268 210",
  "strategy-create": "M348 239 L372 239",
  "strategy-calendar": "M268 94 L268 60 Q268 54 274 54 L372 54",
  "create-publish": "M452 268 L452 340 Q452 346 446 346 L348 346 Q342 346 342 352 L342 384",
  "publish-analytics": "M440 413 L566 239 Q570 233 566 230",
  "analytics-strategy": "M566 210 L566 130 Q566 124 560 124 L356 124 Q350 124 350 130 L350 210",
};

export const loopPath = "M6 470 L6 20 Q6 4 22 4 L698 4 Q714 4 714 20 L714 470 Q714 486 698 486 L22 486 Q6 486 6 470 Z";

export const stages: { id: string; title: string; text: string; nodes: NodeId[]; edges: EdgeId[]; loop?: boolean }[] = [
  {
    id: "understand",
    title: "Understand",
    text: "Understand the doctor's qualifications, specialty, services, and target patient audience.",
    nodes: ["audience", "brand"],
    edges: ["audience-research", "brand-strategy"],
  },
  {
    id: "audit",
    title: "Audit",
    text: "Audit website UI/UX, architecture, technical health, crawlability, and on-page SEO.",
    nodes: ["research", "strategy"],
    edges: ["research-strategy", "brand-strategy"],
  },
  {
    id: "research",
    title: "Keywords & Intent",
    text: "Review keyword opportunities, competitors, search volume, and patient search intent.",
    nodes: ["strategy", "calendar"],
    edges: ["strategy-calendar"],
  },
  {
    id: "eeat",
    title: "E-E-A-T & Trust",
    text: "Evaluate content quality, medical credibility, author signals, and trust elements.",
    nodes: ["strategy", "create"],
    edges: ["strategy-create"],
  },
  {
    id: "aeo",
    title: "AEO & GEO",
    text: "Build an AEO/GEO and FAQ content strategy for AI-powered search and local map discoverability.",
    nodes: ["create", "publish"],
    edges: ["create-publish"],
  },
  {
    id: "offpage",
    title: "Off-Page & Growth",
    text: "Execute off-page SEO via Reddit, Quora, and citation building, with continuous Search Console tracking.",
    nodes: ["publish", "analytics"],
    edges: ["publish-analytics", "analytics-strategy"],
    loop: true,
  },
];
