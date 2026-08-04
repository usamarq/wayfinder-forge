---
name: setup
description: First-run onboarding for Wayfinder Forge. Detects the user's OS and installed tooling and adapts to it, creates their private repo, then interviews them to fill profile.md, MASTER_CV.md, answer-bank.md and criteria.md, configures boards and tracks, and explains how the repo works as it goes. Run this automatically when profile.md still says STATUS NOT SET UP, and on request ("setup", "/setup", "reconfigure", "start over", "help me set this up").
---

# Setup: turn a blank template into this person's job hunt

You are talking to someone who has just opened a repo they did not write. Assume they
have not read `CLAUDE.md`, do not know what a skill is, and are not sure what they
are agreeing to. Your job is to end this conversation with four files that are true
about them, and with them understanding what happens next.

**Teach as you go.** After each stage, one sentence on what that file is for and
which skill reads it. Not a lecture, not saved for the end: right there, where it
lands.

## Before the first question

1. Read `profile.md`. If it says `STATUS: READY`, setup has already run. Say so and
   ask whether they want to change one section (do that and stop) or start over
   (confirm, then continue).
2. If it says `STATUS: NOT SET UP` but some fields are filled, a previous setup was
   interrupted. Say which stages look done and resume from the first unfilled one.
   **Never re-ask a question they have already answered.**
3. Check where this repo points: `git remote -v`.

## Ground rules for the interview itself

- **One stage at a time, and write the file at the end of each stage.** If the
  session dies at stage 6, stages 0 to 5 are on disk and setup resumes.
- **Ask few questions, in plain language.** Group them. Offer a sensible default and
  say what it means. "Most people here want X, shall I put that?" beats an open
  question every time.
- **Never invent an answer.** If they do not know their notice period, write `[TODO]`
  and move on. A `[TODO]` in a file is honest; a guess is a landmine that goes off
  inside a real application three weeks later.
- **Never ask for a password, an account, or a document you do not need.** You do not
  need their passport number, their date of birth (unless they choose to record it
  for forms), or their bank details. If they volunteer something you do not need, do
  not write it down.
