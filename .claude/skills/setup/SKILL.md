---
name: setup
description: First-run onboarding for Wayfinder Forge. Interviews the user, fills profile.md, MASTER_CV.md, answer-bank.md and criteria.md, configures the boards and the tracks they are running, checks their tooling, and explains how the repo works as it goes. Run this automatically when profile.md still says STATUS NOT SET UP, and on request ("setup", "/setup", "reconfigure", "start over", "help me set this up").
---

# Setup: turn a blank template into this person's job hunt

You are talking to someone who has just opened a repo they did not write. Assume
they have not read `CLAUDE.md`, do not know what a skill is, and are not sure what
they are agreeing to. Your job is to end this conversation with four files that are
true about them, and with them understanding what happens next.

**Teach as you go.** After each stage, one sentence on what that file is for and
which skill reads it. Not a lecture, not at the end: right there, where it lands.

## Before the first question

1. Read `profile.md`. If it says `STATUS: READY`, setup has already run. Say so and
   ask whether they want to change one section (do that and stop) or start over
   (confirm, then continue).
2. If it says `STATUS: NOT SET UP` but some fields are already filled, a previous
   setup was interrupted. Say which stages look done, and resume from the first
   unfilled one. **Never re-ask a question they have already answered.**
3. Check where this repo points: `git remote -v`. If `origin` is the public
   Wayfinder Forge template, or any repo they do not own, stage 0 is not optional.

## Ground rules for the interview itself

- **One stage at a time, and write the file at the end of each stage.** If the
  session dies at stage 5, stages 1 to 4 are on disk and setup resumes.
- **Ask few questions, in plain language.** Group them. Offer a sensible default
  and say what it means. "Most people here want X, shall I put that?" beats an
  open question every time.
- **Never invent an answer.** If they do not know their notice period, write
  `[TODO]` and move on. A `[TODO]` in a file is honest; a guess is a landmine that
  goes off inside a real application three weeks later.
- **Never ask for a password, an account, or a document you do not need.** You do
  not need their passport number, their date of birth (unless a form later asks and
  they choose to record it), or their bank details. If they volunteer something you
  do not need, do not write it down.
