# base-cv

Your master CV pair, and anywhere you keep the documents applications ask for.

## The pair

| File | Built with | For |
|---|---|---|
| `cv.tex` -> `cv.pdf` | `xelatex cv.tex` | A human reader. Open applications, cold emails, academic portals, anyone who asks for "your CV". |
| `cv-ats.tex` -> `cv-ats.pdf` | `pdflatex cv-ats.tex` | A parser. Applicant tracking systems that extract fields from the file. |
| `cvstyle.sty` | | Style package the designed version loads. Change `cvaccent` in it to restyle everything. |

Build from **inside this folder**, so `cvstyle.sty` resolves:

```bash
cd base-cv
xelatex cv.tex
pdflatex cv-ats.tex
```

Both files carry the same content. They are the complete record; tailored CVs in
`applications/` are selections from it.

## Why two

Applicant tracking systems parse two-column layouts, icons and ligature-heavy
display fonts badly. A CV that parses into the wrong fields is a CV nobody reads,
and you never find out. So: one version optimised for the parser, one for the
person, same facts in both.

`apply-assist` picks between them per portal and says which it chose and why.

## Suggested subfolders

Not created by default. Make the ones you need, and keep the repo private.

```
base-cv/
├── transcripts/         degree transcripts, in the language the portal wants
├── certificates/        degree certificates, language certificates, credentials
├── right-to-work/       whatever proves your work authorisation, if you hold any
└── references/          reference letters you already have in hand
```

Two rules for everything in here:

- **You attach permit and identity documents yourself.** The assistant never fills
  a permit-specific claim field or uploads an identity document (CLAUDE.md
  guardrail 6).
- Record in `answer-bank.md` **what** you have and where, so a form can be answered
  without hunting. Do not record the contents.

## If you have no LaTeX

The `.tex` files are still useful as a structured record, and `tailor` will produce
them either way. To get PDFs, see `../docs/latex-setup.md`. If you would rather not
install a distribution at all, paste the content into whatever you normally use and
export from there; nothing else in the repo depends on LaTeX.
