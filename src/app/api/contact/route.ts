import { z } from "zod";
import { contactSchema, topicLabels } from "@/lib/contact-schema";
import { contactDelivery } from "@/lib/site";

/*
 * POST /api/contact
 * Delivers only when a provider is configured (see README):
 *   RESEND_API_KEY + CONTACT_TO_EMAIL [+ CONTACT_FROM_EMAIL]
 *   or CONTACT_WEBHOOK_URL
 * Otherwise answers 503 so the client never reports a fake success.
 */

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
// Best-effort, per-instance limiter. Use a shared store (e.g. Redis) behind a load balancer.
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

export async function POST(request: Request) {
  const delivery = contactDelivery();
  if (!delivery) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    const firstErrors = Object.fromEntries(Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0]]));
    return Response.json({ ok: false, error: "invalid", fieldErrors: firstErrors }, { status: 422 });
  }

  const { name, email, topic, message, company } = parsed.data;
  // Honeypot filled: accept silently, deliver nothing.
  if (company) return Response.json({ ok: true });

  const subject = `Portfolio enquiry — ${topicLabels[topic]} — ${name}`;
  const text = `${message}\n\nFrom: ${name} <${email}>\nTopic: ${topicLabels[topic]}`;

  try {
    const res =
      delivery === "resend"
        ? await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
              to: [process.env.CONTACT_TO_EMAIL],
              reply_to: email,
              subject,
              text,
            }),
          })
        : await fetch(process.env.CONTACT_WEBHOOK_URL as string, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, topic, message, subject, text }),
          });

    if (!res.ok) {
      console.error("[contact] delivery failed", delivery, res.status);
      return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("[contact] delivery error", error);
    return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
