# Decap CMS setup

This site's entire admin (`/admin`) is [Decap CMS](https://decapcms.org), a git-backed CMS: every save creates a commit in this repo. It does not eliminate git — it automates it. There's nothing to install for the CMS itself (it's a CDN script at `public/admin/index.html`); the two things below are what make login actually work.

## 1. Test it locally first (no GitHub App needed)

`public/admin/config.yml` has `local_backend: true`, which lets Decap talk to a small local proxy instead of GitHub. This writes straight to your working tree, so you can try out every collection before touching GitHub at all.

```bash
npm run cms      # terminal 1 — leave running
npm run dev      # terminal 2
```

Open `http://localhost:3000/admin` — Decap will detect the local proxy automatically and skip login entirely.

## 2. Production: create a GitHub OAuth App

Decap's `github` backend needs a GitHub OAuth App so editors can log in with their GitHub account. This repo already includes the OAuth handshake code (`src/app/api/decap/auth`, `src/app/api/decap/callback`) — you just need to register the app and set two env vars.

1. Go to **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App** (`https://github.com/settings/developers`).
2. Fill in:
   - **Homepage URL**: your deployed site's URL (e.g. `https://yourdomain.com`)
   - **Authorization callback URL**: `https://yourdomain.com/api/decap/callback` — must match exactly, including scheme.
3. Create the app, then generate a **Client Secret**.
4. On your hosting provider (Vercel, Netlify, etc.), set:
   - `GITHUB_OAUTH_CLIENT_ID`
   - `GITHUB_OAUTH_CLIENT_SECRET`
5. In `public/admin/config.yml`, set `backend.base_url` to that same deployed URL (it currently has a placeholder — replace it).
6. Make sure the GitHub account you log in with has write access to `khanofseo42-code/implant-cost-calculator` (or update `backend.repo` if the repo moves).

Once deployed, visiting `/admin` will show a "Login with GitHub" button, redirect to GitHub, and land back in the CMS.

## 3. What happens after you save an entry

Decap commits the change directly to the `main` branch of this repo via the GitHub API. If your host (Vercel/Netlify/etc.) auto-deploys on push to `main`, the live site updates automatically within a minute or two — no manual `git push` required, which is the whole point. There's no live "instant" edit though: content only changes on the *running* site after that deploy completes.

## 4. Two things worth knowing about the Pricing Data collection

- **Treatments and Procedures rows can't be added or deleted** (`allow_add: false`). Their `id` fields are hardcoded throughout the calculator's step logic, so the *set* of treatments/procedures is fixed — you can freely edit every other field (price, name, description, duration, etc.), just not add a 9th treatment or delete one of the 8.
- **Countries, Cities, Brands, Insurance, Finance, and Campaigns** have no such restriction — the calculator reads these dynamically, so add/edit/delete freely.

## 5. What's in the CMS vs. what isn't

Covered: header, footer, global SEO/head scripts, homepage hero/how-it-works/feature-cards/FAQ/CTA, the calculator page's meta + disclaimer banner, all pricing/campaigns/finance/insurance data, and the full blog.

Not covered (left as code, deliberately): the internal 7-step calculator wizard's UI chrome (button labels like "Continue", per-step field validation copy) — that's tightly coupled application logic, not marketing content, and rewiring it into free-text CMS fields would risk breaking a validated flow for very little editorial benefit. The *data* those steps display (treatment names, brand names, pricing) is already CMS-editable via the Pricing Data collection above. Also not covered: About/Contact/Privacy/Terms/Disclaimer pages, which stayed as plain static pages since they weren't part of the original content-collection list — say the word if you'd like those moved into Decap too.
