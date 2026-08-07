---
title: Typography
slug: typography
---

# Typography

## Typefaces

| Role | Face | Notes |
|---|---|---|
| Display / headings | **IBM Plex Sans** | Character. Slightly engineered feel; pairs with the engineering theme. |
| Body / UI | **Inter** | Neutral, readable at small sizes. Default for body copy. |
| Mono (code, labels) | **IBM Plex Mono** | Optional. For code samples, file paths, technical labels. |

**Fallback stack:**
`Inter, -apple-system, "Segoe UI", Roboto, sans-serif`

**Choice rule:** Inter for anything you'd read; IBM Plex Sans for anything you'd notice first. Both are open source (SIL OFL) and available on Google Fonts.

## Scale

| Token | Size / weight | Use |
|---|---|---|
| `--display` | 48px / 600 | Article titles, hero moments |
| `--h1` | 32px / 600 | Page titles |
| `--h2` | 24px / 600 | Section headings |
| `--h3` | 18px / 600 | Sub-sections |
| `--body` | 16px / 400 | Default body text |
| `--small` | 14px / 400 | Captions, metadata |
| `--micro` | 12px / 500, uppercase | Labels, eyebrows |

## Rules

- **No font under 12px.** Ever.
- **Line height 1.5** for body, **1.2** for headings.
- **Max measure ~66ch** for body copy. Long lines tire the reader.
- **Use weight for hierarchy, not size alone.** 600 on dark text reads as a heading at small sizes.
- **Uppercase micro-labels** (letterspaced) for eyebrows like `ARTICLE`, `OPEN SOURCE` — sparingly.

## Voice in type

The design is calm and structured. That means restrained headings, generous whitespace, and nothing shouting. The green accent is the only voice that raises itself.
