import type { NavItem } from "@/types/content";

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Skills", href: "/skills", wide: true },
  { label: "Experience", href: "/experience", wide: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
