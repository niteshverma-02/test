/** Social media and content creation skills & tools for Tanu Rai. */

export type SkillCategory =
  | "strategy"
  | "content"
  | "platforms"
  | "branding"
  | "analytics"
  | "tools"
  | "ads";

export const categoryLabels: Record<SkillCategory, string> = {
  strategy: "Content Strategy",
  content: "Content Creation",
  platforms: "Platforms",
  branding: "Branding",
  analytics: "Analytics",
  tools: "Tools",
  ads: "Advertising",
};

export interface Skill {
  name: string;
  category: SkillCategory;
  level?: number; // 1–5
}

export const skills: Skill[] = [
  // Strategy
  { name: "Content Strategy", category: "strategy", level: 5 },
  { name: "Audience Research", category: "strategy", level: 5 },
  { name: "Competitor Analysis", category: "strategy", level: 4 },
  { name: "Content Planning", category: "strategy", level: 5 },
  { name: "Brand Communication", category: "strategy", level: 5 },

  // Content Creation
  { name: "Caption Writing", category: "content", level: 5 },
  { name: "Reels Concepts & Hooks", category: "content", level: 5 },
  { name: "Content Calendars", category: "content", level: 5 },
  { name: "Storytelling", category: "content", level: 5 },
  { name: "Script Writing", category: "content", level: 4 },

  // Platforms
  { name: "Instagram", category: "platforms", level: 5 },
  { name: "LinkedIn", category: "platforms", level: 5 },
  { name: "Facebook", category: "platforms", level: 4 },
  { name: "YouTube Shorts", category: "platforms", level: 3 },

  // Branding
  { name: "Personal Branding", category: "branding", level: 5 },
  { name: "Brand Voice Development", category: "branding", level: 5 },
  { name: "Visual Identity Guidance", category: "branding", level: 4 },
  { name: "Thought Leadership Content", category: "branding", level: 4 },

  // Analytics
  { name: "Social Media Analytics", category: "analytics", level: 4 },
  { name: "Performance Reporting", category: "analytics", level: 4 },
  { name: "Engagement Analysis", category: "analytics", level: 4 },
  { name: "SEO Basics", category: "analytics", level: 3 },

  // Tools
  { name: "Canva", category: "tools", level: 5 },
  { name: "Meta Business Suite", category: "tools", level: 4 },
  { name: "Google Analytics", category: "tools", level: 3 },
  { name: "Later / Buffer", category: "tools", level: 4 },

  // Ads
  { name: "Meta Ads", category: "ads", level: 4 },
  { name: "Campaign Planning", category: "ads", level: 4 },
  { name: "Audience Targeting", category: "ads", level: 4 },
];

/** Flat list of all tools for the marquee. */
export const allTech = [
  "Instagram",
  "LinkedIn",
  "Facebook",
  "Content Strategy",
  "Reels",
  "Caption Writing",
  "Meta Ads",
  "Canva",
  "Personal Branding",
  "Audience Research",
  "Content Calendars",
  "Brand Storytelling",
  "SEO",
  "Meta Business Suite",
  "Campaign Planning",
  "Thought Leadership",
  "Hooks & Scripts",
  "Performance Analytics",
];
