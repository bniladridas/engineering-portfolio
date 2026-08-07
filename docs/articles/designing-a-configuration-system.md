---
title: Designing a Configuration System
slug: designing-a-configuration-system
date: 2026-09-09
status: published
tags: [configuration, architecture, developer-tools]
intro: I spent a month designing kit's configuration system. The rules I ended up with were the opposite of the ones I started with — and the whole design fits on one page.
references:
  - label: kit — the CLI this design is for
    url: kit
  - label: Layered config design note
    url: kit/blob/main/docs/kit_config.md
  - label: Config loader — split into named functions
    url: kit/pulls
  - label: Structure change before behavior change
    url: kit/pulls
---

# Designing a Configuration System

I spent a month designing kit's configuration system. The rules I ended up with were the opposite of the ones I started with — and the whole design fits on one page.

This is the story of that month. It's not a story about parsing YAML. It's a story about how a small system, given enough pressure, reveals the principles underneath it. Configuration looks like the boring part of a developer tool. It is also the part every user touches, and the part most tools get wrong.

## Why configuration is worth a month of thinking

Configuration is the first thing a user sees and the last thing they understand. A tool with a beautiful CLI and an inscrutable config file feels broken, and a tool with a great config system feels inevitable. Users don't praise the config; they just never complain about it. That silence is the goal.

But there is a more practical reason to design it carefully. Configuration is where three different audiences collide, and each one has contradictory needs:

- **The end user** wants to run the tool with as little setup as possible.
- **The developer of the tool** wants a config shape that is simple to parse, validate, and document.
- **The project maintainer** (me, six months later) wants to add fields without breaking anyone.

These three pull in opposite directions. The user wants magic; the developer wants explicitness; the maintainer wants stability. The design that satisfies all three is the design that understands what configuration actually is.

## What configuration actually is

I started with the wrong mental model. I thought configuration was a data structure — a bag of key-value pairs that the tool reads at startup. That model is why so many config systems fail. It treats config as something static, when it is really a *decision process*.

Here is what I mean. When kit runs, it needs to know, say, where to write its output. That answer comes from several places, any of which might provide it:

- A default baked into the tool.
- A setting in the user's config file.
- A value exported in the shell environment.
- A flag passed on the command line.

Each of these sources has a different lifetime, a different audience, and a different failure mode. The defaults are written by me. The file is written by the user, checked into their repo. The environment is set per-machine, and often carries secrets. The flag lives for exactly one run.

Configuration is not a bag of key-value pairs. It is a *layered decision process* — a set of rules that decides, for each setting, which source wins. The data structure is the output of that process. Getting the process right is the entire job.

## The requirement that changed everything

I nearly designed a config system that was a single blob: one file, read at startup, used everywhere. It would have worked. It would also have been wrong, and the clue was a requirement I almost talked myself out of:

> Every setting must be overridable from the command line.

That single sentence is the one that makes configuration a process instead of a data structure. The moment a flag can override a file, you no longer have "the config." You have four sources and a set of rules for combining them. The design question stops being "what shape is the config?" and becomes "what order do the layers resolve in, and what happens when they disagree?"

## The version without a policy

Before the pyramid, I wrote the rules the way most people do: as branch logic inside the loader. Each setting got its own sequence of checks, and the checks were in a slightly different order depending on who had added them last.

```python
# the pre-policy loader, condensed and already rotting
def load_config(args, env, file_path):
    cfg = defaults()
    if file_path and file_path.exists():
        cfg.update(parse_file(file_path))
    if "PALMSHED_OUTPUT_DIR" in env:
        cfg["output_dir"] = env["PALMSHED_OUTPUT_DIR"]
    if args.output_dir:
        cfg["output_dir"] = args.output_dir
    if "PALMSHED_FORMAT" in env:
        cfg["format"] = env["PALMSHED_FORMAT"]
    if args.format:
        cfg["format"] = args.format
    # ... twelve more settings, each with its own dance
    return cfg
```

That code works. It also has no rules. The precedence for `output_dir` lives in the sequence of lines under the `output_dir` block, and the precedence for `format` lives in a separate, parallel sequence. Every setting re-implements the policy by hand, which means every setting can drift from it. Adding a setting meant copying the dance for the thirteenth time — and remembering to get the order right.

The bug that broke the pattern was a corner case: one setting, `cache_dir`, had its environment override *after* its file override (correct), but the flag override was missing entirely (incorrect). It shipped that way for two weeks. The fix was trivial; the *reason* it shipped was structural. The policy wasn't written anywhere, so there was nothing for the code to be inconsistent with — until a user noticed the flag did nothing.

