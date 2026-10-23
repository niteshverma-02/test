import { BarChart2, BookMarked, Megaphone, Pencil, Search, Star } from "lucide-react";

/** What Tanu offers. Shown on /services and as story highlights on the home page. */
export const services = [
  {
    icon: Megaphone,
    short: "Social",
    title: "Social Media Management",
    description:
      "Building a consistent and strategic social media presence that reflects your brand, connects with your audience, and supports your business goals.",
    items: [
      "Platform-specific content planning",
      "Content calendars and publishing schedules",
      "Caption writing and creative coordination",
      "Content consistency and brand voice",
      "Performance monitoring and reporting",
    ],
  },
  {
    icon: Pencil,
    short: "Content",
    title: "Content Strategy & Creation",
    description:
      "Developing content ideas, creative concepts, captions, and content plans that align with your brand voice and audience interests.",
    items: [
      "Content pillar development",
      "Reels and short-form video concepts",
      "Hooks, scripts, and captions",
      "Educational, storytelling, and promotional content",
      "Content ideas aligned with audience needs",
    ],
  },
  {
    icon: Star,
    short: "Branding",
    title: "Personal Branding",
    description:
      "Helping founders, professionals, and business owners communicate their expertise, build credibility, and create a recognisable online identity.",
    items: [
      "Professional content direction",
      "LinkedIn and Instagram content planning",
      "Thought leadership and storytelling ideas",
      "Brand voice and messaging",
      "Content designed to communicate expertise",
    ],
  },
  {
    icon: BookMarked,
    short: "Campaigns",
    title: "Creative Campaign Support",
    description:
      "Translating brand objectives into clear messaging and visually engaging content that communicates the right story.",
    items: [
      "Campaign concepts and messaging",
      "Creative briefs and content coordination",
      "Audience-focused content angles",
      "Support for organic and paid campaign assets",
    ],
  },
  {
    icon: BarChart2,
    short: "Meta Ads",
    title: "Meta Ads & Campaign Support",
    description:
      "Supporting digital campaigns through creative planning, audience-focused messaging, and campaign coordination — based on the project scope.",
    items: [
      "Campaign concept and messaging",
      "Audience-focused creative planning",
      "Ad copy and visual direction",
      "Campaign coordination and monitoring",
    ],
  },
  {
    icon: Search,
    short: "SEO",
    title: "SEO & Online Visibility",
    description:
      "Exploring search intent, keyword opportunities, and content optimisation to help brands improve discoverability and build a stronger organic presence.",
    items: [
      "Keyword and search-intent research",
      "Content optimisation recommendations",
      "Topic and content opportunity research",
      "Support for improving organic discoverability",
    ],
  },
];
