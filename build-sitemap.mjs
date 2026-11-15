/* Writes sitemap.xml for all four language versions.
 *
 *   node build-sitemap.mjs
 *
 * Every page is listed once per language, and each entry carries the full set
 * of xhtml:link alternates — including a self-reference, which Google requires
 * and which is the detail most hand-written multilingual sitemaps get wrong.
 * English is x-default.
 *
 * The legal pages are deliberately single-language: they are documents under
 * German law and all four versions of the site link to the same copy.
 */
import fs from 'fs';
import { SITE, LANGS, urlFor } from './i18n/config.mjs';
import { ROUTES } from './routes.data.mjs';

const today = new Date().toISOString().slice(0, 10);

/* page, priority, change frequency — the shape of the site, once */
const PAGES = [
  { page: 'index.html',  priority: '1.0', freq: 'monthly' },
  { page: 'routes.html', priority: '0.9', freq: 'monthly' },
  ...ROUTES.map(r => ({ page: `routes/${r.slug}.html`, priority: '0.8', freq: 'monthly' })),
];

/* Not translated, so they appear once with no alternates. */
const SINGLE = [
  { loc: '/impressum.html',   priority: '0.3', freq: 'yearly' },
  { loc: '/datenschutz.html', priority: '0.3', freq: 'yearly' },
  { loc: '/agb.html',         priority: '0.3', freq: 'yearly' },
];

const HERO_IMAGES = {
  'index.html': [
    ['images/hero.jpg', 'Private transfers from Munich to the Alps'],
    ['images/og-cover.jpg', 'ridetoalps — Munich Airport transfers'],
  ],
};

const rows = [];

for (const { page, priority, freq } of PAGES) {
  const alts = LANGS.map(l =>
    `      <xhtml:link rel="alternate" hreflang="${l.code}" href="${SITE}${urlFor(l.code, page)}"/>`
  ).concat(
    `      <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${urlFor('en', page)}"/>`
  ).join('\n');

  for (const l of LANGS) {
    const images = (l.code === 'en' ? HERO_IMAGES[page] : null) || [];
    rows.push(
`  <url>
    <loc>${SITE}${urlFor(l.code, page)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${l.code === 'en' ? priority : (Number(priority) - 0.1).toFixed(1)}</priority>
${alts}${images.map(([src, title]) => `
    <image:image>
      <image:loc>${SITE}/${src}</image:loc>
      <image:title>${title}</image:title>
    </image:image>`).join('')}
  </url>`);
  }
}

for (const { loc, priority, freq } of SINGLE) {
  rows.push(
`  <url>
    <loc>${SITE}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${rows.join('\n')}
</urlset>
`;

fs.writeFileSync('sitemap.xml', xml);
console.log(`sitemap.xml — ${rows.length} URLs ` +
            `(${PAGES.length} pages × ${LANGS.length} languages + ${SINGLE.length} legal)`);
