import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Keep the name under 80 characters."),
  email: z.email("Please enter a valid email address.").max(120),
  topic: z.enum(["web", "mobile", "backend", "analytics", "other"], "Pick the closest topic."),
  message: z
    .string()
    .trim()
    .min(20, "A little more detail helps — at least 20 characters.")
    .max(4000, "Please keep it under 4,000 characters."),
  /** Honeypot. Real people never see or fill this field. */
  // Any value is accepted here; the API then silently drops the message (see route.ts).
  company: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

// The keys are kept from the original form so the API contract doesn't change; only the labels are hers.
export const topicLabels: Record<ContactInput["topic"], string> = {
  web: "Healthcare & Local SEO",
  mobile: "AEO & AI Search",
  backend: "Website Audit & Strategy",
  analytics: "Off-Page, Reddit & Quora",
  other: "Something else",
};