- Their answers about their own life are facts. Their answers about the outside world
  (a company's policy, a visa rule, a salary band) are leads to verify, and they get
  a `[VERIFY]` marker.
- **Use the shell the preflight found.** PowerShell gets cmdlets and `;`, never `&&`.
  bash and zsh get bash. Get this right silently; do not narrate it.

---

## Stage 0: preflight

**Read `preflight.md` next to this file and run it before asking anything else.**

It detects the platform, the shell, and whether Node, git, gh, LaTeX, browser
automation and a mail connector are present, and it says what each absence actually
costs. Everything after this stage is written for the machine it finds.

Record the results in the Tooling section of `profile.md`, give the one-paragraph
summary that `preflight.md` specifies, and move straight on. **Do not stop for
approval of the preflight**: it is a report, not a decision.

## Stage 1: make this repo theirs

Skip only if `origin` already points at a private repo they own (confirm with
`gh repo view --json visibility -q .visibility`, which should print `PRIVATE`).

Say this, in your own words but keeping all of it:

> This repo is about to hold your CV, your contact details, your salary floor and
> possibly your visa status. It needs to be private and pointing at your own remote,
> not at the template's. I can do that in one step if you want it.

Then **do it for them**, if the preflight found `gh` authenticated. Ask only for the
repo name (suggest `my-job-hunt`) and confirm they want it private, then run:

```bash
git remote remove origin
gh repo create <name> --private --source . --remote origin --push
```

If `gh` is present but not logged in, hand them `gh auth login` and wait: it is
interactive and it is theirs to complete. Suggest the `!` prefix so the output lands
in the conversation.

If `gh` is absent or they decline it, fall back: they create the private repo in the
GitHub web UI, then

```bash
git remote remove origin
git remote add origin <their url>
git push -u origin main
```

**Confirm the result before continuing:**

```bash
git remote -v
gh repo view --json visibility -q .visibility    # should print PRIVATE
```

Do not take "yes I did it" on trust when one command checks it.

Then explain the repo guard hook in one sentence: it blocks visibility changes,
force-pushes, history rewrites and pushes to any remote other than the one now
configured, so their CV cannot be published by an accident of autocomplete. Creating
repos is deliberately not blocked; publishing a *public* one from a working copy that
already holds their CV asks for one confirmation, and nothing else does.

## Stage 2: who they are

Ask for the Identity and Situation blocks of `profile.md` in one go: name as it
should appear on a CV, job-hunting email, phone, city and country, whether they will
relocate and how far, LinkedIn, GitHub or portfolio, current status, earliest start.

Anything they leave blank becomes `[TODO]`, not a guess.

Write the Identity and Situation sections of `profile.md`.

> One sentence: this is the file every skill reads to know who it is writing for.

## Stage 3: where they can legally work

Handle this carefully. It is the section most likely to produce a false claim, and a
false claim here is the kind that gets an offer withdrawn.

Ask three things and nothing more:

1. Citizenship, and which country or countries they are job-hunting in.
2. Do they already have the right to work there, and is it unrestricted, conditional,
   or not yet held?
3. Would an employer have to do anything (sponsor, petition, file, wait) for them to
   start?

Then draft **one honest sentence** for each of the two questions forms actually ask
("are you authorised to work in X?" and "do you require sponsorship?"), show them the
draft, and write it only once they confirm the wording.

Watch for these, which are wrong often enough to be worth checking:

- Some countries have no employer-sponsorship model at all. Writing "I require
  sponsorship" in such a market describes a process that does not exist and reads as
  a problem the employer cannot solve. If unsure, mark it `[VERIFY]` and tell them to
  check with the immigration authority rather than guessing.
- A pending application is not a granted status. Do not let one be written as the
  other.
- "Unrestricted right to work" and "permanent right to work" are different claims.
  Some forms test for the second while appearing to ask the first.

If anything is unclear at the end of this stage, write it as `[VERIFY]` with the
question they need answered and who answers it. **That is a correct outcome**, not a
failure.

Write the Work authorisation section of `profile.md`, and copy the two confirmed
sentences into `answer-bank.md`.

> One sentence: from now on your status is never volunteered in a CV or a letter, and
> if a form asks directly, that exact wording is what goes in.

## Stage 4: languages, money, tracks

Three quick blocks:

- **Languages**, with levels, and explicitly: which level must never be implied
  upward. If a market's forms offer a scale with no rung for their actual level, the
  rule is to pick the lower one and let the CV carry the nuance.
- **Compensation**: what convention their market uses (monthly gross, annual gross,
  hourly), their floor, their target. Say plainly that a floor is a decision, not a
  fact, and it is theirs alone: you will never fill a salary field they have not
  pre-approved for that application.
- **Tracks**: industry job hunt, academic track, or both. Both are installed either
  way; this just tells the skills which files to keep current. If they say academic,
  ask whether they are chasing salaried positions, funding, or both, because the
  deadline calendar (`calls.md`) only matters for funding.

Write those sections of `profile.md`.

## Stage 5: the rules they are agreeing to

Short, and it matters. Show them the four things that will feel like friction later,
so they are not surprised:

1. **Nothing gets submitted or sent.** Forms are filled and staged; emails are
   drafted and staged. They press the button, every time.
2. **Nothing gets claimed that their CV does not support.** They will be told about
   gaps, including ones they hoped to skate past, and told when an application is not
   worth sending.
3. **No em dashes**, and no confessions in cover letters. Ask if they want to keep
   both defaults. Explain the em dash one in half a sentence (it is the loudest tell
   that a letter was machine-written) and the confession one in half a sentence
   (gaps belong in `notes.md`, not in a letter meant to argue for them).
4. **LinkedIn is read-only** unless they turn the networking prong on. Do not
   volunteer to turn it on. If they ask, point them at the caps in
   `linkedin-outreach.md` first and let them decide with the numbers in front of them.

Record their answers in the Voice preferences and Optional features sections of
`profile.md`.

## Stage 6: their CV becomes MASTER_CV.md

This is the stage that makes everything else work, and the one to be slowest on.

Ask them to give you their current CV in whatever form exists: paste the text, point
at a PDF or DOCX in the repo folder, or, if there is no CV at all, answer questions
and build it from nothing. Read the file if they give you one.

Then write `MASTER_CV.md` as the **complete record**, not a tailored CV. It holds
more than any single application will use, because tailoring is selection from it.

Rules while writing it:

- **Copy, do not improve.** This pass is transcription. If their CV says "improved
  performance", write that; do not upgrade it to "improved performance by 30%".
- **Every number gets a source.** Keep stated numbers verbatim. If a bullet obviously
  wants a number and has none, mark it `[NUMBER?]` and collect them all at the end in
  one question. Do not invent one, ever, and do not let an enthusiastic answer become
  a number without them stating it.
- Mark anything they are unsure of `[CONFIRM]`.
- Include dates, employers, titles, degrees, grades, publications, links, and the
  projects worth showing. Include the boring jobs: they establish years.
- If the CV implies more seniority than the dates support, say so now. Better here
  than in an interview.

Then read the whole thing back in summary and ask one closing question: **is every
number in this file something you could defend to an interviewer with evidence?** Fix
whatever they hesitate on.

Note the `MASTER_CV.md` hook: from now on every edit to that file prompts them to
approve the diff. Tell them why, in one sentence.

Offer, but do not insist: fill `base-cv/cv.tex` and `base-cv/cv-ats.tex` from
`MASTER_CV.md` so they have a compiled master pair. This can also wait for the first
`tailor` run. Skip it silently if the preflight found no LaTeX.

## Stage 7: what they are looking for

Now build `criteria.md`, which is what `discover` scores against. Ask:

- Target job titles, in tiers: core fit, adjacent or stretch, fallback.
- Seniority band they can honestly reach, and the titles to skip above it.
- Locations, and whether remote counts (and remote from where, hired by whom).
- Deal-breakers. Push for real ones: a required language they do not have, a
  clearance they cannot get, a relocation they will not do, unpaid work.
- Must-haves.
- How fresh a posting has to be. The default is 7 days, because a recent requisition
  is more likely to still be open with a shorter queue.
- Sectors or named companies they already want.

Then write the **search queries** section: one phrase per query, six or so core
queries, run in order. Boards match long queries badly, so "Machine Learning Engineer"
is a query and "senior ML engineer with RAG experience Berlin" is not.

Then write the **rubric**. Keep the shape: a small number of points, a threshold below
which a lead is dropped, and deal-breakers that auto-reject at any score. Tune the
weights to what they just told you. Show them the finished rubric and ask whether a
role they recently saw would score the way they expect. Adjust once.

If they are running the academic track, do the same for `criteria-academic.md`:
interest tiers, position types, the auto-drop gates that apply to them (degree
requirements, mobility rules, citizenship gates, language), and the five-part rubric.

## Stage 8: boards and portals for their country

`.claude/skills/discover/boards.md` ships carrying **only LinkedIn**, deliberately.
Which boards matter depends entirely on their country, field and language, and a
shipped list for the wrong market looks like knowledge while sending sweeps somewhere
pointless.

So research it now, for them. Ask two questions first, because their answers save you
a lot of searching:

1. Which boards do they already use, and which one has actually produced an interview?
2. Do they know where companies in their field advertise, or has it all been LinkedIn?

Then **follow `.claude/skills/discover/board-research.md`** and do the real pass:
look at where ads in their field actually land by opening a handful of real companies'
careers pages, search in the local language as well as English, check the national
public employment service, and vet each candidate on the live site (alive, real volume
for their actual queries, not just a LinkedIn mirror, recency filter, reads cleanly).
Four to six boards, ordered by value, each with a verified date.

**Never write a URL recipe you have not seen work.** An empty recipe cell marked
`unverified` is an honest row; a guessed one is a sweep that quietly returns the wrong
thing for months.

Report what you found in a few lines, including what you rejected. If it turns out
companies in their field mostly do not post to boards at all, **lead with that**: it
moves the strategy from sweeping to outreach, and it is worth more than the list.

If they are on the academic track, do the same for
`.claude/skills/discover-academic/portals.md`, which ships the same way: EURAXESS as
the one anchor, everything else researched for their country.

> One sentence: this file is the memory of what each board does and where its search
> URLs live, so the second sweep is one navigation instead of ten clicks.

## Stage 9: flip the gate, then do one real thing

1. Change the first line of `profile.md` to `STATUS: READY` and add today's date to
   its session log.
2. Commit and push: `setup: configure Wayfinder Forge for <name>`.
3. Show them the loop, in four lines, with the actual command they would type:

   ```
   discover <board>        find and score roles     -> leads.md
   tailor <company>        CV + letter + gaps       -> applications/<company>-<role>/
   apply-assist <company>  fill the form, stop      -> you press Submit
   outreach                cold approaches          -> you press Send
   ```

4. **Then run one of them for real, now.** A setup that ends in a summary gets
   forgotten; a setup that ends with six scored leads in `leads.md` does not. Offer
   the cheapest useful one: a `discover` sweep of a board they named, or a `tailor`
   pass on a posting they already have open. If they have neither, walk them through
   saving one posting into `applications/` so the next session starts warm.

5. Last, tell them the two things people get wrong in week one:
   - Do not batch. Eight sharp applications beat forty generic ones, and this repo is
     built to make the eight good rather than the forty fast.
   - Update `tracker.md` when something happens. A tracker that lags stops being
     consulted, then follow-ups stop happening, and follow-ups are where a surprising
     share of interviews come from.

---

## Reconfiguring later

Called again after `STATUS: READY`, this skill is a targeted edit, not a re-run. Ask
which of these changed and touch only that: tooling, identity, work authorisation,
languages, compensation, tracks, voice, criteria, boards.

Re-run the preflight on its own whenever they install LaTeX, move to a new machine,
or hit a compile failure with no obvious cause.

Add a dated line to the `profile.md` session log for every change, so a later skill
can tell a current rule from a stale one.

`MASTER_CV.md` changes go through the review-gate hook like any other edit: propose
the diff, let them approve it, and never let a new number in without a source they
gave you.
