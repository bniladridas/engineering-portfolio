---
title: Developer Tools That People Remember
slug: developer-tools-that-people-remember
date: 2026-08-12
status: published
tags: [developer-tools, ux, product]
intro: Developers do not adopt tools because they are powerful. They adopt tools that let them stay in flow. Everything else is a tax.
references:
  - label: "kit: a CLI that treats errors as an interface"
    url: kit
---

# Developer Tools That People Remember

Developers do not adopt tools because they are powerful. They adopt tools that let them stay in flow. Everything else is a tax.

I spend a lot of my time building and using developer tools. Over that time I've formed a strong opinion: the tools developers remember are not the most featureful. They are the ones that respect the developer's attention, that get out of the way at exactly the moments that matter.

## Flow is the product

A developer's most expensive asset is a state of concentration. It takes ten or twenty minutes to build, and it is destroyed instantly: by a wall of confusing output, an error that doesn't say where it happened, a command that silently does the wrong thing.

Great developer tools treat flow as the product. They fail loudly but briefly. They put the answer in the first line of output. They never make the developer ask "wait, what happened?" twice.

The inverse is also true. A tool that interrupts flow even once a day is worse than a tool with fewer features that never does. Feature count is easy to measure; disruption is what decides whether the tool survives in anyone's workflow.

## Errors are the interface

When a tool works, the developer ignores it. When it fails, the developer reads every word. That means the error message is the most important surface of the tool, and the one most tools neglect.

I built kit around this. Every error it emits answers four questions, in order: what went wrong, where, what the developer should do about it, and what happens if they don't. The first time I shipped an error that was just the raw exception text, a beta tester replied with a screenshot and a one-word review: "what?" That was the day error messages became a first-class feature.

![The error message is the interface: what, where, what to do](/diagrams/diagram-error-message.svg)

A good error message answers four questions, in order: what went wrong, where, what the developer should do about it, and what happens if they don't. Most tools answer the first one, vaguely, and stop. The difference between "Error: unable to connect" and "Could not reach api.example.com on port 443. Check that the token is set and the network allows outbound connections." is the difference between a frustrating afternoon and a ten-second fix.

## Defaults are opinions

Every default value a tool ships is a claim about how its users should work. I've learned to make those defaults deliberately, because almost everyone keeps them. The convention a tool ships is the convention its users live with.

kit's first release shipped one default I came to regret: it overwrote a config file in place on a command that most people ran twice a day. Nobody asked for a warning. When I added a `--dry-run` flag that previews the rewrite, the change was small and the trust it restored was large.

Good defaults are conservative: they fail safe, they don't overwrite, they explain before they modify. When a tool does something surprising by default (reformats your code, changes your permissions, deletes a branch), it has broken trust with the one audience least tolerant of surprises.

## Delight lives in the details

The tools developers remember fondly share small moments of consideration: a progress bar that doesn't lie, a `--help` that actually helps, a dry-run flag that previews destructive actions, sensible tab completion. None of these are features. All of them are respect.

I look for those moments when I build tooling. What is the action most likely to be run accidentally? Preview it. What is the state most likely to be confusing? Print it. What is the command most likely to be mistyped? Suggest the correction. These details are cheap to add and are disproportionately what people remember.

## Fast is a feature, not a preference

Latency in a developer tool is not a speed issue; it's a context issue. Every extra second of waiting is a second spent not thinking about the problem. In aggregate, a slow tool is a tax on every developer who uses it, every day, forever.

Speed is the one performance area where developers are trained to be ruthless, so it pays to be ruthlessly good at it. Cache aggressively. Lazy-load. Make the common path fast and correct, and let the uncommon path be slightly slower. A tool that responds instantly is a tool that gets used.

## Tools are judged by the work they remove

The tools that endure are the ones that remove work: not work from a spec, but work from a day. They replace a recurring, tedious, error-prone task with something reliable. They don't add ceremony; they subtract it.

That's the test I apply to my own tooling. If I can't name the task it removes from someone's day, I don't build it. And when I do build it, I measure it by the same standard, not by features shipped, but by friction removed.

## Takeaway

Build tools that respect attention: put the answer in the first line, make errors actionable, choose defaults as deliberate opinions, and spend effort on the small moments of consideration. A tool is remembered for the work it removes from a developer's day, not for the features it adds.
