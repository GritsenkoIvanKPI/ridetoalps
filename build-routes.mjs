/* Generates one landing page per route, in every language.
 *
 *   node build-routes.mjs
 *
 *   routes/<slug>.html        English
 *   de/routes/<slug>.html     German, and the same for ru/ and uk/
 *
 * Three things are read rather than written here, so there is one source of
 * truth for each of them:
 *
 *   index.html          the calculator, the fleet cards, the footer and the
 *                       Google tag — change a fleet card on the homepage and
 *                       every route page in every language follows
 *   routes.data.mjs     the English route prose
 *   i18n/*.mjs          the translations, and the template per language
 *
 * A language is built only if its route file exists, so translations can land
 * one at a time without breaking the build.
 */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { ROUTES, SHARED_INCLUDED } from './routes.data.mjs';
import { LANGS, SITE, byCode } from './i18n/config.mjs';
import { localize } from './i18n/localize.mjs';
import { loadMap, loadUi } from './i18n/load.mjs';
import { langPicker, alternates } from './i18n/picker.mjs';

const PHONE = '+14707529085', PHONE_FMT = '+1 470 752 9085';
const WA = '19542392185', WA_FMT = '+1 954 239 2185';

const home = fs.readFileSync('index.html', 'utf8');
const between = (a, b) => { const i = home.indexOf(a); return home.slice(i, home.indexOf(b, i)).trimEnd(); };

/* ---------- partials lifted from the homepage ---------- */

const CALC_RAW  = between('    <div class="calc reveal" data-calc>', '  </div>\n</section>');
const FLEET_RAW = between('      <div class="fleet__track" id="fleetTrack">', '      </div>\n    </div>');
const FOOT_RAW  = home.slice(home.indexOf('<footer class="footer">'),
                             home.indexOf('</footer>') + '</footer>'.length);
const GTAG = (() => {
  // only the tag block — slicing to </head> would drag in the homepage's own
  // title, preloads and inline stylesheet
  const a = home.indexOf('<!-- Google tag');
  const end = home.indexOf('</script>', home.indexOf('gtag/js?id=', a));
  return home.slice(a, end + '</script>'.length);
})();

/* Route pages sit at /routes/ and at /de/routes/, two different depths, so
   every reference is made root-absolute once here instead of counting '../'
   per output directory. */
