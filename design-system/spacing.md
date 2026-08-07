---
title: Spacing & Layout
slug: spacing
---

# Spacing & Layout

## Grid

**12-column grid** with generous whitespace. This is the layout backbone for cards, the banner, and any web surface.

- Columns: 12
- Gutters: 24px (desktop), 16px (mobile)
- Outer margins: 32px (desktop), 16px (mobile)

Content should occupy a centered column of 8–10 of the 12; full-bleed is reserved for backgrounds and images.

## Spacing scale

Spacing is a 4px base scale. Use tokens, not freehand values.

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Micro gaps, icon margins |
| `--space-2` | 8px | Dense component padding |
| `--space-3` | 12px | Tight clusters, badge padding |
| `--space-4` | 16px | Default padding, card inner padding |
| `--space-5` | 24px | Section rhythm, card spacing |
| `--space-6` | 32px | Between sections |
| `--space-7` | 48px | Major section breaks |
| `--space-8` | 64px | Hero / banner breathing room |

## Whitespace rules

- **Whitespace is part of the design, not leftover.** The scaffold's "generous whitespace" is a feature: it signals calm and structure.
- **Group related content with `--space-4`**, separate unrelated content with `--space-5` or more.
- **Never center long text.** Center only short labels and short taglines. Left-align body copy.
- **Cards:** inner padding `--space-4`/`--space-5`, gap between cards `--space-5`.

## References

- Card layout: `design-system/cards.md`
- Components that use spacing tokens: `design-system/components.md`
