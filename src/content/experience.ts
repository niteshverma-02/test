import type { EducationEntry, ExperienceEntry } from "@/types/content";

/**
 * Most recent first. Titles and dates from professional records.
 * Highlights are short and factual — no unverified percentages.
 */
export const experience: ExperienceEntry[] = [
  {
    period: "March 2026 — Now",
    role: "SEO & AEO Executive",
    org: "Vibebrand Transmedia",
    summary: "Working on local SEO strategies for local businesses, website audits, keyword research, and AEO-focused optimization.",
    highlights: [
      "Local SEO strategies for local businesses",
      "Website audits and keyword research",
      "Supporting search visibility through SEO and AEO-focused optimization",
      "Healthcare SEO and Google Business Profile management",
    ],
    stack: ["Local SEO", "AEO", "GEO", "Website Audits", "Keyword Research", "Google Business Profile"],
    placeholder: false,
    current: true,
  },
  {
    period: "Oct 2025 — Feb 2026",
    role: "Off-Page SEO Executive | Link Exchange & Outreach",
    org: "Predis.ai",
    summary: "Managed link exchange and outreach activities for SaaS websites, identifying backlink opportunities and supporting off-page SEO.",
    highlights: [
      "Managed link exchange and outreach activities for SaaS websites",
      "Identified relevant backlink opportunities",
      "Supported off-page SEO efforts focused on website authority and organic traffic growth",
    ],
    stack: ["Off-Page SEO", "Link Building", "Outreach", "SaaS SEO", "Backlinks"],
    placeholder: false,
  },
  {
    period: "March 2025 — Oct 2025",
    role: "SEO Executive",
    org: "Payzon India Pvt. Ltd.",
    summary: "Managed SEO activities for client websites including keyword research, on-page SEO, and website optimization.",
    highlights: [
      "Managed SEO activities for client websites",
      "Keyword research, on-page SEO, and website optimization",
      "Supported SEO strategies based on client requirements",
    ],
    stack: ["On-Page SEO", "Keyword Research", "Technical SEO", "Content Optimization"],
    placeholder: false,
  },
  {
    period: "Sep 2024 — Dec 2024",
    role: "Digital Marketing Intern",
    org: "Arihant Digitals",
    summary: "Gained practical exposure to digital marketing activities and developed foundational skills in online marketing and content strategy.",
    highlights: [
      "Practical exposure to digital marketing activities",
      "Foundational skills in online marketing and content strategy",
    ],
    stack: ["Digital Marketing", "Content Strategy", "Social Media"],
    placeholder: false,
  },
];

/** Set to true to show percentages / scores on the page. */
export const showEducationScores = false;

export const education: EducationEntry[] = [
  {
    level: "BBA",
    field: "Marketing",
    institution: "University",
    board: "University",
    year: "2024",
  },
  {
    level: "Diploma / Certification",
    field: "Digital Marketing & SEO",
    institution: "Rank Brain Marketing Institute",
    board: "Industry",
    year: "2024",
  },
];

export const platforms = [
  { name: "Google Search Console", detail: "Performance · Keywords · Indexing" },
  { name: "Google Business Profile", detail: "Local SEO · Reviews · Posts" },
  { name: "Ahrefs / SEMrush", detail: "Keyword Research · Backlinks · Audits" },
  { name: "Google Analytics", detail: "Traffic · Behaviour · Conversions" },
];

/** As listed on the portfolio. Add `href` to link a certificate. */
export const certifications: { name: string; issuer: string; year: string; href?: string }[] = [
  { name: "Digital Marketing Fundamentals", issuer: "Google", year: "2024" },
  { name: "SEO Training & Certification", issuer: "Rank Brain Marketing Institute", year: "2024" },
];
