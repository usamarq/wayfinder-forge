#!/usr/bin/env node
// PreToolUse hook (Bash|PowerShell): keeps a configured repo private and its
// history intact.
//
// CLAUDE.md guardrail 7. Once setup has run, this repo holds a full CV, contact
// details, salary expectations and possibly immigration status.
//
// What this deliberately does NOT block:
//
//   - `gh repo create`. Setup needs it, and blocking it made the one moment that
//     should be frictionless into a wall. Creating a repo is not the dangerous
//     act; publishing personal data is, and that is checked separately below.
//   - Anything at all while no origin is configured. A fresh clone of the public
//     template has no personal data in it yet and no established remote to
//     protect, so there is nothing to guard and every check would be pure
//     friction.
//   - Ordinary commits and pushes to the configured origin. Those are encouraged.
//
// What it does block, and why each one earns its place:
//
//   - Visibility changes and repo deletion on an established repo.
//   - Force-pushes, destructive refspecs and history rewrites.
//   - Pushes or remotes naming a URL that is not the configured origin.
//   - Publishing content sideways through gists and releases.
//
// And one thing it merely ASKS about, rather than blocking: creating a PUBLIC
// repo from a working copy whose profile.md says setup has completed. That is
// the single combination that publishes somebody's CV, and one confirmation
// click is a fair price for it. Delete the publicCreate block below if you want
// even that gone.
//
// SCOPING (fixed 2026-09, after a false positive hit repeatedly in real use).
// The push and remote rules used to test the WHOLE command string, so
//
//   git commit -m "... https://example.org/some/link ..." && git push origin main
//
// was blocked as "push names a remote that is not this repo's origin". The URL
// was in the commit message, not in the push arguments, and commit messages and
// PR bodies carry URLs all the time, so the guard fired on correct behaviour
// whenever a commit and a push shared one command. A commit message containing
// the text "--force" had the same problem.
//
// Each rule below now isolates the `git push` (or `git remote add|set-url`)
// invocation and inspects only ITS OWN arguments: from the subcommand to the
// next shell separator or newline. This is more accurate, not weaker. A flag
// that belongs to a push has to appear inside the push segment, so every
// genuine one is still caught.

import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

let payload = "";
for await (const chunk of process.stdin) payload += chunk;

let input;
try {
  input = JSON.parse(payload);
} catch {
  process.exit(0);
}

const cmd = input?.tool_input?.command;
if (typeof cmd !== "string" || !cmd.trim()) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();

function deny(reason) {
  process.stderr.write(
    `BLOCKED (CLAUDE.md guardrail 7: this repo is private and stays private): ${reason}\n` +
      "Run it yourself if you genuinely want it.\n"
  );
  process.exit(2);
}

function ask(reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "ask",
        permissionDecisionReason: reason,
      },
    })
  );
  process.exit(0);
}

function isSetUp() {
  const p = join(root, "profile.md");
  if (!existsSync(p)) return false;
  try {
    return /^STATUS:\s*READY/i.test(readFileSync(p, "utf8").split(/\r?\n/, 1)[0]);
  } catch {
    return false;
  }
}

function configuredOrigin() {
  try {
    return execSync("git config --get remote.origin.url", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      cwd: root,
    }).trim();
  } catch {
    return "";
  }
}

// ---------------------------------------------------------------------------
// The one ask: creating a PUBLIC repo out of a working copy that holds a real CV.
// ---------------------------------------------------------------------------
if (/gh\s+repo\s+create\b/.test(cmd) && /(^|\s)--public(\s|$)/.test(cmd) && isSetUp()) {
  ask(
    "This creates a PUBLIC repository, and profile.md says setup has completed, " +
      "so this working copy holds your CV, contact details, salary expectations " +
      "and possibly your work-authorisation status. Publishing it makes all of " +
      "that permanently public and search-indexed. If you meant to share the " +
      "blank template rather than your own hunt, cancel and do it from a fresh " +
      "clone. Approve only if you are certain."
  );
}

