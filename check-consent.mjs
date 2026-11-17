/* Checks Consent Mode v2 by measuring what Google actually receives.
 *
 *   node serve.mjs &
 *   node check-consent.mjs            # local
 *   node check-consent.mjs https://ridetoalps.com   # the live site
 *
 * Four things have to be true at once, and they pull against each other:
 *
 *   1. The GTM and gtag scripts LOAD on first paint. Blocking them is the
 *      common CMP default and it costs the modelled conversions that advanced
 *      consent mode exists to provide.
 *   2. Every storage type DEFAULTS to denied, so nothing is written to the
 *      device before the visitor agrees (§ 25 TDDDG).
 *   3. Because of 1 and 2 together, a cookieless ping goes out immediately,
 *      carrying gcs=G100 — consent signalled as denied. That ping is the
 *      measurement; its absence means consent mode is not working.
 *   4. No _ga or _gcl cookie exists until Accept is clicked.
 *
 * gcs=G1xy encodes the state: x is ad_storage, y is analytics_storage, 0 is
 * denied and 1 is granted. G100 before the click, G111 after it.
 *
 * Reading the markup cannot tell you any of this: the snippet can look
 * perfect while a tag-level consent check inside the GTM container stops
 * everything. So this drives a real browser and watches the network.
 */
import puppeteer from 'puppeteer';

const BASE = process.argv[2] || 'http://localhost:3010';
const PAGES = ['/', '/de/', '/blog.html', '/routes/kitzbuehel.html'];

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
let problems = 0;

for (const page of PAGES) {
  for (const choice of ['accept', 'decline']) {
    // a clean profile, or the run inherits the previous one's consent
    const ctx = await b.createBrowserContext();
    const p = await ctx.newPage();
    const seen = { scripts: new Set(), gcs: [] };
    p.on('request', (r) => {
      const u = r.url();
      if (/googletagmanager\.com\/(gtm|gtag)/.test(u)) seen.scripts.add(u.includes('gtm.js') ? 'gtm' : 'gtag');
      const m = u.match(/[?&]gcs=([^&]+)/);
      if (m && /collect/.test(u)) seen.gcs.push(m[1]);
    });

    await p.goto(BASE + page, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise(r => setTimeout(r, 1800));

    const fail = (msg) => { console.log(`  ${page} [${choice}] ${msg}`); problems++; };

    if (seen.scripts.size < 2) fail(`Google scripts did not load (${[...seen.scripts].join(',') || 'none'}) — the CMP is blocking them`);

    const defaults = await p.evaluate(() => {
      const c = (window.dataLayer || []).find(a => a[0] === 'consent' && a[1] === 'default');
      return c ? JSON.parse(JSON.stringify(c[2])) : null;
    });
    if (!defaults) fail('no consent default was set before the tags ran');
    else for (const k of ['ad_storage', 'analytics_storage', 'ad_user_data', 'ad_personalization']) {
      if (defaults[k] !== 'denied') fail(`${k} defaults to "${defaults[k]}", must be "denied"`);
    }

    const before = [...new Set(seen.gcs)];
    if (!before.length) fail('no hit reached Google before consent — the cookieless ping is missing');
    else if (before.some(g => g !== 'G100')) fail(`consent signalled as ${before.join(',')} before any click, expected G100`);

    const cookiesBefore = (await p.cookies()).filter(c => /^_ga|^_gcl/.test(c.name));
    if (cookiesBefore.length) fail(`${cookiesBefore.map(c => c.name).join(', ')} set before consent`);

    seen.gcs.length = 0;
    const btn = await p.$(choice === 'accept' ? '.rta-consent__yes' : '.rta-consent__no');
    if (!btn) fail('the consent banner did not appear');
    else { await btn.click(); await new Promise(r => setTimeout(r, 1800)); }

    const after = [...new Set(seen.gcs)];
    const cookiesAfter = (await p.cookies()).filter(c => /^_ga|^_gcl/.test(c.name));
    if (choice === 'accept') {
      if (!after.includes('G111')) fail(`after Accept the consent signal is ${after.join(',') || 'absent'}, expected G111`);
      if (!cookiesAfter.length) fail('no analytics cookie after Accept');
    } else {
      if (cookiesAfter.length) fail(`${cookiesAfter.map(c => c.name).join(', ')} set after Decline`);
      const updated = await p.evaluate(() => (window.dataLayer || [])
        .some(a => a[0] === 'consent' && a[1] === 'update' && a[2].analytics_storage === 'denied'));
      if (!updated) fail('Decline did not report the decision as a consent update');
    }

    console.log(`${page.padEnd(26)} ${choice.padEnd(8)} scripts:${[...seen.scripts].sort().join('+')}  ` +
                `before:${before.join(',')}/${cookiesBefore.length} cookies  after:${after.join(',') || '-'}/${cookiesAfter.length} cookies`);
    await p.close();
    await ctx.close();
  }
}

console.log(problems
  ? `\n${problems} consent problem(s)`
  : '\nConsent Mode v2 is correct: tags load, defaults denied, the cookieless ping goes out, and nothing is stored until Accept');
await b.close();
process.exit(problems ? 1 : 0);
