#!/usr/bin/env node
// SessionStart hook: the setup gate.
//
// Wayfinder Forge ships as a blank template. Until `profile.md` has been filled
// in, every skill in this repo would be writing about a person it knows nothing
// about, so the first thing a session needs to know is whether setup has run.
// This injects that fact as context rather than relying on the model noticing.
//
// Once profile.md says STATUS: READY this hook goes quiet, except for surfacing
// anything in the academic deadline calendar that is inside three weeks.

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();

function emit(context) {
  if (!context) process.exit(0);
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "SessionStart",
        additionalContext: context,
      },
    })
  );
  process.exit(0);
}

const profilePath = join(root, "profile.md");
if (!existsSync(profilePath)) emit(null);

let profile = "";
try {
  profile = readFileSync(profilePath, "utf8");
} catch {
  emit(null);
}

const firstLine = profile.split(/\r?\n/, 1)[0].trim();

if (/^STATUS:\s*NOT SET UP/i.test(firstLine)) {
  emit(
    [
      "WAYFINDER FORGE IS NOT SET UP YET.",
      "",
      "`profile.md` still reads `STATUS: NOT SET UP`, which means this repo is a",
      "blank template: there is no CV, no criteria, and nothing true about this",
      "user in any file. Every skill here would produce fiction.",
      "",
      "Before working on whatever the user asks for, tell them this in one or two",
      "sentences and run the `setup` skill. Its first stage is a preflight that",
      "detects their OS and tooling, so everything afterwards is written for the",
      "machine they are actually on; then it interviews them and explains the repo",
      "as it goes. START-HERE.md is the human-facing version of the same thing.",
      "",
      "If they would rather skip the interview, get the minimum first: their name,",
      "their target roles, and their CV into MASTER_CV.md. Without those three,",
      "every skill here produces fiction.",
    ].join("\n")
  );
}

// Setup has run. Surface only what is genuinely time-critical.
const notices = [];

const callsPath = join(root, "calls.md");
if (existsSync(callsPath)) {
  try {
    const calls = readFileSync(callsPath, "utf8");
    const today = new Date();
    const horizon = new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000);
    const seen = new Set();
    for (const line of calls.split(/\r?\n/)) {
      if (!line.trim().startsWith("|")) continue;
      const m = line.match(/\b(20\d{2})-(\d{2})-(\d{2})\b/);
      if (!m) continue;
      const d = new Date(`${m[0]}T00:00:00Z`);
      if (isNaN(d)) continue;
      if (d >= today && d <= horizon) {
        const row = line.trim().replace(/\s+/g, " ").slice(0, 160);
        if (!seen.has(row)) {
          seen.add(row);
          notices.push(`  ${row}`);
        }
      }
    }
  } catch {
    /* a malformed calendar is not a reason to break the session */
  }
}

if (notices.length) {
  emit(
    [
      "DEADLINES INSIDE THREE WEEKS (from calls.md).",
      "CLAUDE.md: anything inside three weeks gets surfaced before other work.",
      "",
      ...notices.slice(0, 12),
      "",
      "Mention these to the user before starting on something else.",
    ].join("\n")
  );
}

emit(null);
