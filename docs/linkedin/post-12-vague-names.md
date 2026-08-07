---
title: 'data', 'info', and the cost of vague names
slug: post-12-vague-names
date: 2026-06-17
status: published
topic: naming
hook: "If I find a variable named `data` in my own code, I treat it as a confession."
---

If I find a variable named `data` in my own code, I treat it as a confession.

I didn't know what it was when I wrote it, so I gave the reader nothing to work with. Not `pendingInvites`. Not `inboxRows`. Just... `data`.

Names are where the reader spends their first few seconds. A good name answers the first question — *what is this?* — before any effort is spent.

A few rules I now keep:

- If a function name needs an "and", it's two functions.
- If a variable needs a comment to be understood, it needs a better name.
- If I write `data`, `info`, or `temp` three times in a row, I stop and name what the thing actually is.

Rename costs five seconds. Confusion costs the next reader ten minutes.

Ten minutes a week, for a year, is a lot of ten minutes.
