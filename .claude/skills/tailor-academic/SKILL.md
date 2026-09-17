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
  mistake. **Take the deadline from the source as well**: a mirror has shown a
  closing date a full month earlier than the employer's own system.
- **Gates that hide in the practicalities.** Read for these as carefully as for the
  degree requirement: a supervisor who must be agreed *before* applying; a limit of
  one position per applicant per call; a study right that is a separate application
  with its own deadline; a language certificate that must be *valid*, where test
  reports commonly recommend re-assessment after two years; degree certificates
  "including transcripts", which is a larger request than certificates alone; an
  official explanation of a foreign grading scale.
- **If two posts share a supervisor, think about the order.** The same person will
  read both applications, and a weak fit sent first colours the reading of the
  strong one that follows. Say so, with both rubric scores, and let the user decide.
  Deciding not to send the weaker one is a legitimate outcome. Letting it lapse
  undecided is not.

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

Voice rules apply hard to all documents (CLAUDE.md): maximum 4 paragraphs for
letters unless the call sets a length, numbers verbatim from `MASTER_CV.md`, no em
dashes, colons and semicolons kept rare, no superlatives, understated and humble,
work-authorisation status appears nowhere.

**The letter opens with the draw, in this shape:** where the position was found (one
clause), what draws the user to it, and what interests them in the project itself;
then the evidence. The draw is built from the project's own description and from one
true thing in the user's record, never from general commentary on the field: a
reader who works in that field reads "X is transforming Y" as filler. Supervisor
outreach emails are different and still open with the reader's own work
(`outreach-academic`).

**Length.** One page is the house default. **A call's own allowance overrides it**
when the content earns the space, and the user decides that. Once they have, stop
squeezing: while content is still arriving, keep a working build at whatever length
it runs, record cut candidates in `notes.md`, and do a separate trim pass at the end.

**Their words first.** An academic letter is where this matters most, because every
other applicant is also writing with a language model. What marks a letter as
written by someone who has met the problem is content only they have: an incident
from their own work, their own diagnosis, a specific reading of a named paper. If
they give you a rough paragraph, on the opening or on an incident, edit it for
grammar and register and keep their sentence shapes. If they do not, write the draw
yourself (CLAUDE.md; `profile.md` may say "ask me first"), flag it for their read,
and say once that an incident of their own would do more for the letter than
anything you can write. Technical density is their call, paragraph by paragraph; use
the field's real terms where they do work, never as decoration, and mark any
sentence that is your reasoning rather than a citation so they can strike it. Log
every feedback round verbatim under "Letter feedback log" in `notes.md`.

### When the call wants a research direction and the user does not have one yet

Do not write the letter around a direction invented to fit the group. Run a
**direction dialogue** first, in its own file in the application folder
(`direction-dialogue.md`), and do not start the letter until it ends in a direction
the user has stated in their own words.

- Set the clock at the top: the date by which a direction must be settled for the
  letter to be written well (about a week before the deadline). A few days of
  dialogue fits; a few weeks does not.
- Rounds of questions grounded in `MASTER_CV.md` and in what they have said they are
  interested in. Record their answers in their own terms, verbatim where it matters.
  Nothing in the file is a decision until they say it is.
- Your homework between rounds: a supervisor map and a short literature read for
  each live direction, **verified at source**. Say plainly when a direction has no
  confirmed supervisor match at the target institution; do not assume a fit from a
  research-area label.
- The test of a candidate direction is whether they can state it themselves, without
  your framing. If they cannot yet, the next round is their own-words homework, not
  a better paraphrase from you.
- When they lock it, record the date and the wording, close the dialogue, and open
  the letter.

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
  professional use that did not happen; never undersell real exposure either. Once
  they have confirmed a level, propose it into the "Confirmed exposure levels" table
  in `MASTER_CV.md` through the review gate, so the next application does not have
  to ask again and the level cannot drift upward between letters.
- The trigger is the call's question, not the assistant's unease: if the call does
  not ask about it, the gap lives in `notes.md` only.
- Still no "I'll be honest", no confession preface, no enumerated list of
  shortcomings. One clean sentence at the honest level, then move on.
- Gaps still always go into `notes.md` in full, whatever the letter says.

## Step 5: CV, when the call wants one

Copy `templates/tailored-cv.tex` to `<name>-cv-<org>.tex` (and
`templates/tailored-cv-ats.tex` to `<name>-cv-<org>-ats.tex` only if the
portal parses). **Every file a reader receives leads with the user's name**
(CLAUDE.md): `<name>` is the file-name slug in `profile.md`, and on this track
`<org>` is the university or funder tag. The same goes for the letter, a
publication list, a grading-scale page and any merged bundle. A folder whose
documents already went out keeps the names they went out under. Fill every
placeholder, driven by the requirements map.

- Select, reorder, and rephrase from `MASTER_CV.md` only. Every number verbatim.
- **If the call or the national research system names a CV format, that format
  wins.** Several countries publish a standard researcher-CV template with fixed
  numbered sections (research funding, supervision, merits, and so on). Use its
  headings, and fill a section that does not apply with a plain "none to date"
  rather than deleting it. Then check that statement against `MASTER_CV.md` like any
  other claim: "none to date" is a claim too, and it is an easy line to write on
  autopilot.
- **Two pages is the target at doctoral-applicant stage** unless the call says
  otherwise. Length should track output, and a third page on a short publication
  record reads as padding.
