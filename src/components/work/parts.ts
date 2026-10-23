import { Globe, LayoutDashboard, Server, Smartphone, type LucideIcon } from "lucide-react";
import type { PartKind } from "@/types/content";

/** Icon and short name for each layer of a product. */
export const partMeta: Record<PartKind, { icon: LucideIcon; name: string }> = {
  app: { icon: Smartphone, name: "App" },
  web: { icon: Globe, name: "Web" },
  admin: { icon: LayoutDashboard, name: "Admin" },
  api: { icon: Server, name: "API" },
};

export const partOrder: PartKind[] = ["app", "web", "admin", "api"];
