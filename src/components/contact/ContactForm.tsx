"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CheckCheck, Send, Smile } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import { contactSchema, topicLabels, type ContactInput } from "@/lib/contact-schema";
import { cn } from "@/lib/cn";
import { Avatar } from "./Avatar";
import { confetti } from "@/lib/confetti";

type Field = "name" | "email" | "topic" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; name: string; message: string } | { kind: "mailto" } | { kind: "error"; message: string };

const input = "min-w-0 flex-1 bg-transparent py-3 text-[16px] text-fg outline-none placeholder:text-subtle";
const cell =
  "flex min-w-0 flex-wrap items-center gap-x-3 px-5 transition-colors focus-within:bg-surface has-[[aria-invalid=true]]:bg-danger/5 has-[[aria-invalid=true]]:[&>label]:text-danger";

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

/**
 * Same Zod schema as the API. Without a delivery backend it says so and
 * hands the message to the visitor's email app — it never fakes a send.
 * Styled as the DM composer: topic quick replies, name/email header, message bar.
 */
export function ContactForm({ delivery, email }: { delivery: boolean; email: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const revalidate = (field: Field) => {
    if (!formRef.current || !errors[field]) return;
    const result = contactSchema.safeParse(collect(formRef.current));
    const issue = result.success ? undefined : result.error.issues.find((i) => i.path[0] === field)?.message;
    setErrors((prev) => ({ ...prev, [field]: issue }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const result = contactSchema.safeParse(collect(form));
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json().catch(() => ({}))) as { fieldErrors?: Errors };
      if (res.ok) {
        // Celebrate from the send button before the form is swapped out.
        const r = form.querySelector("button[type=submit]")?.getBoundingClientRect();
        if (r) confetti({ x: r.left + r.width / 2, y: r.top, count: 120 });
        form.reset();
        setStatus({ kind: "sent", name: values.name, message: values.message });
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

  const err = (f: Field, className?: string) =>
    errors[f] ? (
      <p id={`${f}-error`} role="alert" className={cn("w-full text-[13px] font-medium text-danger", className)}>
        {errors[f]}
      </p>
    ) : null;

  if (status.kind === "sent") {
    return (
      // min-h roughly matches the composer it replaces, so the page doesn't jump on send.
      <div className="mt-6 flex min-h-[19rem] flex-col justify-end gap-1.5 sm:min-h-[17rem]" aria-live="polite">
        <p className="sr-only">Message sent.</p>
        {/* Their own message lands on the right, gets "seen", then Tanu replies. */}
        <motion.p
          initial={{ opacity: 0, y: 24, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          style={{ transformOrigin: "100% 100%" }}
          className="ig-gradient line-clamp-6 max-w-[min(85%,26rem)] self-end whitespace-pre-line break-words rounded-[22px] rounded-br-md px-4 py-2.5 text-[15px] leading-snug text-white"
        >
          {status.message}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center gap-1 self-end text-[12px] text-muted"
        >
          <CheckCheck aria-hidden className="size-3.5 text-accent" /> Seen
        </motion.p>
        <Reply>Thanks, {status.name.split(" ")[0]}! I&rsquo;ll get back to you by email. 💌</Reply>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-6">
      <fieldset aria-describedby={errors.topic ? "topic-error" : undefined} className="sm:pl-9">
        <legend className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">Quick replies · pick a topic</legend>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(topicLabels) as ContactInput["topic"][]).map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="topic" value={t} className="peer sr-only" onChange={() => revalidate("topic")} />
              <span className="inline-flex h-10 items-center rounded-full border border-accent/35 bg-bg px-4 text-[14px] font-medium text-accent transition-[color,border-color,transform,background-color] duration-300 ease-[var(--ease-expo)] hover:-translate-y-0.5 hover:bg-surface active:scale-95 peer-checked:scale-105 peer-checked:border-transparent peer-checked:bg-(image:--ig) peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                {topicLabels[t]}
              </span>
            </label>
          ))}
        </div>
        {err("topic", "mt-2")}
      </fieldset>

      <div className="mt-6 overflow-hidden rounded-[26px] border border-line bg-bg transition-[border-color,box-shadow] duration-300 focus-within:border-accent/40 focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-accent)_12%,transparent)]">
        <div className="grid divide-y divide-line border-b border-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className={cell}>
            <label htmlFor="name" className="w-12 text-[13px] font-semibold text-muted">
              Name
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              className={input}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              onBlur={() => revalidate("name")}
            />
            {err("name", "-mt-1 pb-2.5")}
          </div>
          <div className={cell}>
            <label htmlFor="email" className="w-12 text-[13px] font-semibold text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@brand.com"
              className={input}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              onBlur={() => revalidate("email")}
            />
            {err("email", "-mt-1 pb-2.5")}
          </div>
        </div>

        <div className={cn(cell, "flex-nowrap items-end gap-x-2 py-2 pl-3 pr-2 focus-within:bg-transparent")}>
          <span aria-hidden className="mb-1 grid size-9 shrink-0 place-items-center rounded-full bg-surface-2 text-muted">
            <Smile className="size-[18px]" />
          </span>
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={2}
            placeholder="Message… tell me about your brand"
            className={cn(input, "max-h-[45vh] min-h-[4.25rem] resize-none py-2.5 leading-snug [field-sizing:content]")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            onBlur={() => revalidate("message")}
            data-lenis-prevent
          />
          <button
            type="submit"
            disabled={status.kind === "sending"}
            className="ig-gradient shine group mb-0.5 inline-flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-full px-3 text-[15px] font-semibold text-white transition-transform duration-500 ease-[var(--ease-apple)] hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.95] disabled:opacity-80 sm:px-5"
          >
            {status.kind === "sending" ? (
              <>
                <span className="sr-only sm:not-sr-only">Sending</span>
                <span aria-hidden className="hidden gap-1 sm:flex">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="typing-dot size-1.5 rounded-full bg-white" style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </span>
                {/* The plane takes off as the message leaves. */}
                <Send aria-hidden className="fly-off size-[18px]" />
              </>
            ) : (
              <>
                <span className="sr-only sm:not-sr-only">{delivery ? "Send" : "Send via email"}</span>
                {delivery ? (
                  <Send aria-hidden className="size-[18px] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:-rotate-12" />
                ) : (
                  <ArrowUpRight aria-hidden className="size-[18px]" />
                )}
              </>
            )}
          </button>
        </div>
      </div>
      {err("message", "mt-2 px-5")}
      {!delivery && <p className="mt-3 px-5 text-[12px] text-muted">Opens your email app with the message ready.</p>}

      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite">
        <AnimatePresence mode="wait">
          {(status.kind === "mailto" || status.kind === "error") && (
            <motion.p
              key={status.kind}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn("mt-3 px-5 text-[14px]", status.kind === "error" ? "font-medium text-danger" : "text-muted")}
            >
              {status.kind === "mailto" ? "Your email app should be open now." : status.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

/** Tanu "types" for a beat, then her reply bubble lands. */
function Reply({ children }: { children: ReactNode }) {
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    const id = window.setTimeout(() => setTyping(false), 2600);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="mt-3 flex items-end gap-2">
      <Avatar className="size-7 text-[10px]" />
      {typing ? (
        <motion.span
          aria-hidden
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 }}
          style={{ transformOrigin: "0% 100%" }}
          className="flex items-center gap-1 rounded-[22px] rounded-bl-md bg-surface-2 px-4 py-3.5"
        >
          {[0, 1, 2].map((d) => (
            <span key={d} className="typing-dot size-2 rounded-full bg-muted" style={{ animationDelay: `${d * 0.18}s` }} />
          ))}
        </motion.span>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 14, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          style={{ transformOrigin: "0% 100%" }}
          className="max-w-[min(85%,26rem)] rounded-[22px] rounded-bl-md bg-surface-2 px-4 py-2.5 text-[15px] leading-snug text-fg"
        >
          {children}
        </motion.p>
      )}
    </div>
  );
}
