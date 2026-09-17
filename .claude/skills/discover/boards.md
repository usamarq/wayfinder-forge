# Boards: page-read reality

The memory of what each board actually does. `discover` reads this before a sweep and
writes to it after one.

**This file ships almost empty on purpose.** It carries LinkedIn, because LinkedIn is
the one board that exists in every market, and nothing else. Which boards matter
depends entirely on the user's country, field and language, and a shipped list of
boards for the wrong country is worse than no list: it looks like knowledge, it sends
sweeps somewhere pointless, and it quietly crowds out the two local boards that
actually carry the volume.

So the rest of this file gets **researched and written when a real user arrives**, for
their market, from live pages. `board-research.md` next to this file is the procedure.

What does ship beyond LinkedIn is everything that turned out **not** to be specific to
one country: how to read result cards cheaply, how to verify a lead at source, and
where assisted form-filling breaks. Those sections come from a season of real sweeps
and real applications, and they transfer.

**Keep it current.** A recipe recorded once turns the tenth sweep of a board from
twenty clicks into one navigation, and a note about a board that fights saves the next
hour of somebody's life. **Date every observation.** Boards change their markup and
their parameters without notice, and an undated note cannot be told from a stale one.

---

## How to write an entry

Every board gets: what it covers, whether it reads cleanly, the URL recipe for a
search, its recency filter, and anything that breaks. Mark anything not personally
confirmed as `unverified`.

Drive the board's UI **once**, with the filters you actually want, then copy the
resulting URL out of the address bar and record it here with the variable parts
marked. Almost every board encodes its filter state in the query string, which means
the second sweep never has to touch the UI again.

What to capture:

- the search-term parameter
- the location parameter, and whether it takes a name, an ID, or a geo code
- the recency filter (the highest-value one; see below)
- the sort parameter, and what the default order is
- the remote or hiring-region filter, if there is one
- the pagination parameter, and whether it counts pages or offsets results
- per query, after each sweep: total count and how many cards fell inside the
  freshness window. Yield history is how a dead query gets noticed and cut.

**Recency is worth more than any other filter.** A requisition posted this week is
more likely to still be open and less likely to have three hundred applications in it
already. Filtering server-side also beats reading and discarding stale cards.

**Reposts reset the clock.** A card labelled "Reposted" may be a months-old
requisition wearing a fresh date. Flag it in the rationale rather than treating it as
new.

---

## LinkedIn Jobs

The one board that exists everywhere, and in many markets the only one some companies
post to. **Confirm the parameters on your own locale on the first sweep**, because
LinkedIn varies them by region and changes them without notice. Everything below was
observed between 2026-08 and 2026-09; re-date it when you re-confirm it.

- Recipe: `https://www.linkedin.com/jobs/search-results/?keywords=<QUERY>&geoId=<GEO_ID>&f_TPR=r604800`
- **`location=<Place>` fails silently.** Navigating with a place name can drop the
  parameter, fall back to the browser's stored location, and return a *different
  search* under a banner like "We had trouble finding exact matches". The tab title
  can briefly show the correct count before the page settles, so the title is not
  proof the filter applied: **read the location chip and the result count on the
  page.** To get the `geoId` for a country or city, set the location once through the
  search box and copy it out of the resulting URL. Record it here.
- The path has moved from `/jobs/search/` to `/jobs/search-results/`.
- `f_TPR` is recency in seconds: `r86400` past 24 hours, `r604800` past week,
  `r1209600` past two weeks, `r2592000` past month. The two-week window is worth
  having: it reaches the promoted cards sitting at "1 week ago" on the edge of a
  seven-day filter.
- `f_WT=2` filters to remote, `f_WT=3` to hybrid. `f_E=2,3` filters entry and
  associate level.
- Pagination: `&start=25`, `&start=50`. Twenty five results per page.
- A `sortBy=DD` parameter may be dropped silently, leaving results in relevance
  order. Check the order you got, not the order you asked for.
