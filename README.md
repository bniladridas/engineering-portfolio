# Engineering Portfolio

A version-controlled content library **and** a Next.js site for my public engineering presence: long-form articles, LinkedIn posts, portfolio cards, profile copy, design assets, and image prompts. All in one reusable source of truth.

Everything here is production content, not placeholders. When a new article or asset is ready to publish, you pick the next completed piece instead of starting from scratch.

## What's inside

```
engineering-portfolio/
├── README.md              # this file: how the library works
├── package.json           # scripts for dev, build, validation, and stats
├── app/                   # Next.js site (App Router)
│   ├── page.tsx           # home
│   ├── articles/          # article index + detail
│   ├── posts/             # LinkedIn post index + detail
│   ├── featured/          # portfolio cards
│   ├── open-source/       # open source page
│   ├── now/               # now page
│   ├── about/             # profile rendered from docs/profile/
│   ├── search/            # client-side search
│   ├── search-index.json/ # build-time search index
│   ├── sitemap.ts         # XML sitemap
│   └── feed.xml/          # RSS feed
├── components/            # header, cards, markdown, TOC, prev/next, …
├── public/                # og.png (generated) + copied diagrams/favicon
├── lib/                   # content + search + reading utilities
├── docs/
│   ├── articles/          # 10 long-form engineering articles
│   ├── linkedin/          # 20 LinkedIn posts
│   ├── featured/          # 10 portfolio cards
│   ├── profile/           # complete profile rewrite
│   └── now.md             # "what I'm doing now" page content
├── assets/
│   ├── cards/             # SVG card templates
│   ├── icons/             # reusable SVG icons
│   ├── logos/             # Palmshed brand assets
│   └── diagrams/          # SVG diagrams embedded in articles
├── prompts/               # image generation prompts
├── design-system/         # colors, typography, spacing, components, cards
├── templates/             # ready-to-fill templates for new content
└── scripts/               # validate, stats, copy-assets, generate-og
```

## Voice

Short sentences. Concrete and specific. No filler. First person, but humble. Claims are demonstrated, not asserted. Engineering honesty over marketing polish.

## Run the site

```bash
npm install
npm run dev       # local development (http://localhost:3000)
npm run build     # static export into out/
npx serve out     # preview the static export locally
```

## Deploy to GitHub Pages

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds the
static export and publishes it to GitHub Pages on every push to `main`.

The workflow sets two build-time env vars so the static export is path-aware:

- `NEXT_PUBLIC_BASE_PATH=/<repo>`: prefixes every internal link and asset URL (via `basePath` +
  `assetPrefix`), which is required because GitHub Pages serves project sites under
  `/engineering-portfolio/` rather than the domain root.
- `NEXT_PUBLIC_SITE_URL=https://<user>.github.io`: origin used for canonical URLs, sitemap, RSS,
  and Open Graph.

One-time setup (repo settings → Pages):

1. Set **Source** to **GitHub Actions**.
2. Push to `main`: the workflow builds `out/` and deploys it.
3. If this repo is private, GitHub Pages requires a paid plan; make the repo public (or upgrade)
   for the deployment to succeed.

Custom domain (optional):

- When the site moves to a real domain (e.g. `notes.palmshed.dev`), add a `CNAME` file at the repo
  root containing the domain, point the DNS record at GitHub Pages, and drop the two env vars from
  the workflow (or set `NEXT_PUBLIC_BASE_PATH=` empty). The codebase defaults to domain-root URLs,
  so no code changes are needed. The switch is a single environment variable.
- Until then, no `CNAME` is needed. The site lives at `https://<user>.github.io/engineering-portfolio/`.

`404.html` is generated automatically by the static export.

## Content workflow

Content lives in `docs/` and is read at build time. To publish:

1. Add an article: copy `templates/article.md` into `docs/articles/`, fill it in, and add a matching post in `docs/linkedin/`.
2. Diagrams: drop an SVG into `assets/diagrams/`, then reference it in the article as `![caption](/diagrams/name.svg)`.
3. `npm run build`: the site regenerates automatically.

## Utilities

```bash
npm run validate     # checks structure, front matter, and sections
npm run stats        # content inventory and word counts
npm run typecheck    # TypeScript check
```

## Before you publish: checklist

- **Real URLs:** article `references:` point at the real repos under `github.com/palmshed` (the `kit` CLI and the `auth` platform) via `site.github` in `lib/site.ts`. Verify links on the live site after deployment.
- **Site URL:** set `NEXT_PUBLIC_SITE_URL` (used for canonical URLs, sitemap, RSS, OG images). When
  deploying at a sub-path, also set `NEXT_PUBLIC_BASE_PATH` so all links and assets are prefixed.
- **Open Graph:** `scripts/generate-og.mjs` renders `public/og.png` at build time; verify the social card after deployment.
- **Accessibility:** run an axe scan and a Lighthouse pass before linking from LinkedIn.

## Status

- [x] Articles: 11 (each with diagrams, references, and concrete examples)
- [x] LinkedIn posts: 21
- [x] Portfolio cards: 11
- [x] Architecture notes: 8
- [x] Profile: complete
- [x] Design system: documented
- [x] Assets: SVG cards, icons, logo, diagrams
- [x] Prompts: image prompt library
- [x] Site: Next.js, static export, search, RSS, sitemap, JSON-LD
