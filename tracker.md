# Tracker: industry applications

One row per application. **This file is the thing that stops applications from
quietly dying.** A tracker that lags stops being consulted, and then follow-ups stop
happening, and a surprising share of interviews come from follow-ups.

Update it the day something happens, not the week after.

**Statuses**: `drafted` -> `staged` (form filled, awaiting your Submit) ->
`applied` -> `acknowledged` -> `screening` -> `interviewing` -> `offer` /
`rejected` / `gone quiet` (follow-up date passed by a week or more with nothing
back) / `closed before sending` / `withdrawn`.

**This file holds in-flight applications only.** Rejected, gone-quiet,
closed-before-sending and withdrawn rows move, verbatim, to `tracker-archive.md`,
which opens with a compact dedupe index that `discover` and `outreach` both read.
**The row moves in the same edit that records the outcome**, and "an archive pass"
sweeps up anything that was missed. Nothing is deleted. **Gone quiet is not
rejected**: nobody has said no. If an archived application ever answers, move its
row back here rather than replying from the archive.

**A `drafted` row with a deadline ends one of two ways**: it is sent, or you decide
not to send it and the row says so. A drafted application that simply expired is the
worst outcome this file can record.

Record what came back as well as what went out: the acknowledgement's sender and
time, and the employer's own wording when they reject. "Rejected" with their reason
quoted is worth ten rows that just say "rejected".

| Company | Role | Applied | Source | Status | Next action | Follow-up date | Folder |
|---|---|---|---|---|---|---|---|

## Follow-up rules

- **First follow-up**: about 2 weeks after applying, unless the posting states a
  timeline. One short message, as a reply in the existing thread where there is one.
  Reference the role and the date you applied.
- **Second follow-up**: none, in most cases. If they did not answer twice, they have
  answered.
- **If they said in advance that they do not give feedback**, the follow-up is to
  wait longer, not to write.
- **If no address exists**, the follow-up is a phone call with a script, not an email
  to a guessed address. A follow-up that bounces is worse than none.
- **After an interview**: a short thank-you within 24 hours, and a follow-up on
  whatever date they told you to expect news, plus two days.
- Every follow-up gets logged in the application's own `notes.md`, not only here.

## Interviews scheduled

| Company | Role | Stage | Date and time | Format | Who | Prep done? |
|---|---|---|---|---|---|---|

<!-- When one lands, open a `prep/` folder inside the application folder: see
     applications/README.md. If the invitation does not state the format, ask, and
     prepare a short presentation anyway in case the answer comes late. -->

## Outcomes worth remembering

<!--
  Rejections that told you something, offers you declined and why, feedback you
  were given. This is the only place the hunt accumulates knowledge about itself.

  Specifically worth recording:
  - any rejection that INVITED a later approach, or said the application stays valid
    for a period. That is not a permanent block, and outreach checks this file
    before dropping a company.
  - the stated reason, in their words. When several rejections name the same thing
    (years, a language, a platform), that is the thing to go and fix, or the thing
    to stop applying against.
  - automated screens: a rejection minutes after submission is a knockout rule, not
    a judgment, and it tells you what that employer filters on.
-->

| Date | Company | Outcome | What it told you |
|---|---|---|---|