- **Read-only, always.** See the LinkedIn rule in `CLAUDE.md` and in the discover
  skill. Go slower here than on any other board (four to six seconds between page
  loads has been uneventful) and stop dead on any checkpoint.

### Reading a results page

- **The whole page reads in one call, with no scrolling**: take
  `document.querySelector('main').innerText` (or the page-text tool), and cut it at
  the "Are these results helpful" line. The older scroll-and-harvest approach, and
  DOM selectors such as `li[data-occludable-job-id]`, `[data-job-id]` and
  `.job-card-container`, have all stopped matching. Cards are React buttons, not
  anchors, so **the results list carries no job URLs**.
- **Parser that has held up:** split on newlines; drop tokens matching
  `/work(s)? here$/`, `Viewed`, `Saved`, `Promoted`, `Easy Apply`,
  `Be an early applicant`, a lone `·`, salary lines, and
  `/\d+ (school alumni|company alumni|connection)/`; then treat any token matching
  `/^(Posted )?\d+ (minute|hour|day|week|month)s? ago/` as a card boundary and **skip
  boundaries with an empty buffer**. The last three tokens before a boundary are
  title, company, location (the title prints twice, so dedupe adjacent equals).
- **Why the boundary rule is written that way.** The age line has been printed as
  "Posted 3 days ago", as a bare "3 days ago", and as both on the same card. A
  pattern that matches only one form leaves the other inside the buffer, the
  last-three slice shifts by one, and the **title is dropped silently**: the sweep
  still produces rows, they are just wrong. After any parser change, eyeball five
  parsed rows against the page.
- Tool output truncates at roughly 1,000 to 1,500 characters. Store the parsed rows
  on `window` and print them in slices of about twelve.

### What a card is worth

- **Promoted cards now print an age, and the age is real for the promotion, not
  necessarily for the requisition.** A promoted card stamped "21 hours ago" has
  resolved to "This vacancy has now expired" on the employer's site.
- **Locations leak.** A card has shown a city because the ad's boilerplate lists the
  employer's offices, while the role hires in another country. Whole employers leak
  this way, every card. If the ad's only mention of the city is an office-estate
  sentence, the city is not the hiring location.
- **Query overlap is close to total.** The core queries re-serve one promoted pool:
  twenty or more of the twenty five cards on page one of several queries have been
  identical. Run page one of each query, and spend depth only on the query that
  reaches different employers. Headline counts ("99+ results") are inflated by a
  fuzzy "may not be exact matches" tail.
- **A large share of page one is companies that have already said no.** Dedupe by
  company against the trackers before scoring, and remember that a rejection on one
  requisition does not bar a different one.
- If a tab opens by itself to an employer's apply link mid-sweep, with no click
  issued, stop and hand back. An apply link opening unbidden is one step from an
  application flow that nobody asked for, and this stage never applies to anything.

### From a card to the real ad

- Click the card to load its detail pane. The "About the job" body often hydrates
  only after one real scroll inside the pane, and sometimes not at all: budget a
  visit to the employer's own site for every lead worth pursuing.
- **The pane's Apply control is the route to the source.** It is a redirect of the
  form `linkedin.com/safety/go?url=...`; read the `url` parameter to get the
  employer's real applicant-tracking link. That one hop settles liveness, location
  leaks and the language bar, with no web searching and no guessing of domains.
- Web search is for context on an employer, never the primary way to find a
  requisition: fresh local requisitions are often not indexed at all, and the only
  indexed matches are expired ones.

---

## Reading cards cheaply: mechanics that transfer

Observed while driving boards through a browser extension. None of this is specific
to one board.

- **Same-origin fetch from the open tab.** On a server-rendered board, a `fetch()` of
  the results URL from inside the board's own tab, parsed with `DOMParser`, harvests
  a page without a navigation, and the same trick reads detail pages. Fifteen
  queries at three pages each have run from one tab. Keep a `Set` of hrefs on
  `window` to dedupe across queries, and pace the fetches (most of a second apart)
  rather than firing them flat out. This is still the user's browser and the user's
  session, which is what the skill requires. It is not headless crawling.
