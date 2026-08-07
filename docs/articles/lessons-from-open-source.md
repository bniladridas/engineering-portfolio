---
title: Lessons From Open Source
slug: lessons-from-open-source
date: 2026-07-15
status: published
tags: [open-source, community, contribution]
intro: Open source taught me more about engineering than any course did, not because the code is better, but because the process is real.
references:
  - label: "kit: built and maintained in public"
    url: kit
  - label: "Config loader: reviewed in the open"
    url: kit/pulls
---

# Lessons From Open Source

Open source taught me more about engineering than any course did, not because the code is better, but because the process is real.

I started contributing to open source the way most people do: hesitantly, with a small fix, worried that I'd get it wrong. Years later, the lessons from that process are still the ones I apply to every project I build, personal or professional.

## The standard is collaboration, not perfection

The first surprise was how ordinary the code is. The projects I admired were built by people making normal engineering decisions under pressure, just like everyone else. What distinguished them was not genius. It was process: clear guidelines, honest reviews, and an explicit understanding that any of it could be improved.

I built kit in public partly to hold myself to that standard. When I opened its config-loader for review, the response was the same as any well-run project: comments on reachability, on naming, on one branch that could never fire. None of it was about me. That is the norm the best projects set, and I now hold my own work to it.

That freed me. I stopped treating a contribution as a performance and started treating it as a collaboration. The maintainers did not expect perfection. They expected a good-faith effort, a willingness to receive feedback, and respect for the project's conventions.

## Reviews taught me to separate code from self

My first review came back with more comments than lines. It stung. Then I reread it and realized every comment was about the code, not about me. "This branch isn't reachable." "Can this fail?" "Naming." Nothing personal.

![The contribution loop: contribution, review, revision, merge, repeat](/diagrams/diagram-pr-review.svg)

That separation is the single most valuable habit open source gave me. It let me take criticism as data instead of as judgment, which made me dramatically faster to improve. Good codebases do this on purpose: they keep reviews technical, they explain reasoning, and they thank contributors for the work regardless of the outcome.

## Maintainers are translators, not gatekeepers

Every repository is a small meeting of people who think differently about the same problem. The maintainer's real job is translation: converting a contributor's idea into the project's idioms, and the project's constraints into language a newcomer can act on.

When a contributor opened an issue against kit asking for "profiles," their mental model was a settings screen. The project's model is layered config. The useful response was not "rejected, by design." It was a translation: here's how profiles map onto the layers we already have, and here's what the API would look like. That translation closed the issue with a plan instead of a disappointment.

I learned to write that kind of feedback: concrete, kind, and specific. Point at the line. Suggest the alternative. Say why. "This works, but the project's convention is X because Y." That style of feedback closes issues and grows contributors. The gatekeeper style ("not our problem, closing") shrinks them.

## The code is the least of it

The open source projects that thrive share a pattern that has nothing to do with code. They have a README that respects the reader's time. They have issue templates that force clarity. They have a contributing guide that lowers the barrier to a first PR. They thank contributors by name.

In other words: they treat strangers' time as scarce and precious. That single value produces more engineering quality than any lint config ever will.

## Contribute like it's a product

My first contributions were scattershot: whatever bug I tripped over. It worked, but it didn't build anything. What changed everything was committing to a system I actually used. Every fix was one I needed. Every feature was one I wanted. The feedback loop was tight, and my motivation never flagged because I was solving my own problem in public.

That is the advice I give everyone now: don't look for a project to be good at. Use software, find the rough edges, and fix the one that annoys you. The best contributor is the person who needs the fix.

## Open source is a practice, not a place

I no longer think of open source as a place you publish code. It's a practice: naming assumptions, documenting decisions, reviewing honestly, and welcoming strangers. Those habits make every codebase better, whether it's public or not.

The code I contribute matters. The practice matters more. It's the difference between writing software and being a software engineer.

## Takeaway

Contribute to software you actually use. Separate feedback about code from judgment about people. Treat contributors' time as precious, and translate, don't gatekeep. The habits you learn in public are the habits you bring to everything else.
