# ridetoalps

Website for **ridetoalps** — private door-to-door transfers from Munich Airport to the
alpine valleys of Austria, Switzerland and Italy.

48 pages: a homepage, a routes hub and ten route landing pages, each in English, German,
Russian and Ukrainian, plus three German legal pages shared by all four versions.

Only two files are written by hand: `index.html` and `routes.data.mjs`. Everything else is
generated from them.

## Run locally

```bash
npm install          # puppeteer, for the screenshot and check scripts
node serve.mjs       # serves the project root at http://localhost:3010
node build.mjs       # regenerate every page after an edit
```

## The one rule

**`index.html` is the source of truth, and the files under `de/`, `ru/` and `uk/` are
not.** Those are build output: `node build.mjs` overwrites them without asking. The same
goes for `routes/`, `routes.html` and `sitemap.xml`.

So a change to a fleet card, the calculator or the footer is made once, in `index.html`,
and reaches 48 pages on the next build. A change made in `de/index.html` is lost.

## Structure

| Path | What it is |
|---|---|
| `index.html` | The English homepage — markup, CSS and JS, all inline. Hand-written. |
| `routes.data.mjs` | The ten routes: prices, distances, times and English prose. Hand-written. |
| `blog.data.mjs` | Blog categories and articles, with the keyword map. Hand-written. |
| `i18n/` | Translations and the localisation engine (see below) |
| `build.mjs` | Runs every build step in the right order |
| `build-i18n.mjs` | Localised homepages → `de/`, `ru/`, `uk/` |
| `build-routes.mjs` | Ten route pages per language → `routes/`, `<lang>/routes/` |
| `build-routes-index.mjs` | The routes hub per language → `routes.html`, `<lang>/routes.html` |
| `build-blog.mjs` | Blog index and articles → `blog.html`, `blog/`, `<lang>/blog/` |
| `build-sitemap.mjs` | `sitemap.xml`, with hreflang alternates for all 48 pages |
| `build-llms.mjs` | `llms.txt` and `llms-full.txt` — the service, in plain text, for AI assistants |
| `build-deploy.mjs` | Assembles `deploy/` — exactly what belongs in `public_html` |
| `route.css`, `route.js` | Styles and script for the generated pages |
| `consent.js` | Consent Mode v2 banner, in all four languages |
| `send-form.php` | Booking form endpoint → Telegram |
| `check-links.mjs` | Every internal link, asset and hreflang on all 48 pages |
| `check-layout.mjs` | Overflow and script errors, every language × four widths |
| `check-grid.mjs` | That every element sits on the one content column, at ten widths |
| `check-consent.mjs` | Consent Mode v2, measured from the network rather than read from the markup |
| `robots.txt` | Crawler access — search engines and AI assistants, named explicitly |
| `i18n/nav.mjs` | The header: one definition, every page |
| `serve.mjs`, `screenshot.mjs` | Dev server and Puppeteer screenshot helper |

## How the translation works

English is the source language, and the English string is the key. There is no `t('hero.
title')` indirection to keep in sync — `index.html` stays readable, and a translation file
is a list of English sentences with their counterparts.

```
i18n/config.mjs        the four languages and where each one lives
i18n/localize.mjs      the engine: walks a finished page, translating text
i18n/ui.<lang>.mjs     chrome and components, shared by every page
i18n/home.<lang>.mjs   homepage content: metadata, reviews, the FAQ
i18n/routes.<lang>.mjs route prose, keyed by slug
i18n/blog.<lang>.mjs   blog articles, keyed by slug
i18n/tpl.<lang>.mjs    the route-page template: headings, meta, number formats
i18n/keep.mjs          strings left untranslated on purpose (guest names)
i18n/check.mjs         catches stray characters and mixed apostrophe forms
```

Three details worth knowing before changing anything here:

**The engine walks the page, it does not search and replace.** `About` is a heading, a nav
label and part of `href="#about"`; `To` is a form label and the start of a dozen
sentences. So the page is split into tags and text, and only text nodes and a short
whitelist of attributes are ever touched.

**Nothing falls back to English silently.** If a string has no translation the build
reports it and refuses to write the page. A page that is 95% German is worse than a build
that fails, because only a German reader would ever notice.

**The strings the page builds at runtime go through `T()`.** The calculator assembles
sentences in JavaScript — "Applied — night departure + 5+ passengers" is four fragments.
Those literals are wrapped in `T()` / `F()` in the page script, and each localised page
carries a `window.RTA_I18N` blob the build generates. The English page has no blob, `T()`
is the identity, and the source keeps one copy of each string.

### Adding a language

1. Add it to `LANGS` in `i18n/config.mjs`.
2. Copy `ui.de.mjs`, `home.de.mjs`, `routes.de.mjs` and `tpl.de.mjs` to the new code and
   translate them. The build tells you about anything you miss.
3. Add its wording to `TEXT` in `consent.js`.
4. `node build.mjs`.

A language with no `routes.<lang>.mjs` is skipped rather than half-built, so translations
can land one file at a time.

### Changing English copy

Edit `index.html` or `routes.data.mjs`, then run `node build.mjs`. It will fail, naming
the strings whose translations no longer match. Update those keys in the four `i18n`
files and build again. That failure is the feature: it is what stops an English edit from
quietly reverting three languages to English.

