---
title: API design — nouns, pagination, and the contract
slug: api-design
date: 2026-07-23
topic: api-design
---

# API design — nouns, pagination, and the contract

An API is a promise to every client that will ever call it, and clients outlive engineers. The design work is deciding the shape of that promise — and making the shape so boring that nothing about it surprises a caller.

## Nouns and verbs

Resources are nouns, and methods are the standard verbs. `GET /users`, `POST /users`, `PATCH /users/{id}`. The moment a design reaches for a verb in the path — `/getUsers`, `/createUser` — it's a sign the resource model is missing a noun. The noun is the unit of caching, of permission, of rate limiting; when the verb is in the path, all three get murkier.

## Pagination is the contract

Lists are never unbounded, and the pagination shape is part of the API's contract. Cursor-based pagination is the design that survives: a stable cursor (`?cursor=...`) instead of page numbers, because pages shift as data changes. The response shape is fixed — `items`, `next_cursor`, and `has_more` — and clients treat an absent `next_cursor` as the end of the list. Changing a pagination shape later is a breaking change nobody is happy about.

## Idempotency and retries

Distributed systems retry, and retries must not double-charge or double-create. Mutations accept an `Idempotency-Key` header; the server remembers keys for a window and returns the original response on replay. The rule is simple: *a retry must be safe*. If a client can't retry a `POST` safely, the API has a design bug.

## Versioning and the contract

The version lives in the URL (`/v1/users`), and the semantics are clear: a new version is a new contract, old versions are retired on a schedule, and deprecation is a documented, dated, announced event. No silent behavior changes within a version. "Slightly different semantics in v1" is how API trust dies.

## The rules that stick

- Paths are nouns and ids; verbs stay out of the URL.
- Every list is paginated with cursors, and every client gets the same shape.
- Mutations accept idempotency keys; retries are always safe.
- Errors are structured — a code, a message, and machine-readable details — and documented alongside the endpoints.
- A breaking change is a new version, never a silent tweak.

The contract is the product. Everything else — the code, the docs, the clients — is just living up to it.
