import type { EducationEntry, ExperienceEntry } from "@/types/content";

/**
 * Most recent first. Titles and dates from professional records.
 * Highlights are short and factual — no unverified percentages.
 */
export const experience: ExperienceEntry[] = [
  {
    period: "2024 — Now",
    role: "Social Media Manager & Content Creator",
    org: "Freelance / Client Projects",
    summary: "Managing social media and content strategy for healthcare, lifestyle, and consumer brands.",
    highlights: [
      "Content strategy and social media management for multiple healthcare professionals",
      "Developed content calendars, reel concepts, hooks, and captions",
      "E-commerce and lifestyle brand social media management",
      "Personal branding and LinkedIn content for professionals",
      "Educational content creation for marketing and SEO audiences",
    ],
    stack: ["Instagram", "LinkedIn", "Meta Business Suite", "Canva", "Content Strategy", "Caption Writing"],
    placeholder: false,
    current: true,
  },
  {
    period: "2023 — 2024",
    role: "Digital Marketing Internship / Training",
    org: "Professional Development",
    summary: "Formal training in digital marketing, social media strategy, and content creation.",
    highlights: [
      "Training in social media management and content strategy",
      "Hands-on practice with audience research and competitor analysis",
      "Content creation for educational and promotional purposes",
      "Understanding of Meta Ads and campaign coordination",
    ],
    stack: ["Social Media", "Content Strategy", "Meta Ads", "SEO", "Canva"],
    placeholder: false,
  },
];

/** Set to true to show percentages / scores on the page. */
export const showEducationScores = false;

export const education: EducationEntry[] = [
  {
    level: "Diploma / Certification",
    field: "Digital Marketing & Social Media",
    institution: "Professional Training",
    board: "Industry",
    year: "2023",
  },
];

export const platforms = [
  { name: "Instagram", detail: "Content · Reels · Stories" },
  { name: "LinkedIn", detail: "Personal Brand · B2B" },
  { name: "Facebook", detail: "Pages · Meta Ads" },
  { name: "Meta Ads", detail: "Campaign Planning · Audience Targeting" },
];

/** As listed on the portfolio. Add `href` to link a certificate. */
export const certifications: { name: string; issuer: string; year: string; href?: string }[] = [
  { name: "Digital Marketing Fundamentals", issuer: "Google", year: "2023" },
  { name: "Social Media Marketing", issuer: "HubSpot Academy", year: "2023" },
  { name: "Content Marketing", issuer: "HubSpot Academy", year: "2024" },
];
