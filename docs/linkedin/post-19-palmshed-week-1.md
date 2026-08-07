---
title: Building kit in public — week 1
slug: post-19-palmshed-week-1
date: 2026-08-14
status: published
topic: building-in-public
hook: "I'm building a tool I want to use, in public. Week one: decisions, not features."
---

I'm building a small open source tool — let's call it kit — and I'm going to show the work as I go.

Week one had no features. It had decisions:

- **Scope:** a developer tool that does one job well, with a command-line interface. No dashboard. No "platform."
- **Language and structure:** chosen for boring, predictable code — because I'll be maintaining this alone, a year from now.
- **Error handling:** errors must say *what*, *where*, and *what to do*. If the first line of output doesn't answer those, it's not done.
- **Naming:** nothing called `data`. Every name is a small promise about what the thing is.

I wrote a design note and a README before I wrote the first function. Not because docs come first, but because I wanted the interface decided before the implementation could drift.

The code is young and small. The point of building in public isn't polish. It's showing the decisions and making the process inspectable.

Next week: the first real command, and the first honest progress bar.
