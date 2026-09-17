# Customising Wayfinder Forge

The machinery is region-agnostic. The content is not, and it is meant to be
rewritten. Nothing here is sacred except the hard rules in `CLAUDE.md`, and even
those are yours to change once you understand what each one is preventing.

## Change these first

### The rubric in `criteria.md`

The shipped rubric is a starting point: a small number of points, a threshold, and
deal-breakers that override the score regardless.

**Keep the shape.** A rubric with fifteen criteria is a rubric nobody applies
consistently, and an inconsistent rubric is worse than none, because it feels
rigorous while being arbitrary.

Sanity check after any change: take a role you saw last week, score it by hand, and
see whether the number matches your gut. If it does not, one of the two is wrong,
and it is worth finding out which before the next sweep.

### The search queries in `criteria.md`

One phrase per query. Boards match long queries badly: "Data Engineer" is a query,
"senior data engineer with dbt and Snowflake, hybrid Amsterdam" is not.

Six core queries run every sweep, in order. Extended queries run on request. Retire
a query that has returned nothing on-target for three sweeps running (`discover`
logs each query's yield in `boards.md` and will recommend the cut); add one every
time you notice a title you had not thought of. Watch for overlap as well: when page
one of four queries is the same twenty cards, page one of each is enough, and the
depth belongs to the one query that reaches different employers.

### Your deal-breakers, when the market argues with them

A deal-breaker that removes most of a market is worth a second look, and relaxing
one is a legitimate decision. Do it deliberately, with a date, in `criteria.md`, and
write down what does **not** change with it. The usual case is a language
requirement: you can decide to apply to roles that ask for a language you are still
learning, and accept the higher rejection rate that comes with that, but the level
stated in every CV, letter and form stays exactly what it is. Applying with your
eyes open is your risk to take. Rounding a level up to win the application is not on
the table.

If you only want to try it for one sweep, say so: the override is recorded as scoped
to that session and the gate returns by default.

### The boards in `.claude/skills/discover/boards.md`

Ships with LinkedIn and nothing else. Setup researches the rest for your market using
`board-research.md`, and `discover` researches any board you name that has no entry
yet.

Two things worth doing yourself as you go:

- **Re-prioritise.** The rows carry a priority so a short run can take just the top
  two. After a month you will know better than the research pass did which board
  actually produces interviews. Move it to 1.
- **Record a recipe the first time you drive a board's UI.** Every recipe recorded is
  twenty clicks you never make again. Never write one you have not seen work: an empty
  cell marked `unverified` is honest, a guessed one silently returns the wrong thing.

Boards decay. When one returns nothing new for three sweeps in a row, re-run the
research pass rather than assuming your market went quiet.

### Your voice

`profile.md` has a Voice section. The two defaults worth understanding before you
change them:

- **No em dashes.** Not aesthetic. The em dash is the single loudest signal that a
  document was written by a language model, and a cover letter that reads as
  machine-written gets binned before its argument is read. A hook enforces this on
  outward documents; set `Em dashes: allowed` in `profile.md` to turn it off.
- **No confessions in cover letters.** No "I'll be honest" followed by a list of
  what you lack. Gaps go in `notes.md`, where they inform the letter without being
  in it. The academic track relaxes this narrowly, and only when a call asks a
  direct question. See `CLAUDE.md`. The same goes for form fields that probe a thin
  area: describe what you did, precisely, and let the reader judge.
- **Few colons and semicolons in letters.** A side effect of banning em dashes is
  that drafts drift toward chains of colons, which read as machine-written just as
  clearly. The skills count them before showing you a letter.
- **Letters open with the draw**, what it is about that company's work that interests
  you, and the assistant writes that opening itself from the posting and your CV.
  Set "Cover letter openings: ask me what draws me first" in `profile.md` if you
  would rather supply it each time. It is more personal, and it is slower: waiting
  for an anecdote per letter can stall a whole batch.
- **Your words beat the assistant's.** Write any paragraph rough and it will be
  edited for grammar and register, keeping your sentence shapes.

### How your files are named

Every file an employer receives leads with your name: `<name>-cv-<company>.pdf`,
`<name>-letter-<company>.pdf`. `<name>` is the file-name slug in `profile.md`.
Change it there if you prefer `firstname-lastname`, initials, or a transliteration
that employers in your market will recognise.

## Turning things off

**The hooks.** Delete the block you do not want from `.claude/settings.json`. Each
one is independent:

| Hook | Prevents |
|---|---|
| `session-start-setup-check` | Working in a half-configured repo, and missing a funding deadline |
| `block-master-cv-writes` | A number entering your source of truth without you seeing it |
| `guard-repo-commands` | Publishing your CV by accident, and rewriting history |
| `check-em-dashes` | The machine-written tell, in outward documents only |

**The academic track.** Ignore `criteria-academic.md`, `calls.md`,
`leads-academic.md`, `tracker-academic.md`, `landscape.md`, `funder-shortlist.md`
and `sketches/`, or delete them along with the three `*-academic` skills. Nothing on
the industry side reads them.

**The LinkedIn prong.** It is already off. It only turns on if `profile.md` says so.

## Turning things on

Three outreach settings ship off, or at their conservative value, and live in
`profile.md` under "Optional features". Each one trades sharpness or safety for
volume, which is why none of them is a default.

| Setting | What it does | What it costs |
|---|---|---|
| LinkedIn networking prong | Connection requests and one intro message after acceptance, capped and logged | Account risk. Read the caps in `linkedin-outreach.md` first. |
| Sector-level hooks | Lets an outreach email go out on an honest fit at sector level where no company-specific reason exists | Reply rate per email. Tailored applications are never affected, and a company with no honest hook at either level is still dropped. |
| No outreach batch ceiling | Runs until the companies that publish an email channel and have an honest hook run out | Your attention. In practice the supply is small, and it, not the ceiling, ends the run. |

The LinkedIn caps themselves are yours to change. Record the change with its date in
`linkedin-outreach.md`, and set the weekly cap in the same breath as the session
cap.

## Adding a skill of your own

A skill is one markdown file at `.claude/skills/<name>/SKILL.md` with YAML
frontmatter:

```markdown
---
name: interview-prep
description: Build a prep sheet for a scheduled interview from the application folder, the posting and the company research. Use when the user names an interview to prepare for.
---

# Interview prep

CLAUDE.md governs every step. MASTER_CV.md is the only source of facts.

## Steps
1. ...
```

The `description` is what decides whether the skill gets invoked, so write it as
"what it does, and when to use it", with the phrases you would actually say.

Ideas that fit this repo well and are not shipped:

- **interview-prep**: turn `posting.md`, `research.md` and `notes.md` into a prep
  sheet, including the gap questions you are most likely to be asked. A folder shape
  that works is in `applications/README.md` ("When an interview lands"): copies of
  exactly what they hold, their emails verbatim, the material behind the
  interviewers' own work, and answers built from your recorded incidents.
- **debrief**: after an interview, capture what was asked and what you answered
  badly, into `tracker.md`'s outcomes table.
- **salary-research**: gather published bands for a role and location, with sources,
  before a compensation conversation.
- **weekly-review**: read the trackers and report what is stalled, what needs a
  follow-up today, and what the last five rejections had in common.

## Changing the hard rules

You can. They exist for reasons, and it is worth knowing the reason before removing
one:

| Rule | What it prevents |
|---|---|
| Every claim traces to `MASTER_CV.md` | Getting into an interview you cannot survive |
| Numbers verbatim, durations summed from dates, levels copied from certificates | A remembered round number, or a generously converted score, going out in applications that cannot be recalled |
| Never submit or send, and drafts go to your own mail drafts | An application going out with a mistake nobody read |
| Files lead with your name | Your CV sitting anonymous in a recruiter's downloads folder |
| Gaps named in `notes.md` | Discovering the gap in the first interview instead |
| Status never volunteered | Answering a question that was not asked, badly |
| Sources on outside facts | A deadline remembered wrong, once, expensively |

The one worth keeping whatever else you change is the first. Everything else in this
repo is convenience; that one is the reason the output can be trusted at all.
