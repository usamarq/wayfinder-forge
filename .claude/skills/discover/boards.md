# Boards: page-read reality

The memory of what each board actually does. `discover` reads this before a sweep
and writes to it after one. **Keep it current.** A recipe recorded once turns the
tenth sweep of a board from twenty clicks into one navigation, and a note about a
board that fights saves the next hour of somebody's life.

Every entry should carry: what it covers, whether it reads cleanly, the URL recipe
for a search, its recency filter, and anything that breaks. Mark anything you have
not personally confirmed as `unverified`.

---

## How to write a URL recipe

Drive the board's UI **once**, with the filters you actually want, then copy the
resulting URL out of the address bar and record it here with the variable parts
marked. Almost every board encodes its filter state in the query string, which means
the second sweep never has to touch the UI again.

What to capture:

- the search-term parameter
- the location parameter, and whether it takes a name, an ID, or a geo code
- the recency filter (this is the highest-value one; see below)
- the remote or hiring-region filter, if there is one
- the pagination parameter, and whether it counts pages or offsets results

**Recency is worth more than any other filter.** A requisition posted this week is
more likely to still be open and less likely to have three hundred applications
already in it. Filtering server-side also beats reading and discarding stale cards.

**Reposts reset the clock.** A card labelled "Reposted" may be a months-old
requisition wearing a fresh date. Flag it in the rationale rather than treating it
as new.

---

## Global boards

Recipes below are starting points. **Verify each on the first sweep** and correct it
here; boards change their parameters without notice.

### LinkedIn Jobs

Widest coverage almost everywhere, and the only board many companies post to.

- Recipe: `https://www.linkedin.com/jobs/search/?keywords=<QUERY>&location=<PLACE>&f_TPR=r604800`
- `f_TPR=r604800` is "past week" (the number is seconds; `r86400` is past 24 hours,
  `r2592000` past month).
- `f_WT=2` filters to remote, `f_WT=3` to hybrid. `f_E=2,3` filters entry and
  associate level. Verify these on your locale before trusting them.
- Pagination: `&start=25`, `&start=50`. Twenty five results per page.
- **Read-only, always.** See the LinkedIn rule in CLAUDE.md and in the discover
  skill. Go slower here than on any other board and stop dead on any checkpoint.
- Known annoyance: the results list virtualises, so cards need scrolling into view
  before their text exists in the DOM.

### Indeed

- Recipe: `https://<cc>.indeed.com/jobs?q=<QUERY>&l=<PLACE>&fromage=7`
  (`<cc>` is the country subdomain, for example `uk`, `de`, `ca`; the US is plain
  `indeed.com`.)
- `fromage=7` is the recency filter, in days. `sort=date` orders by newest.
- Pagination: `&start=10`, `&start=20`.
- Known annoyance: aggressive bot detection. If it starts challenging, stop and read
  manually rather than working around it.

### Google Jobs

Aggregates most other boards, useful as a completeness check rather than a primary.

- Recipe: search `<QUERY> jobs <PLACE>` on Google and open the jobs widget, then
  copy the resulting `ibp=htl;jobs` URL.
- Deduplicate hard against the primary boards; almost everything here is a mirror.

### Wellfound (formerly AngelList Talent)

Startups. Salary and equity bands are shown unusually often, which makes it worth a
sweep even when the volume is low.

- `https://wellfound.com/jobs` with filters applied in the UI. Login-gated for most
  filtering. Record the post-filter URL on the first run.

### Welcome to the Jungle (which absorbed Otta)

Strong in Europe, good filtering, good company profiles.

- `https://www.welcometothejungle.com/en/jobs?query=<QUERY>&aroundQuery=<PLACE>`
- Otta's own matching interface is login-gated and its results are personalised,
  which means they are not reproducible between sessions. Record what you searched.

### Remote-first boards

- **RemoteOK**: `https://remoteok.com/remote-<TAG>-jobs` (for example
  `remote-python-jobs`). Simple HTML, reads cleanly.
- **We Work Remotely**: `https://weworkremotely.com/remote-jobs/search?term=<QUERY>`
- **Remotive**: `https://remotive.com/remote-jobs/search/<QUERY>`
- **Hacker News "Who is hiring"**: one thread on the first working day of each
  month. Low volume, high signal, almost no competition from applicant tracking
  systems. Search the thread text for your stack.

**The hiring-region trap, and it catches people constantly.** Most "remote (Europe)"
or "remote (worldwide)" ads are restricted to the specific countries where the
employer holds an entity or has employer-of-record coverage. If the ad does not
explicitly include the user's country, treat the hiring area as unknown and verify
before scoring it as workable. "Remote (EU)" and "remote in Germany" are completely
different claims.

---

## National and regional boards

<!--
  Setup seeds this section with the boards the user named. Fill in each recipe on
  the first sweep of that board. Delete the example row once you have real ones.

  Ask, per board: does it read cleanly, does it have a recency filter, does it
  require login, does it hide the real requirement in a language other than the
  one the careers page is written in?