- **The extension redacts results that contain a URL with a query string**
  (`[BLOCKED: Cookie/query string data]`, with no other explanation).
  `location.href` in a returned object trips it too. Strip URLs from what you return
  (`.replace(/https?:\/\/\S+/g,'[url]')`), or print `?`, `&` and `=` as placeholder
  tokens when the parameters are the thing you need. Job hrefs without query strings
  read fine. Confirm filter state from the tab's URL as the tab context reports it,
  not from script.
- **Tool results truncate at about 1,000 characters.** Accumulate on `window`, return
  compact rows, print in slices.
- **Custom filter controls are not `<select>` elements.** They do not appear in a
  `select` scan and form tools will not drive them. Find the option's checkbox or
  list item in the DOM by its label text and `.click()` it; a click by screen
  coordinates can silently fail to stick, which looks exactly like having changed
  nothing. **The URL is the reliable state**: confirm the filter took by reading it
  back, along with the result count.
- **A filter that silently failed is the expensive failure.** A country parameter
  that is ignored returns the whole unfiltered feed, and it looks like a working
  filter until you read the count. A role slug that does not exist can return the
  entire feed instead of a 404. After applying any filter, check the count moved and
  check that the first few cards match.
- **Date-sorted lists let you stop early.** When the tail of page one is already
  past the freshness window, deeper pages are guaranteed stale: read one page and
  stop. On a relevance-sorted list this does not hold.
- **Choose the sort per query.** Where a board offers date order, use it for any
  query whose in-window count is large (more than about twenty); three pages then
  cover the whole window instead of nine fresh cards among sixty. Keep relevance
  order for small queries, where page one holds every fresh card anyway.
- **Sponsored filler sits at the foot of every page on many boards**, identical
  across queries. It is caught by date and content, not by position or CSS class.
- **Loose matching is noise, not volume.** A board that matches any ad containing
  "data" will report hundreds of "Data Scientist" results. Filter hard on the title
  and keep a drop list of the recurring junk titles for that board.
- **Read the href slug before opening a card.** Boards that hide the employer name
  on the card often carry it in the link.
- **A board that prints real publication dates is the cheapest cross-check for one
  that does not.** A suspiciously fresh card elsewhere can be dated in one lookup.
- **Employer-hidden results cost a page-open per lead.** Budget for it on boards
  that show the company only on the job page.

---

## Verifying a lead at source

The `discover` skill's verify pass uses these.

- **Applicant-tracking hosts read cleanly; marketing career pages do not.** A
  requisition on Greenhouse, Lever, Ashby, Teamtailor, SmartRecruiters, Breezy,
  Workable or a Workday tenant usually settles in one fetch. A company's own
  `/careers` marketing page often returns a 404, an empty shell, or a list rendered
  by script.
- **JavaScript shells usually have a JSON door.** Seen working (2026-09):
  - Ashby: `https://api.ashbyhq.com/posting-api/job-board/<company>?includeCompensation=true`
    returns every posting with a plain-text description.
  - Greenhouse: `https://boards-api.greenhouse.io/v1/boards/<company>/jobs/<id>?content=true`
  - Workday tenants expose `/wday/cxs/<tenant>/<site>/job/<path>` as JSON.
- **Board mirrors often carry the full ad and the employer's apply link.** A lead
  sourced from such a board does not need the employer's site to be found first.
- **Never guess an employer's domain to verify a lead.** A guessed `<company>.io`
  has turned out to be a parked domain redirecting into an ad network. Take the real
  address from the posting, the Apply control or the company's profile.
- **An aggregator's dates are about the aggregator.** On crawler-fed boards the age
  on a card is often a **crawl timestamp**, not a posting date: in one check of five
  cards against their own detail pages, not one matched (a card saying "1 day" sat
  on a posting 92 days old). Gating such a board on card freshness filters nothing,
  and the tell is a freshness filter that keeps every card on every page. Read the
  posted date on the detail page, and read "last seen" beside it: posted long ago
  and seen yesterday is an evergreen requisition, not a dead one.