The pyramid is the antidote. One documented policy, applied by one loop:

```python
# the policy, stated once
for layer in (defaults(), file, env, flags):
    for key, value in layer.items():
        out[key] = value   # later layers win, every time
```

Same behavior. But now the order is a list you can read, test, and argue about in one place instead of a scattered set of per-key dances.

## The precedence pyramid

The order I settled on is boring, which is how I know it's right:

1. **Flags** — highest precedence. They exist for one run. Nothing outranks them.
2. **Environment** — per-machine. Carries secrets and CI-specific values.
3. **Config file** — checked into the repo. Stable, reviewable, shared.
4. **Defaults** — baked into the tool. The floor that makes every other layer optional.

![Config precedence in kit — flags beat environment beat file beat defaults](/diagrams/diagram-config-layers.svg)

Each layer overrides the ones below it. Higher wins; the loader applies layers bottom-up.

The order is the policy. Writing it down — in the README, in the design note, in the code — turned precedence from an accident into a contract. When someone asks "why does the flag win over the file?", the answer is not "because that's how I wrote it." The answer is "because flags are per-run and files are per-project, and a run should always be able to override a project."

That reasoning is what makes the pyramid survive new features. Every new config source — a remote config service, a project-level `.palmshedrc`, a user-level `~/.palmshedrc` — slots into the pyramid by asking one question: how long-lived is this source? Short-lived beats long-lived. It's a rule that scales without a special case.

## The loader as three named functions

The first implementation was a single function. It parsed the file, flattened environment overrides, validated required keys, and returned the merged result — forty dense lines, one wall of text. It worked, and I couldn't maintain it.

![Refactoring as a map — a wall becomes rooms with names](/diagrams/diagram-refactor-map.svg)

The refactor split it into three functions whose names are a map of the behavior:

```python
# pseudocode for the kit config loader
def load_config(args, env, file_path):
    base = defaults()
    merged = merge_layers(
        base,
        read_file(file_path),
        env_overrides(env),
        flag_overrides(args),
    )
    return validate(merged)

def merge_layers(*layers):
    out = {}
    for layer in layers:
        out.update(layer)   # later layers win
    return out

def validate(config):
    required = ["output_dir", "format"]
    for key in required:
        if key not in config:
            raise ConfigError(
                f"missing required setting: {key}",
                hint=f"set {key} in {FILE_PATH} or pass --{key}",
            )
    return config
```

Three functions, three jobs, three names. The deleted comment — "parse and merge config, then check required fields" — had been describing exactly what the names now say for free.

The interesting part is what the split revealed. With the code walled off, the *validation* step turned out to be the heart of the system, not the merging. Merging is a few lines of dictionary updates. Validation is where every user-facing decision lives: which settings are required, which formats are legal, what happens when a value is nonsense. I had been treating merging as the point and validation as the cleanup. It was the other way around.

## Merging is not updating

The dictionary update in `merge_layers` is correct for flat keys, and kit's config was initially flat. But "flat config" is a promise you keep until the first nested setting. When the config grew a `search` section — `search.max_results`, `search.fuzzy` — the merge needed a decision, and the naive `dict.update` would have done the wrong thing.

Two merge policies were on the table:

- **Shallow merge.** A higher layer replaces a whole nested section. Setting `search: { fuzzy: true }` at the flag layer wipes out the file's `search.max_results`. Shocking, but simple to reason about.
- **Deep merge.** A higher layer overrides individual keys within a nested section. Setting `search.fuzzy` from a flag preserves the file's `search.max_results`. More convenient, but much easier to get wrong — two layers both setting `search` now interact key-by-key, and the interaction is hard to predict.

I chose shallow merge, and I chose it on purpose. The rule: *a layer replaces a section, it never merges inside one.* The reason is trust. Deep merge sounds friendlier, but it quietly couples layers — the file's `search` block and the flag's `search` block are no longer independent, and the resolved value depends on which keys each one happened to set. Shallow merge means every value's provenance is simple: it came from exactly one layer, whole. That's the same trust argument that drives the `--show` command, and the two decisions reinforce each other.

The array policy is a sibling decision, and it's just as important: **arrays replace, they never append.** If the file sets `exclude = [".git", "node_modules"]` and a flag adds `--exclude build`, the result is `["build"]`, not `["build", ".git", "node_modules"]`. Appending sounds helpful and is a foot-gun: the flag's intent is "exclude *this*", and silently keeping the file's excludes makes the flag mean something it didn't say. Replace, document, move on.

None of this is clever. That's the point. Merging semantics are one of those places where a config system earns its keep by being *un*surprising, and "a layer replaces a section, arrays replace wholesale" is a sentence a user can remember and predict from.

