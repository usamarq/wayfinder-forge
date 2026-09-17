STATUS: NOT SET UP

<!--
  Do not delete or reword the line above. It is the setup gate.
  The `setup` skill flips it to `STATUS: READY` when this file is filled in,
  and a SessionStart hook reads it to decide whether to nag.

  This file is WHO YOU ARE AND WHAT YOU WANT. It is not a CV. Facts about your
  career (jobs, dates, numbers, projects) go in MASTER_CV.md and nowhere else.
  Every skill reads this file. Keep it current; a stale constraint here produces
  a wrong application three steps later.
-->

# Profile

## Identity

- Name: {{full name as it should appear on a CV}}
- Email: {{the address you job-hunt from}}
- Phone: {{international form, plus the national form if local portals want it}}
- Location: {{city, country}}
- Willing to relocate: {{no / within <region> / anywhere / named places}}
- File-name slug: {{lowercase ASCII, e.g. `lastname-firstname`}}
  <!-- Every file an employer receives leads with this slug, which the rest of the
       repo writes as `<name>`: `<name>-cv-<company>.pdf`,
       `<name>-letter-<company>.pdf`. A file called `cv-acme.pdf` says nothing about
       whose CV it is once it is in a recruiter's downloads folder. -->
- LinkedIn: {{url, or "none"}}
- GitHub / portfolio: {{url, or "none"}}
- Personal website: {{url in the form you want displayed, or "none". Goes in the CV
  header and into any form field that offers a website or portfolio slot.}}
- Other public profile: {{Google Scholar, ORCID, or "none"}}

## Situation

- Current status: {{employed / notice period / between roles / finishing a degree}}
- Earliest start: {{date or "immediate"}}
- Notice period: {{length, or "none"}}
- What you are optimising for: {{first offer / best fit / a specific step up / staying in a country}}
- Deadline pressure, if any: {{e.g. "visa expires 2027-03", "funding ends in June", or "none"}}

## Work authorisation

<!--
  Get this exactly right once. It changes the wording of every application.
  Write what is TRUE, in the terms your market actually uses. If you are unsure
  what your status permits, say so here and check with the authority before
  anything goes out. The assistant will never guess a permit claim on your behalf,
  and will never volunteer your status in a CV or letter.
-->

- Citizenship: {{...}}
- Right to work in {{target country}}: {{yes, unrestricted / yes, with conditions / no, would need X}}
- Does an employer have to do anything for you to start: {{no / yes, describe}}
- Wording to use if a form asks directly: {{one honest sentence; also copied into answer-bank.md}}
- Documents you hold that prove it: {{where they are, e.g. base-cv/right-to-work/}}
- [VERIFY] Re-check this before each submit if your status is time-limited or pending.

## Languages

- {{language}}: {{level **as printed on the certificate**, with the test, the score
  and the certificate's date. Do not convert a score to a framework level from
  memory; read it off the document.}}
- {{language}}: {{level}}
- Working language you need the job to run in: {{...}}
- Never claim: {{levels you must not let a document imply, e.g. "working <language>"}}

## Compensation

- Convention in your market: {{monthly gross / annual gross / hourly / annual + bonus}}
- Floor: {{figure and currency}}
- Target: {{figure and currency}}
- Rule: state a figure only when a form requires one, after checking the role and
  the company band. Regional bands differ; note the differences here as you learn them.

## Tracks in use

- Industry job hunt: {{yes / no}}
- Academic track (doctoral positions, research posts, funding): {{yes / no}}
- If both: {{how they relate, e.g. "they race; whichever lands first wins"}}

## Confidentiality

<!--
  Anything you are not free to describe. NDAs, employer disclosure policies,
  unpublished work, client names. Be specific about what IS allowed, not just what
  is not: the useful boundary is usually "architecture, methods and published
  results yes, data and customer information no".
-->

- {{obligation}}: allowed = {{...}}; not allowed = {{...}}; public link if there is one = {{...}}
- Default when this section is silent: describe architecture and outcomes, never data.

## Voice preferences

Defaults from `CLAUDE.md` apply unless overridden here.

- Register: {{understated and plain (default) / warmer / more direct}}
- Em dashes: {{banned (default, and a hook enforces it) / allowed}}
- Cover letter openings: {{the assistant writes the draw from the posting and my CV,
  and I correct it at review (default) / ask me what draws me first}}
- Letter length when a call allows more than a page: {{one page anyway (default) /
  I will say per letter}}
- Cover letter sign-off: {{"Warm regards" / "Kind regards" / "Sincerely" / other}}
- Anything you never want written about you: {{...}}
- Anything you always want mentioned: {{...}}

## Tooling

- LaTeX distribution: {{TeX Live / MiKTeX / none yet}}
- LaTeX binaries on PATH: {{yes / no, they live at <path>}}
- Browser automation: {{Claude in Chrome / Playwright MCP / none}}
- Mail connector for staging drafts: {{Gmail connector / none, I copy and paste}}
- If you run several mail accounts, which one job-hunts: {{the ADDRESS, e.g.
  "jane.jobs@example.org". Not a web-client index such as Gmail's `/u/2/`: that
  number moves whenever accounts are added or removed, so it is found at run time.}}

## Optional features, off unless turned on here

- LinkedIn networking prong (connection requests plus one intro message after
  acceptance, capped and logged in `linkedin-outreach.md`): **{{off / on}}**
  <!-- Read the caps in linkedin-outreach.md before enabling. Your account, your risk. -->
- Sector-level hooks in outreach emails (a true fit at the level of what a company
  does, where no company-specific hook exists): **{{off / on}}**
  <!-- Off means every outreach email needs a reason that could not be sent to any
       other company. On trades sharpness for volume, for outreach emails only;
       tailored applications are never affected. A company with no honest hook at
       either level is still dropped. -->
- Outreach batch ceiling: **{{5 to 8 companies per run (default) / none}}**
  <!-- With no ceiling, a run ends when the companies that publish an email channel
       AND have an honest hook run out. In practice that supply is small. -->

## Session log

<!-- Setup and any later change of a constraint gets one line here, with the date,
     so a skill can tell a current rule from a stale one. -->

| Date | Change |
|---|---|
| {{YYYY-MM-DD}} | Setup completed. |