// ---------------------------------------------------------------------------
// Command segments. A segment runs from the git subcommand to the next shell
// separator (; && || |) or newline, which is where that command's arguments end.
// Text elsewhere in a compound command, notably a commit message, is ignored.
// Global options between `git` and the subcommand (-C <path>, -c k=v, --flag)
// are allowed for, so `git -C some/dir push --force` is still seen as a push.
// ---------------------------------------------------------------------------
const GIT_GLOBAL_OPTS = String.raw`(?:\s+(?:-[cC]\s+(?:"[^"]*"|'[^']*'|\S+)|--[\w-]+(?:=(?:"[^"]*"|'[^']*'|\S+))?))*`;
const segments = (subcommand) =>
  cmd.match(
    new RegExp(String.raw`git${GIT_GLOBAL_OPTS}\s+${subcommand}\b[^;&|\r\n]*`, "g")
  ) || [];

const pushSegments = segments("push");
const remoteSegments = segments(String.raw`remote\s+(?:add|set-url)`);

// ---------------------------------------------------------------------------
// Destructive or publishing actions, always blocked on an established repo.
// These scan the whole command on purpose: each names a single-purpose
// subcommand with no legitimate reason to appear in a command run here.
// ---------------------------------------------------------------------------
const blocked = [
  {
    re: /gh\s+repo\s+(edit|delete|archive|unarchive|transfer)/,
    why: "this changes an existing repository's visibility, ownership or existence",
  },
  {
    re: /gh\s+api\b[^;&|\r\n]*(-X|--method)\s*(PATCH|DELETE|POST|PUT)/i,
    why: "this writes to the GitHub API",
  },
  {
    re: /gh\s+(gist|release)\s+create/,
    why: "this publishes repository content sideways",
  },
  { re: /git\s+filter-(branch|repo)\b/, why: "this rewrites history" },
];

for (const b of blocked) {
  const m = cmd.match(b.re);
  if (m) deny(`matched '${m[0].trim()}', and ${b.why}`);
}

// ---------------------------------------------------------------------------
// Push rules, scoped to each push invocation's own arguments.
// ---------------------------------------------------------------------------
for (const seg of pushSegments) {
  let m = seg.match(/(--force\b|--force-with-lease\b|(?<=\s)-f(?=\s|$))/);
  if (m) {
    deny(`matched '${m[0]}' in '${seg.trim()}', and a force-push rewrites published history`);
  }
  // Mirror, branch deletion, or a leading + on a refspec.
  m = seg.match(/(--mirror\b|--delete\b|(?<=\s)-d(?=\s|$)|\s\+\S)/);
  if (m) {
    deny(`matched '${m[0].trim()}' in '${seg.trim()}', and this is a destructive push refspec`);
  }
}

// ---------------------------------------------------------------------------
// Remote targeting. Only meaningful once an origin exists: before that, setup is
// still choosing one and there is nothing yet to protect. Only URLs inside a
// `git remote add|set-url` or a `git push` segment count.
// ---------------------------------------------------------------------------
const targeting = [
  ...remoteSegments,
  ...pushSegments.filter((s) => /https?:\/\/|git@/.test(s)),
];

if (targeting.length) {
  const origin = configuredOrigin();
  if (!origin) process.exit(0); // no origin yet: this IS the setup step

  // Compare on host + path, ignoring protocol, user and a trailing .git.
  const normalise = (u) =>
    u
      .trim()
      .replace(/^git@([^:]+):/, "$1/")
      .replace(/^[a-z+]+:\/\//i, "")
      .replace(/^[^@/]+@/, "")
      .replace(/\.git$/, "")
      .replace(/\/+$/, "")
      .toLowerCase();

  const approved = normalise(origin);

  // The public template is never an origin worth protecting: a working copy still
  // pointing at it has not been made anyone's own yet, and retargeting away from it
  // is always the right direction. Without this, the setup fallback
  // (`git remote add origin <their url>`) gets blocked for doing exactly the thing
  // setup exists to do.
  if (approved === "github.com/usamarq/wayfinder-forge") process.exit(0);
  const foreign = targeting
    .flatMap((seg) => seg.match(/(?:https?:\/\/|git@)[^\s'"]+/g) || [])
    .map(normalise)
    .filter((u) => u !== approved);

  if (foreign.length) {
    deny(
      `it names the remote '${foreign[0]}', which is not this repo's origin ` +
        `('${approved}'). Pushing your CV to the wrong remote is the one mistake ` +
        "this hook exists to prevent"
    );
  }
}

process.exit(0);
