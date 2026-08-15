# Personal Site — Work in Progress

A minimal "work in progress" placeholder, built with Next.js (App Router)
and Tailwind CSS, exported as a fully static site for GitHub Pages.

The full portfolio (about/projects/blog/contact) was stripped down to a
single placeholder page while the site is being reworked. The Next.js
static-export setup, Tailwind config, and GitHub Actions deploy workflow
are all still in place, ready for pages to be added back.

## Stack

- **Next.js** (App Router) with `output: 'export'` — no server, no API routes
- **TypeScript**
- **Tailwind CSS**

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

To produce the static export locally (output goes to `out/`):

```bash
npm run build
```

## Deployment (GitHub Pages)

This repo deploys as a **user site** (`biplobgiri.github.io`), served at
the custom domain `biplobgiri.com.np` via `public/CNAME`.

`.github/workflows/deploy.yml` runs automatically on every push to `main`:
builds the static export (`npm run build`) and deploys the `out/` directory
to GitHub Pages via `actions/deploy-pages`.
