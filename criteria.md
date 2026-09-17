# Job search criteria

Used by `discover` to find and score postings, and by `tailor` to decide whether an
application is worth writing. Rule of thumb from CLAUDE.md: **sharp and few, not
spray.** A lead only enters `leads.md` if it scores at or above the threshold on the
rubric at the bottom.

Setup fills this in with you. Change it deliberately, and note the date when you do:
a criteria file that drifts silently produces leads you do not want and hides ones
you do.

## Target roles

**Tier 1 (core fit):**
{{the titles you would take today. Be generous with synonyms, because boards index
on titles: if "ML Engineer" and "Machine Learning Engineer" are both used in your
market, list both.}}

**Tier 2 (adjacent / stretch):**
{{roles you could do well but would be a step sideways or a stretch}}

**Tier 3 (fallback):**
{{roles you would take if the hunt runs long, or that use an earlier part of your
background}}

**Not targeting:** {{roles you will not take, however well they fit on paper, and
why. Writing this down stops them being re-suggested every sweep.}}

## Seniority

Reachable band: {{from}} through {{to}}.

- {{What your actual shape is, in years and in kind. Be precise: "6 years total
  engineering, 2 of them in ML" scores differently from "6 years of ML" and only one
  of them is true.}}
- **Gate each posting on the stated requirement, not the title.** Titles inflate and
  deflate by company and by country. A "Senior" role asking for 3 years is reachable;
  a "Mid" role asking for 8 is not.
- Skip: {{titles above your band, e.g. Lead / Principal / Staff / Head of}}, and
  intern-only postings unless you want them.
- **Deal-breaker**: a hard requirement of {{N}}+ years in {{the specific thing}}, or
  a track record you cannot honestly claim.

## Location

- {{Where you want to work, and how far you will travel or move.}}
- **Remote**: {{does remote count, and remote hired by whom, worked from where}}
- **Gate every remote lead on the hiring-area fine print.** Many "remote (Europe)"
  or "remote (worldwide)" ads restrict to the specific countries where the employer
  has an entity or employer-of-record coverage. If your country is not explicitly
  included, treat it as unknown and verify before scoring the location point.
- Deal-breakers: {{...}}

## Work model

{{on-site / hybrid / remote, and any constraint, e.g. days per week in office}}

## Language

- Working language must be: {{...}}
- Your levels: {{from profile.md}}
- **Deal-breaker**: roles requiring {{a level you do not have}}. If a role only
  *prefers* a language but operates in another, it is fine; note it in `notes.md`.
- **Record which band every ad falls into, in the ad's own words**: required alone /
  required alongside your working language / "preferred" or "an advantage" / not
  stated. Then decide per band what you do: {{e.g. "required alone: drop; required
  alongside: apply, flag the risk; preferred: apply"}}. A blanket language
  deal-breaker can remove most of a market, and some employers do make the
  compromise, so relaxing a band is a legitimate choice. Make it here, with a date.
  **What never changes with it: the level stated in every CV, letter and form stays
  exactly what it is.** Applying with your eyes open is your risk to take; rounding a
  level up to win the application is not. Expect a higher rejection rate on the
  relaxed bands, and do not read it as failure.
- A role that is genuinely unworkable without the language stays a deal-breaker
  whatever you decide above: client-facing or public-sector work conducted in it,
  native-level demands, a statutory language qualification.
- Pattern worth watching in any bilingual market: **domestic companies and
  consultancies often require the local language even when the listing looks
  international; international product companies usually run in English.** Expect it,
  and always gate on the full ad and on the apply portal, never on a results-page
  snippet. See `boards.md`, "Verify the language bar on the APPLY portal".

## Must-haves

- {{...}}
- {{...}}

## Deal-breakers (any one present = auto-reject, regardless of score)

- {{requires a language you do not have}}
- {{requires citizenship or a clearance you cannot obtain}}
- {{requires relocation you will not do}}
- {{seniority bar you cannot honestly meet}}
- Remote role whose hiring area excludes your country
- Unpaid, commission-only, or "pay to apply" schemes
- {{...}}

## Posting freshness

Default: **only postings published within the last 7 days.**

Reason: a recent requisition is more likely to still be open and less likely to have
a full pipeline already. This is a filter, not a deal-breaker: an older posting that
is an unusually strong fit can still be raised, but say plainly how old it is.

- Apply the board's own recency filter where one exists (see `boards.md`). Filtering
  server-side beats reading and discarding stale cards.
- Record the published date, or the relative age plus the sweep date, in `leads.md`.
- **Reposts reset the clock.** A card labelled "Reposted" may be a months-old
  requisition wearing a new date. Flag it in the rationale.

## Search queries (discover runs these; you just name the board)

One phrase per query. **Boards match long queries badly**, so "Machine Learning
Engineer" is a query and "senior ML engineer with RAG experience, Berlin, remote" is
not. Default run is the core sweep, up to 3 result pages per query, plus each
query's total count. "Full sweep" adds the extended list at the same depth. A spoken
focus always overrides the list.

**Core sweep (every run, in order):**

1. {{...}}
2. {{...}}
3. {{...}}
4. {{...}}
5. {{...}}
6. {{...}}

**Extended sweep (on request):**

7. {{...}}
8. {{...}}
9. {{a local-language query, if your market has one. Most hits will fail the
   language check, but a few are international teams: verify before rejecting.}}

## Target companies and sectors (seed list, extend freely)

- {{sector}}: {{named companies}}
- {{sector}}: {{named companies}}
- Staffing and consultancies that place in your field: {{...}}
- Startup sources: {{ecosystem directories, accelerator portfolios, VC portfolio pages}}

## Salary expectation

Floor: {{figure}}. Target: {{figure}}.

{{The convention your market uses, and any regional variation. Research the specific
role and company band before stating a figure in an application.}}

## Lead scoring rubric

Save to `leads.md` only if the score is **{{3}} or higher**.

- **+2** Role in Tier 1 (or +1 Tier 2, +0.5 Tier 3)
- **+1** Workable: right location or a remote hiring area that confirms your country,
  and the working language matches. An unconfirmed hiring area earns 0 here.
- **+1** Core stack overlap with `MASTER_CV.md`
- **+1** Seniority reachable: within your band, no hard years bar you cannot meet
- **Auto-reject** if any deal-breaker is present, regardless of score.

<!--
  Tune the weights to what actually matters to you, but keep the shape: a small
  number of points, a threshold, and deal-breakers that override the score. A rubric
  with fifteen criteria is a rubric nobody applies consistently, and an inconsistent
  rubric is worse than none because it feels rigorous while being arbitrary.

  Sanity check after any change: take a role you saw last week and score it. If the
  number does not match your gut, one of the two is wrong and it is worth finding
  out which.
-->
