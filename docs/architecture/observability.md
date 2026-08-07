---
title: "Observability: the three signals of a healthy service"
slug: observability
date: 2026-07-16
topic: observability
---

# Observability: the three signals of a healthy service

Observability is not a dashboard. It's the ability to answer questions about a running system you didn't know you'd need to ask, and to answer them from production data, not from intuition. That requires three signals, deliberately designed.

## Logs: the narrative

Logs answer *what happened*. The rule that makes logs useful: every line is a structured record with a timestamp, a level, a trace id, and a reason. A log line without a reason is noise; a reason without a log line is a mystery.

The discipline is choosing what to log. Business events get logged once, at the boundary, with the ids that let an incident be reconstructed. "User session ended" with a session id and a reason beats ten lines of internal debug chatter. The expensive lesson: an incident is only as good as the log lines you chose to write six months earlier.

## Metrics: the shape

Metrics answer *how much*. Counters (requests, errors, queue depth) and histograms (latency, payload size) are cheap to collect and invaluable for detecting a trend before it becomes an outage. The rule is to measure the user-visible outcome, not the internal machinery: request latency, not garbage-collection pauses. Error *rate* matters more than error count; an extra thousand requests is not the same as a thousand errors.

## Traces: the cause

Traces answer *why it's slow*. Every request that crosses a service boundary carries a trace id, and the id threads through logs so the three signals reconnect. A trace id in the log is what turns "it was slow at 2 a.m." into a concrete span you can inspect. Without propagation, the other two signals are disconnected snapshots.

## The rules that stick

- Every log line is structured, timestamped, and carries an id and a reason.
- Errors are logged where they're *handled*, once, with the outcome, not at every layer of the stack.
- Secrets and payloads never appear in logs. Logging a token is a security incident, not a debuggability win.
- A dashboard answers a question, and the question is written on it. "API health" that graphs CPU is a graph, not observability.
- The three signals share one id. If the trace id doesn't flow into the log and the metric, they don't reconnect.

Observability is designed like an interface: the contract is the ids and the structure, and everything else is allowed to change behind them.
