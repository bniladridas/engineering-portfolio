---
title: Image Prompts
---

# Image Prompts

A library of image generation prompts for portfolio assets, all following the design system: black/white/grey, one green accent, Inter/IBM Plex Sans, 12-column grid, generous whitespace.

## Index

- `cards.md`: prompts for portfolio card images
- `banner.md`: prompts for the LinkedIn banner
- `avatar.md`: prompts for the profile avatar
- `diagrams.md`: prompts for conceptual article imagery

## Style anchor

Append this to every prompt so results stay consistent:

> Minimal design, white background, black and grey ink, one accent color of muted green (#1f883d), Inter or IBM Plex Sans typography, 12-column grid, generous whitespace, flat vector illustration, no gradients, no clutter, high contrast, clean line work.

## Negative prompt

> photorealistic, 3D render, glossy, busy, cluttered, more than one accent color, gradients, drop shadows, emoji, text artifacts, watermark.

## Post-process

Generated images need the same treatment every time: export at 2x resolution, confirm the accent is exactly `#1f883d`, and reject anything that introduces a second accent color.
