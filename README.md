# Engineering Portfolio

A version-controlled content library **and** a Next.js site for my public engineering presence: long-form articles, LinkedIn posts, portfolio cards, profile copy, design assets, and image prompts — all in one reusable source of truth.

Everything here is production content, not placeholders. When a new article or asset is ready to publish, you pick the next completed piece instead of starting from scratch.

## What's inside

```
engineering-portfolio/
├── README.md              # this file — how the library works
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
│   ├── sitemap.ts         # XML sitemap
│   ├── feed.xml/          # RSS feed
│   └── opengraph-image.tsx
├── components/            # header, cards, markdown, TOC, prev/next, …
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
└── scripts/               # validate, stats, copy-assets
```

## Voice

Short sentences. Concrete and specific. No filler. First person, but humble — claims are demonstrated, not asserted. Engineering honesty over marketing polish.

## Run the site

```bash
npm install
npm run dev       # local development (http://localhost:3000)
npm run build     # static generation
npm start         # serve the production build
```

## Content workflow

Content lives in `docs/` and is read at build time. To publish:

1. Add an article: copy `templates/article.md` into `docs/articles/`, fill it in, and add a matching post in `docs/linkedin/`.
2. Diagrams: drop an SVG into `assets/diagrams/`, then reference it in the article as `![caption](/diagrams/name.svg)`.
3. `npm run build` — the site regenerates automatically.

## Utilities

```bash
npm run validate     # checks structure, front matter, and sections
npm run stats        # content inventory and word counts
npm run typecheck    # TypeScript check
```

## Before you publish — checklist

- **Real URLs:** the `references:` links in articles and the GitHub link in `lib/site.ts` currently point to `github.com/palmshed/*`. Replace them with the real repositories and pull requests.
- **Site URL:** set `NEXT_PUBLIC_SITE_URL` (used for canonical URLs, sitemap, RSS, OG images).
- **Open Graph:** `/opengraph-image` generates the social card; verify it after deployment.
- **Accessibility:** run an axe scan and a Lighthouse pass before linking from LinkedIn.

## Status

- [x] Articles: 10 (each with diagrams, references, and concrete examples)
- [x] LinkedIn posts: 20
- [x] Portfolio cards: 10
- [x] Profile: complete
- [x] Design system: documented
- [x] Assets: SVG cards, icons, logo, diagrams
- [x] Prompts: image prompt library
- [x] Site: Next.js, static generation, search, RSS, sitemap, JSON-LD