- Their answers about their own life are facts. Their answers about the outside
  world (a company's policy, a visa rule, a salary band) are leads to verify, and
  they get a `[VERIFY]` marker.

---

## Stage 0: make this repo theirs

Skip only if `origin` already points at a private repo they own.

Say this, in your own words but keeping all of it:

> This repo is about to hold your CV, your contact details, your salary floor and
> possibly your visa status. It needs to be private, and it needs to point at your
> own remote, not at the template's. Two minutes now saves a bad afternoon later.

Then give them the commands for their situation and **wait for them to run these
themselves** (creating a repo under their account is theirs to do):

```bash
# If they cloned the public template directly:
git remote remove origin
gh repo create my-job-hunt --private --source . --remote origin

# If they used "Use this template" on GitHub and set it Private: nothing to do.
# Confirm with:
git remote -v
gh repo view --json visibility -q .visibility   # should print PRIVATE
```

If `gh` is not installed, tell them to create the private repo in the GitHub web UI
and run `git remote add origin <url>`.

**Confirm the result before continuing.** Do not take "yes I did it" on trust when
one command checks it.

Then explain the repo guard hook in one sentence: it blocks `gh repo create/edit`,
force-pushes, history rewrites, and any push to a remote other than the one now
configured, so their CV cannot be published by an accident of autocomplete.

## Stage 1: who they are

Ask for the Identity and Situation blocks of `profile.md` in one go: name as it
should appear on a CV, job-hunting email, phone, city and country, whether they will
relocate and how far, LinkedIn, GitHub or portfolio, current status, earliest start.

Anything they leave blank becomes `[TODO]`, not a guess.

Write the Identity and Situation sections of `profile.md`.

> One sentence: this is the file every skill reads to know who it is writing for.

## Stage 2: where they can legally work

Handle this carefully. It is the section most likely to produce a false claim, and a
false claim here is the kind that gets an offer withdrawn.

Ask three things and nothing more:

1. Citizenship, and which country or countries they are job-hunting in.
2. Do they already have the right to work there, and is it unrestricted, conditional,
   or not yet held?
3. Would an employer have to do anything (sponsor, petition, file, wait) for them to
   start?

Then draft **one honest sentence** for each of the two questions forms actually ask
("are you authorised to work in X?" and "do you require sponsorship?"), show them
the draft, and only write it once they confirm the wording.

Watch for these, which are wrong often enough to be worth checking:

- Some countries have no employer-sponsorship model at all. Writing "I require
  sponsorship" in such a market describes a process that does not exist and reads as
  a problem the employer cannot solve. If they are unsure, mark it `[VERIFY]` and
  tell them to check with the immigration authority rather than guessing.
- A pending application is not a granted status. Do not let one be written as the
  other.
- "Unrestricted right to work" and "permanent right to work" are different claims.
  Some forms test for the second while appearing to ask the first.

If anything is unclear at the end of this stage, write it as `[VERIFY]` with the
question they need answered and who answers it. That is a correct outcome.

Write the Work authorisation section of `profile.md`, and copy the two confirmed
sentences into `answer-bank.md`.

> One sentence: from now on your status is never volunteered in a CV or a letter,
> and if a form asks directly, that exact wording is what goes in.

## Stage 3: languages, money, tracks

Three quick blocks:

- **Languages**, with levels, and explicitly: which level must never be implied
  upward. If a market's forms offer a scale with no rung for their actual level,
  the rule is to pick the lower one and let the CV carry the nuance.
- **Compensation**: what convention their market uses (monthly gross, annual gross,
  hourly), their floor, their target. Say plainly that a floor is a decision, not a
  fact, and it is theirs alone: you will never fill a salary field they have not
  pre-approved for that application.
- **Tracks**: industry job hunt, academic track, or both. Both are installed either
  way; this just tells the skills which files to keep current. If they say academic,
  ask whether they are chasing salaried positions, funding, or both, because the
  academic track's deadline calendar (`calls.md`) only matters for funding.

Write those sections of `profile.md`.

## Stage 4: the rules they are agreeing to

Short, and it matters. Show them the four things that will feel like friction later
so they are not surprised:

1. **Nothing gets submitted or sent.** Forms are filled and staged; emails are
   drafted and staged. They press the button, every time.
2. **Nothing gets claimed that their CV does not support.** They will be told about
   gaps, including ones they were hoping to skate past, and told when an application
   is not worth sending.
3. **No em dashes**, and no confessions in cover letters. Ask if they want to keep
   both defaults. Explain the em dash one in half a sentence (it is the loudest tell
   that a letter was machine-written) and the confession one in half a sentence
   (gaps belong in `notes.md`, not in a letter that is meant to argue for them).
4. **LinkedIn is read-only** unless they turn the networking prong on. Do not
   volunteer to turn it on. If they ask, point them at the caps in
   `linkedin-outreach.md` first and let them decide with the numbers in front of them.

Record their answers in the Voice preferences and Optional features sections of
`profile.md`.

## Stage 5: their CV becomes MASTER_CV.md

This is the stage that makes everything else work, and it is the one to be slowest on.

Ask them to give you their current CV in whatever form exists: paste the text, point
at a PDF or DOCX in the repo folder, or, if there is no CV at all, answer questions
and build it from nothing. Read the file if they give you one.

Then write `MASTER_CV.md` as the **complete record**, not a tailored CV. It holds
more than any single application will use, because tailoring is selection from it.

Rules while writing it:

- **Copy, do not improve.** This pass is transcription. If their CV says "improved
  performance", write that, do not upgrade it to "improved performance by 30%".
- **Every number gets a source.** If the CV says a number, keep it verbatim. If a
  bullet obviously wants a number and has none, put `[NUMBER?]` in the margin and
  collect them all at the end in one question. Do not invent one, ever, and do not
  let an enthusiastic answer become a number without them stating it.
- Mark anything they are unsure of `[CONFIRM]`.
- Include dates, employers, titles, degrees, grades, publications, links, and the
  projects worth showing. Include the boring jobs; they establish years.
- If the CV implies more seniority than the dates support, say so now. Better here
  than in an interview.

Then read the whole thing back in summary and ask one closing question: **is every
number in this file something you could defend to an interviewer with evidence?**
Fix whatever they hesitate on.

Note the `MASTER_CV.md` hook: from now on every edit to that file prompts them to
approve the diff. Tell them why, in one sentence.

Offer, but do not insist: fill `base-cv/cv.tex` and `base-cv/cv-ats.tex` from
`MASTER_CV.md` so they have a compiled master pair. This can also wait for the first
`tailor` run.

## Stage 6: what they are looking for

Now build `criteria.md`, which is what `discover` scores against. Ask:

- Target job titles, in tiers: core fit, adjacent or stretch, fallback.
- Seniority band they can honestly reach, and the titles to skip above it.
- Locations, and whether remote counts (and remote from where, hired by whom).
- Deal-breakers. Push for real ones: a required language they do not have, a
  clearance they cannot get, a relocation they will not do, unpaid work.
- Must-haves.
- How fresh a posting has to be. The default is 7 days, and the reason is that a
  recent requisition is more likely to still be open with a shorter queue.
- Sectors or named companies they already want.

Then write the **search queries** section: one phrase per query, six or so core
queries, run in order. Boards match long queries badly, so "Machine Learning
Engineer" is a query and "senior ML engineer with RAG experience Berlin" is not.

Then write the **rubric**. Keep the shape: a small number of points, a threshold
below which a lead is dropped, and deal-breakers that auto-reject at any score. Tune
the weights to what they just told you. Show them the finished rubric and ask
whether a role they recently saw would score the way they expect. Adjust once.

If they are running the academic track, do the same for `criteria-academic.md`:
interest tiers, position types, the auto-drop gates that apply to them (degree
requirements, mobility rules, citizenship gates, language), and the five-part rubric.

## Stage 7: boards and portals for their country

Open `.claude/skills/discover/boards.md`. It ships with the global boards and an
empty national section.

Ask which boards they already use and where jobs in their field actually get posted.
Add a row per board with what you know and mark the rest unverified. Do **not**
research or fabricate URL recipes now: the honest state is "unverified until the
first sweep", and the first `discover` run fills them in.

If they are on the academic track, do the same with
`.claude/skills/discover-academic/portals.md`.

> One sentence: this file is the memory of what each board does and where its search
> URLs live, so the second sweep is one navigation instead of ten clicks.

## Stage 8: tooling check

Check and record in `profile.md`, do not install anything without asking:

- **LaTeX**: try `xelatex --version` and `pdflatex --version`. If missing, point at
  `docs/latex-setup.md` and say plainly what they lose without it (compiled PDFs;
  the markdown letter and the .tex sources still work). If present but not on PATH,
  record the full path, because the tailor skill will need it.
- **Browser automation**: is Claude in Chrome or the Playwright MCP available? If
  neither, `discover` and `apply-assist` cannot drive a browser and they will paste
  postings manually. Say so rather than letting it fail mid-sweep.
- **Mail connector**: is one connected for staging drafts? If not, `outreach` writes
  the email into the application folder and they copy it into their mail client.
- If they run several mail accounts, which one job-hunts.

## Stage 9: flip the gate, then do one real thing

1. Change the first line of `profile.md` to `STATUS: READY` and add today's date to
   its session log.
2. Commit: `setup: configure Wayfinder Forge for <name>`.
3. Show them the loop, in four lines, with the actual command they would type:

   ```
   discover <board>        find and score roles     -> leads.md
   tailor <company>        CV + letter + gaps       -> applications/<company>-<role>/
   apply-assist <company>  fill the form, stop      -> you press Submit
   outreach                cold approaches          -> you press Send
   ```

4. **Then run one of them for real, now.** A setup that ends in a summary gets
   forgotten; a setup that ends with six scored leads in `leads.md` does not. Offer
   the cheapest useful one: a `discover` sweep of the board they named, or a `tailor`
   pass on a posting they already have open. If they have neither, walk them through
   saving one posting into `applications/` so the next session starts warm.

5. Last, tell them the two things people get wrong in week one:
   - Do not batch. Eight sharp applications beat forty generic ones, and this repo
     is built to make the eight good rather than the forty fast.
   - Update `tracker.md` when something happens. A tracker that lags is a tracker
     that stops being consulted, and then follow-ups stop happening, and the
     follow-up is where a surprising share of interviews come from.

---

## Reconfiguring later

Called again after `STATUS: READY`, this skill is a targeted edit, not a re-run. Ask
which of these changed and touch only that: identity, work authorisation, languages,
compensation, tracks, voice, criteria, boards, tooling. Add a dated line to the
`profile.md` session log for every change, so a later skill can tell a current rule
from a stale one.

`MASTER_CV.md` changes go through the review-gate hook like any other edit: propose
the diff, let them approve it, and never let a new number in without a source they
gave you.
