/* Checks Consent Mode v2 by measuring what Google actually receives.
 *
 *   node serve.mjs &
 *   node check-consent.mjs                           # local
 *   node check-consent.mjs https://ridetoalps.com    # the live site
 *
 * This site measures from the first page view and offers an opt-out, which is
 * the operator's decision of 18 November 2026. Three things then have to hold,
 * and the third is the one that breaks silently:
 *
 *   1. The GTM and gtag scripts load, and a page_view reaches GA4 immediately
 *      with gcs=G111 — consent signalled as granted.
 *   2. Turning analytics off sends a consent update denying every storage
 *      type, and clears nothing less than that.
 *   3. The choice survives. On the NEXT visit the very first hit must already
 *      be gcs=G100, with no analytics cookie — which only works if the stored
 *      decision is read in the page head, before gtag runs. consent.js is
 *      deferred and runs after the first hit, so it cannot do this job alone.
 *
 * gcs=G1xy encodes the state: x is ad_storage, y is analytics_storage, 0 is
 * denied and 1 is granted.
 *
 * Reading the markup cannot tell you any of this, so this drives a real
 * browser and watches the network.
 */
import puppeteer from 'puppeteer';

const BASE = process.argv[2] || 'http://localhost:3010';
const PAGES = ['/', '/de/', '/blog.html', '/routes/kitzbuehel.html'];

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
let problems = 0;

const watch = (p, seen) => p.on('request', (r) => {
  const u = r.url();
  if (/googletagmanager\.com\/(gtm|gtag)/.test(u)) seen.scripts.add(u.includes('gtm.js') ? 'gtm' : 'gtag');
  const m = u.match(/[?&]gcs=([^&]+)/);
  if (m && /collect/.test(u)) seen.gcs.push(m[1]);
});

for (const page of PAGES) {
  const ctx = await b.createBrowserContext();   // a clean profile per page
  const p = await ctx.newPage();
  const seen = { scripts: new Set(), gcs: [] };
  watch(p, seen);

  const fail = (msg) => { console.log(`  ${page}: ${msg}`); problems++; };

  // --- first visit: measurement should already be running ---
  await p.goto(BASE + page, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));

  if (seen.scripts.size < 2) fail(`Google scripts did not load (${[...seen.scripts].join(',') || 'none'})`);
  const first = [...new Set(seen.gcs)];
  if (!first.length) fail('no hit reached Google on the first page view');
  else if (!first.includes('G111')) fail(`first page view signalled ${first.join(',')}, expected G111`);
  const cookies1 = (await p.cookies()).filter(c => /^_ga|^_gcl/.test(c.name));
  if (!cookies1.length) fail('no analytics cookie on the first page view');

  const banner = await p.$('.rta-consent');
  if (!banner) fail('the opt-out notice did not appear');

  // --- opting out ---
  seen.gcs.length = 0;
  const off = await p.$('.rta-consent__no');
  if (off) { await off.click(); await new Promise(r => setTimeout(r, 1500)); }
  const updated = await p.evaluate(() => (window.dataLayer || []).some(a =>
    a[0] === 'consent' && a[1] === 'update' &&
    a[2].analytics_storage === 'denied' && a[2].ad_storage === 'denied'));
  if (!updated) fail('turning analytics off did not send a denying consent update');
  const stored = await p.evaluate(() => localStorage.getItem('rta-consent'));
  if (stored !== 'denied') fail(`the choice was stored as "${stored}", expected "denied"`);

  // --- the return visit: the opt-out has to hold from the very first hit ---
  seen.gcs.length = 0;
  await p.deleteCookie(...(await p.cookies()));
  await p.goto(BASE + page, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));
  const back = [...new Set(seen.gcs)];
  if (back.some(g => g !== 'G100')) fail(`after opting out, the return visit signalled ${back.join(',')} — the opt-out leaks`);
  const cookies2 = (await p.cookies()).filter(c => /^_ga|^_gcl/.test(c.name));
  if (cookies2.length) fail(`after opting out, ${cookies2.map(c => c.name).join(', ')} was set again`);
  if (await p.$('.rta-consent')) fail('the notice reappeared after a choice was made');

  console.log(`${page.padEnd(26)} first visit: ${first.join(',')}/${cookies1.length} cookies   ` +
              `after opt-out, return visit: ${back.join(',') || 'no hit'}/${cookies2.length} cookies`);
  await p.close();
  await ctx.close();
}

console.log(problems
  ? `\n${problems} consent problem(s)`
  : '\nMeasurement starts on the first page view, and opting out holds on later visits');
await b.close();
process.exit(problems ? 1 : 0);
