import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { siteDescription, siteName } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: profile.identity.initials,
    description: siteDescription,
    start_url: "/",
    display: "browser",
    background_color: "#0d0d0c",
    theme_color: "#0d0d0c",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
