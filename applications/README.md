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
| `notes.md` | `tailor` | Requirements map, gaps named plainly, the single weakest point, questions to ask, follow-up log. |
| `cv-<slug>.tex` / `.pdf` | `tailor` | Tailored designed CV. XeLaTeX, self-contained preamble. |
| `cv-<slug>-ats.tex` / `.pdf` | `tailor` | Tailored ATS CV. pdfLaTeX, self-contained. |
| `letter.md` | `tailor` | The cover letter. This is the canonical text. |
| `letter-<slug>.tex` / `.pdf` | `tailor` | The letter as a PDF, for portals that want a file. |

The tailored `.tex` files are **self-contained**: they do not load
`base-cv/cvstyle.sty`, so each folder compiles on its own and stays reproducible
even if you restyle the master later.

## Two other valid shapes

**Open application** (`<company>-open/`): no `posting.md` and no tailored CV pair,
and that is correct, not incomplete. There is no advertised role to tailor against.
It holds `email.md` (the channel, the subject, and the body, which **is** the
letter) and uses `base-cv/cv.pdf` as the attachment.

**Academic** (`<org>-<position-or-call>/`): holds whatever documents the **call**
names, which is usually the designed CV plus a motivation letter or a research
statement, not a fixed CV pair. `notes.md` here carries the eligibility gates table
and the required-documents checklist, and it is read first.

## The rule that matters

`posting.md` is saved **verbatim**, on the day the ad is found, before anything else
happens. Not summarised, not cleaned up, not paraphrased.

Postings come down. When one does, this file is the only record of what was actually
asked for, and it is what a claim gets checked against three weeks later when a
recruiter calls.