-->

| Board | Covers | Recipe | Recency filter | Reads cleanly? | Notes |
|---|---|---|---|---|---|
| {{name}} | {{country, sector}} | {{url pattern}} | {{param}} | {{yes / fights / login-gated}} | unverified |

Worth knowing when you are building this list out:

- **Public-sector portals** are usually separate from commercial boards, usually
  have the longest lead times, and usually publish salary bands. Worth a slot.
- **University and research portals** are separate again. If the academic track is
  in use, they live in `../discover-academic/portals.md`, not here.
- **Industry association member directories** are the underrated source. Rather than
  starting from companies that already advertise, start from a directory of
  companies in the right sector and filter down to the ones an engineer in your
  field could plausibly help. That is an `outreach` play, not a `discover` one, but
  the directory URL belongs here.
- **Recruitment agencies that place in your field** are worth exactly one
  conversation each and then a note in `open-applications.md`.

---

## Verify the language bar on the APPLY portal, not the careers page

This one costs people whole applications, and it is worth checking every time in any
market that is not monolingual in the user's working language.

A company's English careers page can say a local language is "considered an
advantage" while the applicant tracking system it links to carries the identical
requisition, entirely in that local language, saying fluency **is important**. Same
company, same requisition, two materially different strengths of claim, and the
stronger one is where applications actually land.

**Rule: follow the Apply control through to the destination and re-read the
requirement there before scoring the lead or tailoring for it.** A verify pass that
stops at the marketing page is not a verify pass.

Corollary signal: if the apply-portal ad is written in the local language while the
careers page is in English, the working language of the team is probably the local
one, whatever either page claims.

This also means a lead's score can move between the verify pass and the apply pass.
Say so plainly when it does, rather than letting the earlier number stand.

---

## Terms-of-service honesty

Most private boards' terms nominally prohibit automated collection. What this skill
does (reading a page the user opened, in their own session, at low volume, for their
own applications, republishing nothing) is the defensible end of that spectrum, but
it is not nothing. Keep the volume low, which the strategy wants anyway. Never
bypass a technical control. If a site starts blocking, stop and read manually.

---

## Where assisted fill breaks (for the apply-assist stage)

Observed on real applications. Applicant tracking systems change, so treat these as
strong priors rather than guarantees, and update the entry when one surprises you.

**Easiest**: Greenhouse, Lever, Teamtailor, Ashby. Plain forms, standard file
inputs, sensible accessibility labels. Most of an application here fills in one pass.

**Moderate**: SmartRecruiters, Recruitee, Personio, JazzHR. Mostly simple forms with
occasional iframes and custom widgets.

**Hardest: Workday.** Forced account creation (always the user's job), multi-page
wizards that lose state on timeout, and custom dropdown and date-picker widgets that
resist programmatic fill. Expect frequent hand-backs. Some employers front Workday
with a different UI (Phenom is common) and those front-ends are usually much easier
than Workday's own portal, including skipping the account requirement.

**Oracle Cloud HCM**: better than its reputation. Often no account needed (an email
plus a terms checkbox, then one single-page form). Two quirks worth knowing: there
is frequently a hidden anti-bot honeypot field on the email step that must never be
touched, and accessibility labels are missing on many fields, so locate elements by
search rather than by reading the tree. Some deployments email an identity
verification code **after** Submit with a short expiry, and the application does not
count until it is entered.

### Failure modes that are not specific to any one system

- **React forms silently wipe text inputs.** Dismissing a cookie banner or any stray
  dialog mid-fill can re-render the form and empty every text input already typed,
  while file uploads and dropdown selections survive. Rules: dismiss all banners
  **before** typing anything, and verify by screenshot after each field group.
- **JavaScript-set values get reverted.** Many forms ignore programmatically set
  `<select>` values, including via native setters. These need a real click plus
  keyboard type-ahead. Where option lists are numbered, typing the number is the
  fastest type-ahead there is.
- **Value reads lie.** On several widget libraries a combobox reports an empty value
  even when it is visibly set. Trust the screenshot, not the DOM read.
- **Suggestion lists need real clicks** on the visible option, not a synthetic click
  on the underlying element.
- **A long script-busy pause after a file upload is usually not a crash.** Wait
  rather than reloading; a reload loses the whole form.
- **Universal hand-backs**: drag-and-drop-only upload widgets, CAPTCHA, consent and
  marketing checkboxes, salary fields with no pre-approved figure, video-answer
  steps, and Submit. All of these are the user's, always.
- **Dependent fields appear after a selection.** "How did you hear about us?" very
  often opens a second required dropdown once answered. Re-read the form after every
  selection rather than assuming the field list is stable.

When a widget resists three reasonable attempts, stop fighting it and hand back. A
broken fill wastes more of the user's time than a manual field does.
