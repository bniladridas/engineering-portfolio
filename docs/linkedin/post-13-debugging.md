---
title: Debugging is reading with a hypothesis
slug: post-13-debugging
date: 2026-06-24
status: published
topic: debugging
hook: "The most common cause of a long debugging session is not a hard bug. It's a strong memory of a code path that doesn't exist."
---

The most common cause of a long debugging session is not a hard bug. It's a strong memory of a code path that doesn't exist.

I've lost count of the hours spent chasing a bug in the function I *remembered*, when the real code did something slightly different two screens away.

The discipline that fixes this:

1. Read the actual code path, the one on screen, not the one in your head. The bug is almost always in the gap between the two.
2. One hypothesis at a time. Test it in the cheapest way that distinguishes it from the alternatives.
3. Keep a running list of what you've ruled out. It's the difference between a search and a scavenger hunt.

The best debuggers aren't faster readers. They're slower to trust their own assumptions.

Debugging is reading, under pressure, with a hypothesis, and without the luxury of being sure.
