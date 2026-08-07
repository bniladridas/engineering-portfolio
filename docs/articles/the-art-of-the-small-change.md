---
title: The Art of the Small Change
slug: the-art-of-the-small-change
date: 2026-08-05
status: published
tags: [engineering-practice, workflows, review]
intro: Big changes are hard to review, hard to roll back, and hard to reason about. The small change is the unit of safe engineering.
references:
  - label: Palmshed PR #30 — structure change, then behavior change, in two commits
    url: palmshed/pull/30
---

# The Art of the Small Change

Big changes are hard to review, hard to roll back, and hard to reason about. The small change is the unit of safe engineering.

I used to think a skilled engineer was someone who could land large, ambitious changes in a single move. I was measuring the wrong thing. The engineers I most respect ship the same amount of work as everyone else — in pieces small enough that nothing can break quietly.

## Why big changes break silently

A large change combines many separate decisions: a new data model, a refactor, a feature, a migration. If something goes wrong, every one of those decisions is a suspect. The blast radius covers unrelated behavior, the review takes hours, and the rollback takes a full day.

Small changes isolate variables. One change, one decision, one review. When it breaks, I know immediately what to look at. The diff is small enough that a reviewer can actually check it, and small enough that I can reason about it completely.

## The size of a change is a design decision

Splitting work into small changes is not a scheduling accident. It is a design decision, made deliberately, and it often requires designing the intermediate states.

The change that taught me this was adding layered config to Palmshed. It was one feature, and my instinct was to write it as one PR. Instead, I split it the way I'd split a dependency:

1. First PR: rename the config type and move it into its own module. Zero behavior change. Reviewed and merged on its own.
2. Second PR: add the file layer on top of the existing defaults. One new behavior, landing on clean seams.

Two small, individually reviewable diffs. The first one looked trivial — which is the point. The second one was small enough that a reviewer could actually check the precedence logic instead of skimming past it.

![Split the change — structure first, behavior second, and the repo stays green the whole time](/diagrams/diagram-small-change.svg)

The technique that unlocks this is finding the seam where the work can be divided. Usually the seam is a behavior change versus a structure change. Rename first, in one commit, with no behavior change — review that, merge it. Then change the behavior in the next commit. Two small, reviewable, individually reversible changes instead of one scary diff.

## Land in stages that always work

The goal is not "eventually correct." The goal is correct at every intermediate step. Every commit should leave the codebase in a working state, because that's what makes each commit independently safe to review, revert, and bisect.

This is a discipline. It means I sometimes hold a tempting cleanup until after the behavior lands. It means I write the code, then find the places where it can be broken into verifiable steps, then re-apply the steps in order. The output looks simple; the work was in finding the seams.

## Reviewability is a feature

Code review is the cheapest safety net an engineering team has, and its effectiveness is a function of diff size. Reviewers read small diffs closely and large diffs skimmingly. A 400-line diff gets a rubber stamp; a 40-line diff gets actual scrutiny.

By keeping changes small, I'm not just protecting myself. I'm making my reviewer's time effective. I'm asking for real feedback instead of consent. Teams that enforce small diffs produce better code per hour of review than teams that review enormous ones, and the quality gap compounds.

## The small change in practice

My practical habits are unglamorous:

- **One concern per commit.** If a commit needs two paragraphs in the message, split it.
- **Structure before behavior.** When a change is both, land the structural half first, alone.
- **Roll forward, not back.** If a small change goes wrong, the fix is another small change — the whole point is that nothing ever breaks enough to need a heroic revert.
- **Ship the boring part first.** The parts that are easy to describe and verify become the commits that keep the review short.

## Small changes build confidence

The quiet superpower of small changes is trust. Over time, my own code and the code of the teams I work with earn a reputation: changes are safe, reviews are meaningful, and history is readable. That trust changes how people behave. They stop guarding against regressions and start shipping improvements.

That is the compounding return of the small change. It doesn't just protect today's deploy. It builds a codebase and a team where change is cheap — and cheap change is the entire game.

## Takeaway

Make every change small enough to fully understand, review, and revert. Split structure from behavior, and land every intermediate step in a working state. Treat diff size as a design decision. Small changes don't just reduce risk; they build the trust that makes a team fast.
