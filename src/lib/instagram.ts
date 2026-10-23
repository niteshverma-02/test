import type { LinkRef } from "@/types/content";

export type IgAccount = { label: string; handle: string; href: string };

/** "https://www.instagram.com/drjag_preet?igsh=…" → "drjag_preet". Null for anything that isn't an Instagram profile. */
export function igHandle(href: string): string | null {
  try {
    const url = new URL(href);
    if (!/(^|\.)instagram\.com$/.test(url.hostname)) return null;
    const handle = url.pathname.split("/").filter(Boolean)[0];
    return handle && /^[A-Za-z0-9._]+$/.test(handle) ? handle : null;
  } catch {
    return null;
  }
}

/** The Instagram profiles among a project's links, ready to embed. */
export function igAccounts(links: LinkRef[]): IgAccount[] {
  return links.flatMap((l) => {
    const handle = l.href ? igHandle(l.href) : null;
    return handle && l.href ? [{ label: l.label, handle, href: l.href }] : [];
  });
}