- A publication is cited by the record its DOI resolves to today. **Papers change
  title between preprint versions, and a preprint becomes a journal article**: check
  the publisher's or the DOI registry's record on the day, cite the current one, and
  make sure any PDF of the paper that travels with the application carries the same
  title as the CV citing it. A publication *list* in a funder's format is a separate
  document from the paper itself.
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
for who has agreed and say plainly how many are short and by when. Before an
application that names referees goes in, stage a notice to each of them
(`outreach-academic`, "Referees"), one email per referee covering every application
that names them.

Supporting documents, the parts that go wrong:

- **Degree certificates and transcripts are different documents.** A transcript does
  not satisfy a request for a certificate, and "certificates including transcripts"
  is a larger request than either. Read which the call asks for.
- **When a form has one slot for several documents, build one merged PDF named for
  its contents**, in the order the call lists them. `answer-bank.md` records which
  merged files already exist so they are not rebuilt per application.
- **Verify every path before citing it.** A folder name remembered wrong has been
  repeated across a repo for weeks before anyone noticed the folder did not exist.
- **A foreign grading scale may need explaining.** Where the call asks for it, build
  a short page from the awarding university's own published scale, with its URL and
  the date read.
- **Language certificates expire in practice.** If the certificate is more than two
  years old and the call asks for a valid one, raise it the day the call is first
  worked, and stage an enquiry rather than assuming either way. Do not record the
  requirement as satisfied until someone at the institution has said so.
- **An ORCID iD is worth having, and worth having properly.** It belongs to the
  researcher rather than to an institution, so register it to a personal address
  that survives the end of a university account. Forms that ask for one often add
  "make sure your profile is updated and public": an iD pointing at an empty record
  is worse than none. Every date on the record traces to `MASTER_CV.md`, and where
  ORCID's organisation registry supplies a city the CV does not state, tell the user
  which values those are. Populating it is a useful audit, too: it has caught a
  stale field on an application already submitted.

### When the call wants everything in one file

Some calls require a single PDF containing all materials. Build it rather than
hoping the portal's separate slots are acceptable:

- Parts in **the order the call lists them**, behind a short contents page, with a
  PDF bookmark per part, and the document title and author set in the metadata.
- Name it `<name>-application-<org>.pdf`.
- **Normalise page geometry.** A scanned diploma that is genuinely wider than tall
  should be scaled onto a portrait page, not rotated, which would lay its text on
  its side. Check the merged file page by page.
- Print the page map (part, from, to, pages) and check the contents page against it.
- Upload it to the main document slot and leave the other slots empty on purpose,
  and say so in the fill map, so nobody later "fixes" the empty cover-letter slot.
- `templates/application-bundle.tex` builds one with `pdfpages` and nothing beyond
  the LaTeX already installed.

## Step 7: compile

From inside the application folder:

```bash
xelatex  -interaction=nonstopmode <name>-cv-<org>.tex        # run twice
pdflatex -interaction=nonstopmode <name>-cv-<org>-ats.tex    # only if built
xelatex  -interaction=nonstopmode <name>-letter-<org>.tex    # run twice
```

If `profile.md` records that the LaTeX binaries are not on PATH, use the full path
it records.

Gate-check every build before reporting:

- length within whatever the call allows; letter exactly 1 page unless the call or
  the user has set otherwise (check the log's "Output written" line)
- zero `Overfull \hbox` warnings in every `.log`; fix wording or line breaks until
  clean
- **the letter PDF says what the letter's markdown says**: count the paragraphs in
  both. A PDF has lost a paragraph between drafts with no build warning, because a
  missing paragraph is not a LaTeX error. Re-date the letter when it is rebuilt.
- read each rebuilt PDF once as a page. A degree title colliding with its date does
  not show up in any log.

Delete the aux files afterwards. Keep the `.tex`.

## Step 8: finish notes.md and tracker-academic.md

Gaps (including the unwelcome ones), the single weakest point of the application and
what would fix it, questions worth asking them, and a follow-up log row.
`tracker-academic.md` gets a row: status `drafted`, follow-up date **before** the
deadline, not on it.

**Long applications need a "Resume here" block at the top of `notes.md`.** An
academic application can run across a dozen sessions. End each one by rewriting that
block: what is built, what is staged, what is blocked and on whom, and the exact
next action. Move superseded blocks to the bottom of the file, dated, rather than
deleting them.

**Decisions get recorded as decisions.** If the user proceeds against advice (someone
they trust advising against applying, a rubric score below the threshold), write a
dated decision block with the advice quoted and their call, and do not re-raise it.
If something drafted will not be sent, record that as a decision too. The one
outcome that is not acceptable is a drafted application that simply lapsed.

## Step 9: self-verify, then report (definition of done)

1. **Claims trace.** Re-read every produced document against `MASTER_CV.md`.
   Anything without a source line gets fixed or cut.
2. **Numbers verbatim** check, durations included: any "N years" matches the
   arithmetic in `MASTER_CV.md`.
3. **Em-dash scan** of the produced files, and a **colon and semicolon count** of
   the letter body.
4. **Work-authorisation status** appears nowhere in any document.
5. Every factual claim about the funder, the group, or the call has a source URL in
   `research.md` or in the document itself, with the date it was verified.
6. **Report**: the gates outcome, the rubric score, the gap list, the single weakest
   point and what would fix it, the files produced, and **exactly what the user must
   do themselves** (send, sign, request, attach, submit), with the lead time on each.
   Then stop.
