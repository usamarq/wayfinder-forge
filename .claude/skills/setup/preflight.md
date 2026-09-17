# Preflight: detect the machine, then adapt to it

Read by the `setup` skill as its very first stage, before any interview question.

The point is not to produce a checklist. It is that **every instruction given for the
rest of setup, and for the rest of this repo's life, should be correct for this
machine on the first try.** A user who is handed `apt install` on macOS, or a
PowerShell one-liner in bash, has been given homework instead of help.

Run the detection, record the results in `profile.md` under Tooling, and say what is
missing in one short block. Do not install anything without asking.

---

## Step 1: what machine is this

Claude Code already reports the platform and shell in its environment. **Confirm it
rather than assuming**, and get the detail the environment does not carry:

```bash
node -e "const os=require('os');console.log(process.platform, os.release(), process.arch)"
```

If Node is missing, that command fails, which is itself the answer to the most
important question below. Fall back to `uname -sr` on Unix, or check whether
`$env:OS` is set on Windows.

Record: platform, shell (PowerShell, bash, zsh, fish), architecture.

**Consequences of the platform, and they run through everything after this:**

| | Windows | macOS | Linux |
|---|---|---|---|
| Shell for commands you hand over | PowerShell (`;` not `&&`, `$env:VAR`, `Test-Path`) | bash or zsh | bash |
| Package manager | `winget` (or `choco`) | `brew` | `apt` / `dnf` / `pacman` |
| Path separator in what you write | `\` in shell, `/` is fine in git and LaTeX | `/` | `/` |
| Where binaries hide | per-user `%LOCALAPPDATA%\Programs\...`, often not on PATH | `/opt/homebrew/bin`, `/Library/TeX/texbin` | usually on PATH |

If the shell is PowerShell, **never hand over a bash one-liner** and never use `&&`
between commands. If it is bash or zsh, do not hand over cmdlets. Get this right
silently; do not narrate it.

## Step 2: what is installed

Run these, tolerate failures, and record what each one says:

```bash
node --version
git --version
gh --version
gh auth status
xelatex --version
pdflatex --version
```

On PowerShell, run them one per line rather than chained with `&&`.

## Step 3: what each result means

Report only what is missing or wrong. A block of green ticks is noise.

### Node

**The four guard hooks in `.claude/hooks/` are Node scripts.** Without Node they
fail as non-blocking warnings and the repo still works, but the setup gate, the
`MASTER_CV.md` review prompt, the repo guard and the em-dash gate are all silently
off. Say that plainly rather than letting them find out later.

Anyone who installed Claude Code with `npm install -g` already has it. If it is
missing:

| Windows | macOS | Linux |
|---|---|---|
| `winget install OpenJS.NodeJS.LTS` | `brew install node` | `sudo apt install nodejs` (or your distro's equivalent) |

If they do not want Node, tell them to delete the `hooks` block from
`.claude/settings.json` so nothing errors on every tool call, and note it in
`profile.md`.

### git and GitHub CLI

`git` is required. `gh` is not, but it turns "make yourself a private repo" from six
steps into one, which is exactly the friction setup exists to remove.

| Windows | macOS | Linux |
|---|---|---|
| `winget install Git.Git` | `brew install git` | usually preinstalled |
| `winget install GitHub.cli` | `brew install gh` | `sudo apt install gh` |

If `gh auth status` says not logged in, hand them `gh auth login` and **wait**: it is
interactive and it is theirs to complete. Suggest they run it with the `!` prefix in
Claude Code so the output lands in the conversation.

If they decline `gh` entirely, fall back in stage 0 to creating the repo in the
GitHub web UI plus `git remote add origin <url>`.

### LaTeX

Optional. Without it, `tailor` still produces `letter.md` and both `.tex` sources; it
just cannot compile PDFs, and PDFs are what portals want. Say exactly that, then let
them decide whether to install now or later. Do not block setup on it.

| Windows | macOS | Linux |
|---|---|---|
| `winget install MiKTeX.MiKTeX` | `brew install --cask mactex-no-gui` | `sudo apt install texlive-xetex texlive-fonts-extra texlive-latex-extra` |

Two engines are used on purpose: **XeLaTeX** for the designed CV and the letter
(real fonts through `fontspec`), **pdfLaTeX** for the ATS CV (standard fonts only,
which is the point).

**If the binaries exist but are not on PATH, find them and record the full path in
`profile.md`.** The tailor skills read it from there. This is common on Windows:

```
%LOCALAPPDATA%\Programs\MiKTeX\miktex\bin\x64\
/Library/TeX/texbin/                                (macOS, MacTeX)
```

Full detail lives in `docs/latex-setup.md`; point at it rather than repeating it.

### Browser automation

Check whether a browser tool is available in this session (Claude in Chrome, or the
Playwright MCP). This is not a shell check: look at what tools you actually have.

- **Present**: `discover` can sweep boards and `apply-assist` can fill forms in their
  own logged-in browser. This is the intended mode.
- **Absent**: both still work, but manually. They paste postings into `posting.md`
  and fill forms themselves while you produce the fill map. **Say this now**, because
  discovering it halfway through a sweep is worse than knowing it up front.

### Mail connector

Check whether a mail connector (Gmail or equivalent) is connected.

- **Present**: `outreach` stages real drafts they can send in one click.
- **Absent**: `outreach` writes the email into the application folder and they copy
  it into their mail client. Everything else is identical.

If they run several mail accounts, ask which one job-hunts and record **the
address**. A draft created through a connector authenticated as one account is
invisible in another account's web view, and that looks like a failure when it is
not. Do not record a web-client index such as Gmail's `/u/2/`: it moves whenever
accounts are added or removed, so `outreach` finds it at run time by stepping through
the indexes and reading the tab title.

## Step 4: write it down, then move on

Fill the Tooling section of `profile.md` with what was found, including the "not
installed" answers and any full binary paths. Then give **one** short summary, in
this shape:

> You are on {{platform}} with {{shell}}. Node, git and gh are all present, so the
> hooks work and I can set up your private repo in one step. No LaTeX yet: that only
> affects compiling CVs to PDF, and I will hand you the install command whenever you
> want it. No mail connector, so outreach emails will be written to files for you to
> copy across. Ready to start.

Then start the interview. Do not stop for approval of the preflight itself: it is a
report, not a decision.

## Re-running this later

Called again after setup, this is a quick recheck: run the same commands, update
`profile.md`, and report only what changed. Worth doing when they install LaTeX, when
a compile fails for no obvious reason, or when they move to a different machine.
