---
title: Tests are documentation you can run
slug: post-17-tests-as-docs
date: 2026-07-24
status: published
topic: testing
hook: "The best explanation of a function is the test that pins down what it does."
---

The best explanation of a function is the test that pins down what it does.

A paragraph of prose can hand-wave. A test can't. `expect(price(quantity, 0.1)).toBe(11)` tells me the real inputs, the real output, and the rounding behavior in one line.

I read tests before I read implementations. When I'm about to touch code, its tests are my first question:

- What does this promise?
- What edge cases did the author care about?
- What happens when it fails?

And when tests are missing or unreadable, that's information too. It means the code wasn't written to be understood or changed safely.

The test that reads like a specification is the best documentation a codebase has — because it can't drift.

It either passes, or it lies to your face.
