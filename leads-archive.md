# Leads: archive

Closed-out and stale leads, moved here from `leads.md`. **Nothing is deleted. Every
row below is the full, verbatim row as it stood in `leads.md`**, including the
verification reasoning, which is the part worth keeping: it is the record of why a
lead was killed, and it exists so the same dead posting is not verified a third
time.

Why this file exists at all: a leads file that keeps every row grows until reading
it costs more than the sweep does, and most of what it then holds is closed out. A
one-off split of a file that size is a chore, so do it continuously instead:
`discover` moves rows at the end of each sweep.

## What lives here

- **dropped**: verified and rejected on a gate (language, years, location,
  clearance, content), or found dead at source.
- **applied**: an application was sent. The live record is the row in `tracker.md`
  or `tracker-archive.md`; the lead row is kept for its scoring and verification
  history.
- **stale**: scored and never pursued, and older than about two weeks. **These were
  never verified as dead.** They are parked because a posting has a shelf life of
  roughly one to two weeks. If one is ever revisited, **re-verify at source before
  spending anything on it**; do not trust the score or the status as still true.

## Dedupe index

**This table exists so that `discover` and `outreach` can check history cheaply,
without reading the full rows below.** `discover` dedupes on URL and on company plus
role, and both are here. A hit means the lead has been seen: read its full row
before scoring it again, because the reason it died is usually still true.

One line per archived lead, newest first. Keep the status cell short.

| Found | Company | Role | Score | Outcome | Status (one line) | URL |
|---|---|---|---|---|---|---|

## Full rows

<!-- The verbatim rows, in the same column layout as leads.md, newest first. -->

| Found | Board | Role | Company | Location | Score | Why (and verified where, when) | Deadline | Status | URL |
|---|---|---|---|---|---|---|---|---|---|
