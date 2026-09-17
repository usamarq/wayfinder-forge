# applications

One folder per application. Both tracks live here; the folder name says which.

```
applications/
├── acme-ml-engineer/                  industry
├── globex-data-scientist/             industry
├── initech-open/                      open application (no advertised role)
├── uni-helsinki-doctoral-researcher/  academic
└── nokia-foundation-grant/            academic, funding
```

Name it `<company-or-org>-<role-or-call>`, lowercase, hyphenated. The name ends up
in file paths, in the tracker, and in conversation, so make it something you would
recognise in six months.

## What a full industry application folder holds

| File | Written by | What it is |
|---|---|---|
| `posting.md` | `discover` or you | The ad, **verbatim**, saved the day you found it. Ads disappear. |
| `research.md` | `tailor` or you | Company, team, product, news, the one concrete hook, with sources. |
| `notes.md` | `tailor` | Where the ad was verified, requirements map, gaps named plainly, the single weakest point, letter feedback log, what the employer actually received, follow-up log. |
| `<name>-cv-<company>.tex` / `.pdf` | `tailor` | Tailored designed CV. XeLaTeX, self-contained preamble. |
| `<name>-cv-<company>-ats.tex` / `.pdf` | `tailor` | Tailored ATS CV. pdfLaTeX, self-contained. |
| `letter.md` | `tailor` | The cover letter. This is the canonical text and the place to revise it. |
| `<name>-letter-<company>.tex` / `.pdf` | `tailor` | The letter as a PDF, for portals that want a file. |

The tailored `.tex` files are **self-contained**: they do not load
`base-cv/cvstyle.sty`, so each folder compiles on its own and stays reproducible
even if you restyle the master later.

### Why the file names lead with your name

`<name>` is the file-name slug in `profile.md` (for example `lastname-firstname`),
and `<company>` is the short tag the folder uses. Every file an employer actually
receives leads with your name, because a file called `cv-acme.pdf` says nothing
about whose CV it is once it is sitting in a recruiter's downloads folder next to
forty others. `letter.md` keeps its plain name: it is the working text and never an
attachment.

**Never rename a file that has already gone to an employer.** The repo's record has
to match the file they hold. If you have folders from before this convention, the
ones you have not sent can be renamed; the ones you have sent stay as they are.

## Two other valid shapes

**Open application** (`<company>-open/`): no `posting.md` and no tailored CV pair,
and that is correct, not incomplete. There is no advertised role to tailor against.
It holds `email.md` (the channel, the hook, the subject, and the body, which **is**
the letter) and a copy of the designed master CV named `<name>-cv-<company>.pdf`,
which is the attachment.

**Academic** (`<org>-<position-or-call>/`): holds whatever documents the **call**
names, which is usually the designed CV plus a motivation letter or a research
statement, not a fixed CV pair. `notes.md` here opens with a "Resume here" block,
carries the eligibility gates table and the required-documents checklist, and is
read first. Where a call wants everything in one file, the folder also holds
`<name>-application-<org>.pdf`, built from `templates/application-bundle.tex`. A
call that needs a research direction you have not settled yet gets a
`direction-dialogue.md` before it gets a letter.

## When an interview lands: `prep/`

Open a `prep/` folder inside the application folder the day the invitation arrives.
What has earned its place there:

| File | Why |
|---|---|
| `README.md` | What is in the folder, the date, time and format, who you are meeting, and the three things that matter most. |
| `interview-prep.md` | The working notes: logistics, who is interviewing you (verified on their own pages), your story, the technical and behavioural questions **answered from incidents recorded in `MASTER_CV.md` and `notes.md`**, the gaps and the honest answer to each, questions to ask, and a day plan. |
| `submitted/` | Copies of exactly what they hold: the CV, the letter, anything else you sent. They will quote your letter back at you, and you should know what your CV does *not* say. |
| `correspondence.md` | Their emails, verbatim. Facts about the process live there. |
| `reading-list.md` | The material behind the interviewers' own work (product documentation, engineering posts, papers), with what each gives you. Read the one they will assume you know, in full. |

Habits worth keeping. **If the invitation does not state the format, ask**, and
prepare a short presentation anyway in case the answer comes late or not at all.
**Gaps get answered precisely and once**: say what you did do, and stop. If the
application named referees, tell them an interview is coming, because that is when
the call to them actually arrives.

## The rule that matters

`posting.md` is saved **verbatim**, on the day the ad is found, before anything else
happens. Not summarised, not cleaned up, not paraphrased.

Postings come down. When one does, this file is the only record of what was actually
asked for, and it is what a claim gets checked against three weeks later when a
recruiter calls.
