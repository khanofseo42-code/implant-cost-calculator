# ImplantIQ — Dental Implant Cost Calculator

A premium, production-grade dental implant cost estimator built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4. Users answer 7 quick questions and get a personalized, itemized cost estimate with financing, insurance, timeline, and long-term ownership cost — powered by a fully config-driven pricing engine.

## Features

- **Modular pricing engine** (`src/lib/pricing-engine`) — pure, typed, Zod-validated. Blends country/state/city cost multipliers, implant brand tiers, treatment base costs, add-on procedures, risk surcharges, insurance deduction, amortized financing, and discount campaigns. Nothing is hardcoded in components — all pricing lives in `src/config/pricing/*.json`.
- **7-step calculator** with autosave, undo history, and animated transitions.
- **Results page** with an animated cost breakdown, itemized line-item table, financing summary, recovery timeline, PDF export, email/print/share, and a save-and-compare view.
- **Admin panel** (`/admin`) — password-gated JSON/CSV editor for every pricing section (countries, cities, brands, treatments, procedures, insurance, finance, campaigns), backed by React Query.
- **SEO** — per-route metadata, JSON-LD (Organization, SoftwareApplication, MedicalWebPage, FAQPage, BreadcrumbList), dynamic OG image, sitemap, robots.txt.
- **Dark/light theme**, WCAG-conscious accessibility (focus rings, ARIA labels, keyboard navigation), and mobile-first responsive design.
- **Security** — Zod validation on every input and API route, signed admin session cookies (Web Crypto, edge-safe), in-memory rate limiting, stubbed lead-capture integrations (Mailchimp/HubSpot/GA/GTM/Clarity) that no-op until real API keys are supplied.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and set at least `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` to use the admin panel at `/admin`.

## Tech Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Recharts · React Hook Form · Zod · Zustand · TanStack React Query · jsPDF

## Project Structure

- `src/app` — routes (landing, calculator, results, compare, admin, API routes)
- `src/components` — UI primitives, calculator steps, results, landing sections, admin editor
- `src/lib/pricing-engine` — the cost calculation engine and types
- `src/config/pricing` — all pricing configuration (edit here or via `/admin`)

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint the project
