---
name: tailor-academic
description: Turn one saved doctoral posting or funding call into a ready-for-review application - eligibility gates checked first, then motivation letter and/or research statement, grant work plan, academic CV, notes.md with gaps named, a required-documents checklist, and a tracker row. Use when the user asks to tailor for a doctoral position, a grant call, or a supervisor conversation.
---

# Tailor-academic: posting or call in, reviewable application out

CLAUDE.md governs every step. `MASTER_CV.md` is the only source of facts. Nothing
produced here is ever sent or submitted; the user sends and submits everything
themselves.

**Track separation.** This is the academic track's tailoring skill. The industry job
hunt has its own skill, `tailor`, which reads `criteria.md`, writes a cover letter
under the industry voice rules, and logs to `tracker.md`. This one reads
`criteria-academic.md` and logs to `tracker-academic.md`. The two differ in more than
file names: see "The one deliberate voice divergence" below. Do not run the industry
`tailor` on a doctoral posting.

## Preconditions (refuse to start otherwise)

1. `applications/<org>-<call-or-position>/posting.md` exists and contains the
   posting or call text **verbatim**. If it does not: create the folder, copy
   `templates/posting-academic.md`, capture the text, save it, then begin. Never
   tailor from a paraphrase or a memory of a call. For supervisor outreach there is
   no posting; the enquiry draft in the same folder stands in for it, and
   `outreach-academic` owns that path.
2. Read `MASTER_CV.md` in full. Read `criteria-academic.md` and `profile.md`. Read
   `research.md` if present. Read `calls.md` for the call's recorded deadline and
   source.

## Step 1: eligibility gates, before anything else

Copy `templates/notes-academic.md` to `notes.md` if it does not exist, and fill the
gates table **from the live text**, not from memory of the call: citizenship,
residence, mobility rules, degree, grade thresholds, language, field, career stage,
enrolment prerequisites.

- **Any failed gate: say in one line why, and stop.** No documents out of politeness.
- Any gate you cannot resolve from the text: ask the user now, not later. A `confirm`
  gate discovered at step 6 has already cost the work of steps 2 to 5.
- **Verify the call is still live on the employer's or funder's own system**, never
  on an aggregator mirror. Mirrors go stale first, and a call marked expired on one
  while the source is still accepting applications is a common and expensive
  mistake.

## Step 2: fit gate

Score against the `criteria-academic.md` rubric, tier fit stated.

- Any auto-drop gate: stop, one line.
- Below the threshold: recommend skipping, one line of reasoning, and wait for an
  explicit override.

## Step 3: requirements map (notes.md)

Every requirement in the posting or call text goes into the table: requirement,
evidence in `MASTER_CV.md`, verdict (strong / partial / gap).

- A gap is a gap. Name it. No near-synonyms, no positioning, no writing around it.
- If a number would help but `MASTER_CV.md` does not contain it: ask. Never
  estimate, round, or invent a metric.

## Step 4: documents, by target type

- **Position application**: motivation letter from
  `templates/motivation-letter-academic.md`; research statement from
  `templates/research-statement.md` when the posting asks for one.
- **Grant call**: work plan from `templates/grant-work-plan.md`, sized to the
  funder's own instructions. **Their structure overrides the skeleton, always.** A
  funder that asks for four named sections in a stated order gets four named
  sections in that order, whatever the template looks like.
- **Supervisor approach**: outreach email from
  `templates/supervisor-outreach-email.md`, with the matching sketch from
  `sketches/` offered as the agenda. (`outreach-academic` runs this path end to end;
  use this skill for it only when the user asks for the documents alone.)

Voice rules apply hard to all documents (CLAUDE.md): evidence-first openings,
maximum 4 paragraphs for letters, numbers verbatim from `MASTER_CV.md`, no em
dashes, no superlatives, understated and humble, work-authorisation status appears
nowhere.

### The one deliberate voice divergence from the industry track

