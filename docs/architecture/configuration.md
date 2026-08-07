---
title: Configuration — a layered decision process
slug: configuration
date: 2026-06-25
topic: configuration
---

# Configuration — a layered decision process

Configuration is the part every user touches and the last thing they understand. The design principle that survived every change: configuration is a *decision process*, not a data structure. Precedence is the policy; the merged data is just its output.

## The pyramid

Four sources, in a fixed order. Higher wins:

1. **Flags** — per-run. Highest precedence; they exist for exactly one invocation.
2. **Environment** — per-machine, and the only layer where secrets live.
3. **File** — per-project, checked into the repo.
4. **Defaults** — baked into the tool; the floor that makes every other layer optional.

The ordering rule generalizes: *short-lived sources beat long-lived ones*. Any new source — a remote team config, a user-level file — slots into the pyramid by answering one question about its lifetime.

## Loader as named steps

The loader is three functions whose names are the map of the behavior: `merge_layers` (apply precedence bottom-up), `validate` (the real user interface), and the orchestrator that calls them. Validation is the heart — it's where every user-facing decision lives. Merging is a few dictionary updates.

## The surprising decisions

- **Layers replace, never merge or append.** A higher layer replaces a whole nested section; arrays replace wholesale. Predictable beats clever.
- **The loader takes a string, not a path.** The config layer is parsed content, and its provenance (file, URL, environment) belongs to the caller. A "helpful" refactor that narrows the parameter to a path would quietly delete the URL and CI cases.
- **Secrets and precedence align.** The layer that wins over the file is the layer where secrets are allowed to live. If the file outranked the environment, a committed config could silently override a secret.
- **Errors are the interface.** Config errors show the value, point at the file and line, and offer the escape hatch — "run with `--flag` to override this file for this run only."

## Inspectability

`--show` prints the resolved tree with each value's source: `format json (flag)`, `output_dir ./dist (file, line 12)`. Secrets render redacted. Trust is built by showing the process, not just the result.

The full account — including the schema lifecycle and the tests that encode precedence — is in the flagship article, *Designing a Configuration System*.
