---
title: Documentation Is Engineering
slug: documentation-is-engineering
date: 2026-07-08
status: published
tags: [documentation, teamwork, communication]
intro: Documentation is not a chore that follows the real work. It is the real work, done in a form that other people can use.
references:
  - label: kit README — written before the first function
    url: kit#readme
  - label: Auth service design note
    url: auth/blob/main/ARCHITECTURE.md
---

# Documentation Is Engineering

Documentation is not a chore that follows the real work. It is the real work, done in a form that other people can use.

For most of my career I treated docs as an afterthought — the thing you write when the code is done and the deadline hasn't collapsed yet. I was wrong. Docs are where a lot of engineering actually happens: decision-making, reasoning, and trade-offs, preserved for the next person.

## Code records what happened. Docs record why.

A codebase is a frozen conversation. Every branch, every default, every workaround encodes a decision that someone once made under constraints I can no longer see. Without context, I can only guess at the reasoning, and guessing is how systems get broken.

When I was building kit's config handling, I made a decision that looks wrong from the outside: the loader accepts a string, not a path. Any reader of the code would flag that as an inconsistency. The doc next to it explains why — the config can come from a file, a URL, or an environment-injected string, and the loader should not care about its source. That one paragraph turned a would-be refactor into an unnecessary one.

Comments and docs fill that gap. They are the memory of the project. The best ones answer questions the code raises but cannot answer:

- Why is this cache invalidated this way?
- Why does this path allow `null`?
- Why did we choose this library over the obvious alternative?

Those answers are engineering. Writing them down is engineering. Skipping them forces the next engineer to reverse-engineer history from code, which is the slowest possible way to learn it.

## Docs reduce the cost of every future question

Every undocumented decision becomes a question. Questions travel through chat channels, issue trackers, and meetings. Each one burns the time of at least two people — the asker and the answerer — and often more.

On the auth service, the onboarding flow used to be three people deep by the end of the week, because every new engineer asked the same six questions. I wrote those answers down once. Onboarding dropped to a day of reading and a few real questions. The same answers, written once, replaced two dozen hours of repeated explanations per hire.

![The docs loop — one commit, two deliverables: the code change and the doc that explains it](/diagrams/diagram-docs-loop.svg)

Written once, a good doc answers the question forever. The economics are brutal in favor of writing: an hour of documentation can save dozens of hours of questions over a project's life. Teams under-invest in docs not because the math is bad, but because the payoff is delayed. It shows up next quarter, not today.

## Structure before prose

Good documentation is designed, not typed. I structure docs the way I structure code: by audience, with clear boundaries.

- **What it is** — one sentence, at the top. If a reader gets nothing else, they get this.
- **How to run it** — commands that actually work, tested against a clean checkout.
- **How it works** — the architecture, in terms of concepts, not file paths.
- **Why it works this way** — the decisions, the rejected alternatives, the constraints.
- **Where the edges are** — known limitations, sharp corners, deliberately skipped work.

The last section is the most important and the most skipped. kit's README has an "edges" section that names the two things I knowingly left rough: no Windows path handling in the first release, and config validation that assumes UTF-8. Naming them turned surprises into expectations — and turned two incoming issues into "we know, it's in the plan."

## The docs that survive

Docs survive when they live close to the code they describe and are updated in the same commit as the code. Docs stored in a separate wiki, written "at the end," become historical fiction within a month.

I keep a simple rule: if a change modifies behavior, it modifies the doc. Same commit, same review, same merge. It costs almost nothing at the moment of change and prevents the drift that makes docs untrustworthy. And an untrustworthy doc is worse than no doc, because it misleads with confidence.

## Engineering is communication

A system is engineered as much by its documentation as by its code. The code defines what the machine does. The documentation defines what the team understands — and teams can only build, change, and repair what they understand.

Every doc I write is an investment in the next reader. Most of the time, the next reader is me.

## Takeaway

Treat documentation as part of the engineering, not a follow-up to it. Document the decisions and the edges, not just the commands. Keep docs in the same commit as the code they describe. And remember: an hour of writing saves a week of questions.
