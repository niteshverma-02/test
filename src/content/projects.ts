import type { Project, ProjectCategory } from "@/types/content";

export const categoryLabels: Record<ProjectCategory, string> = {
  web: "Social Media",
  ecommerce: "E-commerce",
  mobile: "Mobile",
  backend: "Backend",
  analytics: "Analytics",
  release: "Campaign",
  pos: "Healthcare",
  ai: "Personal Brand",
};

/**
 * Tanu Rai's social media & content projects.
 * Client Instagram profiles are listed for reference.
 * Performance data shown only when verified.
 */
export const projects: Project[] = [
  // ——— Healthcare & Professional Branding ———
  {
    slug: "healthcare-doctors",
    hook: "Doctors don’t need more posts. They need patients who trust them.",
    name: "Healthcare & Doctor Branding",
    category: "pos",
    year: "2024–2025",
    summary: "Managing social presence for multiple healthcare professionals across specialties.",
    problem:
      "Healthcare professionals struggle to communicate their expertise online in a way that feels approachable, trustworthy, and relevant to patients.",
    role: "Social Media Manager & Content Strategist",
    contributions: [
      "Educational and awareness-based content planning",
      "Reel concepts, hooks, and caption writing",
      "Content calendar creation and management",
      "Brand consistency across Instagram profiles",
      "Audience-focused health content aligned to each specialty",
    ],
    architecture: [
      { layer: "Strategy", detail: "Audience research, content pillars, and messaging framework." },
      { layer: "Content", detail: "Reels, carousels, and story scripts tailored to each doctor's specialty." },
      { layer: "Consistency", detail: "Weekly content calendars ensuring regular, purposeful posting." },
      { layer: "Review", detail: "Performance monitoring and content direction adjustments." },
    ],
    challenges: [
      { title: "Medical accuracy", detail: "Content must be accurate, clear, and not misleading." },
      { title: "Approachability", detail: "Making complex medical information accessible to a general audience." },
      { title: "Multiple specialties", detail: "Each doctor has a unique audience and communication need." },
    ],
    results: [],
    stack: [
      "Instagram",
      "Content Strategy",
      "Caption Writing",
      "Reel Concepts",
      "Educational Content",
      "Canva",
      "Meta Business Suite",
    ],
    links: [
      { label: "Dr. Jagpreet", href: "https://www.instagram.com/drjag_preet?igsh=MW1jZXZxcW9ubjN6bQ==" },
      { label: "Mindnest Life", href: "https://www.instagram.com/mindnestlife?igsh=NXh3a3Vid2pia2Ey&utm_source=qr" },
      { label: "Dr. Prakhar", href: "https://www.instagram.com/drprakhar_healthbytes?igsh=aHUyaTI4bmNkbGlo" },
      { label: "Dr. Mayank Sharma", href: "https://www.instagram.com/dr.mayanksharma_orthoscope?igsh=dXpxODY3bjFrcGx6" },
      { label: "Ligament Surgeon", href: "https://www.instagram.com/ligamentsurgeon_?igsh=MWozZXpnY2ViaHp4bg==" },
      { label: "Gut & Liver Surgeon", href: "https://www.instagram.com/thegut_and_liver_surgeon?igsh=MTZsdHNvZTFhbDQ1cA==" },
      { label: "Dr. Tanvi Gugale (LinkedIn)", href: "https://www.linkedin.com/in/dr-tanvi-gugale?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
      { label: "Dr. Siddhanth Dahale", href: "https://www.instagram.com/drsiddhantdahale_hormonehealth?igsh=dGY3bXA5NDA4Zmkz" },
      { label: "Dr. Ameesha Homoeopathy", href: "https://www.instagram.com/dr.ameesha_homoeopathy/" },
    ],
    art: "profile",
    tint: ["#ff6b9d", "#c084fc"],
    kind: "work",
    placeholder: false,
  },
  // ——— E-commerce & Consumer Brands ———
  {
    slug: "ecommerce-consumer",
    hook: "Content that makes people stop, save — and shop.",
    name: "E-commerce & Lifestyle Brands",
    category: "ecommerce",
    year: "2024–2025",
    summary: "Content strategy and social media for consumer-focused lifestyle and interior brands.",
    problem:
      "Consumer brands need content that balances product promotion with storytelling — standing out in a crowded feed while driving discovery.",
    role: "Social Media Manager & Content Creator",
    contributions: [
      "Audience interest and shopping behaviour research",
      "Educational, promotional, and engagement content planning",
      "Product value communication through storytelling",
      "Platform-specific content (Instagram, Facebook)",
      "Content suited to target market preferences",
    ],
    architecture: [
      { layer: "Research", detail: "Audience behaviour, trending content, and competitor positioning." },
      { layer: "Planning", detail: "Monthly content calendars with theme-based content pillars." },
      { layer: "Creation", detail: "Reels, carousels, captions, and story content." },
      { layer: "Evaluate", detail: "Engagement tracking and content iteration." },
    ],
    challenges: [
      { title: "Standing out", detail: "Creating content that earns attention in competitive niches." },
      { title: "Product + story balance", detail: "Content that sells without feeling like an ad." },
      { title: "Consistency at scale", detail: "Maintaining quality across multiple content pieces weekly." },
    ],
    results: [],
    stack: [
      "Instagram",
      "Facebook",
      "Content Strategy",
      "Product Storytelling",
      "Canva",
      "Caption Writing",
      "Reel Concepts",
    ],
    links: [
      { label: "Space Styling", href: "https://www.instagram.com/_.spacestyling._?igsh=MTE1MG82aGZ6ZWZubA%3D%3D" },
      { label: "Aura by Anamika", href: "https://www.instagram.com/aurabyanamikaofficial?igsh=aG1lbGxnZTYyY3Rv" },
      { label: "The Grand Preesha Resort", href: "https://www.instagram.com/thegrandpreesharesortbpl?igsh=MXV2aXlkY2V0aG9naQ==" },
      { label: "Shubhdhara Bhopal", href: "https://www.instagram.com/shubhdhara.bhopal?igsh=dWR3eXBuZTM2YW1u&utm_source=qr" },
      { label: "Darpan Mirrors", href: "https://www.instagram.com/darpan_mirrors?mdxt=bnhzeXR3OXhzMzg1" },
      { label: "Mission of Happiness", href: "https://www.instagram.com/missionofhappiness?obrf=MXFjMXVmcXlxZWZjYQ%3D%3D&utm_source=qr" },
    ],
    art: "reel",
    tint: ["#ffb347", "#ff6b9d"],
    kind: "work",
    placeholder: false,
  },
  // ——— Marketing & SEO Industry Content ———
  {
    slug: "marketing-seo-content",
    hook: "Making SEO make sense, one carousel at a time.",
    name: "Marketing & SEO Industry Content",
    category: "web",
    year: "2024",
    summary: "Educational content creation for marketing and SEO professionals and audiences.",
    problem:
      "Marketing industry content often feels either too technical for general audiences or too generic for professionals — finding the right voice matters.",
    role: "Content Creator & Social Media Strategist",
    contributions: [
      "Content ideas around search trends and industry updates",
      "Simplifying technical topics for social media audiences",
      "Hook and caption writing for professional platforms",
      "Consistent content direction and brand voice",
      "LinkedIn and Instagram content planning",
    ],
    architecture: [
      { layer: "Research", detail: "Search intent, trends, and audience knowledge gaps." },
      { layer: "Strategy", detail: "Content pillars: education, insights, and behind-the-scenes." },
      { layer: "Content", detail: "Reels, carousels, and thought-leadership posts." },
      { layer: "SEO", detail: "Search-optimised captions, hashtag research, and keyword alignment." },
    ],
    challenges: [
      { title: "Audience level", detail: "Calibrating content for both beginners and professionals." },
      { title: "Credibility", detail: "Building authority through accurate, well-researched content." },
      { title: "Platform differences", detail: "LinkedIn tone vs. Instagram creativity — balancing both." },
    ],
    results: [],
    stack: [
      "LinkedIn",
      "Instagram",
      "SEO",
      "Educational Content",
      "Thought Leadership",
      "Caption Writing",
      "Hashtag Strategy",
    ],
    links: [],
    art: "post",
    tint: ["#c084fc", "#ff6b9d"],
    kind: "personal",
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
