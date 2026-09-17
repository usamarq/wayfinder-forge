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
- Cross-posts heavily with national portals and with the regional academic
  aggregators. Dedupe on URL and on organisation plus title; the same position
  routinely appears three times under slightly different wording.
- Pagination is `&page=N`, zero-indexed. Results can be sorted by deadline with a
  `sort[...]` parameter pair: set it in the UI once and copy it with the rest.
- **Record the facet counts at every sweep.** They move a lot. One funding-programme
  facet roughly quadrupled in seven weeks, from a list worth skimming to one worth
  reading in full, and most of the growth was a few large doctoral networks in other
  fields. The count is what tells you which of those it is.
- University positions in a country usually surface on that country's EURAXESS facet
  as well as on the university's own board. That makes it a partial safety net on a
  day when one university's site will not load, not a substitute for reading it.

Recorded facet URLs:

| Purpose | URL | Verified |
|---|---|---|
| {{e.g. doctoral positions, computer science, <country>}} | {{url}} | {{YYYY-MM-DD}} |

### The other aggregators: researched, not shipped

**This file ships with EURAXESS and nothing else**, for the same reason `boards.md`
ships with only LinkedIn: which academic sources matter depends on the country, the
discipline and the language, and every big academic aggregator beyond EURAXESS is
regional. One that dominates in one country is irrelevant two borders away.

Research them for this user with `../discover/board-research.md`, adapted:

- The ground-truth method transfers exactly. Instead of companies' careers pages, open
  the **recruitment pages of five or six universities** in the user's target country
  and see which system each uses and where each syndicates. That tells you the real
  answer in twenty minutes, and no listicle would have.
- Search in the local language for the local words for "doctoral researcher",
  "vacancies" and "open positions". National academic boards rank for those, not for
  English.
- Check the national research council and the national public employment service:
  state research institutes often advertise only there.
- Check discipline-specific boards, which in some fields carry more than any general
  academic aggregator.
- **MSCA doctoral networks** deserve their own check, in any market: look at the
  current call's funded-project list on the Commission's portal, then apply to the
  individual host institutions. These do not reliably appear on job boards at all, so
  a sweep that only reads boards misses them entirely.

Record survivors in the table below with a verified date. Never write a facet URL you
have not seen return results.

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

Reading these boards, as opposed to applying through them:

- **Some listing pages are tables, not links.** On LAURA-style boards each vacancy is
  a table row (title, period start, period end, unit), so an extractor that collects
  anchors sees zero results on a page that is full. Parse the rows. A board that
  really is empty usually says so in words.
- **A university's own "current vacancies" page often links every ad on its
  recruitment system**, and both the list and the individual ads fetch cleanly,
  sometimes with a `?lang=en` switch. Prefer that page to the recruitment system's
  own search.
- **Unit pages move when faculties reorganise.** A watchlist URL that starts
  returning 404 may mean the unit now sits under a different faculty, not that it
  closed. Find the new address before dropping the row.
- **State research institutes often advertise on a national government jobs portal
  that renders only by script.** A plain fetch returns the header and the footer and
  nothing between. Classify it as browser-only, and read it from a tab the user
  opens, rather than recording "no listings".
- **Submitted applications are often editable until the deadline**, through a
  reopen-and-resubmit link, an "edit document" control in the candidate portal, or
  an edit link in the acknowledgement email (which can expire first). Worth knowing
  on the day an error turns up in a document that has already gone in. The edit and
  any confirming button are the user's.

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

Querying a funding database:

- **A national funding-call database often has an open search API behind its web
  interface**, and it is worth ten minutes to find: it returns structured calls with
  no browser at all. A bare search tends to return years-old calls in arbitrary
  order, and guessing a field such as `status:open` can return nothing because no
  such field exists. **Find the deadline field and query a date range, sorted by
  deadline.** Record the exact working query here the day it works.
- **The database's subject index is not the funder's own scope.** A fund filed under
  the user's field can state a different focus on its own page. Confirm scope at the
  funder before scoring a call.
- **Login-gated databases** (institutional subscriptions) are read only from a tab in
  the user's own signed-in session; never automate the sign-in. If access depends on
  a university account that will lapse, record the lapse date in the watchlist and
  sweep before it.
- A list that turns out to be staff-only, or otherwise out of the user's reach, is
  ruled out in a line with the date, and the coverage loss is stated. Do not plan
  around it.
- **Dead domains get recorded as dead.** A retired funding database whose domain has
  been squatted still turns up in search results and in older guidance, sometimes
  serving stale look-alike pages. Note it here so nobody links or reads it again.

---

## Watchlist

Sources or calls that are not open now but will be, or eligibility questions that
resolve on a known date. `discover-academic` checks these when the trigger arrives.

| Trigger date | What to check | Why | Source | State |
|---|---|---|---|---|
| {{YYYY-MM-DD}} | {{...}} | {{...}} | {{url}} | {{armed / fired YYYY-MM-DD / retired YYYY-MM-DD}} |

Every row ends in one of three states, and the row stays in the table either way:

- **armed**: waiting for its trigger. Recurring checks ("monthly") stay armed and
  get their last-checked date and finding updated in place.
- **fired**: the trigger arrived and the check was run. Put the finding in `calls.md`
  and re-arm the row for next cycle's window if the thing recurs.
- **retired**: the answer turned out to be permanent. Say why, and what public news
  would change it, so it is not re-checked on a schedule out of habit.

**Annual rounds belong here with their lead time, not just their deadline.** A
doctoral round that needs a supervisor's recommendation or an agreed supervisor
before applying is really a task several months earlier: "contact a group by June"
is the row, and the September deadline is its footnote.

---

## Gates already known to apply

<!--
  Setup seeds this from criteria-academic.md. Add to it whenever a gate is
  confirmed against a live call text, with the source and date. A gate recorded
  here saves the whole scoring pass on every future hit.
-->

- {{gate}}: {{who it drops, and the source it was confirmed from, with a date}}
