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
`applications/` are selections from it. When one gets a correction, the other gets
it in the same pass.

**`cv.pdf` is never attached under that name.** Every file an employer receives
leads with your name, so an open application gets a copy in its own folder, named
`<name>-cv-<company>.pdf` (`<name>` is the file-name slug in `profile.md`). A file
called `cv.pdf` says nothing about whose CV it is once it has been downloaded.

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
├── publications/        the PDFs of your papers, current versions only
├── thesis/              a thesis or other writing sample, if calls invite one
├── right-to-work/       whatever proves your work authorisation, if you hold any
└── references/          reference letters you already have in hand
```

Rules for everything in here:

- **You attach permit and identity documents yourself.** The assistant never fills
  a permit-specific claim field or uploads an identity document (CLAUDE.md
  guardrail 6).
- Record in `answer-bank.md`, under "Documents on file", **what** you have, where it
  is, and what each file satisfies, so a form can be answered without hunting. Do
  not record the contents. Use the exact folder names: a path remembered wrong gets
  copied into every file that mentions it.
- **Certificates and transcripts are different documents.** A transcript does not
  satisfy a request for a degree certificate, and "certificates including
  transcripts" is a larger request than either.
- **One upload slot usually wants one file.** Postings ask for "copies of degree
  certificates" in the plural and then provide a single upload. Build the merged
  PDFs once, name them for their contents, most recent degree first, and list them
  in `answer-bank.md`. `templates/application-bundle.tex` does the merging with
  nothing but LaTeX.
- **Keep only the current version of a paper here.** Preprints change title between
  versions, and attaching an old one hands a reviewer a paper whose title does not
  match the CV that cites it.

## If you have no LaTeX

The `.tex` files are still useful as a structured record, and `tailor` will produce
them either way. To get PDFs, see `../docs/latex-setup.md`. If you would rather not
install a distribution at all, paste the content into whatever you normally use and
export from there; nothing else in the repo depends on LaTeX.
