# Academic sources: what works and how to query it

`discover-academic` reads this before a sweep and writes to it after one. Same rule
as `boards.md`: record the recipe the first time you drive a source's UI, and mark
anything you have not personally confirmed as `unverified`.

Two things that make academic sources different from job boards:

1. **Deadlines are hard and they are the whole game.** A commercial requisition
   stays open until it is filled. A funding call closes at a stated hour and does
   not reopen for a year. Every row here carries a deadline, a source URL, and the
   date it was verified.
2. **Aggregators go stale before the source does.** A position marked expired on an
   aggregator while the university's own portal is still accepting applications is
   common. **Always verify liveness on the employer's or funder's own system.**

---

## Cross-border position aggregators

### EURAXESS

The European Commission's research job portal. Broadest single source for research
positions in Europe, including MSCA-funded posts.

- Base: `https://euraxess.ec.europa.eu/jobs/search`
- The facet filters encode into the query string. Build the search once in the UI
  with the country, research field and career stage you want, then **copy the URL
  and record it below**. The facet parameters are long and not worth reconstructing
  by hand.
- Career-stage vocabulary: R1 is a doctoral candidate, R2 is a recognised
  researcher (post-PhD), R3 established, R4 leading. Filtering to R1 removes most of
  the noise for a doctoral search.
- Cross-posts heavily with national portals and with academicpositions.com. Dedupe.

Recorded facet URLs:

| Purpose | URL | Verified |
|---|---|---|
| {{e.g. doctoral positions, computer science, <country>}} | {{url}} | {{YYYY-MM-DD}} |

### Other aggregators worth a sweep

- **academicpositions.com**: clean, wide European coverage, heavy overlap with
  EURAXESS.
- **jobs.ac.uk**: the UK's dominant academic board; also carries European posts.
- **FindAPhD / FindAPostdoc**: strong for funded UK and Irish positions. Often
  browser-only.
- **Nature Careers**, **Times Higher Education Unijobs**: broad, slower-moving.
- **MSCA doctoral networks**: check the current call's funded-project list on the
  Commission's portal, then apply to the individual host institutions. These do not
  reliably appear on job boards at all.

**The MSCA mobility rule catches people constantly.** Marie Skłodowska-Curie
positions generally require that the researcher has not resided or carried out their
main activity in the host country for more than 12 months in the 36 months before
the call deadline. If the user has been living in a country for a degree, MSCA posts
**hosted in that same country** are usually an auto-drop, and posts hosted elsewhere
are usually fine. Record the exact rule from the current call text; it is restated
every year and the wording matters.

---

## University and institute boards

Each university runs its own recruitment system, and the position appears there
first. Build this table out as you sweep.

| Institution | System | Recipe | Login needed? | Notes |
|---|---|---|---|---|
| {{name}} | {{Varbi / Workday / SuccessFactors / TalentAdore / in-house}} | {{url}} | {{yes/no}} | unverified |

Recruitment systems commonly seen on academic portals, with what to expect at the
apply stage:

- **Varbi**, **TalentAdore**, **LAURA / rekrytointi.com**, **ReachMee**: simple
  forms, usually a candidate account, generally fill cleanly.
- **SuccessFactors**: the apply flow is normally behind a candidate account, and an
  unauthenticated visit to the apply URL often **redirects to the site home page**
  rather than showing a login screen. **Do not read that redirect as a dead
  posting.** Hand the tab over and resume once the user is on the form.
- **Workday**: the hardest, at the apply stage only. See `../discover/boards.md`.

---

## Funding-call sources

Personal grants, foundation calls, and national research council programmes. These
belong in `calls.md`, not in `leads-academic.md`.

| Source | Covers | Recipe | Fetches or browser? | Verified |
|---|---|---|---|---|
| {{name}} | {{country, field, career stage}} | {{url or API}} | {{...}} | {{YYYY-MM-DD}} |

What to check on every call before it is worth recording:

- **Career stage.** Many funders exclude doctoral candidates entirely, or fund only
  post-PhD, or require an existing study right at a named institution.
- **Nationality and residence.** Some funders are citizens-only. Some require
  residence, some require the work to be hosted in the country.
- **Field.** Some foundations explicitly exclude technical or applied sciences.
- **Language.** Some calls are only administered in a national language, which is a
  practical gate even where it is not a stated one.
- **What must come from someone else.** Supervisor commitment statements, proof of
  study right, transcripts, referee letters. **These are the long-lead items and the
  commonest reason a good application misses a deadline.** Record the requirement
  the day the call is recorded, not the week it closes.

Record the sum, the duration, and whether it is taxable or has social-security
consequences in the relevant country. A grant and a salary of the same headline
figure are not the same income.

---

## Watchlist

Sources or calls that are not open now but will be, or eligibility questions that
resolve on a known date. `discover-academic` checks these when the trigger arrives.

| Trigger date | What to check | Why | Source |
|---|---|---|---|
| {{YYYY-MM-DD}} | {{...}} | {{...}} | {{url}} |

---

## Gates already known to apply

<!--
  Setup seeds this from criteria-academic.md. Add to it whenever a gate is
  confirmed against a live call text, with the source and date. A gate recorded
  here saves the whole scoring pass on every future hit.
-->

- {{gate}}: {{who it drops, and the source it was confirmed from, with a date}}
