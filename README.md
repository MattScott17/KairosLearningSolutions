# Kairos Learning Solutions

Marketing website for [Kairos Learning Solutions](https://www.kairoslearningsolutions.com) — a
tutoring, homeschool-support, and full-time-learning center in Salinas, CA.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**, and
deployed on **Vercel**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | What it does                                            |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | Start the dev server                                    |
| `npm run build`     | Production build                                        |
| `npm run start`     | Serve the production build                              |
| `npm run lint`      | ESLint (next/core-web-vitals)                           |
| `npm run typecheck` | TypeScript, no emit                                     |
| `npm run test:e2e`  | Playwright smoke tests (builds + starts the app itself) |

## Editing content

Almost all copy lives in two files — no component hunting required:

- **`lib/site.ts`** — business info: name, phone, email, address, hours, nav, social links.
- **`lib/content.ts`** — services, the APEX program, team roster, testimonials, and stats.

Change it there and it updates everywhere. Pages live in `app/<route>/page.tsx`; shared UI is in
`components/`.

## Pages

`/` · `/apex` · `/about` · `/services` (+ `/services/private-tutoring`, `/homework-club`,
`/homeschool-support`) · `/fall-classes` · `/summer` · `/testimonials` · `/contact`

## Contact form (email delivery)

The contact form posts to `app/api/contact/route.ts`, which sends email via
[Resend](https://resend.com). Until it's configured, the form fails gracefully and points visitors
to the phone/email buttons — nothing breaks.

To turn it on:

1. Create a free Resend account and API key, and verify your sending domain.
2. In **Vercel → Project → Settings → Environment Variables**, add:

   | Variable            | Example                                        |
   | ------------------- | ---------------------------------------------- |
   | `RESEND_API_KEY`    | `re_xxxxxxxx`                                  |
   | `CONTACT_TO_EMAIL`  | `jackie@kairoslearningsolutions.com`           |
   | `CONTACT_FROM_EMAIL`| `Kairos Website <hello@kairoslearningsolutions.com>` |

   Before your domain is verified, Resend allows `onboarding@resend.dev` as the `from` address.

See `.env.local.example` for local development.

## Deploying to Vercel

The Vercel project **`kairos-learning-solutions`** is already linked to this account.

```bash
# preview
npx vercel

# production
npx vercel --prod
```

Or connect the GitHub repo in the Vercel dashboard for automatic deploys on push. Point the
`kairoslearningsolutions.com` domain at the project in **Settings → Domains**.

## Brand

Palette is derived from the Kairos tree logo and defined in `tailwind.config.ts`:
deep olive `forest-800 #3d5310`, leaf `forest-500 #7cb342`, soft lime `forest-200`, warm
`cream #faf8f2`, and a `gold` accent for calls to action. Fonts: **Fraunces** (display) and
**Inter** (body).
