---
title: Testing — the pyramid is a strategy, not a picture
slug: testing
date: 2026-08-06
topic: testing
---

# Testing — the pyramid is a strategy, not a picture

The test pyramid is usually drawn as a diagram and skipped as a policy. The point isn't the shape of the pyramid; it's the *cost structure*. Unit tests are cheap and instant, integration tests are slower and need fixtures, end-to-end tests are slowest and flakiest. A healthy suite spends its money where it buys the most confidence per second.

## The three layers and their jobs

- **Unit tests** prove a piece of logic is correct in isolation: a parser, a merge function, a validator. They run in milliseconds and are the place for the table tests that encode rules — precedence, boundary cases, error shapes. This is where most coverage should live, and where it's cheapest to keep it.
- **Integration tests** prove the pieces agree on their interfaces: a loader with the real file system, a service with a real database. This is where contract bugs live — the unit tests on both sides pass while the wiring between them is wrong.
- **End-to-end tests** prove the user's journey works: run the CLI, see the output, check the exit code. They're the fewest, the slowest, and the most valuable *signal*, but the least valuable *breadth*. E2E is for proving the seams hold, not for coverage.

The ratio falls out of the cost structure: most tests are unit, some are integration, a handful are end-to-end. A suite with 800 E2E tests isn't thorough, it's slow — and slowness is the start of a death spiral where tests stop being run.

## Tests as documentation

The most underrated property of a good test is that it documents intent. A table test named `flag beats environment beats file` is documentation that cannot rot, because it fails the moment the behavior drifts. Tests that encode policy — precedence, idempotency, secret handling — are the written policy made executable. They're how a rule survives the engineer who wrote it.

## The rules that stick

- Table-driven tests for rules; one assertion per behavior; name the behavior in the test name.
- Integration tests use the real interfaces, not mocks of everything. A mock of the thing under test is a test of nothing.
- E2E stays small and covers journeys, not edge cases — the edge cases belong at the unit layer.
- Tests are part of the review. A change that renames a behavior without renaming its test is a change that lies.
- Flaky tests are bugs, not weather. A suite that randomly fails teaches engineers to ignore it, and a suite that gets ignored is worth nothing.

A test suite is a second codebase maintained by the same people. Designing it as strategy — not as a diagram — is what keeps it alive.
