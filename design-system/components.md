---
title: Components
slug: components
---

# Components

Reusable pieces, all following the same design system: black/white/grey with one green accent, Inter/IBM Plex Sans, 4px spacing scale.

## Badge / tag

Small pill for eyebrows and categories.

- Background: `--surface-muted`, text `--black`, or green-tinted (`--green-muted`, text `--green`).
- Padding: `--space-1` `--space-2`. Radius: 999px. Text: `--micro`, uppercase.
- Never more than one green badge per card.

## Button

- Primary: `--green` background, white text. Only one per surface.
- Secondary: transparent, 1px `--line` border, `--black` text.
- Tertiary: text link in `--green` with an arrow (`→`).

## Link

- Color: `--green`. Hover: underline, no color shift.
- Distinguishable from body text at a glance. Don't rely on color alone; underline on hover is the minimum.

## Card

See `design-system/cards.md`.

## Code block

- Background: `--surface-muted`. Border: 1px `--line`. Radius: 8px.
- Font: IBM Plex Mono. Padding: `--space-4`.
- Accent only in syntax highlights; keep to one color for anything custom.

## Divider

- 1px `--line`. Used between sections, not between every paragraph.

## Eyebrow

- `--micro`, uppercase, letter-spaced. Color: `--ink-secondary` (or `--green` when it marks something "live", like `OPEN SOURCE`).

## Focus state

- 2px outline in `--green`, offset 2px. Keyboard users must never wonder where they are.

## Empty states

- Short sentence, `--ink-secondary`, one link if the user can act. No illustrations, no illustrations-with-sad-face.

## Consistency is the component

The design system's real rule: if you've seen one badge, you've seen them all. Every component is boring on purpose, so the content and the single green accent are what stand out.
