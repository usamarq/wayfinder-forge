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

**Tuesday and Wednesday: tailor.** One application at a time. `tailor` saves the ad,
maps every requirement to evidence in your CV, names the gaps, writes both CVs and
the letter, compiles all three, and tells you the single weakest point.

**Read the weakest point before you read anything else.** It is the most useful
sentence the whole system produces. Sometimes it says "this application should not
be sent", and that is a good outcome: you got the answer for twenty minutes of work
instead of two hours.

**Thursday: apply.** `apply-assist` per application. It opens the portal, fills what
it can source honestly, attaches the right PDF, flags what only you can answer, and
stops. You read the fill map, fix anything, and press Submit.

**Friday, 20 minutes: follow up and outreach.** Check `tracker.md` for follow-up
dates that have come due. Then one small `outreach` batch: five to eight companies,
each with a real hook, staged for you to send.

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

## The five failure modes

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
- **`tracker.md`'s outcomes table**: what each rejection actually told you. It is
  the only place the hunt accumulates knowledge about itself.

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
