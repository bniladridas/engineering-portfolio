---
title: Banner Prompt
---

# Banner Prompt

LinkedIn banner, 1584 × 396 px (export at 2x). Concept from `docs/profile/banner-spec.md`: minimal white with a subtle engineering grid and Palmshed branding.

## Prompt

> Ultra-wide minimal banner. Pure white background. A very faint 12-column grid just barely visible across the full width. In the center-right, the Palmshed mark: a small geometric shed with a palm leaf on its roofline, in muted green (#1f883d). Short tagline in Inter or IBM Plex Sans on the left, in black: "Software that outlasts its authors." Thin muted-green rule along the bottom edge. Huge amounts of whitespace. Flat vector, no gradients, no other colors.

## Negative prompt

> photorealistic, 3D render, glossy, busy, cluttered, more than one accent color, gradients, drop shadows, emoji, text artifacts, watermark, centered text block.

## Alternate taglines

- "Maintainable systems. Developer tools. Open source."
- "Software that outlasts its authors."

## Post-process

- Safe zone: keep all text and the mark within the center 75%. The profile photo overlays the bottom-left corner.
- Confirm the accent green is exactly `#1f883d` and the grid stays barely visible (about 5% opacity).
- If the model adds a second color or a busy texture, reject and rerun with the negative prompt.
