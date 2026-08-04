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

**Keep it current.** A recipe recorded once turns the tenth sweep of a board from
twenty clicks into one navigation, and a note about a board that fights saves the next
hour of somebody's life.

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
- the remote or hiring-region filter, if there is one
- the pagination parameter, and whether it counts pages or offsets results

**Recency is worth more than any other filter.** A requisition posted this week is
more likely to still be open and less likely to have three hundred applications in it
already. Filtering server-side also beats reading and discarding stale cards.

**Reposts reset the clock.** A card labelled "Reposted" may be a months-old
requisition wearing a fresh date. Flag it in the rationale rather than treating it as
new.

---

## LinkedIn Jobs

The one board that exists everywhere, and in many markets the only one some companies
post to. Verified as a general recipe; **confirm the parameters on your own locale on
the first sweep**, because LinkedIn varies them by region and changes them without
notice.

- Recipe: `https://www.linkedin.com/jobs/search/?keywords=<QUERY>&location=<PLACE>&f_TPR=r604800`
- `f_TPR=r604800` is "past week". The number is seconds: `r86400` past 24 hours,
  `r2592000` past month.
- `f_WT=2` filters to remote, `f_WT=3` to hybrid. `f_E=2,3` filters entry and
  associate level.
- Pagination: `&start=25`, `&start=50`. Twenty five results per page.
- **Read-only, always.** See the LinkedIn rule in `CLAUDE.md` and in the discover
  skill. Go slower here than on any other board and stop dead on any checkpoint.
- Known annoyance: the results list virtualises, so cards need scrolling into view
  before their text exists in the DOM.

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

## Ruled out, and why

<!-- Boards researched and rejected. Keep them: without this, the same dead board
     gets rediscovered and re-evaluated every few weeks. -->

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

**Moderate**: SmartRecruiters, Recruitee, Personio, JazzHR. Mostly simple forms with
occasional iframes and custom widgets.

**Hardest: Workday.** Forced account creation (always the user's job), multi-page
wizards that lose state on timeout, and custom dropdown and date-picker widgets that
resist programmatic fill. Expect frequent hand-backs. Some employers front Workday
with a different UI (Phenom is common) and those front-ends are usually much easier
than Workday's own portal, including skipping the account requirement.

**Oracle Cloud HCM**: better than its reputation. Often no account needed (an email
plus a terms checkbox, then one single-page form). Two quirks worth knowing: there is
frequently a hidden anti-bot honeypot field on the email step that must never be
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
- **A long script-busy pause after a file upload is usually not a crash.** Wait rather
  than reloading; a reload loses the whole form.
- **Universal hand-backs**: drag-and-drop-only upload widgets, CAPTCHA, consent and
  marketing checkboxes, salary fields with no pre-approved figure, video-answer steps,
  and Submit. All of these are the user's, always.
- **Dependent fields appear after a selection.** "How did you hear about us?" very
  often opens a second required dropdown once answered. Re-read the form after every
  selection rather than assuming the field list is stable.

When a widget resists three reasonable attempts, stop fighting it and hand back. A
broken fill wastes more of the user's time than a manual field does.
