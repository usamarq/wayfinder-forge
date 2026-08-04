#!/usr/bin/env node
// PreToolUse hook (Bash|PowerShell): keeps this repo private and its history intact.
//
// CLAUDE.md guardrail 7. Once setup has run, this repo holds a full CV, contact
// details, salary expectations and possibly immigration status. Ordinary commits
// and pushes to the configured origin are fine and encouraged. Everything that
// could make the repo public, point it somewhere else, or destroy history is
// blocked: those are the user's own deliberate commands to run, not the
// assistant's.
//
// The approved remote is read from `git config` at runtime rather than hardcoded,
// so this works in anyone's fork with no editing.

import { execSync } from "node:child_process";

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

function deny(reason) {
  process.stderr.write(
    `BLOCKED (CLAUDE.md guardrail 7: this repo is private and stays private): ${reason}\n` +
      "Run it yourself if you genuinely want it.\n"
  );
  process.exit(2);
}

const blocked = [
  {
    re: /gh\s+repo\s+(create|edit|delete|fork|archive|unarchive|rename|transfer)/,
    why: "this changes a repository's existence or visibility",
  },
  {
    re: /gh\s+api\b[^\n]*(-X|--method)\s*(PATCH|DELETE|POST|PUT)/i,
    why: "this writes to the GitHub API",
  },
  {
    re: /gh\s+(gist|release)\s+create/,
    why: "this publishes repository content",
  },
  {
    re: /git\s+push\b[^\n]*(--force\b|--force-with-lease\b|(^|\s)-f(\s|$))/,
    why: "a force-push rewrites published history",
  },
  {
    re: /git\s+push\b[^\n]*(--mirror\b|--delete\b|\s\+[\w./-]+:)/,
    why: "this is a destructive push refspec",
  },
  { re: /git\s+filter-(branch|repo)\b/, why: "this rewrites history" },
];

for (const b of blocked) {
  const m = cmd.match(b.re);
  if (m) deny(`matched '${m[0].trim()}', and ${b.why}`);
}

// Anything that changes or names a remote must name the origin already configured.
const touchesRemote =
  /git\s+remote\s+(add|set-url)/.test(cmd) ||
  (/git\s+push\b/.test(cmd) && /https?:\/\/|git@/.test(cmd));

if (touchesRemote) {
  let origin = "";
  try {
    origin = execSync("git config --get remote.origin.url", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      cwd: process.env.CLAUDE_PROJECT_DIR || process.cwd(),
    }).trim();
  } catch {
    origin = "";
  }

  if (!origin) {
    deny(
      "this repo has no origin configured yet, so there is no approved remote to " +
        "check against. Set your own private origin first (the setup skill walks " +
        "through it)"
    );
  }

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
  const named = (cmd.match(/(?:https?:\/\/|git@)[^\s'"]+/g) || []).map(normalise);

  const foreign = named.filter((u) => u !== approved);
  if (foreign.length) {
    deny(
      `it names the remote '${foreign[0]}', which is not this repo's origin ` +
        `('${approved}'). Pushing your CV to the wrong remote is the one mistake ` +
        "this hook exists to prevent"
    );
  }
}

process.exit(0);
