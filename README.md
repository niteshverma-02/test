# Tanu Rai — Portfolio

Social-media-styled portfolio (Instagram gradient, story rings, reels, double-tap likes) built with Next.js 16 (App Router, Cache Components), Tailwind CSS 4, GSAP + ScrollTrigger, Lenis and Motion. Light and dark mode, fully responsive.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Instagram-style profile hero with tappable service stories, hashtag ticker, case studies as Reels, feed grid with tabs, process carousel, DM-style contact |
| `/work` | All projects with filter chips (Professional / Personal / Mobile / Web …) |
| `/work/[slug]` | Project page: problem, role, how it's built, challenges, links |
| `/skills` | Skill cards per area + "How I work" steps |
| `/experience` | Timeline of roles + education |
| `/about` | Photo, intro, quote, principles, interests |
| `/contact` | Email, location, links and a validated contact form |

## Editing content

All content is data in `src/content/` — no component changes needed.

| File | What's in it |
| --- | --- |
| `profile.ts` | Name, tagline, email, links, resume, photo, about copy |
| `projects.ts` | Work + personal projects. Screenshots live in `public/images/projects/`. Keep `results` to verified numbers only. |
| `experience.ts` | Roles, education (`showEducationScores` toggles marks) |
| `skills.ts` | Skill areas, tools |
| `process.ts` | "How I work" steps |

Keep copy short — one idea per line. Links with `href: null` are hidden automatically.

## Environment

Copy `.env.example` to `.env.local`.

- `NEXT_PUBLIC_SITE_URL` — the real domain (canonical URLs, sitemap, Open Graph).

### Contact form

Without a provider the form does **not** pretend to send — it opens the visitor's email app with the message filled in. To deliver directly, set one of:

1. **Resend** — `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, optional `CONTACT_FROM_EMAIL`.
2. **Webhook** — `CONTACT_WEBHOOK_URL` (any endpoint accepting a JSON POST).

Rebuild after changing these. `POST /api/contact` re-validates with Zod, has a honeypot and a simple per-instance rate limit.

## Notes

- Colour mode: `<html data-mode="light|dark">`, set before first paint from the visitor's choice or system setting. The toggle reveals the new theme in a circle from the button.
- Motion respects `prefers-reduced-motion`; content is visible without JavaScript.
- Work projects are internal products, described at a high level only — no internal URLs, IDs or data.
