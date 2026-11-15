/* Builds routes.html — the hub page linking every route landing page — in
 * every language that has a translation.
 *
 *   node build-routes-index.mjs
 *
 *   routes.html        English
 *   de/routes.html     German, and the same for ru/ and uk/
 *
 * The route prose, the template and the translated footer all come from
 * build-routes.mjs, so the hub and the ten landing pages can never disagree
 * about what a route is called or what it costs.
 */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { SITE, LANGS, urlFor } from './i18n/config.mjs';
import { langPicker, alternates } from './i18n/picker.mjs';
import { languageContext } from './build-routes.mjs';

const home = fs.readFileSync('index.html', 'utf8');
const GTAG = (() => {
  const a = home.indexOf('<!-- Google tag');
  const end = home.indexOf('</script>', home.indexOf('gtag/js?id=', a));
  return home.slice(a, end + '</script>'.length);
})();

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const ARROW = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>`;

const pic = (jpg, alt) => {
  const b = jpg.replace(/\.jpg$/, '');
  return `<picture><source srcset="/${b}.avif" type="image/avif"><source srcset="/${b}.webp" type="image/webp">` +
         `<img src="/${jpg}" alt="${esc(alt)}" loading="lazy" width="1200" height="900"></picture>`;
};

function hub(L) {
  const { lang, t, map, ui, routes } = L;
  const code = lang.code;
  const b = code === 'en' ? '' : '/' + code;
  const url = (c) => urlFor(c, 'routes.html');
  const M = (k, fallback) => map[k] || fallback || k;

  const cards = routes.map(r => `      <a class="rcard reveal" href="${b}/routes/${r.slug}.html">
        <div class="rcard__media">${pic(r.town, r.townAlt)}</div>
        <div class="rcard__body">
          <h3>${esc(r.dest)}</h3>
          <p class="rcard__region">${esc(r.region)}</p>
          <div class="rcard__meta"><span>${esc(r.time)}</span><span>${esc(t.dist(r.km))}</span></div>
          <div class="rcard__foot"><b>${esc(M('from €' + r.price, 'from €' + r.price))}</b><span>${esc(M('View route'))} ${ARROW}</span></div>
        </div>
      </a>`).join('\n');

  const ld = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    inLanguage: lang.intl,
    name: t.hubH1,
    itemListElement: routes.map((r, i) => ({
      '@type': 'ListItem', position: i + 1, name: r.h1,
      url: `${SITE}${b}/routes/${r.slug}.html`,
    })),
  };

  const blob = code === 'en' ? '' : `<script>
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
<title>${esc(t.hubTitle)}</title>
<meta name="description" content="${esc(t.hubDesc)}">
<link rel="canonical" href="${SITE}${url(code)}">
${alternates(url)}
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#0e63e4">
<meta property="og:type" content="website">
<meta property="og:locale" content="${lang.locale}">
<meta property="og:url" content="${SITE}${url(code)}">
<meta property="og:title" content="${esc(t.hubH1)}">
<meta property="og:description" content="${esc(t.hubDesc)}">
<meta property="og:image" content="${SITE}/images/og-cover.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="/route.css">
<script src="/consent.js" defer></script>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>

<header class="rhead">
  <div class="rhead__in">
    <a class="brand" href="${b}/" aria-label="${esc(M('ridetoalps home'))}">
      <svg class="brand__mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect width="40" height="40" rx="12" fill="#0e63e4"/><path d="M8 27.5 16 14l4.6 7.6L23.5 17l8.5 10.5H8Z" fill="#fff"/>
      </svg>
      <span class="brand__name">ridetoalps</span>
    </a>
    <nav class="rhead__nav">
      <a href="${b}/">${esc(M('Home'))}</a>
      <a href="${b}/#calculator">${esc(M('Price'))}</a>
      <a href="${b}/#contact">${esc(M('Contact'))}</a>
      ${langPicker(code, url, { label: M('Change language') })}
    </nav>
  </div>
</header>

<main>
<section class="section-spacing">
  <div class="container">
    <h1 class="head-center reveal" style="margin-bottom:14px">${esc(t.hubH1)}</h1>
    <p class="lede reveal" style="text-align:center;max-width:62ch;margin:0 auto">
      ${esc(t.hubLede)}
    </p>
    <div class="rgrid">
${cards}
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

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  let n = 0;
  for (const lang of LANGS) {
    if (lang.code !== 'en' && !fs.existsSync(`i18n/routes.${lang.code}.mjs`)) {
      console.log(`${lang.code}: skipped — no route translations yet`);
      continue;
    }
    const L = await languageContext(lang.code);
    const out = lang.code === 'en' ? 'routes.html' : `${lang.code}/routes.html`;
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, hub(L));
    console.log(`${out.padEnd(16)} ${L.routes.length} routes`);
    n++;
  }
  console.log(`\nbuilt ${n} hub pages`);
}
