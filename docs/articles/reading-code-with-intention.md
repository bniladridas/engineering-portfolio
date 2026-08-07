---
title: Reading Code With Intention
slug: reading-code-with-intention
date: 2026-08-26
status: published
tags: [debugging, reading-code, craft]
intro: We are taught to write code, rarely to read it. But reading is most of the job, and it is a skill that improves like any other.
references:
  - label: Palmshed — reading the codebase's call graph before the first change
    url: palmshed
---

# Reading Code With Intention

We are taught to write code, rarely to read it. But reading is most of the job, and it is a skill that improves like any other.

The ratio surprised me early in my career: for every hour I spend writing code, I spend several reading it — mine from last month, mine from last year, someone else's from three teams ago. I was never taught how. I was just expected to pick it up, the way you're expected to pick up speed reading by reading more.

Reading code is a craft, and it can be learned deliberately.

## Start from behavior, not structure

The beginner instinct is to open the file and read top to bottom. That is how you read prose; it is the wrong way to read code. Code is not linear. It is a web of references, and most of the ones you care about are not in the file you're looking at.

I read from the outside in. I start with what the system is supposed to do — the user-visible behavior, the failing test, the API contract — and I follow the trail inward. Which function produces that behavior? Which inputs reach it? The code becomes a map I traverse on demand, not a book I read cover to cover.

## The call graph is the map

The single most useful question when reading unfamiliar code is: who calls this, and what does it call? That graph is the skeleton of the system. Everything else — the bodies, the comments, the formatting — is flesh.

When I picked up Palmshed's codebase after a month away from it, I didn't reread it. I re-traced it: the three command entry points, the config path, the layer where output is rendered. Fifteen minutes of map-building told me everything I needed to start shipping again. I build the map fast and roughly: a list of entry points, the functions each one reaches, and the data that flows between them. Most understanding comes from this skeleton, not from deep reading. I defer deep reading until the map says a specific function is load-bearing.

![Reading code from behavior inward — follow the call graph, deep-read only the load-bearing parts](/diagrams/diagram-call-graph.svg)

## Read the tests first

Tests are the most honest documentation a codebase has. They show how the code is actually used — the real inputs, the expected outputs, the edge cases the author cared about. A test that says `expect(price(quantity, 0.1)).toBe(11)` teaches more in one line than a paragraph of prose.

Before I modify code, I read its tests. Before I trust a comment, I check it against the tests. When tests are missing or unreadable, that itself is information: the code was not written to be understood or changed safely.

## Boring code is faster to read

Some code is hard to read because it is complex. Some is hard to read because it is gratuitously novel. The second kind is the more common problem — and the more fixable.

Code that follows the conventions of its own codebase, that uses predictable names and standard patterns, reads itself. The reader's brain is freed from decoding style and spends its effort on meaning. When I'm reading code and I'm surprised, I ask whether the surprise is because the behavior is genuinely complex, or because the author chose a clever shape. Usually it's the second, and the fix is to make it boring.

## Debugging is reading with a hypothesis

Debugging is not a separate skill from reading; it is reading under pressure. The difference is that the map I'm building has a bug in it, and my job is to find the place where the map and reality disagree.

The discipline that makes debugging fast: form one hypothesis at a time, and test it in the cheapest way that distinguishes it from the alternatives. Skip the obvious suspects you already ruled out. Read the actual code path — not the one you remember — because the bug is almost always in the gap between the code I think exists and the code that does. The tool that matters most is the willingness to read the line I'm sure about.

## Reading is a habit, not an event

Reading code well is a skill, and like all skills it decays without practice. I read code on purpose: the diff of my own change, the review of a colleague's, the source of a library I depend on. Each reading is a deposit. Over time, the deposits compound into the ability to open an unfamiliar codebase and know, within an hour, where to look and what to trust.

That ability is what separates engineers who can work anywhere from engineers who can only work where they already know everything.

## Takeaway

Read code from behavior inward, using the call graph as a map and the tests as the most honest documentation. Prefer boring code that reads predictably, and treat debugging as reading under pressure with one hypothesis at a time. Read on purpose, regularly. It is the craft that underlies every other.
