# Engineering Portfolio

A version-controlled content library for my public engineering presence: long-form articles, LinkedIn posts, portfolio cards, profile copy, design assets, and image prompts — all in one reusable source of truth.

Everything here is production content, not placeholders. When a new article or asset is ready to publish, you pick the next completed piece instead of starting from scratch.

## What's inside

```
engineering-portfolio/
├── README.md              # this file — how the library works
├── package.json           # scripts for validation and publishing prep
├── docs/
│   ├── articles/          # 10 long-form engineering articles
│   ├── linkedin/          # 20 LinkedIn posts (cross-posted from articles)
│   ├── featured/          # 10 portfolio cards + featured section copy
│   └── profile/           # complete profile rewrite (headline, about, experience)
├── assets/
│   ├── cards/             # SVG card templates
│   ├── icons/             # reusable SVG icons
│   ├── logos/             # Palmshed brand assets
│   └── diagrams/          # SVG diagrams for articles
├── prompts/               # image generation prompts for cards and banner
├── design-system/         # colors, typography, spacing, components, cards
└── templates/             # ready-to-fill templates for new content
```

## Voice

Short sentences. Concrete and specific. No filler. First person, but humble — claims are demonstrated, not asserted. Engineering honesty over marketing polish.

## Quick start

```bash
npm run validate     # checks structure, slugs, and content completeness
npm run stats        # prints a content inventory and word counts
```

To add a new article: copy `templates/article.md` into `docs/articles/`, fill it in, then copy `templates/linkedin-post.md` into `docs/linkedin/` to announce it.

## Status

- [x] Articles: 10
- [x] LinkedIn posts: 20
- [x] Portfolio cards: 10
- [x] Profile: complete
- [x] Design system: documented
- [x] Assets: SVG cards, icons, logo, diagrams
- [x] Prompts: image prompt library
