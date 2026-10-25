/** SEO, Local SEO, AEO & content skills for Leesa Rai. */

export type SkillCategory =
  | "seo"
  | "local"
  | "aeo"
  | "content"
  | "offpage"
  | "technical"
  | "tools";

export const categoryLabels: Record<SkillCategory, string> = {
  seo: "Healthcare SEO",
  local: "Local SEO & GBP",
  aeo: "AEO & AI Search",
  content: "Content Strategy",
  offpage: "Off-Page, Reddit & Quora",
  technical: "Technical & Audits",
  tools: "Tools & Analytics",
};

export interface Skill {
  name: string;
  category: SkillCategory;
  level?: number; // 1–5
}

export const skills: Skill[] = [
  // Healthcare SEO
  { name: "Healthcare SEO Strategy", category: "seo", level: 5 },
  { name: "Doctor & Clinic Keyword Research", category: "seo", level: 5 },
  { name: "Search Intent Mapping", category: "seo", level: 5 },
  { name: "Competitor Ranking Analysis", category: "seo", level: 4 },
  { name: "E-E-A-T Medical Content Signals", category: "seo", level: 5 },

  // Local SEO & GBP
  { name: "Google Business Profile Optimization", category: "local", level: 5 },
  { name: "Local Map Pack Rankings", category: "local", level: 5 },
  { name: "Local Citation & Directory Building", category: "local", level: 4 },
  { name: "Location-Specific Landing Pages", category: "local", level: 5 },
  { name: "Review & Reputation Strategy", category: "local", level: 4 },

  // AEO & AI Search
  { name: "Google AI Overviews Optimization", category: "aeo", level: 5 },
  { name: "AEO & GEO Discoverability", category: "aeo", level: 5 },
  { name: "ChatGPT & Gemini Brand Mentions", category: "aeo", level: 4 },
  { name: "FAQ & Conversational Search Design", category: "aeo", level: 5 },
  { name: "Structured Schema for AI Engines", category: "aeo", level: 4 },

  // Content Strategy
  { name: "SEO Content Strategy", category: "content", level: 5 },
  { name: "Medical Blog & Treatment Writing", category: "content", level: 5 },
  { name: "On-Page Heading & Meta Optimization", category: "content", level: 5 },
  { name: "Content Audits & Gap Analysis", category: "content", level: 4 },
  { name: "Social & Instagram Content Planning", category: "content", level: 4 },

  // Off-Page, Reddit & Quora
  { name: "Reddit Community Marketing", category: "offpage", level: 5 },
  { name: "Quora Expert Answers & Reach", category: "offpage", level: 5 },
  { name: "High-Quality Backlink Building", category: "offpage", level: 4 },
  { name: "SaaS Outreach & Link Exchange", category: "offpage", level: 4 },
  { name: "Brand Mention & Citation Building", category: "offpage", level: 5 },

  // Technical & Audits
  { name: "Website SEO Audits", category: "technical", level: 5 },
  { name: "UI/UX & Site Architecture Review", category: "technical", level: 4 },
  { name: "Technical Health & Crawlability", category: "technical", level: 4 },
  { name: "Internal Linking Architecture", category: "technical", level: 5 },
  { name: "Indexing & Sitemaps", category: "technical", level: 4 },

  // Tools & Analytics
  { name: "Google Search Console", category: "tools", level: 5 },
  { name: "Google Business Profile Manager", category: "tools", level: 5 },
  { name: "Google Analytics (GA4)", category: "tools", level: 4 },
  { name: "Ahrefs & SEMrush", category: "tools", level: 4 },
  { name: "Rank Brain Frameworks", category: "tools", level: 5 },
];

export const allTech = skills.map((s) => s.name);

