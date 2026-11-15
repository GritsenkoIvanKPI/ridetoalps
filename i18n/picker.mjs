/* The language selector, generated from one place so the four versions of a
 * page always agree about what the other three are called and where they live.
 *
 * The options are real links, not buttons: that way they work with JavaScript
 * off, they are crawlable, and a visitor who lands on the Russian page from a
 * search result can reach the German one without the page having to guess.
 *
 * `urlFor(code)` returns the URL of *this* page in that language — so the
 * picker on /routes/ischgl.html offers /de/routes/ischgl.html, not /de/.
 */
import { LANGS } from './config.mjs';

const CHEVRON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

export function langPicker(current, urlFor, { label = 'Change language' } = {}) {
  const code = current.toUpperCase();
  const items = LANGS.map((l) => {
    const here = l.code === current;
    return `          <li><a href="${urlFor(l.code)}" lang="${l.code}" hreflang="${l.code}"` +
           `${here ? ' aria-current="true"' : ''}>${l.native}</a></li>`;
  }).join('\n');

  return `<div class="lang">
        <button class="lang__btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="${label}">
          ${code} ${CHEVRON}
        </button>
        <ul class="lang__menu">
${items}
        </ul>
      </div>`;
}

/** <link rel="alternate" hreflang> set for one page, English as x-default. */
export function alternates(urlFor, { site = 'https://ridetoalps.com' } = {}) {
  const rows = LANGS.map(
    (l) => `<link rel="alternate" hreflang="${l.code}" href="${site}${urlFor(l.code)}">`
  );
  rows.push(`<link rel="alternate" hreflang="x-default" href="${site}${urlFor('en')}">`);
  return rows.join('\n');
}
