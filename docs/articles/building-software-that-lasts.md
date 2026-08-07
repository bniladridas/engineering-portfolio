---
title: Building Software That Lasts
slug: building-software-that-lasts
date: 2026-07-01
status: published
tags: [maintainability, architecture, open-source]
intro: The longer I build software, the less I believe writing code is the difficult part. Keeping software understandable, maintainable, and adaptable is.
references:
  - label: Palmshed — a CLI tool built in public
    url: palmshed
  - label: Auth service design note
    url: notes/blob/main/auth-service.md
---

# Building Software That Lasts

The longer I build software, the less I believe writing code is the difficult part. Keeping software understandable, maintainable, and adaptable is.

Across personal projects and open source, I've found that small engineering decisions compound over time. Clear interfaces, predictable structure, thoughtful documentation, and incremental improvements often outlast the technologies themselves.

## Why maintainability beats cleverness

Clever code is fun to write and miserable to maintain. It concentrates all the knowledge in one place — the author's head — and forces every future reader to reconstruct it. A clever one-liner that saves three lines today costs three hours of confusion next quarter.

I hit this head-on in Palmshed, the CLI tool I build in public. The first version of its config loader was a single, impressive function: it parsed YAML, flattened environment overrides, and validated required keys — all in forty dense lines. It worked. It also took me an evening to re-understand every time I needed to add a field. When I finally split it into three named functions — `loadConfig`, `applyOverrides`, `validate` — the behavior was identical. The difference was that I could now hold the whole thing in my head, and so could anyone else.

Maintainable code is the opposite. It is boring by design. It follows the conventions of the codebase, names things by what they do, and keeps surprising behavior behind a clear boundary. It assumes the next reader is tired, distracted, and slightly annoyed, and it makes their job easy anyway.

I used to treat "obvious" as a mild insult. Now I treat it as a compliment.

## Interfaces outlast implementations

In every system I've maintained, the interfaces survive longer than the code behind them. A function signature, a data shape, a documented contract — these are what the rest of the system depends on. When the implementation changes, the interface is what absorbs the shock.

The auth service I built at work proved this in the most direct way possible. The public contract — `login`, `refresh`, `logout`, and their request/response shapes — has stayed stable for two years. Underneath, we've swapped the token format, moved from a self-hosted store to a managed one, and replaced the password hashing implementation. Each change was contained because the boundary was solid, and each one touched exactly one file. The callers never noticed.

That insight reshaped how I write code. I spend more time on the boundary of a module than the middle. The middle can always be rewritten. The boundary is what my colleagues and future me will be stuck with.

A good interface:

- **Does one thing.** If the name needs an "and", it's two functions.
- **Hides decisions.** Callers shouldn't know whether the result is cached, computed, or fetched.
- **Fails loudly.** A type error at the boundary beats silent corruption three levels down.

## The compounding effect of small decisions

A messy codebase rarely happens all at once. It happens one shortcut at a time: a variable named `data`, a second code path that bypasses the helper, a function that silently returns `null`. Any single shortcut is harmless. Their sum is unmaintainable.

![Small decisions compound — one shortcut a week and one deposit a week end up in very different places](/diagrams/diagram-compounding.svg)

The same is true of good decisions. A clear module boundary, a well-named function, a comment that explains *why* rather than *what* — each one is small, but they compound. Over a year, they are the difference between a codebase that grows and one that decays.

I try to make every change leave the code slightly better than I found it. Not dramatically better. Slightly. That rule, applied consistently, produces code that lasts.

## Documentation is part of the build

Code tells you what the software does. Documentation tells you why it does it. Both are necessary, and neither substitutes for the other.

For the auth service, I keep a one-page design note next to the README. It records the three decisions that cost the most to rediscover: why tokens are short-lived, why refresh tokens are stored hashed, and why we rejected the library we almost used. Two years later, that page has saved the team weeks — every "why is it like this?" question is answered before it's asked. I write that documentation for the reader who inherits the system six months from now — usually me.

## Software that lasts is software people trust

In the end, durable software is a trust relationship. The code earns the trust of the people who maintain it by being predictable. The team earns the right to change it by keeping it predictable. Every refactor, every test, every line of documentation is a deposit into that trust.

Good software is not only software that works today. It's software the next engineer can understand tomorrow.

## Takeaway

Build for the next reader. Favor boring, predictable code over clever code. Spend your design energy on interfaces, because they outlast implementations. And make every change a small deposit into the codebase's future — those deposits compound.
