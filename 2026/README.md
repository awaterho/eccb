# ECCB 2026 website archive

Static, self-contained archive of `eccb2026.org` (25th European Conference on
Computational Biology, Geneva, 31 August to 4 September 2026).

Built from an HTTrack mirror taken on 2026-09-08. The embedded schedule and
poster views were captured separately on 2026-09-08 and 2026-09-09 (see
[Embedded pages](#embedded-pages)).

## Serving it

Everything resolves through relative paths, so any static file server works:

```sh
python3 -m http.server 8777
```

**Opening `index.html` straight off disk over `file://` should also work.** The
theme bundle used to be loaded as an ES module, which browsers refuse to fetch
from `file://`, leaving the site unstyled with its menus stuck shut. The bundle
turned out to contain no module syntax at all, so it is now loaded as an
ordinary script and that restriction no longer applies.

Two things about `file://` were not verifiable from the machine that built this,
so check them if you rely on it:

* **Web fonts.** Chrome is stricter about `@font-face` across `file://` origins
  than it is over HTTP. If the headings render in a plain system sans rather
  than the rounded EuclidCircularB, this is why. Layout is unaffected.
* **Iframe height.** The embeds size themselves by posting their height to the
  page, which works regardless of origin. The direct measurement fallback in
  `assets/archive.js` needs same origin access and will quietly do nothing over
  `file://`, leaving a 400px floor if the message is ever missed.

A server avoids both questions, so prefer one where it is convenient.

## Layout

| Path | Contents |
| --- | --- |
| `index.html`, `*.html` | Site pages, same paths the live site used |
| `news/`, `schedule/`, `account/`, `keynote-speakers/` | Sub pages |
| `storage/app/media/` | Images and PDFs, untouched from the mirror |
| `themes/eccb/assets/` | Theme CSS, JS bundle (Alpine plus Choices) and web fonts |
| `assets/vendor/` | jQuery 3.5.1, extracted from HTTrack's opaque `combine/` hashes |
| `assets/external/` | Third party PDFs the site linked to (`bc2.ch`, `api.swiss-academies.ch`) |
| `assets/archive.css`, `assets/archive.js` | Archive only shim, see [Forms](#forms) |
| `embeds/` | Static captures of the pages the live site loaded in iframes |
| `embeds/vendor/` | CSS, JS, fonts and images those captures need (ISCB Joomla template, Bootstrap 3, DataTables, jQuery UI, pdfmake, Google Fonts) |

105 HTML files in total: 62 site pages and 43 embed captures.

## What was removed

| Removed | Scope |
| --- | --- |
| Matomo tracker (`_paq` bootstrap script) | 62 pages |
| Matomo `<noscript>` tracking pixel (`matomo.sib.swiss/matomo7f16.gif`) | 62 pages |
| LinkedIn Insight `<noscript>` pixel (`px.ads.linkedin.com`, partner id 3483433) | 62 pages |
| All in One Accessibility widget (`skynettechnologies.com`) | 124 script tags across 62 pages |
| Google Tag Manager (container GTM-TVJF994) | every embed capture |
| HTTrack "Mirrored from" comments and injected `<meta>` | every mirrored page |
| Joomla mega menu init plus its hourly session keep alive XHR | every embed capture (the menu element does not exist in the embedded views, so the init threw) |
| Altcha captcha (script, widget and the 53 KB bundle) | 62 script tags, 1 widget on `contact.html` |

Altcha guarded the contact form against bots. The form cannot be submitted in a
static archive, so the captcha protects nothing and was removed outright along
with its bundle. It was also the only remaining file with ES module syntax.

With it gone, the two `type="module"` attributes per page were dropped and both
remaining scripts (jQuery and the theme bundle) load as ordinary scripts. That
is what lets the archive run from `file://`; see [Serving it](#serving-it).

Nothing phones home any more. Grep confirms zero occurrences of `_paq`,
`matomo`, `px.ads.linkedin`, `skynettechnologies`, `googletagmanager`,
`gtm.start`, `Mirrored from` and `Added by HTTrack` across the archive.

## Embedded pages

The live site pulled several sections from `transition.iscb.org` in iframes.
HTTrack could not follow them (that host's `robots.txt` forbids `/`), so they
were fetched directly and rewritten to load from `embeds/`.

| Site page | Now loads |
| --- | --- |
| `schedule/interactive-schedule.html` | `embeds/schedule-ataglance.html` |
| `schedule/poster-sessions.html` | `embeds/posters.html` |
| `schedule/parallel-sessions/{biodiversity,genomics,proteins,sysbio,transcriptomics}.html` | matching `embeds/schedule-*.html` |
| `keynote-speakers/schedule.html` | `embeds/schedule-keynotes.html` |
| `elixir.html` | `embeds/schedule-elixir.html` |
| `registration-process.html` | `embeds/registration.html` |
| `visa-letter-request.html` | `embeds/easychair-visa.html` |
| `certificate-attendance.html` | `embeds/easychair-certificate.html` |

The captures link onward to filtered views, which were captured too:

* `embeds/schedule-detailed.html` plus 8 per track variants
* `embeds/posters-<track>-<session>.html`, 22 combinations

The iframes still resize themselves. The captured pages post their height to
the parent (`iscb-wrapper-height`), and the parent listens for it, exactly as on
the live site. Since everything is now same origin, that path is more reliable
than it was.

## Poster platform mirror

The conference ran its poster session on a separate WordPress site,
`eccb.performedia.com`, linked from `poster-presentations.html` and
`news/know-you-go.html`. HTTrack could not mirror it (see below), so it was
captured separately on 2026-09-09 and lives entirely under `posters/`.

### Why HTTrack failed here

`eccb.performedia.com` blocks requests by their `User-Agent` string, not by
`robots.txt` (which disallows nothing). HTTrack identifies itself as
`HTTrack 3.0x`, which gets a 403. A plain browser `User-Agent` gets the full
server-rendered page, no different from what a browser would see. `curl` and
`requests` with a browser UA were enough; no JavaScript rendering was ever
needed, so browser automation was not used for the fetching itself either.

### How it was built

The site turned out to have its own REST API (`/wp-json/wp/v2/poster`)
publicly enumerable, listing all 850 posters with their title, full text,
authors, video link, and attached PDF, paginated cleanly. That gave a complete,
reliable list of every poster URL up front, which mattered because the live
`/posters/` listing page filters itself with an AJAX "Load more" control
(Isotope) that only ever serves its first batch to a plain HTTP fetch, no
matter how the page is crawled.

The build has four stages, each a small script, run in that order:

1. **Enumerate** every poster via the REST API.
2. **Fetch** each poster's real rendered HTML (not reconstructed from the API
   JSON, so the page looks exactly like the live one), harvesting every
   `/author/<hash>/` and `/wp-content/...` reference it contains along the way.
3. **Fetch** every author page and every shared theme/plugin asset those
   posters referenced, plus every attached poster PDF (resolved from the
   API's media IDs).
4. **Rewrite**: absolute `eccb.performedia.com` URLs become relative paths,
   Matomo is stripped, and the shared `assets/archive.css` / `assets/archive.js`
   shim (already used across the rest of `SITE`) is wired in.

### What's in `posters/`

| Path | Contents |
| --- | --- |
| `index.html` | The site's real home page |
| `poster/<slug>.html` | All 850 posters, real rendered HTML |
| `author/<hash>.html` | 846 presenter bio pages |
| `all-posters.html` | A static, searchable index of all 850 posters, generated from the REST API data. The real `/posters/` page's "Load more" filtering needs a server this archive doesn't have, so this replaces it; `index.html`'s own poster grid still links here. |
| `wp-content/`, `wp-includes/` | Shared theme and plugin assets, and every attached poster PDF (`wp-content/uploads/`) |

458 of the 850 posters have an attached PDF (average 2.8 MB, up to 10 MB); all
were downloaded rather than left linking out, since the poster PDFs are the
actual content this mirror exists to preserve. Total size: 2.4 GB, almost all
of it those PDFs.

### What was removed

Matomo (a separate `performedia.matomo.cloud` instance, `_paq` bootstrap plus
its own tracking snippet) was stripped from all 1698 pages, the same as
everywhere else in this archive.

### Known gaps

* **`/login/`, `/accessibility-statement`, `/privacy-policy-2` are not
  mirrored.** These are WordPress account and legal-boilerplate pages with no
  content of their own to preserve; their links were left pointing at the live
  site rather than built into dead local pages.
* **34 posters reference `MY_VIDEO.webm`**, a plugin placeholder filename left
  in the markup by the live site itself wherever a presenter didn't upload a
  video. Present in the original HTML before this mirror touched it, not
  something this build introduced.
* **3 web font files 404 upstream** (`cardo_normal_400`, `cardo_normal_700`,
  `cardo_italic_400`, plus the Inter variable font) and **a dozen GravityForms
  icons** (a contact-form dependency that is disabled anyway, see
  [Forms](#forms)) are missing for the same reason as the fonts above, or
  because a bare directory-style URL happened to collide with a real file's
  parent directory during the fetch. All cosmetic; nothing renders broken.

### Formatting

Unlike the rest of `SITE`, these 1698 pages were **not** run through Prettier.
They are a raw capture of another site's own rendering, not hand-authored
content, and reformatting all of them repeatedly proved to exceed what this
machine's memory could sustain in one pass. Browsers render them exactly the
same regardless.

## Pages added that the mirror missed

`keynote-speakers/schedule.html` was only reachable from inside an embed, so
HTTrack never saw it. It was fetched from the live site and cleaned the same way
as the mirrored pages.

## Files dropped

| File | Why |
| --- | --- |
| `communities-day9ff5.html` | Byte for byte duplicate of `communities-day.html`, mirrored again through a `?utm_source=chatgpt.com` link. The 3 links to it now point at `communities-day.html`. |
| `event.html`, `schedule/event.html`, `schedule/parallel-sessions/event.html` | HTTrack artefacts. It parsed `event.data` out of inline JavaScript and treated it as a URL. Two were empty, one was a 404 page. Nothing linked to them. |
| `storage/.../ECCB2026_Parallel sessions_Booklet_v6.html`, `storage/.../ECCB_partnership-brochure.html` | 404 pages HTTrack saved under a PDF's name. See [Known gaps](#known-gaps). |

## Forms

**The footer newsletter signup was removed.** It appeared on all 62 pages and
posted to a Brevo endpoint that this archive does not have. Rather than leaving
a dead form on every page, the whole `#footer-newsletter-signup` block was
deleted from the markup. Nothing linked to its anchor, so no links broke.

The forms that remain are the contact form, sign in and sign up, and the poster
search and registration forms inside the ISCB embeds. They posted to October CMS
or Joomla backends that are equally absent. `assets/archive.js` disables each of
them on load, strips its `action` and October `data-request` attributes, and
inserts a notice directly above the form, so it is read before anything is
typed. Without it a submit would silently reload the page, which reads as a bug
rather than as an archive.

## Known gaps

* **Two PDF links were stale on the live site and are repaired here.** Both
  filenames referenced in the markup returned 404 from `eccb2026.org`, and still
  do. In each case the current file was found under a different name, downloaded,
  and the link repointed at the local copy:
  * `ECCB2026_Parallel sessions_Booklet_v6.pdf` (404) is superseded by
    `..._Booklet_v7.pdf` (10 pages, 441 KB), linked from
    `news/parallel-sessions-content-now-available.html`. The live site still
    points at the dead v6.
  * `ECCB_partnership-brochure.pdf` (404) is superseded by
    `ECCB_partnership-brochure_2026.pdf` (32 pages, 3.0 MB), linked twice from
    `become-partner.html`. The `#page=2` and `#page=6` anchors still resolve.

* **`eccb.performedia.com` is not mirrored.** It returned 403 to the crawler.
  The 2 links to it (in `poster-presentations.html` and `news/know-you-go.html`)
  point at the live URL.
* **Two `<script_DISABLED>` tags in `embeds/easychair-certificate.html`** refer
  to `easychair/js/jquery.js` and `easychair/js/bootstrap.min.js`, which 404 on
  the live site. They were already disabled upstream and are inert.
* **Search, login and any other server backed feature does not work.** This is a
  static capture.

## A JavaScript bug HTTrack introduced

Every page that hosts an embed listens for the height and scroll messages the
embed posts. HTTrack read the property access `event.data` in that inline
handler as if it were a URL, requested `https://eccb2026.org/schedule/event.data`
(404, visible in `hts-log.txt`), and rewrote the source to `event.html` to match
the file it saved. The handler then read an undefined property and returned at
its first guard, so **every iframe stayed at the browser default of 150px** and
the scroll and navigate commands did nothing.

Fixed on all 11 affected pages by restoring `event.data`. The twelfth iframe
page, `keynote-speakers/schedule.html`, was fetched from the live site rather
than through HTTrack and already had the correct source, which confirmed the
original wording.

The three stray `event.html` files HTTrack saved alongside this were the 404
responses to those bogus requests, listed under Files dropped.

## Iframe height

Sizing now has two independent paths:

1. **The original.** Each embed measures itself and posts
   `{type: 'iscb-wrapper-height'}` to the page, which sets the iframe height.
   This is how the live site did it, and it works again now that `event.data`
   is restored.
2. **A same origin safety net** in `assets/archive.js`. The embeds are no longer
   on a different host, so the page can read `contentDocument` directly. It
   measures on load, re-measures after in-iframe navigation, and watches for
   content changes with a `MutationObserver` and a `ResizeObserver`. A 400px
   `min-height` covers the moment before the first measurement.

Writes are debounced and applied only when the height actually changes, since
setting the height reflows the embed and would otherwise oscillate.

Measured heights after the fix, in a 1200px viewport:

| Page | Iframe height |
| --- | --- |
| `schedule/parallel-sessions/proteins.html` | 4179px |
| `schedule/parallel-sessions/sysbio.html` | 4121px |
| `schedule/parallel-sessions/genomics.html` | 4089px |
| `schedule/parallel-sessions/transcriptomics.html` | 3436px |
| `schedule/parallel-sessions/biodiversity.html` | 2863px |
| `elixir.html` | 2131px |
| `schedule/interactive-schedule.html` | 2001px |
| `keynote-speakers/schedule.html` | 1680px |
| `visa-letter-request.html` | 737px |
| `schedule/poster-sessions.html` | 704px |
| `registration-process.html` | 682px |
| `certificate-attendance.html` | 400px (floor) |

## Markup repairs

Two classes of markup problem were normalised by reparsing with `html5lib` and
reserialising. `html5lib` implements the HTML5 parsing algorithm, so it builds
the same DOM a browser does; the files now simply say on disk what the browser
already saw.

1. **Unbalanced tags.** 15 news pages and 2 embed captures carried a stray
   `</section>` or `</p>` that browsers silently recover from.
2. **Markup stranded before the doctype.** 40 of the 43 embed captures opened
   with `<link>` and `<script>` tags sitting above `<!doctype html>`, which is
   how the ISCB Joomla template emits them. Browsers hoist those into `<head>`;
   now the file does too.

Reserialising also escapes stray `<` characters that appear in prose (several
poster abstracts contain things like `p<0.05`). A browser already treats those
as text rather than as a tag, so nothing renders differently.

Every rewrite was guarded by comparing the parsed document's rendered text
before and after. All 105 files matched exactly.

All 105 files were then formatted with Prettier 3 (`printWidth` 120,
`htmlWhitespaceSensitivity: css`, which preserves inline element spacing).

## Verification

* **Links.** 8226 relative `src`, `href` and `action` references across all 105
  pages resolve to files that exist. Zero broken internal links.
* **Formatting.** Prettier 3 parses and formats all 105 files with no errors.
* **JavaScript.** Every one of the 105 pages was loaded in Chrome at its real
  URL. Zero console errors or uncaught exceptions.
* **Iframes.** All 12 embed hosting pages size their iframe to their
  content, and links clicked inside an embed navigate correctly within it.
* **Resources.** No 4xx or 5xx responses during that sweep. Every request the
  browser made was served.
* **Trackers.** Zero occurrences of `_paq`, `matomo`, `px.ads.linkedin`,
  `skynettechnologies`, `googletagmanager`, `gtm.start`, `Mirrored from` or
  `Added by HTTrack` anywhere in the archive.
