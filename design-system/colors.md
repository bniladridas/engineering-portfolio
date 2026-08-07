---
title: Color
slug: colors
---

# Color

## Palette

| Token | Value | Use |
|---|---|---|
| `--black` | `#0d0d0d` | Primary text, headings |
| `--ink-secondary` | `#4b4b4b` | Secondary text, captions |
| `--white` | `#ffffff` | Background (cards, banner, profile) |
| `--surface-muted` | `#f6f6f4` | Subtle panel backgrounds, code blocks |
| `--green` | `#1f883d` | Accent — single accent, used sparingly |
| `--green-muted` | `#e6f2ea` | Accent tints, badges, links on hover backgrounds |
| `--line` | `#e3e3e0` | Hairline borders, dividers |

## Rules

- **One accent.** Green is the only accent color. If two colors are competing, one is wrong.
- **Black text on white, always.** Green is never used as text on white for body copy — contrast fails.
- **Green means action or life.** Links, focus states, the Palmshed mark, "open source" chips. Not decoration.
- **Neutrals carry structure.** Everything that isn't text or action is black, white, or grey.
- **Accessibility:** body text at `#0d0d0d` on `#ffffff` exceeds WCAG AAA. Green on white is for large text and icons only — check contrast at small sizes.

## References

- GitHub green `#1f883d` was the seed for the accent.
- Cards: see `design-system/cards.md`.
