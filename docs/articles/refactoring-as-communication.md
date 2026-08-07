---
title: Refactoring As Communication
slug: refactoring-as-communication
date: 2026-07-29
status: published
tags: [refactoring, communication, code-review]
intro: A refactor is a letter to the next engineer. Every rename, every extracted function, every deleted comment is a sentence in it.
references:
  - label: kit — config loader split into named functions
    url: kit/pulls
---

# Refactoring As Communication

A refactor is a letter to the next engineer. Every rename, every extracted function, every deleted comment is a sentence in it.

For a long time I understood refactoring as a mechanical act: improving the code's structure without changing its behavior. That definition is technically correct and practically incomplete. Refactoring is how an engineer explains the system to the person who will maintain it next. Structure is the message.

## The structure is the documentation

Readers of code get most of their information from shape, not from comments. A function named `loadConfig` with a return type and no side effects tells me almost everything I need without a single line of prose. A function named `process` that takes `data` and returns `result` tells me nothing — I must read the whole body to learn what I could have gotten from a good name in one glance.

Refactoring is rewriting that structure to be self-documenting. The best refactors remove the need for explanation. A clean boundary, a revealing name, a function that does one thing — these communicate continuously, with zero maintenance cost.

## Names are the highest-value documentation

Code is read far more often than it is written. The dominant cost of any codebase is reading it, and names are what the reader sees first. A good name answers the reader's first question — what is this? — before they spend any effort.

The most instructive refactor I did in kit was a single rename: `apply` became `applyEnvOverrides`. Same body, same call sites. But the original name had been the reason the function kept growing — every new override rule went into `apply` because "apply" accepted anything. The new name set a boundary the code respected. The rename was not cosmetic; it was a transmission of meaning that had been living only in my head.

I take names seriously in refactors. When a function's name requires its body to be understood, that's not a comment problem; that's a name problem. When a variable called `data` would be better called `pendingInvites`, the rename is a correction of the message, not a style preference.

## Extraction is turning a wall into a map

Long functions are walls of text. The reader must hold the entire thing in working memory to understand any part of it. Extraction breaks the wall into rooms with labels, so the reader can decide where to look instead of absorbing everything.

![Refactoring as a map — a wall becomes rooms with names, so the reader chooses where to look](/diagrams/diagram-refactor-map.svg)

When I split kit's config loader, the original function did three jobs: parse the file, flatten environment overrides, and validate required keys. The refactor turned it into three functions whose names are a map of the behavior. The deleted comment — "parse and merge config, then check required fields" — had been describing exactly what the three names now say for free. Deleting it was part of the refactor, not a loss.

The test for extraction is not length. It's whether a chunk has a single coherent job that can be named. If I can say "this part validates the payload" and "this part formats the error," the function deserves to be two functions. The act of naming those chunks — and deleting the old comment that described them — is the refactor.

## Deleting is communication too

Refactors are not only additions. Old comments that describe what the code does, once the code is clear enough to say it itself, are noise. Dead branches, duplicate helpers, and exhausted workarounds are noise. Deleting them is a form of honesty: it tells the next reader that this is the real shape of the system, not a museum.

That deletion is also the riskiest part of a refactor. It is safe exactly as often as it is tested. Refactors without tests are archaeology with a shovel. Refactors with tests are surgery.

## Refactoring is not a phase

The worst refactoring is the big-bang kind — a "rework the module" epic that takes three weeks, freezes features, and produces a diff nobody can review. It happens when small improvements were never allowed to happen.

The sustainable form is continuous: every change leaves the code a little clearer. That cadence produces no dramatic refactors, because nothing is ever allowed to decay far enough to need one. It is the maintenance equivalent of brushing your teeth daily rather than visiting the dentist annually.

## The letter to the next engineer

Every codebase is a message to a future reader. Refactoring is how I keep the message honest. When I extract a function, I am saying: this is a concept, it deserves its own name. When I rename a variable, I am saying: here is what this actually is. When I delete a stale comment, I am saying: trust the code, it is now clear enough.

The next engineer who opens that file is reading what I wrote. I'd rather write a clear letter than make them read my mind.

## Takeaway

Refactor to communicate, not just to reorganize. Invest in names, extract anything that can be named, and delete the noise that hides the shape of the system. Refactor continuously, behind tests, so the codebase never decays far enough to need a rewrite. Structure is documentation; write it well.
