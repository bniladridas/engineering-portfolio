---
title: Respect your future self's attention
slug: post-20-respect-attention
date: 2026-08-21
status: published
topic: engineering-practice
hook: "The most respectful thing you can do for the engineer you'll be in six months is leave fewer things to guess."
---

The most respectful thing you can do for the engineer you'll be in six months is leave fewer things to guess.

I used to write code for the reviewer (impressively) and leave nothing for the reader. Six months later, that reader was me, and I didn't know why I'd done anything.

Now I write for the future me, who:

- has forgotten every decision I'm making today,
- is likely debugging at 11pm,
- has no memory of that clever trick that seemed obvious at the time,
- and will be grateful for any thread I leave.

So I leave threads:

- A comment that says *why*, not what.
- A commit message that records the alternative I rejected.
- A name that says what the thing is.
- A doc note at the edge of the system, where the behavior is surprising.

None of it is for today. All of it is for the night I forget.

Be kind to future you. They're the one who'll have to debug it.
