# ridetoalps

Landing page for **ridetoalps** — private door-to-door transfers from Munich Airport
to the alpine valleys of Austria, Switzerland and Italy.

Static single-page site: one `index.html` with all CSS and JS inline, no build step.

## Run locally

```bash
npm install        # only needed for screenshots (puppeteer)
npm start          # serves the project root at http://localhost:3000
```

## Structure

| Path | What it is |
|---|---|
| `index.html` | The whole site — markup, CSS and JS |
| `images/` | Photography and the Open Graph cover |
| `favicon.*`, `icon-*.png`, `apple-touch-icon.png` | Icon set, generated from the logo mark |
| `site.webmanifest`, `robots.txt`, `sitemap.xml` | PWA manifest and crawler files |
| `serve.mjs` | Minimal static dev server |
| `screenshot.mjs` | Puppeteer full-page screenshot helper |

## Features

- **Transfer calculator** — fixed per-vehicle route rates, with the night / large-group
  uplift (1.7 vs 1.5) and multi-vehicle split applied automatically. The component appears
  twice on the page and each instance is initialised independently from `[data-calc]`.
- **Fleet slider** — transform-based on desktop, native scroll-snap on touch.
- **FAQ accordion**, mobile menu, scroll-reveal animations.
- **SEO** — Open Graph and Twitter cards, plus a JSON-LD `@graph`
  (`WebSite`, `LimousineService`, `Service`, `FAQPage`). The FAQ entries and route prices
  in the structured data are generated from the page markup, so they stay in sync.

## Before going live

These placeholders must be replaced:

1. **Domain** — `https://ridetoalps.com` appears in the canonical link, the Open Graph and
   Twitter URLs, the JSON-LD `@id`s, `robots.txt` and `sitemap.xml`.
2. **Contact details** — `+49 000 000 00 00` and `hello@ridetoalps.com` in the contact
   section, the footer and the JSON-LD.
3. **Reviews** — the nine testimonials are placeholder copy. No `AggregateRating` schema is
   present, deliberately: marking up invented reviews risks a Google manual action. Add it
   once the reviews are genuine.
4. **Booking form** — currently client-side only; it shows a confirmation but sends nothing.
   Wire it to a backend or form service.

## Pricing rules

Fixed rates are per vehicle for 1–4 passengers departing 07:00–22:00. Departures outside
those hours, or groups of 5–7, use the higher night / large-group rate. Groups over 7
travel in additional vehicles. A €30 deposit confirms a booking and is refundable up to
48 hours before the date.
