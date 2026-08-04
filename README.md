# Wayfinder Forge

**Your job hunt, run as an engineering project.**

A [Claude Code](https://claude.com/claude-code) workspace that finds roles worth
your time, tailors a CV and cover letter that never overstate what you have done,
drafts your outreach, and fills application forms up to (never past) the Submit
button. It works for a company job hunt, an academic search (doctoral positions,
research posts, research funding), or both at once.

It is a set of markdown files and eight skills. There is no service, no account, no
telemetry, and nothing leaves your machine except the pages your own browser loads.

```
you: "discover linkedin"
     -> reads three pages per query, scores every hit against your criteria,
        drops the ones with a deal-breaker, appends 6 leads to leads.md

you: "tailor the Acme one"
     -> saves the ad verbatim, maps every requirement to evidence in your CV,
        names the gaps, writes a designed CV, an ATS CV and a letter,
        compiles all three, and tells you the weakest point of the application

you: "apply-assist acme"
     -> opens the portal in your browser, fills every field it can source
        honestly, attaches the right PDF, and stops before Submit
```

---

## Getting started

**1. Get a copy.** Click **"Use this template"** on GitHub, set the new repo to
**Private**, and clone it. (Cloning this repo directly also works; setup will make
you a private repo of your own in its first minute.)

**2. Install Claude Code** if you have not: `npm install -g @anthropic-ai/claude-code`

**3. Run `claude` in the folder and say anything.** That is the whole instruction.

```bash
cd <your-copy>
claude
```

Claude reads `CLAUDE.md`, sees that `profile.md` still says `STATUS: NOT SET UP`, and
takes it from there. You do not need to know any commands, install anything else
first, or read another file. `/setup` starts it explicitly if you would rather.

**What happens then**, in order:

- **Preflight.** It works out what OS and shell you are on and what you already have
  (Node, git, GitHub CLI, LaTeX, browser automation, a mail connector), tells you what
  each absence actually costs, and hands you install commands **for your platform**.
  Everything afterwards is written for your machine rather than translated by you.
- **Your private repo**, created and wired up in one step, so your CV never sits in a
  fork of a public template.
- **The interview.** About 30 minutes, most of it you talking. Who you are, where you
  can legally work, what you are looking for, what you will not compromise on. Then
  your CV, in whatever form you have it, becomes `MASTER_CV.md`. It saves after every
  stage, so you can stop halfway and resume tomorrow without repeating yourself.
- **One real sweep**, so you finish with actual scored leads instead of a summary.

See `START-HERE.md` for the same thing written for a human who opened the folder
before opening Claude.

---

## The one rule that makes this different

**Every factual claim in every document traces to a line in `MASTER_CV.md`.**

Not "grounded in". Traces to. If a posting asks for Kubernetes and your CV does not
say Kubernetes, the assistant tells you that is a gap and writes the letter without
it. It will not say "container orchestration experience" to imply it. It will not
round two years up to three. If it wants a number you have not given it, it asks.

This is the entire point. An AI-written application that quietly inflates is worse
than no application: it gets you into interviews you cannot survive, and it burns
the company's goodwill and yours. A hook forces your review on every edit to
`MASTER_CV.md`, so the source of truth only ever changes when you look at the diff
and say yes.

Two consequences worth knowing before you start:

- The assistant will tell you an application is not worth sending, and it will name
  the gap you were hoping to skate past. That is the feature.
- It never presses Submit, never sends an email, never types a password, never
  solves a CAPTCHA, and never touches LinkedIn beyond searching and reading unless
  you explicitly turn the networking prong on.

---

## What you get

### Industry track

| Skill | What it does |
|---|---|
| `discover` | Sweeps a job board in your own logged-in browser using the queries in `criteria.md`, scores every hit against your rubric, appends the survivors to `leads.md`. Reads only; never applies to anything. |
| `tailor` | One saved posting in, a reviewable application out: designed CV, ATS CV, cover letter, all compiled, plus `notes.md` with every gap named and the single weakest point stated. |
| `outreach` | Open applications and cold emails to companies with no advertised role. Checks their careers page for a live match first, finds a published channel, researches one true hook, drafts it, and stages it for you to send. |
| `apply-assist` | Opens the application portal, fills what it can source honestly, attaches the right PDF, flags what only you can answer, and stops before Submit. |

### Academic track

| Skill | What it does |
|---|---|
| `discover-academic` | Sweeps EURAXESS, university boards, funding-call APIs and national job portals. Checks eligibility gates before scoring. Positions to `leads-academic.md`, funding calls to `calls.md`. |
| `tailor-academic` | Gates first, then motivation letter, research statement or grant work plan, academic CV, a required-documents checklist, and the long-lead items (referees, supervisor statements, transcripts) flagged early. |
| `outreach-academic` | Supervisor approaches, group enquiries, referee requests, funder eligibility questions. Published university addresses only, never guessed. |

Both tracks are installed. If you only want one, ignore the other's files; nothing
breaks. Setup asks which you are running and configures accordingly.

### The files that hold the state

```
profile.md              who you are, what you want, what you cannot compromise on
MASTER_CV.md            the source of truth for every claim
answer-bank.md          honest reusable answers to form questions
criteria.md             target roles, deal-breakers, the scoring rubric
leads.md                scored postings worth pursuing
tracker.md              one row per application, with a follow-up date
open-applications.md    target companies for spontaneous applications
linkedin-outreach.md    log of every connection request and message

criteria-academic.md    tiers, gates, rubric for the academic track
calls.md                funding deadlines, each with a source URL and verified date
leads-academic.md       scored doctoral and research position leads
tracker-academic.md     academic applications and outreach in flight
landscape.md            portals, funders, people, groups
funder-shortlist.md     screened funders: fit, grants awarded, amounts

base-cv/                your master CV pair (designed + ATS) in LaTeX
applications/           one folder per application
templates/              the skeletons the tailor skills copy
docs/                   the daily loop, LaTeX setup, customising
```

### The guard hooks

Four Node scripts in `.claude/hooks/`, wired up in `.claude/settings.json`:

- **setup gate**: injects a reminder at session start until `profile.md` is filled in,
  then goes quiet and surfaces only funding deadlines inside three weeks.
- **MASTER_CV review gate**: any edit to `MASTER_CV.md` prompts you to approve the diff.
- **repo guard**: blocks visibility changes on an existing repo, force-pushes, history
  rewrites, and pushes to any remote other than the one you configured. It stays out
  of the way otherwise: creating repos is allowed, and nothing is checked at all until
  an origin exists, because a fresh clone has nothing to protect yet. The one thing it
  pauses for is creating a **public** repo from a working copy that already holds your
  CV.
- **em-dash gate**: rejects em dashes in outward documents. The em dash is the
  loudest tell that a letter was machine-written.

Delete the `hooks` block in `.claude/settings.json` if you would rather not have them.

---

## Customising it for your country

The system is region-agnostic; the *content* you put in it is not. Setup asks where
you are and writes the answers into `criteria.md` and
`.claude/skills/discover/boards.md`. What is worth filling in yourself over the
first week:

- **Boards.** `boards.md` ships carrying **only LinkedIn**, on purpose. Which boards
  matter depends entirely on your country, field and language, and a canned list for
  the wrong market looks like knowledge while sending sweeps somewhere pointless.
  Setup researches the real ones for you instead: it opens a handful of actual
  companies' careers pages in your field to see where their ads land, searches in your
  local language as well as English, checks your national employment service, and vets
  each candidate live before recording it. You end up with four to six boards that
  matter, each with a URL recipe that has been seen to work.
- **Language bar.** In many markets an English-looking careers page hides a
  local-language requirement on the apply portal. `boards.md` has a section on this;
  the rule is to follow the Apply control through and read the requirement where the
  applications actually land.
- **Work authorisation wording.** `answer-bank.md` has a section for it. Get the
  wording right once, honestly, and never think about it again. The assistant will
  not guess a permit claim for you.
- **Salary conventions.** Monthly gross, annual gross, hourly, with or without
  bonus: `profile.md` records which your market uses.

---

## What this does not do

- It does not submit applications. Ever. Not with a flag, not with a confirmation.
- It does not send email. It stages a finished draft and you press Send.
- It does not create accounts or enter passwords or solve CAPTCHAs.
- It does not scrape. It reads pages you opened in your own browser, at human pace,
  for your own applications, and it stops when a site objects.
- It does not write anything your CV does not support.

---

## Credits and licence

Wayfinder Forge is the public, personal-data-free sister of a private repo that has
been running a real job hunt since July 2026. The workflow, the hard rules and the
hard-won portal notes come from that; the CV, the trackers and the leads do not.

MIT licensed. Use it, fork it, change the rules to suit your market. If you learn
something about a portal or a board that would save the next person an hour, a pull
request to `boards.md` is the most useful thing you can send.

Good hunting.
