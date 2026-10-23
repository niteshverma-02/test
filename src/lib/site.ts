import { profile } from "@/content/profile";

/** Set NEXT_PUBLIC_SITE_URL once the real domain is known (enables canonical URLs + sitemap). */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null;

export const metadataBase = new URL(siteUrl ?? "http://localhost:3000");

export const siteName = `${profile.identity.name} — ${profile.role}`;

export const siteDescription = profile.description;

/**
 * The contact form only claims to send when one of these is configured:
 *   RESEND_API_KEY + CONTACT_TO_EMAIL (+ optional CONTACT_FROM_EMAIL)
 *   CONTACT_WEBHOOK_URL (any endpoint that accepts a JSON POST)
 */
export function contactDelivery(): "resend" | "webhook" | null {
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) return "resend";
  if (process.env.CONTACT_WEBHOOK_URL) return "webhook";
  return null;
}
