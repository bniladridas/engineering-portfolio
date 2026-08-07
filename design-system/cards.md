---
title: Cards
slug: cards
---

# Cards

The scaffold's card design spec, expanded into a reusable system.

## The original spec

- White background
- Inter or IBM Plex Sans
- Black text
- Green accent
- Large whitespace

## Anatomy of a card

```
┌────────────────────────────────────┐
│ ARTICLE                    tag ▒   │ ← eyebrow (micro, uppercase) + accent tag
│                                    │
│ Building Software That Lasts       │ ← title (h2, 600)
│                                    │
│ Open source systems, developer     │
│ tools, and software architecture   │ ← subtitle (body, secondary ink)
│                                    │
│ An essay on why maintainability    │
│ beats cleverness...                │ ← description (small, clamped to 3 lines)
│                                    │
│ Read the article →                 │ ← link (green)
└────────────────────────────────────┘
```

## Rules

- **White background.** Never put a photo inside the card; images go on the banner.
- **One accent per card.** Green for the tag and the link only.
- **Three text layers maximum:** title, subtitle, description. If a card needs a fourth, the card is too full.
- **Whitespace is the design.** Padding `--space-4`/`--space-5`, generous vertical rhythm, no clutter.
- **Left-aligned text** unless the card is a short label card (eyebrow-style, centered is acceptable).
- **Clamp descriptions to ~3 lines.** Cards that grow with content destroy the grid.

## Variants

- **Article card** — eyebrow `ARTICLE`, green tag = topic.
- **Project card** — eyebrow `PROJECT`, tag = primary language or stack.
- **Open source card** — eyebrow `OPEN SOURCE`, tag = repository.
- **Link card** — title + subtitle only, for short links.

## Ratio

Use a consistent aspect ratio across a row (e.g., 3:4 for cards in a grid). The SVG templates in `assets/cards/` encode the spacing and ratio.