function reroot(s, lang) {
  const b = lang === 'en' ? '' : '/' + lang;
  return s
    .replace(/(\s(?:src|href)=")(images\/)/g, '$1/$2')
    .replace(/(\ssrcset=")(images\/)/g, '$1/$2')
    .replace(/(\shref=")routes\.html"/g, `$1${b}/routes.html"`)
    .replace(/(\shref=")routes\/([a-z0-9-]+)\.html"/g, `$1${b}/routes/$2.html"`)
    .replace(/(\shref=")(impressum|datenschutz|agb)\.html"/g, '$1/$2.html"')
    // in-page anchors in the footer point back at this language's homepage
    .replace(/(\shref=")#([a-z]+)"/g, `$1${b}/#$2"`);
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ARROW = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>`;
const star = on => `<svg viewBox="0 0 24 24" class="${on ? 'on' : 'off'}" aria-hidden="true"><path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.8L12 2Z"/></svg>`;

const ICONS = [
  '<path d="M3.5 12h5l2-5 3 10 2-5h5"/>',
  '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  '<path d="M3.5 8.5h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-8Z"/><path d="M3.5 8.5 15 5.2l1 3.3M16 13.5h3"/>',
  '<rect x="4.5" y="7.5" width="15" height="12.5" rx="2"/><path d="M9 7.5V5.2a1.6 1.6 0 0 1 1.6-1.6h2.8A1.6 1.6 0 0 1 15 5.2v2.3"/>',
  '<path d="M7 4h6a2 2 0 0 1 2 2v8H9a2 2 0 0 1-2-2V4Z"/><path d="M15 14h2.5a2 2 0 0 1 2 2v4M6 20v-6"/>',
  '<path d="M5 12.5a9 9 0 0 1 14 0M8 16a5 5 0 0 1 8 0"/><circle cx="12" cy="19.5" r="1.1"/>',
];

/** <picture> with the avif/webp variants that build-images produced. */
function pic(jpg, alt, cls, extra = '') {
  const base = jpg.replace(/\.jpg$/, '');
  return `<picture><source srcset="${base}.avif" type="image/avif">` +
         `<source srcset="${base}.webp" type="image/webp">` +
         `<img src="${jpg}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''} ${extra}></picture>`;
}

/* ---------- one page ---------- */

function page(r, all, L) {
  const { lang, t, map, ui, included } = L;
  const code = lang.code;
  const b = code === 'en' ? '' : '/' + code;
  const url = (c) => `${c === 'en' ? '' : '/' + c}/routes/${r.slug}.html`;
  const M = (k, fallback) => map[k] || fallback || k;

  const others = all.filter(o => o.slug !== r.slug).slice(0, 6);
  const title = t.title(r);
  const desc  = t.desc(r);

  const ld = {
    '@context': 'https://schema.org',
    inLanguage: lang.intl,
    '@graph': [
      { '@type': 'Service', name: r.h1, serviceType: t.serviceType,
        provider: { '@type': 'LimousineService', name: 'ridetoalps', url: SITE + '/' },
        areaServed: { '@type': 'Place', name: `${r.dest}, ${r.region}` },
        offers: { '@type': 'Offer', price: String(r.price), priceCurrency: 'EUR',
                  description: t.offerDesc } },
      { '@type': 'FAQPage',
        mainEntity: r.faqs.map(([q, a]) => ({ '@type': 'Question', name: q,
          acceptedAnswer: { '@type': 'Answer', text: a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: t.crumbHome,   item: SITE + b + '/' },
          { '@type': 'ListItem', position: 2, name: t.crumbRoutes, item: SITE + b + '/routes.html' },
          { '@type': 'ListItem', position: 3, name: r.h1 } ] },
    ],
  };

  const calc = L.calc
    .replace(/-1"/g, `-${r.slug}"`)
    .replace(/id="returnRow-1"/g, `id="returnRow-${r.slug}"`)
    .replace(/for="([a-zA-Z]+)-1"/g, `for="$1-${r.slug}"`)
    // the FROM select also contains a muc-city option, so match only options
    // that carry data-price — those are the destinations
    .replace(/(<option value="kitzbuehel" data-price="300") selected>/, '$1>')
    .replace(new RegExp(`(<option value="${r.calc}" data-price="\\d+")>`), '$1 selected>');

  const blob = code === 'en' ? '' : `<script>
  /* Strings the page builds at runtime — generated from i18n/ui.${code}.mjs */
  window.RTA_LOCALE = ${JSON.stringify(lang.intl)};
  window.RTA_MONEY = ${JSON.stringify(t.money(0).replace('0', '{n}'))};
  window.RTA_I18N = ${JSON.stringify(ui)};
</script>
`;

  return `<!DOCTYPE html>
<html lang="${code}">
<head>
${GTAG}
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}${url(code)}">
${alternates(url)}
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<meta name="theme-color" content="#0e63e4">
<meta property="og:type" content="website">
<meta property="og:site_name" content="ridetoalps">
<meta property="og:locale" content="${lang.locale}">
<meta property="og:url" content="${SITE}${url(code)}">
<meta property="og:title" content="${esc(t.ogTitle(r))}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE}/${r.hero}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" as="image" href="/${r.hero.replace(/\.jpg$/, '.avif')}" type="image/avif" fetchpriority="high">
<link rel="stylesheet" href="/route.css">
<script src="/consent.js" defer></script>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>

<header class="rhead">
  <div class="rhead__in">
    <a class="brand" href="${b}/" aria-label="${esc(M('ridetoalps home'))}">
      <svg class="brand__mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect width="40" height="40" rx="12" fill="#0e63e4"/>
        <path d="M8 27.5 16 14l4.6 7.6L23.5 17l8.5 10.5H8Z" fill="#fff"/>
      </svg>
      <span class="brand__name">ridetoalps</span>
    </a>
    <nav class="rhead__nav">
      <a href="${b}/">${esc(M('Home'))}</a>
      <a href="${b}/routes.html">${esc(M('All routes'))}</a>
      <a href="#calculator">${esc(M('Price'))}</a>
      <a href="#faq">${esc(M('FAQ'))}</a>
      ${langPicker(code, url, { label: M('Change language') })}
    </nav>
  </div>
</header>

<main>

<!-- hero -->
<section class="rhero">
  <div class="rhero__frame grain">
    <div class="rhero__media">${pic('/' + r.hero, r.heroAlt, '', 'fetchpriority="high" width="1600" height="900"')}</div>
    <div class="rhero__body">
      <p class="rhero__crumb"><a href="${b}/">${esc(t.crumbHome)}</a> › <a href="${b}/routes.html">${esc(t.crumbRoutes)}</a> › ${esc(r.destShort)}</p>
      <h1>${esc(r.h1)}</h1>
      <p class="rhero__lede">${esc(r.lede)}</p>
      <div class="rfacts">
        <div class="rfact rfact--price"><small>${esc(M('From'))}</small><b>${esc(t.money(r.price))}</b></div>
        <div class="rfact"><small>${esc(M('Drive time'))}</small><b>${esc(r.time)}</b></div>
        <div class="rfact"><small>${esc(M('Distance'))}</small><b>${esc(t.dist(r.km))}</b></div>
        <div class="rfact"><small>${esc(M('Deposit'))}</small><b>${esc(M('€30 or $35'))}</b></div>
      </div>
      <div class="rhero__actions">
        <a class="btn" href="#calculator"><span>${esc(M('Get your price'))}</span><i>${ARROW}</i></a>
        <a class="btn btn--ghost" href="https://wa.me/${WA}" rel="noopener" target="_blank"><span>${esc(M('Ask on WhatsApp'))}</span><i>${ARROW}</i></a>
      </div>
    </div>
  </div>
</section>

<!-- calculator, route preselected -->
<section class="section-spacing" id="calculator">
  <div class="container">
    <div class="section-head reveal">
      <h2>${esc(t.priceTo(r))}</h2>
      <a class="link-arrow" href="#faq">${esc(M('How pricing works'))} ${ARROW}</a>
    </div>
${calc}
  </div>
</section>

<!-- cta -->
<section class="section-spacing--tight">
  <div class="container">
    <div class="cta grain reveal">
      ${pic('/images/cta.jpg', M('Snowy alpine valley road at blue hour'), '', 'loading="lazy" width="1376" height="768"')}
      <div class="cta__inner">
        <h2>${esc(M('One booking a day, and it is yours'))}</h2>
        <p>${esc(M('We do not stack jobs. On your date the car and driver are yours alone, which is why a delayed flight costs you nothing.'))}</p>
        <div class="cta__actions">
          <a class="btn" href="#calculator"><span>${esc(t.checkDest(r))}</span><i>${ARROW}</i></a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- about the route -->
<section class="section-spacing">
  <div class="container">
    <div class="rsplit">
      <div class="reveal">
        <span class="eyebrow">${esc(M('The drive'))}</span>
        <h2>${esc(t.driveHead(r))}</h2>
        <p>${esc(r.road)}</p>
        <div class="rnote">${esc(r.roadNote)}</div>
      </div>
      <div class="rsplit__media reveal">${pic('/' + r.town, r.townAlt, '', 'loading="lazy" width="1200" height="900"')}</div>
    </div>
  </div>
</section>

<!-- resort overview -->
<section class="section-spacing">
  <div class="container">
    <div class="rsplit">
      <div class="rsplit__media reveal">${pic('/' + r.hero, r.heroAlt, '', 'loading="lazy" width="1600" height="900"')}</div>
      <div class="reveal">
        <span class="eyebrow">${esc(r.region)}</span>
        <h2>${esc(t.aboutDest(r))}</h2>
        <p>${esc(r.resort)}</p>
      </div>
    </div>
  </div>
</section>

<!-- what's included -->
<section class="section-spacing">
  <div class="container">
    <h2 class="head-center reveal">${esc(t.covers(r))}</h2>
    <div class="rincl">
      ${included.map(([h, p], i) => `<div class="rincl__item reveal">
        <svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[i % ICONS.length]}</svg>
        <h3>${esc(h)}</h3><p>${esc(p)}</p>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- vehicles -->
<section class="section-spacing" id="fleet">
  <div class="container">
    <div class="section-head reveal">
      <h2>${esc(M('Vehicles for this route'))}</h2>
      <a class="link-arrow" href="#calculator">${esc(M('Check availability'))} ${ARROW}</a>
    </div>
    <div class="fleet__viewport reveal">
      <div class="fleet__track" id="fleetTrack">
${L.fleet.split('\n').slice(1).join('\n')}
      </div>
    </div>
    <div class="fleet__nav reveal">
      <button class="arrow-btn" id="fleetPrev" aria-label="${esc(M('Previous vehicles'))}" disabled>
        <svg viewBox="0 0 48 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M46 12H2M10 5 2 12l8 7"/></svg>
      </button>
      <button class="arrow-btn" id="fleetNext" aria-label="${esc(M('Next vehicles'))}">
        <svg viewBox="0 0 48 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12h44M38 5l8 7-8 7"/></svg>
      </button>
    </div>
  </div>
</section>

<!-- how to book -->
<section class="section-spacing">
  <div class="container">
    <div class="steps grain reveal">
      <div class="steps__media">${pic('/images/steps.jpg', M('Driver loading ski bags into a Mercedes V-Class outside Munich Airport arrivals'), '', 'loading="lazy" width="821" height="1100"')}</div>
      <div class="steps__body">
        <h2>${esc(t.bookSteps(r))}</h2>
        <div class="step"><div class="step__num">01</div><div>
          <h3>${esc(M('Get your price'))}</h3>
          <p>${esc(t.step1(r))}</p></div></div>
        <div class="step"><div class="step__num">02</div><div>
          <h3>${esc(M('Confirm with €30 or $35'))}</h3>
          <p>${esc(t.step2(r))}</p></div></div>
        <div class="step"><div class="step__num">03</div><div>
          <h3>${esc(M('Meet your driver'))}</h3>
          <p>${esc(t.step3(r))}</p></div></div>
      </div>
    </div>
  </div>
</section>

<!-- reviews -->
<section class="section-spacing" id="reviews">
  <div class="container">
    <h2 class="head-center reveal">${esc(t.guests(r))}</h2>
    <div class="reviews reveal" id="reviewsTrack">
      ${r.reviews.map(([text, name, rating]) => `<article class="review">
        <div class="stars" aria-label="${esc(M(`${rating} out of 5`))}">${[1, 2, 3, 4, 5].map(i => star(i <= rating)).join('')}</div>
        <p>${esc(text)}</p>
        <div class="review__by"><span>${esc(name)}</span></div>
      </article>`).join('\n      ')}
    </div>
    <div class="reviews__nav reveal">
      <button class="arrow-btn" id="reviewPrev" aria-label="${esc(M('Previous reviews'))}" disabled>
        <svg viewBox="0 0 48 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M46 12H2M10 5 2 12l8 7"/></svg>
      </button>
      <button class="arrow-btn" id="reviewNext" aria-label="${esc(M('Next reviews'))}">
        <svg viewBox="0 0 48 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12h44M38 5l8 7-8 7"/></svg>
      </button>
    </div>
  </div>
</section>

<!-- faq -->
<section class="section-spacing" id="faq">
  <div class="container">
    <h2 class="head-center head-center--wide reveal">${esc(t.questions(r))}</h2>
    <div class="faq reveal">
      ${r.faqs.map(([q, a]) => `<div class="qa">
        <button class="qa__q" type="button" aria-expanded="false">${esc(q)}
          <span class="qa__ic"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></span>
        </button>
        <div class="qa__a"><p>${esc(a)}</p></div>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- other routes -->
<section class="section-spacing">
  <div class="container">
    <div class="section-head reveal">
      <h2>${esc(M('Other routes from Munich'))}</h2>
      <a class="link-arrow" href="${b}/routes.html">${esc(M('See all ten'))} ${ARROW}</a>
    </div>
    <div class="rother reveal">
      ${others.map(o => `<a href="${b}/routes/${o.slug}.html">
        <span><b>${esc(o.dest)}</b><small>${esc(o.time)} · ${esc(t.dist(o.km))}</small></span>
        <span>${esc(t.money(o.price))}</span>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- contact cta -->
<section class="section-spacing" id="contact">
  <div class="container">
    <h2 class="head-center reveal">${esc(M('Rather just ask someone?'))}</h2>
    <div class="rcontact reveal">
      <a href="https://wa.me/${WA}" rel="noopener" target="_blank">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21a9 9 0 1 0-7.8-4.5L3 21l4.6-1.2A9 9 0 0 0 12 21Z"/></svg>
        <span><b>WhatsApp ${WA_FMT}</b><small>${esc(t.waFastest(r))}</small></span>
      </a>
      <a href="tel:${PHONE}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3.5h3l1.6 4-2 1.4a11.5 11.5 0 0 0 5.5 5.5l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"/></svg>
        <span><b>${esc(t.callNum(PHONE_FMT))}</b><small>${esc(M('24/7 voice assistant'))}</small></span>
      </a>
    </div>
  </div>
</section>

</main>

${L.foot}

${blob}<script src="/route.js" defer></script>
</body>
</html>
`;
}

/* ---------- per-language setup ---------- */

/** Translates a homepage partial and re-roots its paths for this language. */
function partial(raw, lang, map) {
  const s = reroot(raw, lang);
  if (lang === 'en') return s;
  const r = localize(s, map);
  if (r.missing.length) {
    throw new Error(`${lang}: untranslated in a shared partial:\n  ` +
                    r.missing.map(m => JSON.stringify(m.slice(0, 90))).join('\n  '));
  }
  return r.html;
}

/** Everything one language needs: its template, its map and its partials. */
export async function languageContext(code) {
  const lang = byCode(code);
  const t = (await import(`./i18n/tpl.${code}.mjs`)).default;

  let routes = ROUTES, included = SHARED_INCLUDED, map = {}, ui = {};

  if (code !== 'en') {
    ({ map } = await loadMap(code));
    ui = await loadUi(code);

    const tr = (await import(`./i18n/routes.${code}.mjs`)).default;
    routes = ROUTES.map((r) => {
      const o = tr[r.slug];
      if (!o) throw new Error(`i18n/routes.${code}.mjs: no entry for ${r.slug}`);
      return { ...r, ...o };
    });
    // the six "what's included" items are shared with the homepage, so they
    // come from the ui map rather than being written out a second time
    included = SHARED_INCLUDED.map(([h, p]) => {
      if (!(h in map) || !(p in map)) throw new Error(`${code}: SHARED_INCLUDED not translated: ${h}`);
      return [map[h], map[p]];
    });
  }

  return {
    lang, t, map, ui, included, routes,
    calc:  partial(CALC_RAW, code, map),
    fleet: partial(FLEET_RAW, code, map),
    foot:  partial(FOOT_RAW, code, map),
  };
}

export async function buildLanguage(code) {
  const L = await languageContext(code);
  const dir = code === 'en' ? 'routes' : `${code}/routes`;
  fs.mkdirSync(dir, { recursive: true });
  for (const r of L.routes) {
    fs.writeFileSync(path.join(dir, `${r.slug}.html`), page(r, L.routes, L));
  }
  return { code, dir, count: L.routes.length, L };
}

/** Which languages have everything they need to be built. */
export const readyLanguages = () =>
  LANGS.filter(l => l.code === 'en' || fs.existsSync(`i18n/routes.${l.code}.mjs`));

/* ---------- run ---------- */

// pathToFileURL, not string concatenation: this project's directory contains
// spaces and Cyrillic, which file:// URLs percent-encode
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  let total = 0;
  for (const lang of LANGS) {
    if (lang.code !== 'en' && !fs.existsSync(`i18n/routes.${lang.code}.mjs`)) {
      console.log(`${lang.code}: skipped — i18n/routes.${lang.code}.mjs not written yet`);
      continue;
    }
    const r = await buildLanguage(lang.code);
    console.log(`${String(r.count).padStart(2)} pages → ${r.dir}/`);
    total += r.count;
  }
  console.log(`\nbuilt ${total} route pages`);
}