## Validation as the user interface

Here is the rule I ended up with, and it surprised me:

> An error message is part of the interface, and it should be designed like one.

Config errors are the most common errors a CLI user sees, because config is the most common thing they touch. Every one of them is a chance to make the user feel understood or abandoned.

The bad version tells you what broke and stops:

```
Error: invalid value for 'format'
```

The version I shipped tells you what, where, and what to do about it:

```
Error: 'format' must be one of: json, yaml, toml

  Got:    json5
  In:     /Users/me/project/.palmshedrc, line 4

Fix:     change the value, or run with --format json
         to override this file for this run only.
```

Three design decisions went into that message:

1. **Show the value, not just the key.** "Got: json5" is the difference between a known bug and a mystery. The user can see their own mistake immediately.
2. **Point at the file and line.** Config files are checked in; the line number turns a "me or my config?" question into a thirty-second fix.
3. **Offer the escape hatch.** The final line is not decoration. It reminds the user that the config is layered — the flag beats the file — and that they are never stuck on a bad config file.

The third decision is the one most tools skip, and it's the one that makes the layered model visible to the user. The flag isn't just an override mechanism; it's an escape hatch, and users need to know it exists at the exact moment they're stuck.

## The decision that looks wrong from the outside

Every design has one decision that reads as a bug until it's explained. For kit's config, it's this: the loader takes a *string*, not a path.

```python
load_config(config_source, args, env)
# config_source can be:
#   - a filesystem path
#   - a URL
#   - a JSON string injected from the environment
```

A reader of the code would flag that as a design smell. "Why doesn't it just take a path?" The answer is the layers again. The config file is only one source of the config layer — the layer can also come from a URL (for a remote team config) or from an environment-injected string (for ephemeral CI runs). The loader should not care about the source's origin. It cares about the layer, and the layer is a string that can be parsed.

That decision survives precisely because it was written down. Without the note, a well-meaning refactor would "fix" it into a path parameter and quietly remove the URL and CI cases. The note is not decoration; it's what keeps the design from being improved into a bug.

The note itself is one paragraph, and it's the kind of note that reads as obvious until it saves you:

> The config layer is parsed content, not a location. `load_config` accepts JSON, YAML, or TOML as a string, regardless of whether the string came from a file, a URL, or an environment variable. Do not narrow the parameter to a path: the source layer is where that provenance lives, and it belongs to the caller.

That last clause is the load-bearing one. "Provenance belongs to the caller" means the loader doesn't need to know — and shouldn't know — where the content came from. The caller reads the file, fetches the URL, or unpacks the environment variable, and hands over content. The loader parses. That split is what keeps the design open for a remote team config later, and it's invisible until a refactor threatens it.

## Schema evolution: how fields are born

A config format that can't change is a tombstone, so I spent real time on how fields *enter and leave*. The lifecycle is three stages, and each stage has a rule:

1. **Birth — optional with a default.** Every new setting arrives as optional. No exceptions. A field that ships as required was probably optional yesterday, and forcing it into the schema on day one only breaks the users who didn't know it existed.
2. **Adoption — the default is questioned.** Once a setting is in the wild, the defaults get pressure: "make it `true`", "change the default". The rule that saved me here: defaults change only with a deprecation notice, because a silently changed default is the same bug as a changed default with extra steps. Users notice the difference between "I changed it and they didn't tell me" and "the tool changed behavior on me".
3. **Retirement — deprecate, warn, remove.** A setting leaves the same way a public API does. It becomes optional-with-warning, the warning names the replacement, and removal happens a full version later. The whole arc is spelled out in the design note, so every future "let's just delete this" has a home to argue against.

The file format itself got a version field for the same reason. `format_version: 1` on the first release was mocked as over-engineering; it's what lets the loader say "this file is from an older version, here's what changed" instead of producing an unreadable parse error. One integer, and it only ever moves forward.

## Secrets don't live in the file

The environment layer exists for exactly one reason beyond machine variance, and it's secrets. Config files are checked into repos. Checking a secret into a config file means checking it into git history, and git history is forever. So the rule is absolute: the config file never holds a secret, and the loader fails a lint check if a key that looks secretive — anything matching `token|key|secret|password` — is present in the file layer.

Environment variables are the secret home because they're per-machine and never committed. The design consequence is that *precedence and secrecy align*: the layer that wins over the file is the layer where secrets are allowed to live. If the file outranked the environment, a committed config could silently override a secret — the worst possible inversion.

There's a nice knock-on effect. Because secrets can only come from environment or flags, `palmshed config --show` can redact them without ambiguity: any value from a secretive key gets printed as `••••` with its source, never its content. The `--show` command stays useful as a debugging tool precisely because the layer model tells it which values are secrets.

