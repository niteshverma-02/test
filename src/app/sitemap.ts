import type { MetadataRoute } from "next";
import { navigation } from "@/content/navigation";
import { projects } from "@/content/projects";
import { metadataBase } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = metadataBase.origin;
  return [
    ...navigation.map((n) => ({ url: `${base}${n.href === "/" ? "" : n.href}`, priority: n.href === "/" ? 1 : 0.8 })),
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}`, priority: 0.6 })),
  ];
}
