import type { Project, ProjectCategory } from "@/types/content";

export const categoryLabels: Record<ProjectCategory, string> = {
  web: "SEO",
  ecommerce: "Local SEO",
  mobile: "AEO & GEO",
  backend: "Off-Page SEO",
  analytics: "Analytics",
  release: "Campaign",
  pos: "Healthcare",
  ai: "AI Search",
};

/**
 * Leesa Rai's SEO & healthcare search visibility projects.
 * Client websites are listed for reference.
 * Performance data shown only when verified.
 */
export const projects: Project[] = [
  // ——— Healthcare SEO Case Study: Dr. Abhinandan Punit ———
  {
    slug: "dr-abhinandan-punit-seo",
    hook: "Doctors don't need more pages. They need patients who find them.",
    highlight: { value: "+48.5%", label: "organic clicks in six months (Search Console)" },
    name: "Dr. Abhinandan Punit — Healthcare SEO",
    category: "pos",
    year: "2025–2026",
    summary: "6-month healthcare SEO project improving online search visibility for an orthopaedic surgeon in Bangalore.",
    problem:
      "Dr. Abhinandan Punit, an orthopaedic surgeon in Bangalore, needed to improve his online search visibility for treatment-related keywords, local SEO, and AI search discoverability across Kanakapura Road and Electronic City.",
    role: "SEO Strategy & Implementation",
    contributions: [
      "On-Page SEO: Keyword research, content optimization, and website audit",
      "Technical SEO: Website health, architecture, and technical improvements",
      "Off-Page SEO: Reddit, Quora, and citation-building activities",
      "Local SEO & AEO/GEO: Location-focused optimization, FAQ strategy, and AI search visibility",
      "Google Business Profile optimization and performance monitoring",
    ],
    architecture: [
      { layer: "On-Page SEO", detail: "Keyword research, content optimization, meta tags, and internal linking." },
      { layer: "Technical SEO", detail: "Website health, architecture, page speed, and schema markup." },
      { layer: "Local SEO", detail: "Google Business Profile, local citations, and location-based keyword targeting." },
      { layer: "AEO & GEO", detail: "FAQ strategy, structured content, and AI search visibility optimization." },
    ],
    challenges: [
      { title: "Competitive medical niche", detail: "Orthopaedic surgery in Bangalore is highly competitive with established players." },
      { title: "Multiple locations", detail: "Targeting visibility across Kanakapura Road and Electronic City simultaneously." },
      { title: "AI search optimization", detail: "Structuring content to appear in Google AI Overviews and ChatGPT recommendations." },
    ],
    results: [
      "Google Search Console: Clicks increased from 1.32K to 1.96K (six-month comparison)",
      "Impressions grew from 85.2K to 97.7K",
      "CTR improved from 1.5% to 2.0%",
      "Website appearing in Google AI Overview results for relevant orthopaedic searches",
      "Doctor discoverable on ChatGPT & Gemini for treatment-related searches",
      "4 international enquiries reported during one month through Reddit/Quora channels",
    ],
    stack: [
      "On-Page SEO",
      "Technical SEO",
      "Local SEO",
      "AEO & GEO",
      "Google Search Console",
      "Google Business Profile",
      "Reddit & Quora",
      "Schema Markup",
    ],
    links: [
      { label: "Dr. Abhinandan Punit (Live Website)", href: "https://doctorabhinandanpunit.com/" },
    ],
    evidence: [
      {
        title: "Google Search Console Growth",
        badge: "Clicks: 1.32K → 1.96K (+48.5%)",
        desc: "Six-month GSC comparison showing clicks climbing from 1.32K to 1.96K and impressions to 97.7K. Average CTR grew from 1.5% to 2.0%.",
        src: "/screenshots/gsc.png",
      },
      {
        title: "Google AI Overview #1 Placement",
        badge: "Top AI Overview",
        desc: "Doctor's website appearing prominently in Google AI Overview answers for orthopaedic searches in Electronic City.",
        src: "/screenshots/aeo-result.png",
      },
      {
        title: "Answer Engine Medical Citations",
        badge: "AEO Citation",
        desc: "Structured clinical FAQs and treatment pages extracted by Google Gemini as a cited medical authority.",
        src: "/screenshots/aeo-results-2.png",
      },
      {
        title: "ChatGPT Organic Recommendation",
        badge: "GEO / ChatGPT",
        desc: "ChatGPT organically citing and recommending Dr. Abhinandan Punit for knee and hip replacement surgery in Bangalore.",
        src: "/screenshots/chatgpt-mention.png",
      },
      {
        title: "Gemini Cross-Platform Discovery",
        badge: "GEO / Gemini",
        desc: "Entity-level optimization establishing the surgeon as a primary reference across multimodal generative engines.",
        src: "/screenshots/geo-mentions.png",
      },
      {
        title: "Organic Keyword Rankings",
        badge: "Page 1 Google",
        desc: "High-intent orthopaedic and DAA hip surgery queries ranking at the top of Google organic search.",
        src: "/screenshots/seo-keywords-ranking.png",
      },
    ],
    art: "insights",
    tint: ["#3f6212", "#0f766e"],
    kind: "work",
    placeholder: false,
  },
  // ——— Healthcare SEO: Dr. Hulse ———
  {
    slug: "dr-hulse-seo",
    hook: "Making world-class orthopaedic care discoverable online.",
    name: "Dr. Narayan Hulse — Healthcare SEO",
    category: "pos",
    year: "2025–2026",
    summary: "SEO strategy and search visibility improvement for a leading orthopaedic surgeon's website.",
    problem:
      "Dr. Narayan Hulse's website needed improved search visibility for orthopaedic treatment keywords and stronger local SEO presence in the target location.",
    role: "SEO Specialist",
    contributions: [
      "Website audit and technical SEO improvements",
      "Keyword research and on-page content optimization",
      "Local SEO strategy and Google Business Profile management",
      "Content strategy aligned with patient search intent",
      "Performance monitoring and reporting",
    ],
    architecture: [
      { layer: "Audit", detail: "Technical health check, content gaps, and keyword opportunity analysis." },
      { layer: "On-Page", detail: "Content optimization, meta tags, heading structure, and internal linking." },
      { layer: "Local SEO", detail: "Location targeting, Google Business Profile, and citation building." },
      { layer: "Monitor", detail: "Google Search Console tracking, keyword ranking reports, and adjustments." },
    ],
    challenges: [
      { title: "Established competition", detail: "Competing against well-established medical websites with strong domain authority." },
      { title: "Medical content accuracy", detail: "Ensuring all content is medically accurate while being SEO-optimized." },
      { title: "Patient search intent", detail: "Aligning content with how patients actually search for orthopaedic services." },
    ],
    results: [],
    stack: [
      "Healthcare SEO",
      "Technical SEO",
      "Local SEO",
      "Google Search Console",
      "Keyword Research",
      "Content Optimization",
    ],
    links: [
      { label: "Dr. Narayan Hulse", href: "https://drhulse.com/" },
    ],
    art: "profile",
    tint: ["#0f766e", "#5b3fd6"],
    kind: "work",
    placeholder: false,
  },
  // ——— Off-Page SEO & Community Marketing ———
  {
    slug: "reddit-quora-seo",
    hook: "Building authority where real conversations happen.",
    highlight: { value: "4", label: "international patient enquiries in one month" },
    name: "Reddit & Quora Off-Page SEO",
    category: "backend",
    year: "2025–2026",
    summary: "Strategic off-page SEO through Reddit and Quora — building brand visibility and driving relevant traffic.",
    problem:
      "Healthcare brands and businesses needed to build online authority and reach audiences beyond traditional search results, through authentic community engagement on Reddit and Quora.",
    role: "Off-Page SEO & Community Marketing",
    contributions: [
      "Relevant, value-led participation in healthcare and SEO communities",
      "Topic research and content management on Reddit and Quora",
      "Building brand mentions and authority through helpful answers",
      "Driving referral traffic from community platforms to client websites",
      "Monitoring and reporting on community engagement metrics",
    ],
    architecture: [
      { layer: "Research", detail: "Identifying relevant subreddits, Quora topics, and community discussions." },
      { layer: "Content", detail: "Crafting helpful, value-driven answers and posts aligned with brand expertise." },
      { layer: "Engagement", detail: "Consistent participation and community relationship building." },
      { layer: "Tracking", detail: "Monitoring referral traffic, mentions, and engagement metrics." },
    ],
    challenges: [
      { title: "Authenticity", detail: "Community platforms penalize promotional content — every contribution must add genuine value." },
      { title: "Consistency", detail: "Building authority requires regular, sustained engagement over time." },
      { title: "Attribution", detail: "Tracking which enquiries and traffic came directly from community efforts." },
    ],
    results: [
      "International patient enquiries received through Reddit engagement",
      "Brand mentions and authority built across relevant healthcare communities",
    ],
    stack: [
      "Reddit",
      "Quora",
      "Off-Page SEO",
      "Community Marketing",
      "Content Strategy",
      "Link Building",
    ],
    links: [],
    evidence: [
      {
        title: "International Patient Enquiry on Reddit",
        badge: "Reddit Lead",
        desc: "Foreign patient inquiry asking about surgical consultation in India following value-led advice on medical subreddits.",
        src: "/screenshots/reddit-patient-msg.png",
      },
      {
        title: "Clinical Trust & Discussion Chat",
        badge: "Community Engagement",
        desc: "Authentic Reddit patient discussion thread leading directly to clinic appointment inquiries.",
        src: "/screenshots/reddit-chat.png",
      },
      {
        title: "Patient Consultation WhatsApp Message",
        badge: "Patient Conversion",
        desc: "Direct consultation booking received after patient discovered doctor credentials online.",
        src: "/screenshots/whatsapp-result-1.jpeg",
      },
    ],
    art: "post",
    tint: ["#9a3412", "#3b1fa8"],
    kind: "work",
    placeholder: false,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
