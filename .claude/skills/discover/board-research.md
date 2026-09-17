# Finding the boards that actually matter in this user's market

Run this when `boards.md` has no entries beyond LinkedIn, when the user moves country
or changes field, or when they name a board that has no entry yet. Setup calls it;
`discover` calls it too, when asked to sweep something it has never seen.

The output is rows in `boards.md`, each with a URL recipe and a verified date. The
goal is **four to six boards worth sweeping**, ordered by value, not a directory.
More than six is not thoroughness, it is a longer sweep that finds the same
requisitions three times.

## The rule that governs all of this

**Never write a URL recipe you have not seen work.** A fabricated recipe is worse than
an empty row: the next sweep navigates to a 404, or worse, to an unfiltered results
page that quietly returns the wrong thing, and nobody notices because the sweep still
produces leads.

If a board looks promising but you could not confirm its parameters, record the board
with the recipe cell empty and `unverified`, and let the first real sweep fill it in.
That is an honest, useful row.

## Step 1: read the market you are researching for

From `profile.md` and `criteria.md`: country and city, field and target titles,
working language, whether remote counts and hired from where, and the seniority band.
A board that is excellent for local graduate hiring is useless to a senior remote
candidate, and vice versa.

## Step 2: find candidates, in this order

The order matters. The first method is the only one that produces ground truth; the
rest are for coverage.

### 2a. Look at where real ads in this field actually land

**This is the method that works, and almost nobody does it.** Pick five to eight real
companies in the user's country and field, from `criteria.md`'s target list, from a
LinkedIn search, or from their own knowledge. Open each company's own careers page and
see:

- which applicant tracking system it uses (the apply URL gives it away: `greenhouse.io`,
  `lever.co`, `teamtailor.com`, `workday`, `recruitee`, and so on)
- which boards they syndicate to, often stated or linked at the bottom of the ad
- whether they post anywhere other than their own site and LinkedIn

If six of eight companies in the target sector post to one national board, that board
is the answer, and no listicle would have told you which of the twelve candidates it
was. If six of eight post nowhere but their own careers page, that is the most useful
possible finding: it means `outreach` and company-page watching matter more than
sweeping, and you should say so.

### 2b. Search in the local language

The single highest-yield search trick, and the one that gets skipped. The national
boards rank for the local word, not for "jobs". Search the local term for jobs or
vacancies alongside the field:

> `<local word for jobs> <field>` , `<local word for vacancies> <city>`

Do this even when the user works in English. The board that carries the volume is
usually the local-language one, and it usually has an English filter or English ads
inside it.

### 2c. The national public employment service

Almost every country runs one. They are free, legitimate to read, usually complete for
regulated and public-sector work, and often the only place public bodies advertise.
Some publish an open API, which is worth recording separately because it fetches
cleanly with no browser at all.

### 2d. Field-specific and community boards

Where the user's profession concentrates: a professional association's board, a
well-known community job channel, a newsletter, a monthly forum thread. These have low
volume and unusually high signal, because almost nobody applies through them and the
posters are often the hiring engineer rather than a recruiter.

### 2e. Remote boards, only if remote is in scope

Check `criteria.md` first. If remote is out of scope, skip this entirely rather than
padding the list.

If it is in scope: the **hiring-region trap** is the thing to record about every one of
them. Most "remote (Europe)" or "remote (worldwide)" ads are restricted to the
specific countries where the employer holds an entity or has employer-of-record
coverage. If the ad does not explicitly include the user's country, the hiring area is
unknown and must be verified before the lead scores its location point. "Remote (EU)"
and "remote in Germany" are completely different claims.

### 2f. Listicles, last, and with suspicion

"Best job sites in <country>" articles are SEO filler, frequently years stale, and
routinely list boards that have shut down. Use them only to generate candidate names,
never as evidence that a board is alive or good. Every name from a listicle goes
through step 3 before it earns a row.

## Step 3: vet each candidate before it earns a row

A board earns a row by passing these. Check them on the live site.

1. **Is it alive?** Open it and look for postings dated within the last week. A board
   whose newest ad is four months old is dead, whatever its homepage says.
2. **Does it have volume for these specific queries?** Run one of the user's actual
   core queries from `criteria.md` and count the results. Not "jobs", their query. A
   board with 4,000 jobs and 3 in the user's field is not a board for this user.