## Checks

```bash
node serve.mjs &
node check-links.mjs     # every link, asset and hreflang on 51 pages, and that
                         # each homepage still links all ten routes
node check-layout.mjs    # 4 languages × 4 widths, overflow and JS errors
node check-grid.mjs      # every element on the one content column, 10 widths
node check-consent.mjs   # tags load, defaults denied, cookieless ping, no cookies
                         # before Accept. Takes a URL to test the live site.
node i18n/check.mjs      # stray characters in the translation files
```

### The header

One bar on every page — sticky, with the Routes menu, the language picker and a
`Book now` button pointing at `#calculator`. `i18n/nav.mjs` generates it for the
route and hub pages; `index.html` carries the same markup by hand, because it
*is* the served English homepage. `check-links.mjs` compares the two and fails
on drift.

`--head-h` is its height. The homepage hero subtracts it to stay exactly one
viewport tall, and every anchor target reserves it as `scroll-margin-top` so a
section jumped to from the menu does not land behind the bar.

### The layout grid

Four tokens define it, in both `index.html` and `route.css`:

```css
--shell            inset of a full-bleed card (hero, footer) from the viewport
--gutter           the content column's side padding
--grid-max         the content column's width
--grid-max-inset   } the same column, expressed from inside a card that is
--gutter-inset     } already inset by --shell
```

Content inside a full-bleed card needs the `-inset` pair, or it lands short of
the column by exactly `--shell`. Put the gutter on the row that is also
max-width constrained — never on its parent as well, or the two add up.

`serve.mjs` applies the same gzip, cache and charset headers as `.htaccess`, so a
local Lighthouse run measures something close to the real site rather than
reporting compression failures that only exist on the dev server.

Current scores, mobile: **95–98** performance, **100** accessibility, **100** best
practices, **100** SEO. Desktop is 100 across the board.

`check-links.mjs` reports the three legal pages as having no hreflang alternates. That is
deliberate — they are documents under German law and all four language versions link to
the same copy.

## The blog

An index and three articles, in four languages. `blog.data.mjs` holds the
English; each article's body is a list of `[kind, …]` blocks rather than
markup, so the prose is translatable string by string and the build can check
that a translation has the same structure — a dropped block would otherwise
make one language's article quietly shorter.

The filters are buttons that hide cards client-side, not links to category
URLs. Three categories do not justify three more indexable pages competing
with the blog index for the same queries.

**Before adding an article, read the keyword map at the top of
`blog.data.mjs`.** The ten route pages already own "Munich Airport to
<resort> transfer" and the price. An article that also targeted those would
not win a second listing, it would split the signal between two of our own
pages. Each article therefore answers a question asked *before* a route is
chosen, and each owns a different one.

## Being found

Three audiences, handled separately.

- **Search engines.** `robots.txt` names Googlebot, Bingbot and the rest
  explicitly; `sitemap.xml` lists all 48 pages with their language alternates;
  every page carries JSON-LD.
- **AI assistants.** ChatGPT, Claude, Gemini and Perplexity increasingly answer
  "how do I get from Munich Airport to Kitzbühel" without the person opening a
  page. `robots.txt` allows their crawlers by name, and `llms.txt` /
  `llms-full.txt` give them the routes, prices and rules as plain text,
  generated from `routes.data.mjs` so they cannot drift from the calculator.
- **Link previews.** Open Graph and Twitter cards on every page, in the page's
  own language.

The structured data states `eligibleQuantity: 1–4 passengers` on every offer.
That is deliberate: the price is per vehicle, and an assistant that reads it as
per person quotes a family of four four times the real fare.

## Deploying

```bash
node build.mjs
node build-deploy.mjs    # → deploy/, 224 files
```

Upload the contents of `deploy/` to `public_html`, overwriting what is there.

On a **first install** only, on the server: rename `config.sample.php` to `config.php`,
fill in `bot_token` and `chat_id`, and set its permissions to **600**.

On later uploads leave it alone. `deploy/` deliberately contains no `config.php`, so
re-uploading the whole folder can never overwrite the live token — which would break the
booking form quietly, and nobody would notice until an enquiry went missing.

`config.php` is git-ignored and must never be committed: this repository is public, and
anyone holding the token controls the bot.

## Pricing rules

Fixed rates are per vehicle for 1–4 passengers departing 07:00–22:00. Departures outside
those hours, or groups of 5–7, use the higher night / large-group rate. Groups over 7
travel in additional vehicles. A €30 / $35 deposit confirms a booking and is refundable up
to 48 hours before the date.

## Known placeholders

1. **Legal pages** — `impressum.html`, `datenschutz.html` and `agb.html` are "in
   preparation" notices pending accreditation. The full drafts are preserved at commit
   `8ba5d9f` and can be restored when the operator's details are final.
2. **Reviews** — the testimonials on the homepage and the route pages are written copy,
   not collected feedback. No `AggregateRating` schema is present, deliberately: marking
   up invented reviews is a Google manual action waiting to happen, and under the Annex to
   § 3(3) UWG presenting them as genuine consumer reviews is unlawful in Germany. Replace
   them with real ones before the site is promoted.
