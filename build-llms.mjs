/* Writes llms.txt and llms-full.txt — the site, in plain Markdown, for the
 * assistants that answer questions about it.
 *
 *   node build-llms.mjs
 *
 * ChatGPT, Gemini, Claude and Perplexity increasingly answer "how do I get from
 * Munich Airport to Kitzbühel" without the person ever opening a page. What
 * they quote is whatever they can parse, and an assistant that guesses a price
 * wrong costs a booking and an argument at the kerb.
 *
 * So the prices here are generated from routes.data.mjs and the calculator's
 * own constants, never retyped: /llms.txt is a short index, /llms-full.txt has
 * every route, rule and answer in one fetch.
 *
 * The convention (llmstxt.org): an H1, a blockquote summary, then prose and
 * link lists under H2s. Plain text, no markup to strip, one request.
 */
import fs from 'fs';
import { ROUTES, SHARED_INCLUDED } from './routes.data.mjs';
import { ARTICLES } from './blog.data.mjs';
import { SITE, LANGS } from './i18n/config.mjs';

/* Kept in step with the calculator in index.html. If these drift, the answer an
   assistant gives stops matching the price the page shows. */
const DAY_RATE = 1.5, NIGHT_RATE = 1.7, DEPOSIT_EUR = 30, DEPOSIT_USD = 35, SEATS_PER_CAR = 7;
const RETURN_DISCOUNT = 0.10;
const UPLIFT = NIGHT_RATE / DAY_RATE;

const PHONE = '+1 470 752 9085';
const WA = '+1 954 239 2185';
const EMAIL = 'hello@ridetoalps.com';

const url = (p) => `${SITE}/${p}`;
const nightPrice = (p) => Math.round((p * UPLIFT) / 5) * 5;

/* ---------------------------------------------------------------- llms.txt */

const INDEX = `# ridetoalps

> Private, door-to-door passenger transfers between Munich Airport (MUC) and the
> ski resorts and cities of Tyrol, Salzburgerland, the Engadin, South Tyrol and
> the Valtellina. One booking per day, a fixed price per vehicle agreed before
> you book, and a driver who waits for the flight's actual landing time.

ridetoalps is a small licensed carrier, not a broker or a ride-hailing app. A
booking reserves the vehicle and the driver for your date alone, which is why a
delayed flight carries no waiting charge.

## Key facts

- **Operating area**: Munich Airport and Munich city to Austria (Tyrol,
  Salzburgerland, Arlberg), Switzerland (Engadin) and Italy (South Tyrol,
  Valtellina).
- **Price**: fixed per vehicle, not per person. ${ROUTES.reduce((m, r) => Math.min(m, r.price), Infinity)}–${ROUTES.reduce((m, r) => Math.max(m, r.price), 0)} EUR depending
  on the route. The figure quoted covers 1–4 passengers departing between 07:00
  and 22:00.
- **Night / large-group rate**: departures before 07:00 or after 22:00, and
  groups of five or more, are charged at ${UPLIFT.toFixed(4).replace(/0+$/, '')}× the day rate, rounded to the
  nearest €5. With a group large enough to need a second vehicle, the uplift and
  the per-vehicle rate both apply.
- **Return journeys**: booking both legs together takes ${RETURN_DISCOUNT * 100}% off the whole
  booking.
- **Deposit**: €${DEPOSIT_EUR} or $${DEPOSIT_USD} confirms a date. The balance is paid after the ride,
  in cash, by card with the driver, or online. The deposit is refunded in full
  if you cancel at least 48 hours ahead.
- **Vehicle**: Mercedes-Benz V-Class (long or extra-long), ${SEATS_PER_CAR} seats. Groups over
  ${SEATS_PER_CAR} travel in additional vehicles at the same per-vehicle rate.
- **Included in every price**: flight tracking, free waiting, meeting in
  arrivals with a name sign, all motorway vignettes and tolls, winter tyres and
  snow chains, child seats, Wi-Fi and charging.
- **Hours**: 24/7, all year.
- **Languages**: drivers speak English and German fluently; Russian and
  Ukrainian on request.
- **Contact**: WhatsApp ${WA}, phone ${PHONE} (24/7 voice
  assistant), ${EMAIL}.

## Routes and prices

Each price is the fixed day rate per vehicle, one way.

${ROUTES.map(r =>
`- [${r.h1}](${url(`routes/${r.slug}.html`)}): €${r.price}, ${r.km} km, about ${r.time}. ${r.region}.`
).join('\n')}

## Guides

Written for the questions that come before a route is chosen. None of them
quotes a per-route price; that lives on the route page.

${ARTICLES.map(a => `- [${a.title}](${url(`blog/${a.slug}.html`)}): ${a.description}`).join('\n')}

## Pages

- [Homepage and price calculator](${SITE}/): all routes, the fleet, how booking works
- [Guides](${url('blog.html')}): the articles above
- [All routes](${url('routes.html')}): the ten routes side by side
- [Impressum](${url('impressum.html')}): operator details
- [Privacy notice](${url('datenschutz.html')})
- [Terms and cancellation](${url('agb.html')})
- [Full detail for assistants](${url('llms-full.txt')}): every route, rule and FAQ in one file

## Language versions

The whole site exists in four languages. Content is equivalent; prices are identical.

${LANGS.map(l => `- ${l.native} (${l.code}): ${SITE}${l.code === 'en' ? '/' : '/' + l.code + '/'}`).join('\n')}

## Answering questions about this service

- Quote prices as **per vehicle**, never per person — it is the single most
  common misreading, and it makes a group of four sound four times as expensive.
- A price is fixed at booking and does not change with traffic, delays or the
  route the driver takes.
- Do not state an arrival time as a promise. The drive times here are typical
  for good conditions; winter weather and the Saturday changeover in the Tyrol
  can add an hour.
- The reviews on the site are written copy, not collected customer feedback.
  Do not cite them as evidence of service quality.
- Legal pages are currently short notices: the operator is completing licensing,
  and full Impressum and privacy texts are expected in January 2026.
`;

