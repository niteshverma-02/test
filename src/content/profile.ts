import type { LinkRef } from "@/types/content";

/**
 * Everything personal lives here. Keep copy short — one idea per line.
 * Links with `href: null` are simply hidden until you add them.
 */
export const profile = {
  identity: {
    name: "Leesa Rai",
    firstName: "Leesa",
    initials: "LR",
    /** Shown as the @handle on the home profile card. */
    handle: "leesa.rai",
  },
  role: "Healthcare SEO & Local SEO Specialist",
  tagline: "Helps doctors get found on Google.",
  /** The hero cycles through these in place of "Google". */
  taglineWords: ["Google", "AI Search", "Local Maps", "Search Results"],
  description:
    "Healthcare SEO & Local SEO Specialist helping doctors and local businesses improve search visibility through SEO, content strategy, and AI search optimization.",

  availability: {
    open: true,
    label: "Available for new projects",
  },
  focus: "Healthcare SEO & local search optimization",
  location: {
    label: "India",
    timezone: "Asia/Kolkata",
    zoneLabel: "IST",
  },

  contact: {
    email: "contactleesa@gmail.com",
  },

  social: [
    { label: "LinkedIn", href: "https://in.linkedin.com/in/leesa-rai" },
    { label: "Instagram", href: null },
  ] satisfies LinkRef[],

  cv: { label: "Download Resume", href: null } satisfies LinkRef,


  portrait: null as null | {
    src: string;
    alt: string;
    width: number;
    height: number;
  },

  about: {
    lede: "I help doctors and businesses improve their online visibility by understanding how people search, what they need, and what influences their decisions.",
    quote:
      "Good SEO starts with understanding people, not just search engines. Because behind every search is a person looking for an answer, a service, or the right business to trust.",
    story: [
      "My journey into SEO started with a curiosity about how people search for healthcare services online — and why certain websites appear at the top while others remain invisible.",
      "That curiosity led me to explore healthcare SEO, local search optimization, website audits, keyword research, and AI search visibility. Through professional training, internships, and hands-on client projects, I've developed an understanding of how search intent, content quality, technical health, and authority work together.",
      "Today, I work on improving search visibility for doctors and local businesses — from website audits and keyword research to Google Business Profile optimization and AI search discoverability.",
    ],
    bring: [
      { title: "Search intent before keywords", text: "I look beyond search volume to understand what people are actually looking for and why." },
      { title: "Strategy before optimization", text: "From website audits and keyword research to technical SEO and content planning, I focus on building the right foundation." },
      { title: "Visibility beyond Google", text: "I explore how SEO, AEO, and GEO can support discoverability across traditional search, local search, and AI-powered search." },
      { title: "A learning mindset", text: "Search evolves constantly. I stay updated with algorithm changes, AI search trends, and new ranking factors." },
    ],
    principles: [
      { title: "Understand the business first", text: "Understanding the doctor's qualifications, specialty, and audience before building any strategy." },
      { title: "Data-driven decisions", text: "Every recommendation is backed by keyword data, search trends, and performance insights." },
      { title: "Sustainable growth", text: "Building long-term search visibility through ethical, white-hat SEO practices." },
    ],
    interests: [
      "Healthcare SEO",
      "Local SEO",
      "AEO & GEO",
      "Website Audits",
      "Keyword Research",
      "Content Strategy",
    ],
    hobbies: [
      "Exploring search trends",
      "Reading about AI & search",
      "Creative writing",
      "Photography",
      "Meaningful conversations",
      "Finding everyday inspiration",
    ],
    funFacts: [
      { emoji: "🔍", text: "Search obsessed", detail: "I analyze search results for fun — studying what ranks and why." },
      { emoji: "📊", text: "Data-driven", detail: "I let Google Search Console insights guide every decision." },
      { emoji: "🏥", text: "Healthcare focused", detail: "Helping doctors get found online is what drives me." },
      { emoji: "🤖", text: "AI search explorer", detail: "Studying how ChatGPT, Gemini, and AI Overviews change discovery." },
      { emoji: "📱", text: "Local SEO native", detail: "Google Business Profiles, local packs, and map rankings." },
      { emoji: "🌱", text: "Lifelong learner", detail: "Search evolves daily, and so do I." },
    ],
    journey: [
      { when: "2024", title: "Curiosity sparked", text: "Started exploring digital marketing, SEO fundamentals, and how businesses get found online." },
      { when: "2024", title: "Formal training", text: "Professional training in digital marketing at Rank Brain Marketing Institute." },
      { when: "2025", title: "First SEO roles", text: "Hands-on SEO work at Payzon India — keyword research, on-page SEO, and website optimization." },
      { when: "2025", title: "SaaS outreach", text: "Off-page SEO and link exchange at Predis.ai — building authority for SaaS websites." },
      { when: "2026", title: "Healthcare SEO specialist", text: "SEO & AEO Executive at Vibebrand Transmedia — local SEO, website audits, and AI search optimization." },
      { when: "Now", title: "Building search visibility", text: "Helping doctors and local businesses become easier to find when people search for their services." },
    ],
  },
};

export type ProfileConfig = typeof profile;