- **A stale aggregator date may deprioritise a lead. It never kills one.** A lead
  dropped because an aggregator showed it as three years old and located it in the
  wrong city turned up two days later on another board, published that week, in a
  different city, live and accepting. Kill a lead on the employer's own page, on a
  second board, or on an explicit closed notice.
- **The reverse also holds**: an aggregator can show a requisition as expired while
  the employer's own board has it live and posted days ago.
- **Unreadable is not dead.** If the source will not render to a fetch, hold the lead
  as unverified and read it in the browser.

---

## This user's boards

<!--
  Researched and filled in by `board-research.md`, at setup or on the first sweep.
  Delete the example row once there are real ones.

  Ordered by how much they are actually worth sweeping, best first, so a short run
  can just take the top two.
-->

| Board | Covers | Recipe | Recency filter | Reads cleanly? | Priority | Verified |
|---|---|---|---|---|---|---|
| {{name}} | {{country, sector}} | {{url pattern}} | {{param}} | {{yes / fights / login-gated}} | {{1-3}} | unverified |

### Query yield log

<!-- One line per query per sweep: total / inside the freshness window / kept.
     Three sweeps of nothing on-target is the signal to cut a query from the core
     list in criteria.md. -->

| Date | Board | Query | Total | In window | Kept | Note |
|---|---|---|---|---|---|---|

## Ruled out, and why

<!-- Boards researched and rejected. Keep them: without this, the same dead board
     gets rediscovered and re-evaluated every few weeks. A verdict can be reversed
     on fresh evidence; strike the row through and date the reversal rather than
     deleting it. -->

| Board | Why not | Checked |
|---|---|---|

---

## Verify the language bar on the APPLY portal, not the careers page

This costs people whole applications, and it is worth checking every time in any
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

A language requirement can also live **only in the form**, as a required yes/no
knockout question that the ad never mentions. It surfaces at the apply stage, and
some employers screen on it automatically within minutes of submission.

When recording a language requirement, record **which band** the ad falls into, in
the ad's own words: required alone, required alongside the working language,
"preferred", or "an advantage". Whether a band is a deal-breaker is the user's call
in `criteria.md`, and that call can change; the recorded band lets old leads be
re-read under a new rule without re-opening every ad.

This also means a lead's score can move between the verify pass and the apply pass.
Say so plainly when it does, rather than letting the earlier number stand.

---

## Terms-of-service honesty

Most private boards' terms nominally prohibit automated collection. What this skill
does (reading a page the user opened, in their own session, at low volume, for their
own applications, republishing nothing) is the defensible end of that spectrum, but it
is not nothing. Keep the volume low, which the strategy wants anyway. Never bypass a
technical control. If a site starts blocking, stop and read manually.

---

## Where assisted fill breaks (for the apply-assist stage)

Observed on real applications. Applicant tracking systems are global, so unlike the
board list this section transfers to any market. They do change, so treat these as
strong priors rather than guarantees, and update an entry when one surprises you.

**Easiest**: Greenhouse, Lever, Teamtailor, Ashby. Plain forms, standard file inputs,
sensible accessibility labels. Most of an application here fills in one pass.

**Moderate**: SmartRecruiters, Recruitee, Personio, JazzHR, Freshteam. Mostly simple
forms with occasional iframes and custom widgets. Some parse the uploaded CV and
prefill identity fields from it: check what the parser wrote.

**Hardest: Workday.** See its own section below.

**Oracle Cloud HCM**: better than its reputation. Often no account needed (an email
plus a terms checkbox, then one single-page form). Two quirks worth knowing: there is
frequently a hidden anti-bot honeypot field on the email step that must never be
touched, and accessibility labels are missing on many fields, so locate elements by
search rather than by reading the tree. Some deployments ask for an emailed identity
code at the start **and again at submission**, with a short expiry, and the
application does not count until the second one is entered.

