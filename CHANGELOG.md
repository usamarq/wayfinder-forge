# Changelog

Wayfinder Forge is the public, personal-data-free sister of a private repo that runs
a real job hunt. Every so often the rules, voice conventions and portal notes that
the private run has earned get carried over here, generalised, with everything about
the person left behind. This file says what changed and what an existing user needs
to do about it.

## 2026-09-18: lessons from six more weeks of real applications

Covers the private run from early August to mid September 2026, on both tracks.

### Rules that changed

- **Cover letters open with the draw, not with the evidence.** What it is about this
  position and this organisation's work that interests you, then skills, then
  projects. The assistant writes that opening itself, from what the company says it
  builds and one true thing in your CV, and you correct it at review. Evidence moves
  to paragraphs two and three and does not get thinner. Outreach emails still open
  with the evidence. (`CLAUDE.md`, `tailor`, `tailor-academic`, the letter templates.)
- **Every file an employer receives leads with your name**:
  `<name>-cv-<company>.pdf`, `<name>-letter-<company>.pdf`. The old `cv-<slug>.pdf`
  names said nothing about whose CV it was once downloaded. (`CLAUDE.md`, every skill
  that names a file, the templates, `applications/README.md`.)
- **A duration is a number, and a level is copied from the certificate.** "N years"
  is summed from the dates in `MASTER_CV.md` with the arithmetic written down;
  language levels and grades are read off the document, never converted from
  memory. (`CLAUDE.md` hard rule 2, `setup`, `answer-bank.md`.)
- **New section in `CLAUDE.md`: "When a fact turns out to be wrong."** Fix the source,
  sweep every reusable file (instructions that produce text above all), leave what
  was sent as it was sent, and fix live applications whose portal still allows it.
- **Drafted emails go into your mail drafts**, as replies inside the existing thread
  where there is one, with the markdown copy kept as the record. Still never sent.
  Where no address exists, the follow-up is a call script, not a guessed address.
- **Colons and semicolons kept rare in letters.** Banning em dashes pushed drafts
  toward colon chains, which read as machine-written just as clearly.
- **Your words first; feedback in rounds.** Rough paragraphs get edited, not
  replaced, and every feedback round is logged verbatim in `notes.md`.
- **Form fields that probe a gap: describe, do not confess.** State what you did,
  precisely, and let the reader judge. Never attach a label the work has not earned.
- **Salary handover carries the published band.** When the field is left for you and
  the ad publishes a band, the flag states the band and a suggested figure at or just
  above its floor.
- Working-style additions: a posting has a shelf life of one to two weeks; a drafted
  application never simply lapses; overrides are scoped and dated; a settled question
  stays settled.

### New machinery

- **`leads-archive.md` and `tracker-archive.md`**, each behind a compact dedupe index
  that `discover` and `outreach` read. The live files hold only what is actionable.
- **A verify pass in `discover`**: a card is a lead, not a fact.
- **`templates/application-bundle.tex`**: one bookmarked PDF containing all
  materials, for calls that demand a single file. Pure LaTeX (`pdfpages`).
- **A direction dialogue, a "Resume here" block and a decisions block** for long
  academic applications; **referee notices** before a name goes into a form.
- **A `prep/` folder shape** for interviews (`applications/README.md`).
- **Two outreach options in `profile.md`**, both off by default: sector-level hooks,
  and no batch ceiling.
- **`boards.md` grew three transferable sections**: reading cards cheaply, verifying
  a lead at source, and a much longer "Where assisted fill breaks" (Workday values
  that render but never register, profile-backed portals that pre-attach an old CV,
  portals with no stop point, destructive buttons styled as the primary action).
- **LinkedIn recipe corrected**: `location=` fails silently, use `geoId`; the results
  path moved; the whole page reads in one call; the detail pane's Apply control is
  the route to the employer's real posting.

### Fixes

- **Repo guard hook**: push and remote rules now inspect each `git push` by its own
  arguments. A URL or the text `--force` inside a commit message in the same command
  no longer blocks a plain push, and three real holes are closed
  (`git -C <dir> push -f`, a `+branch` refspec with no colon, `push -d`).
- **CV style** (`base-cv/cvstyle.sty`, `templates/tailored-cv.tex`): the section rule
  sits directly under its heading instead of a full line below it; dates stay level
  with wrapped titles; a wrapped title no longer crowds the line under it; a heading
  is never stranded at the foot of a page; and a `\cvsection` placed straight after
  body text no longer runs into that paragraph.

### If you set up before this date

1. Add a **file-name slug** to `profile.md` (Identity), and optionally a personal
   website. Ask Claude to "reconfigure identity" and it will do it.
2. **Rename only what you have not sent.** Folders whose documents already went to an
   employer keep their old file names, so the repo matches what the employer holds.
3. Create the two archive files from this template's copies, and ask for an "archive
   pass": closed-out rows move over verbatim and the indexes get built.
4. If you restyled `templates/tailored-cv.tex` or `base-cv/cvstyle.sty`, port the
   `\cvsection` and `\cventry` changes by hand; existing application folders are
   self-contained and are not affected.
5. Re-read your `answer-bank.md` against the new sections (years arithmetic,
   documents on file, settled readings, AI-use disclosure). They are prompts for
   things only you can answer.

## 2026-08-04: first public release

The workspace as first published: the setup interview and preflight, eight skills
across the two tracks, four Node guard hooks, the LaTeX CV pair and its templates,
and blank state files.
