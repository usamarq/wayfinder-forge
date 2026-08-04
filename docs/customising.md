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
a query that has returned nothing useful for a month; add one every time you notice
a title you had not thought of.

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
  direct question. See `CLAUDE.md`.

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
  sheet, including the gap questions you are most likely to be asked.
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
| Numbers verbatim | A rounded metric becoming a number you have to defend |
| Never submit or send | An application going out with a mistake nobody read |
| Gaps named in `notes.md` | Discovering the gap in the first interview instead |
| Status never volunteered | Answering a question that was not asked, badly |
| Sources on outside facts | A deadline remembered wrong, once, expensively |

The one worth keeping whatever else you change is the first. Everything else in this
repo is convenience; that one is the reason the output can be trusted at all.
