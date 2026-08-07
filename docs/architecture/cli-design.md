---
title: CLI design — the interface is the product
slug: cli-design
date: 2026-07-02
topic: cli-design
---

# CLI design — the interface is the product

A CLI has no dashboard to hide behind. Every decision is visible in the first five seconds a user spends with it: the help output, the error message, the exit code. Those five seconds decide whether the tool gets a second chance.

## The contract

A CLI's contract has four parts, and all four are part of the design, not afterthoughts:

- **Exit codes.** 0 for success, 1 for failure, 2 for usage errors, 3 for configuration errors. A script that calls the tool can act on the difference between "you called me wrong" and "your environment is broken."
- **Help.** `--help` must be generated from the same definitions that parse the arguments, so it cannot drift. If a flag exists in help but not in code, the help is a lie.
- **Errors.** Every error message answers three questions: what broke, where, and what to do about it. First line of output, every time.
- **Output.** Machine-readable output is a feature. `--json` is not a debug flag; it's how the tool composes with other tools.

## The rules that stick

- **Do one thing, name it a verb.** `palmshed build`, not `palmshed --action=build`. Commands are verbs; flags are adverbs.
- **No prompts in a pipeline.** A tool must never hang waiting for input when its stdout is not a TTY. If a prompt is needed, it fails fast with an error telling the caller to pass the flag.
- **Progress goes to stderr.** `stdout` is data; `stderr` is the story. Piping the tool into `jq` must not surface progress bars.
- **Errors are the interface.** The error message is where users learn the tool's mental model. "Invalid value for format" teaches nothing; "format must be one of json, yaml, toml — got json5" teaches the model.
- **Defaults are conservative.** Nothing is overwritten, nothing remote happens without opt-in, and the tool never mutates the user's config.

## The escape hatch

The most important design element is the one users reach for when stuck: a flag that overrides the config file for one run. The escape hatch turns a blocked user into an unblocked user, and it teaches the layering model at the exact moment it matters.

CLI design is product design. The commands, the help text, and the errors are the whole user experience — they deserve the same attention as any feature.
