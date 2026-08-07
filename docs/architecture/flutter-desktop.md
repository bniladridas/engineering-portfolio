---
title: "Flutter desktop: one codebase, desktop discipline"
slug: flutter-desktop
date: 2026-07-09
topic: flutter-desktop
---

# Flutter desktop: one codebase, desktop discipline

Flutter's strength on desktop is the same thing that makes it dangerous: one codebase for every platform. The discipline that makes it work is deciding, up front, where the codebase is *allowed* to diverge.

## The split that matters

The codebase has three zones:

1. **Core**: pure Dart, no platform dependencies. This is where the product logic lives: state, commands, domain rules. It is testable on a laptop in milliseconds and runs identically on every platform.
2. **Shell**: the Flutter layer. Widgets, navigation, theming. Mostly shared, but allowed to diverge where platform idioms demand it (menu bar on macOS, window management on Windows).
3. **Platform channels**: the thin boundary where Dart meets native: file dialogs, window size, system tray. Every call crosses this boundary through one typed interface, and nothing below it knows the platform.

The rule is that the arrows point one way: Core never imports Flutter, Shell never reaches for platform APIs directly, and Platform channels are the only place `dart:io`-adjacent code lives. When someone asks "where do I put this?", the answer is never ambiguous.

## Desktop is not mobile with a bigger screen

The mistakes come from porting mobile habits:

- **Windows are multiple.** A desktop app can legitimately have several windows, and a long-lived background process. State management has to be ready for that; a single app-level state object quietly breaks the second window.
- **Menus and shortcuts are the interface.** A desktop app that ignores the OS menu bar and global shortcuts reads as unfinished, no matter how polished the UI.
- **Closing is not a test.** Apps get killed, windows get closed without clean-up, and disk state must survive both. Flush-before-close is a discipline, not a feature.
- **The mouse changes everything.** Hover, tooltips, right-click, focus: a desktop app that only responds to taps feels like a tablet app in a window.

## The rules that stick

- Keep Core platform-free and test it like a library, not like a UI.
- Cross every native boundary through a typed, single interface.
- Write a document that names the three zones, so the split survives contributors.
- Smoke-test the "killed mid-run" path on the desktop target early: the recovery code is the code that's hardest to add later.

The payoff is one codebase and real desktop behavior, in exchange for the discipline of keeping the zones honest.
