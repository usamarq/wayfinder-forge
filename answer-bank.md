# Answer bank

Honest, reusable answers to the questions application forms ask. `apply-assist`
fills forms from this file.

Rule from CLAUDE.md: **every answer here is true and traces to `MASTER_CV.md` or to
`profile.md`.** Anything marked `[TODO]` or `[CONFIRM]` is a fact only you can set:
fill it, and never let it be invented for you.

The point of this file is that a question you have answered carefully once never has
to be answered carelessly at 11pm against a deadline.

## Identity and links

- Name: {{...}}
- Email: {{...}}
- Phone: {{international form; add the national form if local portals want it}}
- Address: {{street, postcode, city, country. Some portals require a full address.}}
- Date of birth: `[TODO if you want it recorded]`
  <!-- Only fill this if forms in your market actually ask. If you do, note the
       formats: DD.MM.YYYY, YYYY-MM-DD, DD/MM/YYYY, MM/DD/YYYY. Check which a
       US-hosted portal means before typing an ambiguous date. -->
- Location: {{city, country}} ({{relocation willingness}})
- LinkedIn: {{url}}
- GitHub: {{url}}
- Personal website: {{url, in the form you want displayed}}
  <!-- Goes in the CV header of every application and into any form field that
       offers a website, portfolio or personal-page slot. Where a form has one
       generic "website" field and no separate GitHub field, this is the one to use. -->
