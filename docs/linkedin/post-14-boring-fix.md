---
title: The most respected change I've ever shipped was boring
slug: post-14-boring-fix
date: 2026-07-03
status: published
topic: engineering-practice
hook: "The most respected change I ever shipped didn't add a feature. It removed one."
---

The most respected change I've ever shipped didn't add a feature. It removed one.

A flag nobody needed. A second code path that duplicated the first. An "advanced" setting three people had touched in a year.

The removal touched dozens of files, but the diff was the smallest I've ever made. Every deleted line was a surface area that no longer needed to be tested, documented, or explained.

Engineers treat "shipping" as adding. The systems I've most enjoyed maintaining were shaped as much by subtraction — dead code deleted, forks merged, workarounds retired.

Deleting is harder than adding:

- You have to be sure nothing depends on it.
- You have to resist the instinct that removing is "losing work."
- You have to update the docs that describe it.

It's worth it. The codebase gets quieter. And a quiet codebase is where the next feature is cheap to build.

The best change you ship this quarter might be the one that takes lines away.
