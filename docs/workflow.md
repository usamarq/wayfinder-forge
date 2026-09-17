# The loop

How this repo is actually used, once setup has run. Read it once; after that the
skills prompt you.

## The four moves

```
discover <board>         find and score roles      -> leads.md
tailor <company>         CV + letter + gaps        -> applications/<company>-<role>/
apply-assist <company>   fill the form, then stop  -> you press Submit
outreach                 cold approaches           -> you press Send
```

The academic track has the same shape: `discover-academic`, `tailor-academic`,
`outreach-academic`, and the same `apply-assist`.

## A week that works

**Monday, 30 minutes: sweep.** Run `discover` on one or two boards. It reads three
pages per query, scores everything against your rubric, and appends what survives to
`leads.md`. Six to ten leads from a good sweep is normal. Zero is information too:
if three sweeps in a row return nothing, your criteria or your queries need a look,
not more sweeping.

**Monday, 15 minutes: triage.** Read the leads. Mark the two or three worth
pursuing. Say why you dropped the rest, in four words each: those reasons are what
sharpen the rubric.

**Monday, 20 minutes: verify.** Ask for a verify pass on the ones you marked. A
results card is a lead, not a fact: it hides years bars, language requirements and
knockout questions, it shows cities the job is not in, and a promoted card can point
at a requisition that has already closed. Expect a large share of fresh leads to die
the moment they are read on the employer's own page. That is twenty minutes well
spent against two hours of tailoring for a job that was never yours to get. The ad gets saved verbatim during
this pass, while it is on screen.

**Tuesday and Wednesday: tailor.** One application at a time, and soon: a posting
has a shelf life of about one to two weeks, and a lead left for a fortnight is
usually dead by the time you come back to it. `tailor` maps every requirement to
evidence in your CV, names the gaps, writes both CVs and the letter, compiles all
three, and tells you the single weakest point.

The letter opens with what draws you to that company's work, and by default the
assistant writes that opening itself, from what the company says it builds and one
true thing in your CV. Read it, and replace it with your own words wherever you have
them: a real incident from your own work is what separates your letter from the
machine-written pile, and no amount of polish substitutes for it. Give feedback in
as many rounds as you like; each round is logged.

**Read the weakest point before you read anything else.** It is the most useful
sentence the whole system produces. Sometimes it says "this application should not
be sent", and that is a good outcome: you got the answer for twenty minutes of work
instead of two hours.

**Thursday: apply.** `apply-assist` per application. It opens the portal, fills what
it can source honestly, attaches the right PDF, flags what only you can answer, and
stops. You read the fill map, fix anything, and press Submit. Two fields are always
yours. **Salary**: if the ad publishes a band, the handover tells you the band and
suggests a figure at or just above its floor, because a standing range written for
ads that publish nothing will bid under the employer's own starting point.
**Consent boxes**: every one of them, every time.

**Friday, 20 minutes: follow up and outreach.** Check `tracker.md` for follow-up
dates that have come due, and ask for "an archive pass": anything closed out
(rejected, gone quiet, closed before sending, withdrawn) moves into
`tracker-archive.md`, so the tracker stays a list of what is still actionable. Then
one small `outreach` batch: five to eight companies, each with a real hook, staged
as drafts in your own mail client for you to send. Expect the best target in any
batch to accept applications only through a form, not by email; those get queued
for `apply-assist` instead. And be clear-eyed about what outreach buys: when nobody
on your list is hiring for what you do, it does not find hidden vacancies, it makes
you known before the next hiring cycle.

That is roughly six to ten hours a week and it produces four to six sharp
applications. Forty generic ones would take the same time and work worse.

## What to do first, in week one

1. Run one `discover` sweep, even if the criteria are not perfect yet. A real
   results list tells you more about your criteria than another hour of editing them.
2. Tailor one application end to end, including the compile. You will find out
   whether LaTeX works, whether your CV has the numbers it needs, and what the
   letter sounds like in your voice.
