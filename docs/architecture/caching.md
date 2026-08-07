---
title: Caching — layers, TTLs, and the two invalidation rules
slug: caching
date: 2026-07-30
topic: caching
---

# Caching — layers, TTLs, and the two invalidation rules

Caching is the only correctness problem that's also a performance feature. The systems that do it safely treat cache invalidation not as a tactic but as two explicit rules, written down, so that every cache in the system is governed by the same policy.

## The layers

Caches appear at every layer, and each one answers a different question:

- **Client** — the browser or app cache. Cheap, wrong the moment someone else changes the data.
- **Edge** — a CDN. Great for public, slow-changing content; dangerous for anything per-user.
- **In-process** — per-instance memory. Fastest possible hit, invalidated by nothing except TTL and restarts.
- **Shared** — a service like Redis. The source of truth for hot keys, and the one cache that can actually be invalidated on write.

The ordering insight: the cheaper the cache, the harder it is to invalidate. So the policy cannot be "invalidate correctly at every layer." The policy is *where invalidation is allowed to happen*: only at the shared layer, by the writer, on write. Everything above it relies on TTLs and version keys.

## The two invalidation rules

1. **The writer invalidates.** The code path that mutates a record is the only code path that deletes or versions its cache entry. If a read path can invalidate, you get races; if the writer forgets, you get staleness forever.
2. **Version the key, don't trust the value.** `user:123:v3` — the version is part of the key. When a write happens, the version bumps and the old key becomes garbage. This sidesteps the whole class of "the cached object is stale but looks fine" bugs, because a new version is a new key and a new miss.

## TTLs are a floor, not a plan

TTLs make staleness bounded, and every cache entry needs one — a cache with an unbounded lifetime is a bug waiting for a user to notice. But a TTL is not the invalidation strategy; it's the last line of defense when a write path forgot its rule. The invalidation is the version bump; the TTL just caps how wrong the world can get.

## The rules that stick

- The writer invalidates, always, and it happens in the same transaction as the write.
- Every key is versioned; a write bumps the version.
- Every entry has a TTL, and the TTL is a safety net, never the plan.
- Per-user data never lives at the edge; per-request data never lives anywhere.
- Cache behavior is observable: hits and misses are metrics, and a "why is this stale" question is answered by the version, not a guess.

Cache invalidation is not a hard problem because the mechanics are hard. It's hard because it's a discipline — and like every discipline, it survives only when it's written down.
