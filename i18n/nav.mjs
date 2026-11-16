/* The header shared by every generated page.
 *
 * Two things it fixes.
 *
 * The first is that a route page used to be a dead end on a phone: the header
 * links were simply hidden below 900px, leaving the language picker as the only
 * control on the page. Someone reading about Ischgl on their phone could not
 * reach Sölden, the price calculator, or the homepage without the back button.
 *
 * The second is that the ten routes were only reachable from the homepage grid
 * and the footer. A visitor comparing Kitzbühel with St. Anton had to go back
 * to the homepage between every comparison. The Routes menu here lists all ten
 * with their prices, from any page, in any language.
 *
 * The markup is plain links inside a <nav>. The button only toggles a class;
 * with JavaScript off the panel is open and the page still works.
 */
import { LANGS } from './config.mjs';
import { langPicker } from './picker.mjs';

const CHEVRON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

const BURGER =
  '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
  '<path class="ic-burger" d="M4 7h16M4 12h16M4 17h16"/>' +
  '<path class="ic-close" d="m6 6 12 12M18 6 6 18"/></svg>';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * @param {object}  o
 * @param {string}  o.code      language code of the page being built
 * @param {Array}   o.routes    the localized route objects
 * @param {object}  o.map       translation map
 * @param {object}  o.t         the language's template
 * @param {string}  o.current   slug of the route being viewed, if any
 * @param {Function} o.urlFor   this page's URL in a given language
 */
export function header({ code, routes, map, t, current = null, urlFor }) {
  const b = code === 'en' ? '' : '/' + code;
  const M = (k, fallback) => map[k] || fallback || k;

  const items = routes.map(r =>
    `          <a href="${b}/routes/${r.slug}.html"${r.slug === current ? ' aria-current="page"' : ''}>` +
    `<span>${esc(r.destShort)}</span><b>${esc(t.money(r.price))}</b></a>`
  ).join('\n');

  return `<header class="rhead">
  <div class="rhead__in">
    <a class="brand" href="${b}/" aria-label="${esc(M('ridetoalps home'))}">
      <svg class="brand__mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect width="40" height="40" rx="12" fill="#0e63e4"/>
        <path d="M8 27.5 16 14l4.6 7.6L23.5 17l8.5 10.5H8Z" fill="#fff"/>
      </svg>
      <span class="brand__name">ridetoalps</span>
    </a>

    <nav class="rnav" id="rnav" aria-label="${esc(M('Main navigation'))}">
      <a class="rnav__link" href="${b}/">${esc(M('Home'))}</a>

      <div class="menu" data-menu>
        <button class="menu__btn" type="button" aria-expanded="false" aria-controls="routesMenu">
          ${esc(M('Routes'))} ${CHEVRON}
        </button>
        <div class="menu__panel" id="routesMenu">
${items}
          <a class="menu__all" href="${b}/routes.html">${esc(M('All routes'))}</a>
        </div>
      </div>

      <a class="rnav__link" href="${b}/#calculator">${esc(M('Prices'))}</a>
      <a class="rnav__link" href="${b}/#fleet">${esc(M('Fleet'))}</a>
      <a class="rnav__link" href="${b}/#contact">${esc(M('Contact'))}</a>

      ${langPicker(code, urlFor, { label: M('Change language') })}

      <!-- The header is sticky, so this is the one control on screen at every
           scroll position. It points at #calculator rather than the closing
           #book block: same target on every page type, and the thing it lands
           on is a complete quote-and-book form either way. -->
      <a class="rnav__cta" href="${b}/#calculator">${esc(M('Book now'))}</a>
    </nav>

    <button class="rnav-toggle" id="rnavToggle" type="button"
            aria-label="${esc(M('Open menu'))}" aria-expanded="false" aria-controls="rnav"
            data-label-open="${esc(M('Open menu'))}" data-label-close="${esc(M('Close menu'))}">
      ${BURGER}
    </button>
  </div>
</header>`;
}
