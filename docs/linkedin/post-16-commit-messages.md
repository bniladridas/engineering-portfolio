---
title: The commit message as a unit of communication
slug: post-16-commit-messages
date: 2026-07-17
status: published
topic: commit-messages
hook: "A good commit message is a note to the future. A bad one is a promise that you'll be there to explain it."
---

A good commit message is a note to the future. A bad one is a promise that you'll be there to explain it.

I stopped writing "fix bug" and started writing messages that answer the three questions the next engineer actually has:

1. **What changed?** The subject line, in a sentence.
2. **Why?** The constraint, the bug, or the trade-off that drove the change.
3. **Why not the obvious alternative?** The one line that saves someone from "improving" it back.

Example: instead of:

```
fix bug in login
```

```
Handle empty tokens during token refresh

A refreshed token can arrive empty on slow networks. Returning early
prevents a broken session from being cached. Not retrying here because
the client retries at the call site.
```

That third section is the expensive part of the message, and the one that pays for everything.

Six months from now, `git log` is how your team reads the project's history. Make it readable.
