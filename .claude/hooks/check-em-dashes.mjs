#!/usr/bin/env node
// PostToolUse hook (Write|Edit): the em-dash gate for outward documents.
//
// CLAUDE.md voice rule: never use em dashes; use a colon, comma, or hyphen. The
// reason is practical rather than aesthetic. The em dash is the single loudest
// tell that a document was written by a language model, and a cover letter that
// reads as machine-written gets binned before its argument is read.
//
// Scope: .tex files, everything in sketches/, and authored outward documents
// under base-cv/, applications/, templates/ and sketches/ (cover letters,
// motivation letters, research statements, outreach and open-application emails,
// grant work plans). posting.md and research.md are exempt, because ads and call
// texts are saved verbatim and their punctuation is not ours to fix. notes.md is
// internal and may quote source text, so it is exempt too.
//
// Turn this off by writing "Em dashes: allowed" in profile.md's Voice section.
//
// PostToolUse cannot undo a write, so exit code 2 feeds the offending lines back
// to the assistant, which then fixes them immediately.

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const EM_DASH = "—";
const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();

let payload = "";
for await (const chunk of process.stdin) payload += chunk;

let input;
try {
  input = JSON.parse(payload);
} catch {
  process.exit(0);
}

const path = input?.tool_input?.file_path;
if (typeof path !== "string" || !path) process.exit(0);

// Opt out, per user preference.
const profilePath = join(root, "profile.md");
if (existsSync(profilePath)) {
  try {
    const profile = readFileSync(profilePath, "utf8");
    if (/^\s*[-*]?\s*Em dashes:\s*allowed/im.test(profile)) process.exit(0);
  } catch {
    /* fall through and enforce */
  }
}

// Normalise to one separator so the folder and filename tests below work the same
// on every platform.
const norm = path.replace(/\//g, "\\");
if (!/\\(base-cv|applications|templates|sketches)\\/.test(norm)) process.exit(0);

// Split on the normalised separator rather than using path.basename: on macOS and
// Linux, basename only splits on "/", so it would hand back the entire
// backslash-joined path and every filename test below would silently fail. That
// would have disabled this gate for outward .md files on exactly the platforms
// most likely to be running it.
const name = norm.split("\\").pop();
const isTex = /\.tex$/.test(name);
const isSketch = /\\sketches\\[^\\]+\.md$/.test(norm);
const isOutward =
  /^(cover-letter|letter|motivation-letter|research-statement|statement|supervisor-outreach|outreach|reference-request|eligibility-enquiry|email|followup-email|recruiter-email|grant-work-plan|work-plan|research-plan).*\.md$/.test(
    name
  );

if (!(isTex || isSketch || isOutward)) process.exit(0);
if (!existsSync(path)) process.exit(0);

let lines;
try {
  lines = readFileSync(path, "utf8").split(/\r?\n/);
} catch {
  process.exit(0);
}

const bad = [];
lines.forEach((line, i) => {
  if (line.includes(EM_DASH) || / --- /.test(line)) {
    bad.push(`  line ${i + 1}: ${line.trim()}`);
  }
});

if (bad.length) {
  process.stderr.write(
    "EM-DASH GATE (CLAUDE.md voice rule: never use em dashes; use a colon, " +
      `comma, or hyphen). Fix these lines in ${path}:\n${bad.join("\n")}\n`
  );
  process.exit(2);
}

process.exit(0);
