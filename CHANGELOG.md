# Changelog

## v1.0.0 · 2026-08-07

First stable release of the Palmshed engineering portfolio.

### Site

- Next.js 15 App Router, fully static export.
- Deployed to GitHub Pages via GitHub Actions on every push to `main`.
- Configurable `basePath` (`NEXT_PUBLIC_BASE_PATH`): serves the GitHub Pages
  project path today, and a custom domain root later, with no code changes.
- Client-side search over a build-time index, RSS feed, XML sitemap, JSON-LD
  structured data, and a build-time generated Open Graph image (`og.png`).
- Generated `404.html` and accessible, responsive layout.

### Content

- 11 long-form articles, each with diagrams and references to the real
  Palmshed repositories (`kit`, `auth`).
- 8 architecture notes, 21 LinkedIn posts, 11 portfolio cards, and a full
  engineering profile.
- Naming follows org-vs-product convention: **Palmshed** is the organization
  and ecosystem; **kit** is the command-line developer tool.