### Workday: a value you can see is not a value it holds

Forced account creation (always the user's job), multi-page wizards that lose state
on timeout, and custom dropdown and date-picker widgets that resist programmatic
fill. Expect frequent hand-backs. Some employers front Workday with a different UI
(Phenom is common) and those front-ends are usually much easier than Workday's own
portal, including skipping the account requirement.

The single most expensive Workday fact (confirmed on several tenants, 2026-09):
**text fields set through a form-input tool render the correct value on screen while
Workday's internal model holds them empty.** The step then fails validation with
"field is required" against fields that visibly contain the text.

- **Fill every Workday text field with real keystrokes**: triple-click to select,
  then type. Do not trust a value you can see.
- **The tell that a field did register is Workday reformatting it.** A phone number
  that comes back regrouped was genuinely set. A value sitting exactly as typed is
  suspect.
- **Verify by advancing the step, not by reading the DOM.** The validation error is
  the only honest signal, and it costs nothing, because a step advance is not a
  submission.
- Picklists are often **two-level**: the top-level option opens a dependent
  sub-list. Synthetic clicks on `[role=option]` have not registered where a real
  mouse click on the option's coordinates did. Scroll the option into view first,
  because `scrollIntoView` moves everything measured before it.
- **Never press Escape on an open Workday dropdown.** It has selected the blank
  option, and on a required yes/no about work permission that silently set the
  answer to "No". Close a dropdown by choosing an option.
- One upload control can accept several files. Try the CV and the letter together
  before concluding the letter cannot travel.
- Take "start a new application", not "use my last application".
- The cookie banner is session-scoped and returns after navigation; decline it each
  time, **before** typing.
- Acknowledgements arrive from `<tenant>@myworkday.com`, usually within minutes.

### Portals that keep a candidate profile: a green tick is not the right file

Staffing-agency portals and several applicant tracking systems save uploads to the
candidate's profile "for future use" and **pre-attach them to every new
application**. Seen 2026-09: the attachments step showed a green tick, requirement
satisfied, and the file behind it was a CV tailored for a different employer two
months earlier.

- **Open the attachments step every single time and read the file name** before
  anything else. Uploading the correct file usually updates the stored profile copy
  too, which is the outcome you want.
- An unfinished application may already exist for the job, sometimes created by a
  single earlier click on "Sign in and apply". Resume it; do not start a duplicate.
- Where the cover letter is a free-text box with a word cap and there is no letter
  upload, a tailored letter will not fit. Budget a condensed rewrite, count words
  locally (a plain whitespace split has matched the portal's counter), leave a margin
  of ten, and record the condensed text in `notes.md`.
- Sections often save independently, with Submit disabled until every section is
  green. That makes these portals good for staging, once the file check is done.

### Portals with no stop point

Some systems (njoyn is the one seen, 2026-09) ask for the documents **while the
candidate profile is being created, and submit the application in that same
action**. There is no review screen between the upload and the submission, so
fill-and-stop cannot happen: by the time a form would be readable, the application
has gone.

- Nothing is visible before the account exists. The public job page may show only
  an "I'm interested" control, and that control is the apply entry, not an interest
  register.
- So the form cannot be read, mapped or staged in advance. Decide the whole fill
  from the folder, name the exact files to upload, hand the tab over with those file
  names stated, and say plainly that clicking through the account step sends the
  application. **The handover is the stop point.**
- Once a profile exists, later applications at the same employer may behave
  conventionally. Do not assume it.
- The acknowledgement may name only "your resume", which does not confirm a cover
  letter arrived.

### TalentAdore: the reload is the enemy, and the blue button is the wrong one

- **Programmatic fill works**: setting values through the native property setter and
  dispatching `input` and `change` events fills every field type, including readonly
  date fields (ISO strings), and the values can be verified inside the hidden
  `form_json` payload, which is what actually submits. An earlier belief that the
  system "ignores programmatic fill" was wrong; the reload was always the cause.
- **A reload wipes the whole form and its attachments.** Open each form in its own
  tab and never navigate it after filling. If a Send attempt errors and the page is
  refreshed, nothing was received: refill, re-attach, and send again.
- **The withdraw control sits on the same screen as "Send application"**, and a
  find-by-label tool has mislabelled it as a harmless "add new" button. Its
  confirmation modal offers the safe choice ("return to the form") as a plain link
  and **the destructive one ("I withdraw from the process") as the primary-styled
  button.** A scripted click on the safe link has failed to dismiss the modal;
  re-navigating to the posting URL is safe, because navigation cannot submit or
  withdraw, and it costs only the fill.
- Where element refs put nothing into the fields, drive the form by screenshot
  coordinates or by script instead. Do not keep retrying refs.
- Two verification traps: `querySelector('[name="description"]')` returns the page's
  `<meta name="description">`, not the textarea, so a value check reads empty on a
  full field; and a collapsed overlay can report `display:flex; visibility:visible`
  while measuring 0 by 0 and blocking nothing, so check `getBoundingClientRect()`
  before believing a modal is up.
- The acknowledgement email echoes every field and attachment and carries an edit
  link, which can expire before the deadline does.

### Teamtailor: a job application and a "Connect" are different channels

- A job entry, including one titled "Open application", opens an ordinary form that
  fills end to end with no account.
- **"Connect" is a talent-pool signup**: pick an interest, tick consent, enter an
  email, press Connect, and only then does a profile exist to attach a CV or a
  message to. Account creation and consent are both the user's, so assisted fill can
  enter the email and must stop there.
- Teamtailor consumes its file inputs: after an upload, `input.files` reads empty
  and the file name appears as a chip. Verify by the chip.

### Failure modes that are not specific to any one system

- **React forms silently wipe text inputs.** Dismissing a cookie banner or any stray
  dialog mid-fill can re-render the form and empty every text input already typed,
  while file uploads and dropdown selections survive. Rules: dismiss all banners
  **before** typing anything, and verify by screenshot after each field group.
- **JavaScript-set values get reverted, or never reach the model.** Many forms ignore
  programmatically set `<select>` values, including via native setters. These need a
  real click plus keyboard type-ahead. Where option lists are numbered, typing the
  number is the fastest type-ahead there is.
- **Value reads lie.** On several widget libraries a combobox reports an empty value
  even when it is visibly set, and on others a field shows a value the form does not
  hold. Trust neither alone: check the screenshot, then advance the step.
- **Suggestion lists need real clicks** on the visible option, not a synthetic click
  on the underlying element.
- **Destructive buttons get the primary styling.** "Leave and finish later", "I
  withdraw from the process" and "Cancel my application" have each been the blue
  button, or sat directly under Submit in red. Read every modal; never click by
  habit or by position.
- **Buttons on a submitted application can commit instantly.** An "Update" control
  expected to open an edit form has instead saved and returned "application updated
  successfully". Nothing had changed, so nothing was lost, but the class of button
  is the user's.
- **A long script-busy pause after a file upload is usually not a crash.** Wait rather
  than reloading; a reload loses the whole form.
- **A dropped browser-extension connection mid-click is not a failed click.** Check
  the page state before retrying, or the action happens twice.
- **Universal hand-backs**: drag-and-drop-only upload widgets, CAPTCHA, consent and
  marketing checkboxes, salary fields with no pre-approved figure, video-answer steps,
  and Submit. All of these are the user's, always.
- **Dependent fields appear after a selection.** "How did you hear about us?" very
  often opens a second required field once answered, sometimes a referral name.
  Re-read the form after every selection rather than assuming the field list is
  stable.
- **Broken widgets exist.** A phone or date widget that rejects every input is a
  hand-back with the reason stated, not a puzzle.

When a widget resists three reasonable attempts, stop fighting it and hand back. A
broken fill wastes more of the user's time than a manual field does.