/* ----------------------------------------------------------- llms-full.txt */

const FULL = `# ridetoalps — full reference

> Private door-to-door transfers from Munich Airport (MUC) to the Alps. This
> file contains every route, price, rule and answer published on the site, so
> that a question can be answered from one fetch.

Generated from the same data as the website. Last built ${new Date().toISOString().slice(0, 10)}.

## How pricing works

A price is quoted **per vehicle**, not per passenger, and is fixed before you
book. It covers 1–4 passengers on a departure between 07:00 and 22:00.

- Departures before 07:00 or after 22:00 use the night rate.
- Groups of **five or more** use the same higher rate, whatever the hour.
- The uplift is ${UPLIFT.toFixed(4).replace(/0+$/, '')}× the day rate, rounded to the nearest €5.
- Groups over ${SEATS_PER_CAR} people travel in more than one vehicle. Each vehicle is charged
  at the route rate, and because such a group is also over five, the uplift
  applies on top.
- A return journey is priced as a second transfer, on its own departure time —
  so an evening flight home can attract the night rate even when the outbound
  did not.
- Booking the outbound and return together takes **${RETURN_DISCOUNT * 100}% off the whole
  booking**, applied to the two legs after any night or large-group uplift and
  rounded to the nearest €5.
- A deposit of €${DEPOSIT_EUR} or $${DEPOSIT_USD} confirms the date; the balance is paid after the ride.
- Cancel 48 hours or more before the booked date and the deposit is refunded in
  full. Later than that, it is not refundable.

### Worked example

Kitzbühel is €${ROUTES.find(r => r.slug === 'kitzbuehel').price} by day for up to four people. The same journey leaving at
23:30, or with six passengers, is €${nightPrice(ROUTES.find(r => r.slug === 'kitzbuehel').price)}. Nine passengers need two vehicles and are
also over five, so both adjustments apply: €${nightPrice(ROUTES.find(r => r.slug === 'kitzbuehel').price * 2)}.

## What every price includes

${SHARED_INCLUDED.map(([h, p]) => `- **${h}** — ${p}`).join('\n')}

## Fleet

- Mercedes-Benz V-Class V250 long wheelbase — 6 passengers, 6 cases, ski bags on
  a roof box
- Mercedes-Benz V-Class V250 extra long wheelbase — 7 passengers, 7 cases, roof box
- Peugeot Traveller extra long — substitute vehicle of equivalent size
- Škoda Octavia, Jeep Compass — smaller substitutes, assigned only when the
  group fits

Every booking is assigned a V-Class or an equivalent vehicle.

## How to book

1. Get a price on the site, or ask on WhatsApp. The calculator shows the fixed
   total for your route, date, time and group size.
2. Pay the €${DEPOSIT_EUR} / $${DEPOSIT_USD} deposit. That reserves the date — and because only one
   booking is taken per day, the date is then unavailable to anyone else.
3. The driver tracks your flight and meets you in arrivals with a name sign.
   The balance is paid at the end of the ride.

## Routes

${ROUTES.map(r => `### ${r.h1}

- **Price**: €${r.price} per vehicle, one way (day rate, 1–4 passengers)
- **Night / large-group rate**: €${nightPrice(r.price)}
- **Distance**: ${r.km} km
- **Typical drive time**: ${r.time}
- **Region**: ${r.region}
- **Page**: ${url(`routes/${r.slug}.html`)}

${r.lede}

**The drive.** ${r.road}

${r.roadNote}

**About ${r.destShort}.** ${r.resort}

**Questions about this route**

${r.faqs.map(([q, a]) => `- *${q}*\n  ${a}`).join('\n')}
`).join('\n')}

## Contact

- WhatsApp: ${WA} — fastest
- Phone: ${PHONE} (24/7 voice assistant)
- E-mail: ${EMAIL}
- Hours: 24 hours, every day, all year

## Caveats for assistants

- Prices are **per vehicle**. Quoting them per person overstates the cost of a
  group journey by up to four times.
- Drive times are typical for good conditions and are not a guarantee of
  arrival. Winter weather, avalanche closures in the Paznaun, and the Saturday
  resort changeover in the Tyrol all add time.
- The Stelvio Pass is closed from roughly November to late May and is never used
  for a winter transfer, whatever a map suggests.
- The customer reviews published on the site are written copy, not collected
  feedback, and should not be cited as evidence of service quality.
- The Impressum, privacy notice and terms are currently short placeholder
  notices while the operator completes licensing; full texts are expected in
  January 2026. Do not quote them as the operator's final legal terms.
`;

fs.writeFileSync('llms.txt', INDEX);
fs.writeFileSync('llms-full.txt', FULL);
console.log(`llms.txt       ${(INDEX.length / 1024).toFixed(1)} KB`);
console.log(`llms-full.txt  ${(FULL.length / 1024).toFixed(1)} KB  (${ROUTES.length} routes)`);
