# LaTeX setup

You need a LaTeX distribution to turn the `.tex` files into PDFs. Nothing else in
the repo depends on it: without LaTeX you still get `letter.md` and the `.tex`
sources, you just have to produce the PDFs some other way.

Two engines are used, on purpose:

- **XeLaTeX** for the designed CV and the letter. They load real fonts through
  `fontspec`, which pdfLaTeX cannot do.
- **pdfLaTeX** for the ATS CV. It uses only standard fonts, which is the point.

## Install

**Windows: MiKTeX**

```powershell
winget install MiKTeX.MiKTeX
```

MiKTeX installs missing packages on demand the first time you compile, so the first
build is slow and later ones are fast. Leave "install packages on the fly" set to
Yes. **Slow can mean several minutes with no output at all**, which looks exactly
like a hang: the first build of `templates/application-bundle.tex` on a fresh MiKTeX
took over three minutes while `pdfpages` installed itself. Let it finish. If a build
does get killed mid-install, run it again: when this was tested, the next run simply
worked. This is
also why the CV templates avoid optional packages where a few lines of plain TeX
will do.

**macOS: MacTeX**

```bash
brew install --cask mactex-no-gui
```

The full MacTeX is about 5 GB; `mactex-no-gui` drops the front-end applications and
is what you want here. BasicTeX is smaller but you will spend the saved space
installing packages by hand.

**Linux: TeX Live**

```bash
# Debian and Ubuntu
sudo apt install texlive-xetex texlive-fonts-extra texlive-latex-extra

# Fedora
sudo dnf install texlive-scheme-medium texlive-xetex
```

## Check it worked

```bash
xelatex --version
pdflatex --version
```

If both print a version, you are done.

## If the binaries are not on PATH

MiKTeX in particular often installs to a per-user location that is not on PATH.
Find it and **record the full path in `profile.md` under Tooling**; the tailor
skills read it from there.

```powershell
# Windows, typical per-user MiKTeX location
$env:LOCALAPPDATA\Programs\MiKTeX\miktex\bin\x64\xelatex.exe --version
```

```bash
# macOS, typical MacTeX location
/Library/TeX/texbin/xelatex --version
```

Either add the directory to PATH, or let the skills call the binaries by full path.
Both work; recording it is what matters.

## Fonts

The designed CV uses **EB Garamond** and **Playfair Display**. Both ship with TeX
Live (the `ebgaramond` and `playfair` packages) and with MiKTeX, so they resolve
from the distribution's own font tree. **You do not need to install anything into
the operating system.**

If your distribution is missing them, either install the packages:

```bash
tlmgr install ebgaramond playfair    # TeX Live
mpm --install=ebgaramond --install=playfair    # MiKTeX
```

or open `base-cv/cvstyle.sty` and swap the `\setmainfont` and `\newfontfamily`
lines for the commented fallback. The layout survives; it just looks plainer.

## Reading a build failure

**`Overfull \hbox` warnings.** Text has run past the margin, and it is visible on
the page. The tailor skills gate on zero of these before an application counts as
done. Fix the wording or the line break, not the margin.

**Wrong page count.** The `.log` file's "Output written" line states it. CVs should
be 1 to 2 pages and a letter exactly 1. If a letter runs to two pages the argument
is too long, which is a content problem wearing a layout costume. Getting a
three-page CV down to two usually takes content cuts *and* slightly tighter margins,
not one or the other.

**Things the log will never tell you.** A title that collides with its date, a
heading stranded at the foot of a page, a paragraph that exists in `letter.md` and
is missing from the letter's `.tex`. None of these is an error to LaTeX. Read every
built PDF once as a page, and count the letter's paragraphs against `letter.md`.
The templates guard against the first two (section headings break early rather than
strand, and dates sit level with wrapped titles), but a guard is not a read.

**`Font ... not found`.** See Fonts above.

**Nothing changed after an edit.** Cross-references and some layout need two passes.
Run the engine twice. The tailor skills already do.

**Undefined control sequence in a tailored file.** The tailored templates are
self-contained and do not load `cvstyle.sty`. If you moved a macro into the style
package, the tailored files will not see it. Keep the two in sync or keep them
independent, but do not half-do it.

## Aux files

Every build leaves `.aux`, `.log`, `.out` and friends. They are gitignored, and the
skills delete them after a successful build. Keep the `.tex`: it is the editable
source, and the PDF is a build artefact.
