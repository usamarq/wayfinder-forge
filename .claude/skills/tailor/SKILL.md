---
name: tailor
description: Turn one saved job posting into a ready-for-review application - tailored CV pair (designed XeLaTeX + ATS pdfLaTeX), cover letter, compiled PDFs, and notes.md with every gap named. Use when the user asks to tailor for a company or role, or hands over a posting they want to pursue.
---

# Tailor: posting in, reviewable application out

CLAUDE.md governs every step: hard rules, voice, guardrails. `MASTER_CV.md` is the
only source of facts. Nothing produced here is ever submitted; `apply-assist` is a
separate, explicitly requested stage.

## Preconditions (refuse to start otherwise)

1. `applications/<company>-<role>/posting.md` exists and contains the ad
   **verbatim**. If it does not: create the folder, copy `templates/posting.md`,
   capture the ad (from a tab the user has open, or they paste it), save it, then
   begin. **Never tailor from a paraphrase or from a memory of an ad.** Half of
   what tailoring does is match the posting's own language, and a summary has
   already thrown that away.
2. Read `MASTER_CV.md` in full. Read `criteria.md` and `profile.md`. Read
   `research.md` if it exists.

## Step 1: fit gate

Score the posting against the `criteria.md` rubric.

- Any deal-breaker: say in one line why, and stop. No CV out of politeness.
- Below the threshold: recommend skipping, one line of reasoning, and wait for an
  explicit override before continuing.

This gate is not a formality. The working style in CLAUDE.md is eight sharp
applications over forty generic ones, and this is where the forty get stopped.

## Step 2: requirements map (into notes.md)

Copy `templates/notes.md` if `notes.md` does not exist. Extract **every** requirement
in the posting into the table: requirement, evidence in `MASTER_CV.md`, verdict
(strong / partial / gap).

- A gap is a gap. Name it. No near-synonyms, no positioning, no writing around it.
- If a number would help but `MASTER_CV.md` does not contain it: ask. Never
  estimate, round, or invent a metric.
- Count the gaps before writing anything. If the core of the role is a gap, say so
  now rather than after producing three documents.

## Step 3: CV pair

Copy `templates/tailored-cv.tex` to `cv-<slug>.tex` and
`templates/tailored-cv-ats.tex` to `cv-<slug>-ats.tex` (the slug is a short company
or role tag and it becomes the attachment filename, so it should look deliberate to
a recruiter reading the file name). Fill every placeholder, driven by the
requirements map:

- Select, reorder, and rephrase from `MASTER_CV.md` only. Every number verbatim.
- Headline: role-matched and defensible from `MASTER_CV.md`.
- The ATS version mirrors the posting's exact keyword spellings, but **only where
  the evidence exists**. Mirroring a keyword the CV cannot support is the polite
  name for lying.
- 1 to 2 pages. Cut projects before cutting experience.
- Date ranges use `--` (en dash). No em dashes anywhere; a hook enforces this.
- Escape LaTeX specials: `\&` `\%` `\#`. Escape them inside URLs too, or wrap the
  URL as `\href{}{\nolinkurl{}}` so it can line-break.

## Step 4: cover letter (letter.md)

Copy `templates/letter.md`, then write it under the voice rules, hard:

- Maximum 4 paragraphs, one page. If it needs five, the argument is weak.
- **Open with the evidence.** Never open by naming the role and the company.
- No em dashes. No superlatives, no "passionate about", no "delve", no "leverage",
  no "I am excited to..." openers.
- Claims carry numbers from `MASTER_CV.md` or they get cut.
- One concrete company hook if `research.md` has one. If `research.md` is empty, say
  so and offer to research first. No fake familiarity: a hook that could be sent to
  any other company unchanged is not a hook.
- Never mention immigration or work-authorisation status.
- Professional and humble. No idioms or colloquialisms, no boastful framing.
  Contributions stated subtly ("I believe I can help build...", "I can improve...");
  the reader should sense openness to learn.
- **Gaps: never confess them.** No "I'll be honest", "I should be plain", "to be
  straightforward", or any preface that then lists what the user lacks, and no
  enumeration of shortcomings anywhere in the letter. Gaps go in `notes.md` only.
  Where the role's core is something they are still growing into, name it forward
  once (what they bring plus genuine willingness), never as a deficit.
- Do not overclaim: never claim professional use of a tool or skill that did not
  happen. Omit what they have not done rather than stating it. Never undersell real
  exposure either.

## Step 5: finish notes.md

Fill: gaps (including the unwelcome ones), the single weakest point of the
application and what would fix it, questions worth asking them at interview, and the
follow-up log row.

## Step 6: compile (the CV pair AND the letter PDF)

The letter PDF is a standard output, not an option: portals routinely require an
uploaded letter, and discovering a layout defect during the application phase is too
late. Copy `templates/letter.tex` to `letter-<slug>.tex`, insert the final
`letter.md` paragraphs, and wrap every URL as
`\href{https://...}{\nolinkurl{display}}` so it can line-break. A bare URL overflows
the margin.

From inside the application folder:

```bash
xelatex  -interaction=nonstopmode cv-<slug>.tex        # run twice
pdflatex -interaction=nonstopmode cv-<slug>-ats.tex
xelatex  -interaction=nonstopmode letter-<slug>.tex    # run twice
```

If `profile.md` records that the LaTeX binaries are not on PATH, use the full path
it records. If no LaTeX distribution is installed, say so, deliver the `.tex` sources
and `letter.md`, and point at `docs/latex-setup.md`. Do not silently skip this step.

**Quality gate before this step counts as done:**

- exit code 0 on every document
- CVs 1 to 2 pages, letter exactly 1 page (check the log's "Output written" line)
- zero `Overfull \hbox` warnings in every `.log`; fix wording or line breaks until
  clean. An overfull box is text past the margin, and it is visible on the page.

Delete the aux files (`*.aux`, `*.log`, `*.out`) afterwards. Keep the `.tex`: it is
the editable source and the PDF is a build artefact.

## Step 7: self-verify, then report (definition of done)

1. **Claims trace.** Re-read both `.tex` files and `letter.md` against
   `MASTER_CV.md`. Anything without a source line gets fixed or cut.
2. **Numbers verbatim** check.
3. **Em-dash scan** of the produced files.
4. **Work-authorisation status** appears nowhere in the CV or the letter.
5. `tracker.md`: add or update the row (status `drafted`) with a follow-up date.
6. **Report**: the rubric score, the gap list, the single weakest point and what
   would fix it, and the files produced. Then stop. Applying is a separate stage
   the user asks for.
