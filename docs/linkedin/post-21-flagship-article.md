---
title: The flagship piece — designing a configuration system
slug: post-21-flagship-article
date: 2026-09-09
status: published
topic: design-article
hook: "I spent a month designing Palmshed's configuration system. The rules I ended up with were the opposite of the ones I started with."
---

I spent a month designing Palmshed's configuration system, and I wrote the whole thing down — the full 3,500-word account is now live on the site.

This is the design that made me reverse my instincts:

- Configuration is a **decision process**, not a data structure. Design the precedence, not the shape.
- **Flags beat the environment, the environment beats the file, the file beats the defaults** — and the reason is lifetime: per-run overrides per-machine overrides per-project.
- Validation, not merging, is the user interface. The error message is the feature.
- Layers **replace**, they never merge or append. Predictable beats clever.
- The **dry-run** (`--show`) makes the whole policy inspectable — and secrets get redacted automatically, because the layer model knows which values are secrets.

The article includes the loader split into named functions, the merge policy, the schema lifecycle for adding and retiring fields, and the tests that encode precedence as executable truth.

If you've ever cursed a tool's config file, this is about why some config systems earn trust and others earn rage.

Read it on the site: https://palmshed.dev/articles/designing-a-configuration-system
