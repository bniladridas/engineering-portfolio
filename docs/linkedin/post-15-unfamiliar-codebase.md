---
title: Joining an unfamiliar codebase
slug: post-15-unfamiliar-codebase
date: 2026-07-10
status: published
topic: reading-code
hook: "First week in an unfamiliar codebase, I don't try to understand everything. I build a map."
---

First week in an unfamiliar codebase, I don't try to understand everything. I build a map.

Trying to read every file top-to-bottom is how you feel lost for a month. Reading code from behavior inward is how you feel useful by day three.

My routine:

1. Find the entry points. What does the user actually do first?
2. Trace the call graph. What does each entry point reach? That skeleton is 80% of the understanding.
3. Read the tests. They show how the code is *actually* used, more honestly than any comment.
4. Deep-read only the load-bearing functions. Defer the rest.

Then, when I make my first change, I make it small, and I read it as a way to learn, not just to ship.

An engineer who can read a new codebase is an engineer who can work anywhere. It's a skill, not a talent. It improves with practice.