## What changed for users

The design work showed up in the tool in four places, and each one maps to a rule:

- **`--help` lists every setting.** Because the config is documented in code, the help output is generated, not hand-maintained. It can't drift.
- **`--show` previews the resolved config.** Because precedence is a process, it can be shown before it's applied. The user sees *why* a value won, not just that it did.
- **Errors point at the winning layer.** When a setting is invalid, the message says where it came from — file line 4, environment variable, or flag. Debugging a precedence bug becomes a single look, not a guessing game.
- **No surprises by default.** The defaults are conservative: nothing is overwritten, no remote calls happen without opt-in, and the tool never mutates the config file.

The `--show` command is the one I'm proudest of, because it's the layering model made visible. `palmshed config --show` prints the resolved tree with each value and its source:

```
format          json          (flag)
output_dir      ./dist        (file, .palmshedrc line 12)
color           auto          (default)
```

That output turns an invisible design into something a user can inspect. Config systems fail on trust; a `--show` command is the trust mechanism.

## Testing a decision process

A config system is a set of rules, and rules are tested as a table. The precedence tests are literally a table of "sources present" → "which value wins":

```python
@pytest.mark.parametrize(
    "default,file_value,env_value,flag_value,expected",
    [
        # flag beats everything
        ("json", "yaml", "toml", "json", "json"),
        # env beats file and default
        ("json", "yaml", "toml", None, "toml"),
        # file beats default only
        ("json", "yaml", None, None, "yaml"),
        # default when nothing else is set
        ("json", None, None, None, "json"),
    ],
)
```

Every combination is a row. There is no cleverness to it — that's the point. The table *is* the policy written as executable truth, and it's the same table that lives in the README. When someone argues about precedence, they're not arguing with me; they're arguing with a table that fails loudly if it's wrong.

The merge tests are just as mechanical, and they encode the "replace, never append" rule so it can't regress:

- A flag `--exclude build` with a file `exclude = [".git"]` resolves to `["build"]`.
- A flag `search.fuzzy` with a file `search` section resolves to a *whole new* `search` section, not a key-wise merge.
- An environment secret with a file containing a same-named key fails the secret lint.

The last one is the test I'm most attached to, because it tests a *security policy* as behavior rather than as a comment. Deep in the suite, a handful of tests encode the three rules that matter most — precedence, replace-over-merge, secrets-in-env — and none of them can silently drift.

## What I got wrong

Honest accounting: three decisions I'd reverse if I did it again.

**I added too many layers to start.** I shipped defaults, file, environment, and flags at once. That's four layers of complexity on day one, when the tool had one command and a handful of settings. Two layers — defaults plus file — would have covered the first real users, and the rest could have been added when the use case actually appeared. Layering is a process, but it's also a cost, and I paid it before I needed to.

**The first validation schema was too strict.** I required fields that should have been optional-with-sane-defaults. The rule I now keep: if a setting has a default that is *correct for everyone*, it's not required, it's a default. Required is reserved for settings where there is no sensible default at all — the output directory, the format, the things the tool cannot guess.

**I under-designed the "no config at all" case.** kit should be usable with zero config, and for most of the month it wasn't — too many settings lacked defaults. The tool now runs out of the box with a small, correct default set, and the config file is an optimization for the users who outgrow that. A tool that demands config before it runs has already lost the user.

## The principles that survived

Strip away the specifics, and the month reduced to seven rules. I'd apply them to any config system, in any language:

1. **Configuration is a decision process, not a data structure.** Design the precedence, not the shape.
2. **Precedence is a policy, written down.** When the rules are explicit, new sources slot in without special cases.
3. **Short-lived sources beat long-lived ones.** Per-run beats per-machine beats per-project beats baked-in.
4. **Validation is the user interface.** Errors should show the value, point at the source, and offer the escape hatch.
5. **Make the process inspectable.** A dry-run that shows what won, and why, is how config earns trust.
6. **Layers replace; they never merge or append.** Shallow replace is predictable, and predictability is the job.
7. **Secrets and precedence align.** The winning layer is where secrets live, and it's never the file.

The whole design — the pyramid, the three functions, the error format, the merge policy, the tests — fits on one page. That's not a sign of triviality. It's a sign the system is legible, and legibility is what a configuration system is for.

## Takeaway

Design configuration as a layered decision process with explicit, documented precedence. Split the loader into named steps and treat validation — not merging — as the heart. Write error messages that show the value, point at the source, and remind the user that the flag is an escape hatch. Start with two layers, ship inspectability early, and make the whole design fit on one page.