3. Fix `MASTER_CV.md` with whatever that exposed. This is the highest-value hour in
   the whole first week, and it pays out on every application afterwards.

## The failure modes

**Tailoring from a card.** The results list said "Senior", your city, and nothing
about language. The employer's page says eight years, another country, and a
required yes/no on fluency. Verify first.

**A number nobody added up.** "About N years of experience" is a claim, and the only
honest source for it is the dates in your own CV, added up. A remembered round
number travels into the CV summary, the criteria, the answer bank and every form,
and an application that carried it cannot be recalled. Setup does the arithmetic once and writes it
into `MASTER_CV.md`; the same goes for a language level, which is copied from the
certificate rather than converted from a score in your head. When something like
this does turn out wrong, `CLAUDE.md` has the procedure ("When a fact turns out to
be wrong"): fix the source, sweep every reusable file, leave what was sent as it was
sent, and fix any live application whose portal still allows it.

**The draft that lapsed.** An application drafted against a deadline ends one of two
ways: you send it, or you decide not to and that gets written down. The third
ending, where it simply expires in the folder, costs the whole effort and teaches
nothing.

**Batching.** Ten applications on one afternoon means ten letters with the same
argument. The hook is per-company by construction; if two letters could be swapped,
both are too generic.

**A lagging tracker.** Update `tracker.md` the day something happens. A tracker that
lags stops being consulted, and then follow-ups stop happening, and follow-ups are
where a surprising share of interviews come from.

**Arguing with the gap list.** When `notes.md` says a requirement is a gap, that is
the honest inventory the letter then gets written from. It is what lets the letter
be confident without being false. Fix it by learning the thing, or by choosing a
different role, not by rewording it.

**Skipping the liveness check.** A requisition tailored on Monday can be closed by
Thursday. `apply-assist` checks first, and it should: a closed posting wastes the
whole run and can sit in the tracker looking like a live application forever.

**Letting the criteria drift silently.** If you keep overriding the rubric to pursue
leads it scored at 2, the rubric is wrong. Change it deliberately and date the
change, rather than overriding it every week.

## Keeping the repo useful over time

Three files repay every minute you put into them:

- **`boards.md`**: the URL recipe and the quirks of every board you sweep. This is
  what makes the tenth sweep fast.
- **`answer-bank.md`**: every form question you have answered carefully once. This
  is what stops you answering it carelessly at 11pm against a deadline.
- **`tracker.md`'s outcomes table**: what each rejection actually told you, in the
  employer's own words. It is the only place the hunt accumulates knowledge about
  itself. When three rejections name the same thing, that is the thing to fix, or
  the thing to stop applying against.

And two that keep it fast: **`leads-archive.md`** and **`tracker-archive.md`**. The
live files hold only what is still actionable; everything closed out moves to the
archives verbatim, each behind a compact index that the sweeps read, so a posting
this repo has already killed is never verified a third time. Nothing is deleted.

Commit and push after every batch. Nothing here should live on one machine only.

## When it is going badly

Sweeps returning nothing, applications returning nothing, three weeks in. The
diagnostic order that usually finds it:

1. **Are the leads real?** If `discover` finds nothing, the queries are too narrow
   or the market is thin. Widen one tier, or add a board.
2. **Are the applications going out?** Count `tracker.md` rows with status `applied`.
   If tailored applications are sitting at `drafted`, the bottleneck is the apply
   step, not the search.
3. **Are the gaps real?** Read the last five `notes.md` files together. If the same
   requirement is a gap every time, that is not bad luck, it is the thing to go and
   learn.
4. **Is the CV the problem?** If applications reach humans and stop, the letter and
   the CV are the surface to work on. If they never reach humans, it is the ATS
   version, the keywords, or the roles you are choosing.

Ask for this read explicitly: "look at my last ten applications and tell me what is
not working". It is a better use of an hour than ten more sweeps.
