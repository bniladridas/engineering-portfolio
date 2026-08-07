---
title: Authentication — a foundation, not a feature
slug: authentication
date: 2026-06-18
topic: authentication
---

# Authentication — a foundation, not a feature

Auth is the one subsystem where a quiet mistake is expensive: it fails at 2 a.m., at scale, in a way that violates user trust and looks indistinguishable from a feature bug. The design that survives is the one that treats auth as a foundation — decided once, changed rarely, documented thoroughly.

## Three subsystems, one contract

The auth service splits into three parts with a stable interface between them:

1. **Credentials** — how users prove who they are. Password hashing (argon2id), plus the decision tree for when to allow other methods (TOTP, passkeys).
2. **Sessions** — how the service remembers who you are. A short-lived access token for each request, a longer-lived refresh token for re-authentication, and explicit rotation rules.
3. **Policy** — what you may do. Scope checks on every request, never just at login.

The contract is the token. Everything else — storage format, hashing rounds, session table schema — can change behind it, as long as the token model stays stable.

## The token model

Access tokens are short-lived (15 minutes) and stateless: signed, verifiable without a database hit. Refresh tokens are long-lived (30 days), stateful, and revocable. The asymmetry is deliberate:

- **Short access lifetime** limits blast radius if a token leaks.
- **Stateless access checks** keep the hot path fast and the service horizontally scalable.
- **Stateful refresh tokens** give the service an off switch — a revoked refresh token ends the session even if a client keeps its access token.

Rotation is non-negotiable: a refresh token is used once, a new one is issued, and the old one is invalidated. If a rotated token is ever reused, that's a replay signal worth revoking the whole session family.

## What session lifetimes really mean

Sessions and tokens get conflated. The session is the user's logged-in state; the tokens are just its carriers. Session lifetime is a product decision ("stay logged in" vs "log in every morning"), and it should be a single number the service can change without touching token code. Token lifetimes are a security decision, and they should live beside the signature key, not inside feature code.

## The rules that stick

- Passwords are never stored, recoverable, or logged. Argon2id, salt per user, no exceptions.
- Auth failures are indistinguishable in their responses — "no such user" and "wrong password" return the same shape, to deny account enumeration.
- Rate limiting applies per credential, per IP, and per account. Any auth path without a rate limit is a bug.
- Every auth event is logged with an id, a timestamp, and a reason — but never with a password, token, or session id.

The last rule is what makes the rest of the system debuggable. When support asks "why did this session end?", the answer is a log line with a reason, not a mystery.