3. **Is it just a mirror?** Many aggregators republish LinkedIn and Indeed with no
   original inventory. Spot-check five results against a LinkedIn search for the same
   query. Heavy overlap means low priority, not necessarily exclusion: sometimes the
   mirror has a better recency filter.
4. **Does it have a recency filter?** Record the parameter. This is the one that most
   changes how useful a board is in practice.
5. **Does it need a login to search?** Login-gated boards still work, because the user
   is signed in, but note it: the sweep cannot start until they confirm the session.
6. **What language are the ads in?** And, crucially, does an English-looking listing
   hide a local-language requirement? See "Verify the language bar on the APPLY portal"
   in `boards.md`.
7. **Does it read cleanly?** Open a results page in the browser and check the cards
   are actually extractable: some boards render results into canvas, lazy-load
   aggressively, or require interaction per card.

## Step 4: capture the recipe

For each board that passed, drive its UI **once** with the filters the user actually
wants (their query, their location, the recency window from `criteria.md`), then copy
the URL from the address bar and record it with the variable parts marked.

Verify the filters really applied before recording: the result count plus the
active-search header. A filter that silently failed to apply is how a recipe gets
recorded wrong and then trusted for months.

### What the first real sweep tends to overturn

A research verdict is a hypothesis until a board has been swept once with the user's
real queries. Expect some of these, and write down whichever you meet:

- **The filter that was never there.** A location or region parameter that is
  silently ignored returns the full feed and looks like a working filter until the
  count is read. A region page the research pass saw as "blocked" can turn out to be
  a missing page. If there is no working way to restrict the board to where the user
  can be hired, the board is out, however good its inventory looked.
- **The slug that does not exist.** On boards with role-slug URLs, a slug the board
  does not know can return the entire unfiltered feed rather than an error. Confirm
  the first cards match the role.
- **Remote is usually remote within one country.** A "Europe, remote" slice of
  thousands is a pool to filter, not a pool of leads: most cards are anchored to a
  single country and exclude everyone outside it. Gate each survivor on the ad's own
  hiring-area line, and treat a card with no stated hiring area as unconfirmed.
- **The public API is often a teaser.** A board's open JSON endpoint can hold a small
  subset dominated by marketplace shells, while the real inventory sits on an
  ordinary page behind a consent wall.
- **One company can be most of a feed.** Date-sorted feeds get flooded by a single
  employer reposting, by staffing shells parsed as "remote from anywhere", and by
  contractor task-work platforms. Drop those by company name and judge the board on
  what is left.
- **Location labels can be flatly wrong** on aggregators that parse them by machine.
  Spot-check against the source ad before trusting a facet.
- **A board that links straight to the employer's applicant-tracking URL is worth
  more than its size suggests**: every lead arrives already resolved to the source.
- **Set the cadence from the churn you measured**, not from habit: a board that adds
  one relevant role a week is a fortnightly board, and a tiny curated one can be
  monthly.

Demote a board the same day it fails, and move it to "Ruled out" with what was
learned. Reinstate one the same way when fresh evidence contradicts an old verdict,
leaving the old verdict visible.

**Keep a "maybe" pile**, with the one check that would settle each entry, so a
half-evaluated board is neither swept blind nor researched again from scratch.

## Step 5: write the rows, and be honest about them

Into `boards.md`:

- One row per surviving board, with a **priority of 1 to 3**, ordered best first, so a
  short run can just take the top two. Priority is about yield for this user, not
  about the board's size.
- Every recipe carries the date it was verified.
- Anything unconfirmed is marked `unverified`, not omitted and not guessed.
- **Rejected boards go in the "Ruled out" table with the reason.** Without that, the
  same dead board gets rediscovered and re-evaluated every few weeks.

Then report to the user, in a few lines: which boards you are recommending and why,
which you rejected and why, and what you learned about where their market actually
advertises. If step 2a found that companies in their field mostly do not post to
boards at all, **lead with that**: it changes the strategy from sweeping to outreach,
and it is worth more than the board list.

## Step 6: keep it alive

A board list decays. Revisit when:

- a board returns nothing new for three consecutive sweeps
- the user changes country, field, or seniority band
- a recipe stops working, which usually means a parameter was renamed rather than the
  board dying

Update the row in place and re-date it. Do not accumulate stale rows next to fresh
ones with no way to tell which is which.
