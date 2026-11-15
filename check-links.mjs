/* Checks every generated page against the local dev server.
 *
 *   node serve.mjs &
 *   node check-links.mjs
 *
 * Verifies that every internal link and asset resolves, and that the hreflang
 * set on each page is complete and points at pages that exist. With 48 pages
 * in four languages, a path that is right in English and wrong in German is
 * exactly the kind of mistake nobody notices by clicking around.
 *
 * The three legal pages are reported as having no hreflang alternates. That is
 * deliberate: they are documents under German law, and all four versions of
 * the site link to the same copy.
 */
import fs from 'fs';
import { LANGS, urlFor } from './i18n/config.mjs';
import { ROUTES } from './routes.data.mjs';

const BASE = 'http://localhost:3010';
const PAGES = [];
for (const l of LANGS) {
  PAGES.push(urlFor(l.code, 'index.html'), urlFor(l.code, 'routes.html'));
  for (const r of ROUTES) PAGES.push(urlFor(l.code, `routes/${r.slug}.html`));
}
PAGES.push('/impressum.html', '/datenschutz.html', '/agb.html');

const status = new Map();
async function head(u) {
  if (status.has(u)) return status.get(u);
  const r = await fetch(BASE + u, { method: 'GET' }).catch(() => ({ status: 0 }));
  status.set(u, r.status);
  return r.status;
}

let broken = 0, checked = 0, hreflangIssues = 0;
const seenAlternates = new Map();

for (const page of PAGES) {
  const res = await fetch(BASE + page);
  if (!res.ok) { console.log(`PAGE ${res.status} ${page}`); broken++; continue; }
  const html = await res.text();

  // every local reference
  const refs = new Set();
  for (const m of html.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)) refs.add(m[1]);
  for (const m of html.matchAll(/srcset="(\/[^"]+)"/g)) refs.add(m[1].split(/\s|,/)[0]);
  for (const r of refs) {
    if (/\.(php)$/.test(r)) continue;          // served by Apache, not by serve.mjs
    const s = await head(r.endsWith('/') ? r + 'index.html' : r);
    checked++;
    if (s !== 200) { console.log(`  ${s} ${r}   (on ${page})`); broken++; }
  }

  // hreflang completeness
  const alts = [...html.matchAll(/<link rel="alternate" hreflang="([a-z-]+)" href="([^"]+)"/g)]
    .map(m => [m[1], m[2]]);
  const codes = alts.map(a => a[0]).sort().join(',');
  const want = [...LANGS.map(l => l.code), 'x-default'].sort().join(',');
  if (codes !== want) { console.log(`  HREFLANG ${page}: ${codes || '(none)'}`); hreflangIssues++; }
  for (const [code, href] of alts) {
    const p = href.replace('https://ridetoalps.com', '');
    const s = await head(p.endsWith('/') ? p + 'index.html' : p);
    if (s !== 200) { console.log(`  HREFLANG ${s} ${href} (on ${page})`); hreflangIssues++; }
    seenAlternates.set(page + '|' + code, p);
  }
}

/* Every route must be reachable from its own homepage. The grid, the header
   menu and the footer are three hand-written lists on a page the build does not
   generate, so a route added to routes.data.mjs can quietly end up with no link
   pointing at it from anywhere a visitor would look. */
let unlinked = 0;
for (const l of LANGS) {
  const home = await (await fetch(BASE + urlFor(l.code, 'index.html'))).text();
  for (const r of ROUTES) {
    if (!home.includes(`routes/${r.slug}.html`)) {
      console.log(`  ${l.code} homepage does not link to ${r.slug}`);
      unlinked++;
    }
  }
}

console.log(`\npages: ${PAGES.length}   references checked: ${checked}   broken: ${broken}   hreflang problems: ${hreflangIssues}   unlinked routes: ${unlinked}`);
