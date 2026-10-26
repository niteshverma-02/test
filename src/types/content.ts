/** `href: null` means "not set yet" — the link is hidden. */
export interface LinkRef {
  label: string;
  href: string | null;
}

export type ProjectCategory = "web" | "ecommerce" | "mobile" | "backend" | "analytics" | "release" | "pos" | "ai";

/** Which illustration to draw when a project has no screenshot. */
export type ArtKind = "profile" | "reel" | "post" | "insights";

/** One piece of a product: the app, the website, the admin panel or the API. */
export type PartKind = "app" | "web" | "admin" | "api";
export interface ProjectPart {
  kind: PartKind;
  label: string;
  stack: string;
}

export type ProjectMedia =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | { kind: "video"; src: string; poster?: string; alt: string };

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  year: string;
  /** One short line. */
  summary: string;
  problem: string;
  role: string;
  contributions: string[];
  architecture: { layer: string; detail: string }[];
  challenges: { title: string; detail: string }[];
  /** Verified outcomes only. Leave empty rather than estimate. */
  results: string[];
  stack: string[];
  links: LinkRef[];
  /** Real screenshot or video. When absent, an illustration is drawn. */
  media?: ProjectMedia;
  /** Real proof and results screenshots from Search Console, AI Overviews, etc. */
  evidence?: { title: string; badge: string; desc: string; src: string }[];
  /** One-line hook shown on the home page's case-study reels. */
  hook?: string;
  /** The single headline number for the case-study card. Verified figures only. */
  highlight?: { value: string; label: string };
  art: ArtKind;
  /** Gradient used behind the project's artwork. */
  tint: [string, string];
  /** Professional work for an employer, or a personal project. */
  kind: "work" | "personal";
  org?: string;
  /** True while the entry is sample content that must be replaced. */
  placeholder: boolean;
  /** What was built, layer by layer (app / web / admin / API). */
  parts?: ProjectPart[];
  /** Product mark shown beside the name. */
  logo?: { src: string; alt: string };
}

export interface Tech {
  name: string;
  note: string;
}

export interface TechGroup {
  label: string;
  /** One-line definition, used where categories are easy to confuse. */
  definition?: string;
  items: Tech[];
}

export interface Layer {
  id: "interface" | "mobile" | "services" | "release" | "signal" | "data";
  code: string;
  name: string;
  title: string;
  summary: string;
  groups: TechGroup[];
}

export interface ExperienceEntry {
  period: string;
  role: string;
  org: string;
  location?: string;
  summary: string;
  highlights: string[];
  stack: string[];
  /** Period / title still to confirm. */
  placeholder: boolean;
  current?: boolean;
}

export interface EducationEntry {
  level: string;
  field: string;
  institution: string;
  board: string;
  year: string;
  /** Only rendered when `showEducationScores` is true. */
  score?: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** Only shown in the desktop bar on extra-wide screens (always in menus). */
  wide?: boolean;
}
