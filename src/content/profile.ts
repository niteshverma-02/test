import type { LinkRef } from "@/types/content";

/**
 * Everything personal lives here. Keep copy short — one idea per line.
 * Links with `href: null` are simply hidden until you add them.
 */
export const profile = {
  identity: {
    name: "Tanu Rai",
    firstName: "Tanu",
    initials: "TR",
    /** Shown as the @handle on the home profile card. */
    handle: "tanu.rai",
  },
  role: "Social Media Manager & Content Creator",
  tagline: "Turns content into meaningful growth.",
  /** The hero cycles through these in place of "growth". */
  taglineWords: ["growth", "reach", "visibility", "impact"],
  description:
    "Social Media Manager and Content Creator helping businesses build a strong digital presence through strategic content, storytelling, and brand communication.",

  availability: {
    open: true,
    label: "Available for new projects",
  },
  focus: "Social media strategy & content creation",
  location: {
    label: "India",
    timezone: "Asia/Kolkata",
    zoneLabel: "IST",
  },

  contact: {
    email: "contact.tanurai04@gmail.com",
  },

  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tanu-rai-/" },
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
    lede: "I help brands find their voice, communicate their value, and grow their digital presence.",
    quote:
      "Good marketing is more than showing up online. It's about showing up with the right message, for the right audience, at the right time.",
    story: [
      "My journey into digital marketing started with a curiosity about how brands communicate online — and why certain content connects with people while other content gets overlooked.",
      "That curiosity led me to explore social media management, content creation, digital branding, and audience behaviour. Through professional training, internships, and hands-on client projects, I've developed an understanding of how content, consistency, creativity, and strategy work together.",
      "Today, I work on developing content strategies, managing social media communication, creating platform-specific content, and helping businesses present themselves more effectively online.",
    ],
    bring: [
      { title: "A strategy-led mindset", text: "I look beyond individual posts — your audience, positioning, message, and goals." },
      { title: "Creative thinking", text: "Turning ideas into content that feels relevant, communicates clearly, and earns engagement." },
      { title: "Audience understanding", text: "Content works better when it reflects what people care about and what they want to learn." },
      { title: "A learning mindset", text: "Digital marketing evolves constantly. I explore new formats, platform behaviour, and search trends." },
    ],
    principles: [
      { title: "Strategy first", text: "Understanding the business behind the brand before creating anything." },
      { title: "Creativity with purpose", text: "Every post, caption, and reel serves a clear goal." },
      { title: "Growth through consistency", text: "Showing up repeatedly with the right message builds trust." },
    ],
    interests: [
      "Content Strategy",
      "Social Media Management",
      "Personal Branding",
      "SEO & Discoverability",
      "Meta Ads",
      "Brand Communication",
    ],
    hobbies: [
      "Creative writing",
      "Storytelling",
      "Photography",
      "Exploring trends",
      "Meaningful conversations",
      "Finding everyday inspiration",
    ],
    funFacts: [
      { emoji: "✍️", text: "Caption perfectionist", detail: "Every word in a caption is chosen with intent." },
      { emoji: "📊", text: "Data-driven", detail: "I let insights guide creative decisions." },
      { emoji: "🎨", text: "Visual thinker", detail: "Good design and good copy go hand in hand." },
      { emoji: "🔍", text: "Always researching", detail: "Audience behaviour fascinates me endlessly." },
      { emoji: "📱", text: "Platform native", detail: "I live on social media — studying what works." },
      { emoji: "🌱", text: "Lifelong learner", detail: "Digital marketing evolves, and so do I." },
    ],
    journey: [
      { when: "2021", title: "Curiosity sparked", text: "Started exploring how brands communicate online and why some content connects deeply." },
      { when: "2022", title: "Formal training begins", text: "Professional training in digital marketing, content creation, and social media strategy." },
      { when: "2023", title: "First client projects", text: "Hands-on work with healthcare brands, building educational content strategies." },
      { when: "2024", title: "Expanded portfolio", text: "Worked across e-commerce, personal branding, and marketing industry content." },
      { when: "2025", title: "Strategy + execution", text: "Managing full social media cycles — from strategy to content to performance review." },
      { when: "Now", title: "Building meaningful brands", text: "Helping businesses turn their online presence into something intentional and memorable." },
    ],
  },
};

export type ProfileConfig = typeof profile;
