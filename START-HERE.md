# Start here

You are looking at a blank template. Nothing in this repo is true about you yet, and
one conversation fixes that.

## Do this

```bash
claude
```

That is the whole instruction. Run it in this folder and say anything, even "hi".

Claude reads `CLAUDE.md`, sees that `profile.md` still says `STATUS: NOT SET UP`, and
starts the setup interview itself. You do not need to know any commands, read any
other file, or install anything first.

If it does not start on its own, type `/setup`.

## What it does before it asks you anything

The first thing setup runs is a **preflight**: it works out what machine you are on
and what you already have, so every instruction it gives you afterwards is the right
one for your system rather than a generic one you have to translate.

| It checks | Because |
|---|---|
| Your OS and shell | Every command it hands you afterwards is written for that shell |
| **Node** | The four guard hooks are Node scripts. Without it they go quiet. |
| **git** and **GitHub CLI** | So it can make your private repo for you in one step |
| **LaTeX** | So your CV compiles to PDF. Optional, and it will say what you lose. |
| **Browser automation** | So it can sweep job boards and fill forms in your browser |
| **A mail connector** | So outreach emails get staged as real drafts |

Anything missing, it tells you the install command **for your platform** and whether
you actually need it now or can leave it. Nothing here is required to start except
Claude Code itself.

## Then it interviews you

Roughly 30 minutes, most of it you talking. Who you are, where you can legally work,
what you are looking for, what you will not compromise on. Then it asks for your CV,
in whatever form you have it, and turns it into `MASTER_CV.md`, the file every later
claim gets checked against.

It writes each answer to disk as it goes, so you can stop halfway and pick it up
tomorrow without repeating yourself.

It finishes by running one real job-board sweep, so you end the session with actual
scored leads rather than a summary of what you could do next.

## First, though: make this yours

This repo is about to hold your CV, your contact details, your salary floor and
possibly your visa status. **It should be private.**

If you got here through **"Use this template"** on GitHub and set it Private, you are
done, nothing to do.

If you cloned the public template directly, setup handles it in its first stage: it
asks for a name, creates the private repo under your account, and points this working
copy at it. You do not have to work out the git commands.

## If you would rather read first

- `README.md`: what the whole thing is and what it refuses to do
- `CLAUDE.md`: the rules Claude works under, including the one that matters
- `docs/workflow.md`: what a week of using it looks like

None of them are required reading. The interview covers what you need as it goes.