CLAUDE.md forbids confessing gaps in a cover letter to a company. On the academic
track that rule is deliberately relaxed: gaps ARE stated plainly when the call asks
a direct question about that experience, because an academic letter is read by the
people who would supervise the work, and an unmet stated requirement surfaces in the
first interview anyway.

The relaxation is narrow and it is not a licence to ramble:

- It applies **only** when the call asks directly about that experience.
- State the actual exposure precisely (studied / personal experiments / evaluated
  and set aside), **confirmed with the user before writing it**. Never claim
  professional use that did not happen; never undersell real exposure either.
- Still no "I'll be honest", no confession preface, no enumerated list of
  shortcomings. One clean sentence at the honest level, then move on.
- Gaps still always go into `notes.md` in full, whatever the letter says.

## Step 5: CV, when the call wants one

Copy `templates/tailored-cv.tex` to `cv-<slug>.tex` (and
`templates/tailored-cv-ats.tex` only if the portal parses). Fill every placeholder,
driven by the requirements map.

- Select, reorder, and rephrase from `MASTER_CV.md` only. Every number verbatim.
- **Academic conventions that differ from an industry CV**: publications get their
  own section and sit above professional experience; grades and thesis assessment
  appear under Education; a supervisor's name is written only where `MASTER_CV.md`
  records it; teaching, reviewing and conference activity earn a section if there is
  anything real to put in it.
- Academic portals are read by people, not parsed by software, so the **designed**
  CV is the default attachment. Build the ATS variant only when the portal is a
  parsing applicant tracking system or the call asks for plain text.
- 1 to 2 pages unless the call states otherwise. Some calls specify a maximum
  length; theirs wins.
- Date ranges use `--` (en dash). No em dashes anywhere; a hook enforces this.
- Escape LaTeX specials: `\&` `\%` `\#`. Escape them inside URLs too, or wrap the
  URL in `\href{}{\nolinkurl{}}` so it can line-break.

## Step 6: documents checklist (notes.md)

From the call text: every required document, who produces it, and its lead time.
**Flag long-lead items loudly**, on the day the call is first worked, not the week
it closes:

- supervisor commitment or support statements
- proof of doctoral study right or enrolment
- transcripts and degree certificates, especially ones that must be issued or
  translated
- referee contacts and letters

**Referees are the commonest thing to run out of time on.** A referee who has not
answered yet is not a referee. If the call needs two, check `tracker-academic.md`
for who has agreed and say plainly how many are short and by when.

## Step 7: compile

From inside the application folder:

```bash
xelatex  -interaction=nonstopmode cv-<slug>.tex        # run twice
pdflatex -interaction=nonstopmode cv-<slug>-ats.tex    # only if built
xelatex  -interaction=nonstopmode letter-<slug>.tex    # run twice
```

If `profile.md` records that the LaTeX binaries are not on PATH, use the full path
it records.

Gate-check every build before reporting:

- length within whatever the call allows; letter exactly 1 page unless stated
  otherwise (check the log's "Output written" line)
- zero `Overfull \hbox` warnings in every `.log`; fix wording or line breaks until
  clean

Delete the aux files afterwards. Keep the `.tex`.

## Step 8: finish notes.md and tracker-academic.md

Gaps (including the unwelcome ones), the single weakest point of the application and
what would fix it, questions worth asking them, and a follow-up log row.
`tracker-academic.md` gets a row: status `drafted`, follow-up date **before** the
deadline, not on it.

## Step 9: self-verify, then report (definition of done)

1. **Claims trace.** Re-read every produced document against `MASTER_CV.md`.
   Anything without a source line gets fixed or cut.
2. **Numbers verbatim** check.
3. **Em-dash scan** of the produced files.
4. **Work-authorisation status** appears nowhere in any document.
5. Every factual claim about the funder, the group, or the call has a source URL in
   `research.md` or in the document itself, with the date it was verified.
6. **Report**: the gates outcome, the rubric score, the gap list, the single weakest
   point and what would fix it, the files produced, and **exactly what the user must
   do themselves** (send, sign, request, attach, submit), with the lead time on each.
   Then stop.