- Portfolio / publications: {{url}}
- ORCID iD: {{iD and https://orcid.org/... link, or "none"}}
  <!-- Academic track. The iD belongs to you, not to an institution, so register it
       to a personal address that survives the end of a university account. Forms
       that ask for one often add "make sure your profile is updated and public":
       an iD pointing at an empty record is worse than none. Every date on the
       record traces to MASTER_CV.md. -->
- File-name slug for documents you send: {{from profile.md, e.g. lastname-firstname}}

## Work authorisation

**Answer honestly ONLY when a form asks. Never volunteer it.**

- "Are you authorised to work in {{country}}?" -> {{one honest sentence}}
- "Do you require visa sponsorship?" -> {{one honest sentence}}
- Context, only if specifically asked: {{...}}
- Supporting documents, if you hold any: {{where they are; you attach them yourself}}
- `[VERIFY]` Keep this current with your actual status. If you are unsure of the
  exact wording, check with the immigration authority rather than approximating. The
  assistant never fills a permit-specific document or claim field: you do that.

<!--
  Two traps worth writing your answer against, because forms test for them:

  1. Some forms ask about the "permanent / indefinite unrestricted right to work"
     and attach a test like "answer No if you hold any authorisation with an
     expiry date". That is a different question from "are you authorised to work",
     and the honest answers to the two can differ. Record both separately.
  2. Sponsorship questions are often phrased "will you now OR IN THE FUTURE require
     sponsorship". Answer the question actually asked, including the future clause.
  3. Eligibility and screening forms are sometimes worded loosely enough that two
     honest readings exist. When you meet one, settle how you read it once, and
     record it below.
-->

### Readings you have settled

<!-- When a form question is genuinely ambiguous and you have decided how you read
     it, record the question as worded, your answer, your reasoning and the date.
     The assistant flags an ambiguity once. After you have settled it, it follows
     this record and stops re-raising the point. Differently worded questions get
     their own entries, even when the answers look like they should match.

     What the assistant does with this section: a yes/no or free-text QUESTION whose
     wording matches one recorded here (or above) is answered with exactly your
     wording and flagged for your read. PERMIT-SPECIFIC CLAIM FIELDS (permit type,
     number and dates, citizenship or residency declarations for screening) and
     identity documents are never typed or uploaded by the assistant: those stay
     yours every time, and this record just lets you fill them in a second. -->

- {{question as worded}} -> {{your answer}} ({{your reasoning}}, settled {{YYYY-MM-DD}})

## Availability and logistics

- Notice period: {{...}}
- Earliest start date: {{...}}
- Willing to relocate: {{...}}
- Work model: {{on-site / hybrid / remote, and from where}}
- Driving licence: {{if forms in your market ask}}

## Compensation

- Expectation: {{floor and target, in your market's convention}}
- Standing stated range, if you want one: {{the range you are happy to see typed
  whenever a form or an ad demands a figure and publishes no band of its own, with
  its wording, e.g. "X to Y per month gross, depending on the overall package"}}
  <!-- A stated range and a negotiation floor are different numbers doing different
       jobs: one is what a form sees, the other governs what you accept. If you set
       them differently on purpose, say so here, so nobody "fixes" one to match the
       other. -->
- Rule: state a figure only when a form requires one, after checking the role and
  the company band. Regional bands differ; note the differences here as you learn
  them. Say whether a figure is monthly or annual, in the units the field asks for.
- **When the ad publishes a band, the published floor is the information.** A
  standing range was written for ads that publish nothing; reused against a
  published number it bids under the employer's own starting point. Go at or just
  above their floor, or, where the field is free text, "in line with the range
  stated in the advertisement". Where a role is clearly senior or clearly priced for
  an expensive city, raise the figure for that application rather than defaulting.
- `[CONFIRM]` per application: `apply-assist` fills a salary field only with a
  figure you pre-approved for that application in its `notes.md`. When it leaves the
  field for you, its handover states the published band and a suggested figure in
  the same sentence, because you are the one deciding and this file is not in front
  of you at that moment.

## Languages

- {{Language}}: {{level **as printed on the certificate**, the test, the score, the
  certificate's date and reference number}}
- {{Language}}: {{level}}

<!-- Read the framework level off the certificate itself. A test report can print a
     lower level than the score is commonly assumed to mean, and a level converted
     from memory then travels into every CV and every form. Note the certificate's
     date too: some calls want a VALID certificate, and test reports commonly
     recommend re-assessment after two years. If that may apply, ask the institution
     rather than assuming either way. -->

Standing free-text wording: {{e.g. "<Language> <level>; <Language> <level>"}}
<!-- This line is an INSTRUCTION that produces text, so it is the first thing to
     re-check whenever a level above is corrected. -->

### When a dropdown has no rung for your actual level

Forms often offer a scale with gaps: `Native / Excellent / Good / Satisfactory / I do
not speak X`. If your real level falls between two rungs, **pick the lower one.**
The higher rung usually implies a working proficiency you would have to demonstrate,
and your CV states the real level with its scale, so the nuance stays on record. If a
scale does offer an elementary or beginner rung that matches, pick that: it is more
accurate than either neighbour. In a free-text field, write the level and the scale
rather than choosing a label.

Standing answers, once you have decided them:

- {{Language}} dropdown: **{{the option you always pick}}** ({{why}})

## Education

- {{Degree}}, {{field}}, {{institution}}. {{Completed year}}.
- {{Degree}}, {{field}}, {{institution}}. {{year}}.

## Experience and skills

Framing note: {{how to describe your shape when a form asks a blunt "years of X".
Keep total professional experience and experience in a specific thing distinct.}}

**Years are arithmetic.** Every figure below is summed from the dates in
`MASTER_CV.md`, and the sum is shown, so a form never gets a remembered round number.

- Total professional experience: {{N months = about X years: role A n + role B n +
  role C n}}
- If you also count roles held during a degree (thesis work, internships): {{the
  larger total, **to be stated only with that label**}}
- {{Specific skill}}: {{the figure, and WHAT it counts. Time spent on something
  during a degree and time spent in jobs titled for it are both honest figures, and
  they answer different questions. If a form asks for years in a JOB doing it, use
  the job figure, and say which you are counting.}}
- {{Specific skill}}: {{...}}

### Responsibility questions, and exact dates

Public-sector and academic forms ask these routinely, and a CV rarely answers them.
They come from you, never from inference.

- Staff or management responsibility: {{yes, in which role / no}}
- Financial or budget responsibility: {{yes / no}}
- Exact employment dates, where a form wants a day: {{role: DD.MM.YYYY to DD.MM.YYYY}}
- Day-of-month convention for everything else: {{e.g. "start dates take the first of
  the month, end dates the last; fill it, state the convention, do not ask"}}

## Documents on file

<!-- What exists, where, and what each one satisfies. Record WHAT you have and where,
     never the contents. Verify every path: a folder name remembered wrong gets
     copied everywhere. -->

| Document | Path | Pages | Satisfies |
|---|---|---|---|
| {{Degree certificate}} | {{base-cv/certificates/...}} | {{n}} | "degree certificates / diplomas" |
| {{Transcript of records}} | {{base-cv/transcripts/...}} | {{n}} | "transcripts". NOT a degree certificate. |
| {{Certificates, merged}} | {{...}} | {{n}} | a form with ONE slot for several certificates |
| {{Certificates and transcripts, merged}} | {{...}} | {{n}} | "certificates including transcripts", which is a larger request |
| {{Language certificate}} | {{...}} | {{n}} | {{and its date}} |
| {{Thesis or writing sample}} | {{...}} | {{n}} | calls that invite a sample of academic writing |
| {{Publication PDF}} | {{...}} | {{n}} | **the version whose title matches the citation in your CV** |

- A merged file is named for its contents and ordered the way forms ask: most recent
  degree first.
- **Papers change title between preprint versions.** Attach the version whose title
  matches what your CV cites, and cite what the DOI resolves to today. A publication
  *list* in a funder's format is a different document from the paper.

## Standard yes/no

- Legally authorised to work in {{country}}: {{...}}
- Require sponsorship: {{...}}
- Willing to relocate: {{...}}
- Open to remote / hybrid / on-site: {{...}}
- Consent to a background check: {{...}}

### Talent-pool and group-recruitment consent

Large employers routinely ask whether your application may be reused for other roles
across the group, and how long they may keep it. Saying yes typically converts one
application into a year or two of passive candidacy, which is worth more than it
looks; read their retention period before deciding.

- Standing preference: {{yes / no / ask me each time}}
- **The assistant still never ticks it.** Consent stays yours on every form. This
  entry exists so you can answer in a second instead of re-reasoning it, not so the
  box gets filled for you. After any refill of a form, `apply-assist` checks that no
  consent control moved by accident.

## Per-application (do NOT pre-fill)

- "Why do you want to work here?" / "Why this role?" -> written per application by
  `tailor` from the posting and `research.md`. Never templated, never reused.

## Portal-specific standing answers

<!--
  Fill these in as you hit them. Each one is a question you then never have to
  think about again.
-->

### "How did you hear about us?" when the list has no accurate option

Applicant tracking systems often offer source lists with no plain "LinkedIn" entry,
or with options that would be false (for example "LinkedIn connection post" when no
connection posted it). Most lists carry a generic "Job board" option, which is
accurate for a board-sourced lead.

- Standing answer: {{...}}
- Where the board is named and accurate, pick it by name.

### Required free-text "summary" fields

Some systems (Workable, among others) put a required short summary on every job,
which functions as a second, shorter cover letter. Keep a role-agnostic version here
and add one role-specific line at the end each time.

> {{your standing summary paragraph: what you build, the strongest measured result,
> your qualification, your languages. Every number verbatim from MASTER_CV.md.}}

## Gap-shaped form questions: describe, do not confess

Forms ask questions aimed straight at an area you may be thin in: "What is the
largest system you have run in production, and what broke?" The rule for every such
field:

- **Describe what you actually did, precisely, and stop.** The scale, the tools, the
  workaround. A reader who knows the field can size that at once. That *is* letting
  them judge.
- **Do not volunteer the negative.** No "I have not", no "that was only", no sentence
  whose job is to pre-empt the reader's assessment. A form field is not a confession
  box any more than a cover letter is.
- **The limit that does not move: never apply a label the work has not earned.**
  Declining to call a nightly script "a data platform" is honest. Calling it that
  breaks CLAUDE.md hard rule 1. Refusing to volunteer a negative and inventing a
  positive are different acts, and only the second is forbidden.
- A forward line is allowed, once: appetite for the harder version of the work, with
  no deficit attached.

This does not loosen the rule against writing a gap away. The gap still goes into
`notes.md` in full, and the answer still may not imply experience that is not there.
The field states the facts and leaves the inference to the reader.

## AI-use disclosure

Some employers now invite applicants to say whether AI helped prepare the
application, often adding that the answer is not a selection criterion. **Whether to
declare it is your decision, every time, and the assistant never makes it for you.**
Record your default here. It is used only where a form actually asks or invites it;
it is never volunteered.

- Default: {{declare / do not mention unless required / ask me each time}}
- Standing wording, if you declare:

> {{e.g. "Yes. An AI assistant helped me prepare this application. It mapped the
> role's requirements against my CV, helped me draft and tighten the CV and the
> letter, and helped fill in this form. The experience and every figure are my own,
> and I read everything before submitting."}}

What makes a disclosure read well: it is specific about what the tool did rather than
vague; it says plainly that the substance is yours and that you reviewed it, which is
what an employer actually wants to know; and if working with these tools is already a
skill on your CV, it says so, which makes the disclosure consistent with your profile
rather than an apology. It claims nothing untrue and does not overstate the tool's
role. Adjust the first sentence when the tool use genuinely differed, for example
where no cover letter was written.

## Outreach message calibration

<!-- The outreach skill writes your recurring corrections here during Phase 1, so
     they survive the session. Defaults live in linkedin-outreach.md ("How the
     messages are written"); anything here overrides them. -->

- {{e.g. "Keep first messages to three sentences. No numbers in a first message."}}
  (set {{YYYY-MM-DD}})

## Optional and equal-opportunity questions

Fill in what you are willing to answer. Any consent checkbox attached to a
demographic survey is still always yours to tick.

- Gender: {{...}}
- Pronouns: {{fill only when the form has the field}}
- Ethnicity: {{...}}
- Veteran status: {{...}}
- Disability: {{...}}
- Age band: {{ranges differ per form; pick the one containing your age at the time
  of filling rather than reusing a remembered band}}

## Form questions this file did not cover

<!--
  apply-assist logs new questions into the application's notes.md as it hits them.
  Move the ones worth reusing up into this file YOURSELF, deliberately. They are
  never invented mid-fill.
-->

- {{question}} -> {{your answer}} (added {{YYYY-MM-DD}})
