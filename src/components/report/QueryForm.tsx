"use client";

import { useRef, useState, type FormEvent } from "react";
import { z } from "zod";
import { contactSchema, topicLabels, type ContactInput } from "@/lib/contact-schema";
import { confetti } from "@/lib/confetti";
import { cn } from "@/lib/cn";

type Field = "name" | "email" | "topic" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; name: string } | { kind: "mailto" } | { kind: "error"; message: string };

function collect(form: HTMLFormElement) {
  const data = new FormData(form);
  return {
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    topic: String(data.get("topic") ?? ""),
    message: String(data.get("message") ?? ""),
    company: String(data.get("company") ?? ""),
  };
}

const field = "w-full border-b border-line bg-transparent py-3 text-[clamp(1.1rem,2vw,1.4rem)] outline-none transition-colors placeholder:text-subtle focus:border-ember aria-[invalid=true]:border-danger";

/**
 * The contact form as a search query: same Zod schema as the API. Without a
 * delivery backend it says so and hands the message to the visitor's email
 * app — it never fakes a send.
 */
export function QueryForm({ delivery, email }: { delivery: boolean; email: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = collect(form);
    // Honeypot filled (a bot): pretend it worked, send nothing.
    if (raw.company) {
      setStatus({ kind: "sent", name: raw.name || "there" });
      return;
    }
    const result = contactSchema.safeParse(raw);
    if (!result.success) {
      const fe = z.flattenError(result.error).fieldErrors as Record<string, string[] | undefined>;
      const next: Errors = {};
      (["name", "email", "topic", "message"] as Field[]).forEach((f) => {
        if (fe[f]?.[0]) next[f] = fe[f]![0];
      });
      setErrors(next);
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    setErrors({});
    const values: ContactInput = result.data;

    if (!delivery) {
      const subject = `${topicLabels[values.topic]} — from ${values.name}`;
      const body = `${values.message}\n\n— ${values.name} (${values.email})`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: "mailto" });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const json = (await res.json().catch(() => ({}))) as { fieldErrors?: Errors };
      if (res.ok) {
        const r = form.querySelector("button[type=submit]")?.getBoundingClientRect();
        if (r) confetti({ x: r.left + r.width / 2, y: r.top, count: 120 });
        form.reset();
        setStatus({ kind: "sent", name: values.name });
      } else if (res.status === 422 && json.fieldErrors) {
        setErrors(json.fieldErrors);
        setStatus({ kind: "idle" });
      } else if (res.status === 429) {
        setStatus({ kind: "error", message: "Too many messages — please try again in a few minutes." });
      } else {
        setStatus({ kind: "error", message: "Couldn't send. Nothing was delivered — please email me directly." });
      }
    } catch {
      setStatus({ kind: "error", message: "Network error — nothing was sent. Please email me directly." });
    }
  };

  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${f}-error`} role="alert" className="label mt-2 text-[10px] text-danger">
        ✕ {errors[f]}
      </p>
    ) : null;
  const a11y = (f: Field) => ({ "aria-invalid": errors[f] ? true : undefined, "aria-describedby": errors[f] ? `${f}-error` : undefined });

  if (status.kind === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-surface/70 p-8 backdrop-blur">
        <p className="label text-[10px] text-muted">Query received · 200 OK</p>
        {/* Focused on arrival so keyboard and screen-reader users land on the confirmation. */}
        <p ref={(el) => el?.focus()} tabIndex={-1} role="status" className="poster mt-4 text-[clamp(2.4rem,5vw,4rem)] outline-none">
          Thanks, {status.name.split(" ")[0]}. <span className="text-ember">Indexed.</span>
        </p>
        <p className="mt-3 text-muted">I&rsquo;ll read it and reply to your email.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative overflow-hidden rounded-2xl border border-line bg-surface/70 backdrop-blur">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="label text-[10px]">New query</p>
        <p className="label flex items-center gap-2 text-[10px] text-muted">
          <span aria-hidden className="blink size-1.5 bg-ember" /> {delivery ? "Sends directly" : "Opens your email app"}
        </p>
      </div>

      <div className="grid gap-8 p-5 sm:p-8">
        <fieldset>
          <legend className="label text-[10px] text-muted">01 — What should we look at?</legend>
          <div className="mt-3 flex flex-wrap gap-2" onChange={() => errors.topic && setErrors((p) => ({ ...p, topic: undefined }))}>
            {(Object.keys(topicLabels) as ContactInput["topic"][]).map((t) => (
              <label key={t} className="label cursor-pointer rounded-full border border-line px-4 py-2 text-[10px] transition-colors hover:border-fg has-[:checked]:border-fg has-[:checked]:bg-fg has-[:checked]:text-bg has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent">
                <input type="radio" name="topic" value={t} className="sr-only" {...a11y("topic")} />
                {topicLabels[t]}
              </label>
            ))}
          </div>
          {err("topic")}
        </fieldset>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="label text-[10px] text-muted">
              02 — Your name
            </label>
            <input id="name" name="name" autoComplete="name" placeholder="Dr. Jane Doe" className={field} {...a11y("name")} />
            {err("name")}
          </div>
          <div>
            <label htmlFor="email" className="label text-[10px] text-muted">
              03 — Email
            </label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="you@clinic.com" className={field} {...a11y("email")} />
            {err("email")}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="label text-[10px] text-muted">
            04 — Your query
          </label>
          <textarea id="message" name="message" rows={5} placeholder="My clinic doesn't show up when patients search for…" className={cn(field, "resize-y")} {...a11y("message")} />
          {err("message")}
        </div>

        {/* Honeypot: hidden from people, tempting to bots. */}
        <div aria-hidden className="absolute -left-[9999px]">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="submit"
            disabled={status.kind === "sending"}
            className="group label relative inline-flex h-14 items-center gap-4 overflow-hidden rounded-xl bg-fg px-7 text-[12px] text-bg disabled:opacity-60"
          >
            <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-ember transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-y-100" />
            <span className="relative">{status.kind === "sending" ? "Running query…" : "Run query"}</span>
            <span aria-hidden className="relative font-mono">↵</span>
          </button>
          {(status.kind === "mailto" || status.kind === "error") && (
            <p role="status" className={cn("text-[14px]", status.kind === "error" ? "font-medium text-danger" : "text-muted")}>
              {status.kind === "mailto" ? "Your email app should be open now." : status.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
