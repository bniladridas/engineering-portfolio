# Changelog

## 2026-08-07

### Site

- Redrawn all 11 article diagrams to an editorial scale: 600px canvas matching
  the prose column, 15-16px labels, muted palette, no title bars or footer
  takeaway lines, and arrowheads/curves on absolute coordinates.
- Diagram captions now explain why each figure matters rather than restating
  what it shows.
- Removed the bordered look around diagram figures in articles.
- Replaced dead `palmshed.dev` links in the featured cards with the live
  GitHub Pages URLs.
- Added lightweight CI: `ci.yml` (typecheck, content validation, build),
  `links.yml` (weekly link check of the live site), `accessibility.yml`
  (weekly Lighthouse audit), and `dependabot.yml` (npm + GitHub Actions).
- Content validation now rejects em dashes anywhere in the docs.

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
