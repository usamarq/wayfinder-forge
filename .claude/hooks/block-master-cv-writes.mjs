#!/usr/bin/env node
// PreToolUse hook (Write|Edit): gates edits to MASTER_CV.md behind the user's
// review.
//
// CLAUDE.md hard rule 1: MASTER_CV.md is the single source of truth. The
// assistant may propose changes to it, but every change must be seen and
// approved, because a number that enters this file silently becomes a claim in
// every application that follows. Rather than hard-blocking, this returns an
// "ask" decision so the user reads the diff and confirms.

let payload = "";
for await (const chunk of process.stdin) payload += chunk;

let input;
try {
  input = JSON.parse(payload);
} catch {
  process.exit(0);
}

const path = input?.tool_input?.file_path;
if (typeof path === "string" && /(^|[\\/])MASTER_CV\.md$/.test(path)) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "ask",
        permissionDecisionReason:
          "MASTER_CV.md is the single source of truth (CLAUDE.md hard rule 1). " +
          "Read this diff before approving it. Every number must trace to a " +
          "document or a fact you provided: never accept an invented, rounded " +
          "or inflated figure, however plausible it looks.",
      },
    })
  );
}

process.exit(0);
