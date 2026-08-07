---
title: Building in Public, Honestly
slug: building-in-public-honestly
date: 2026-09-02
status: published
tags: [building-in-public, open-source, career]
intro: Building in public is not posting wins. It is showing the work — the false starts, the trade-offs, and the small decisions — and letting the process be the content.
references:
  - label: kit — built in public, week by week
    url: kit
---

# Building in Public, Honestly

Building in public is not posting wins. It is showing the work — the false starts, the trade-offs, and the small decisions — and letting the process be the content.

There is a version of building in public that is really building in public *relations*: a highlight reel of shipped features and growth charts. It has its uses, but it teaches nothing and shares nothing. The honest version is different. It shows the parts of engineering that are usually invisible, and in doing so, it builds something more durable than an audience: a record of how a project actually gets built.

## Ship the process, not the polish

The useful public artifact is not the finished feature. It's the decision trail that produced it. Why did I choose this data model? What did I try before the auth library that finally worked? Where is the code still ugly, and why did I leave it that way?

When I build Palmshed in public, I post the decisions, not just the merges. The week the config layer went from one long function to three named ones, the post wasn't a screenshot — it was the before and after, and why the rename mattered. That post got more useful replies than any release announcement, because it showed a real trade-off being made.

Posting the process changes how I work. Because the process is on the record, it gets cleaner. I write better commit messages, leave more honest comments, and think harder before I take a shortcut — because the shortcut is now public. The audience doesn't just receive the work. It audits it, which is exactly what I want.

## Consistency beats volume

The most common failure mode of building in public is the streak that dies. One ambitious week, three posts, then silence for a month. The rhythm matters more than the reach. A small, weekly note that is genuinely reflective beats a viral post that is never followed.

I keep the bar low on purpose. A weekend build log. A diff that taught me something. A failure that cost me an evening. The bar is not "interesting enough to be popular." The bar is "true, and useful to someone trying to do the same thing."

## The uncomfortable posts are the valuable ones

Anyone can post the version that worked. The posts that actually help other engineers are the ones that show the version that didn't: the migration that lost data, the abstraction that collapsed, the estimate that was wrong by 4x.

![The public build loop — showing the work invites audits, and audits make the work better](/diagrams/diagram-feedback-loop.svg)

There is a cost to these posts. They are less flattering. They admit uncertainty. But they are also the only posts with real information in them, because they describe the part of engineering that is systematically hidden — and hidden things are what people can't learn any other way.

## Feedback is the compound interest

The quiet benefit of building in public is the feedback. A reader points out the edge case I missed. Another shares the bug they hit in the same library. The collective knowledge of the audience makes my code better than I could make it alone.

This is why honesty matters more than reach. Feedback is only useful when it's about real work. A highlight reel gets applause; an honest account gets corrections. I'd rather have the corrections.

## The audience is also a user

Building in public changes who I think I'm building for. When the work is public, the readers of my posts become users of my process. They ask questions that expose gaps in my reasoning. They demand that my claims be checkable.

That pressure makes the work better in a way that is hard to get any other way. A project built in public has to stand up to inspection. A project built in private can get away with hand-waving. I have learned more from the requirement to be checkable than from most of the feedback itself.

## The record is the reward

The posts, the logs, the honest diff explanations — together they become a documentation of my own development. Looking back, I can see not just what I built, but how I thought, what I believed, and where I was wrong. That record is worth more to me than any engagement metric.

Building in public, honestly, is not a growth strategy. It's a way of working that keeps the work honest, keeps the process improving, and keeps a record of both.

## Takeaway

Show the process, not just the wins. Post consistently at a low bar, and post the failures — they're the only content with real information. Let public feedback audit your work, and let the record you create become documentation of your own growth. Build in public honestly, and the process becomes the product.
