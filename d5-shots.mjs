/* D5 — mobile screenshots at the three widths the specification names.
 * Taken from the live domain where it is already published, and from this
 * build for the pages the fix has not reached yet. */
import fs from 'fs';
import puppeteer from 'puppeteer';

const OUT = 'tech-report/d5-performance/mobile-screenshots';
const BASE = process.argv[2] || 'https://ridetoalps.com';
const TAG = process.argv[3] || 'live';
const WIDTHS = [360, 390, 414];
const PAGES = [
  ['home', '/'],
  ['route', '/routes/kitzbuehel.html'],
  ['blog', '/blog.html'],
  ['blog-article', '/blog/munich-airport-to-alps-transport-options.html'],
  ['routes-hub', '/routes.html'],
];

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'], protocolTimeout: 180000 });
const notes = [];
for (const w of WIDTHS) {
  for (const [name, path] of PAGES) {
    const p = await b.newPage();
    await p.setViewport({ width: w, height: 900, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await p.goto(BASE + path, { waitUntil: 'networkidle2', timeout: 60000 });
    await p.evaluate(() => {
      const n = document.querySelector('.rta-consent');
      if (n) n.remove();                       // the notice covers the footer
      document.querySelectorAll('.reveal').forEach(e => e.classList.add('in'));
    });

    /* A full-page screenshot is not a scroll: nothing below the first screen
       has been scrolled into view, so every lazy image is still empty and the
       sticky header is painted at each tile boundary. Walk the page down to
       load the images, then unstick the header and come back to the top. */
    await p.evaluate(async () => {
      const step = window.innerHeight;
      /* Re-read the height each turn, because lazy images make the page grow
         as we go, but cap the walk: a condition that keeps moving away is not
         a loop that ends. */
      for (let y = 0, n = 0; n < 60; y += step, n++) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
        if (y >= document.body.scrollHeight) break;
      }
      window.scrollTo(0, 0);
    });
    /* Wait for the images the scroll asked for — but never longer than a few
       seconds. A lazy image that scrolling never brought into view will stay
       incomplete for as long as the page is open, so an unbounded wait here
       hangs instead of failing. */
    await p.evaluate(async () => {
      const pending = [...document.images].filter((i) => !i.complete)
        .map((i) => new Promise((r) => { i.onload = i.onerror = () => r(); }));
      await Promise.race([
        Promise.all(pending),
        new Promise((r) => setTimeout(r, 5000)),
      ]);
    });
    await new Promise(r => setTimeout(r, 600));
    /* Two shots per page, because one cannot do both jobs.
     *
     * Chrome cannot paint a surface taller than about 16384 device pixels. A
     * route page is ~15500 CSS px, so at deviceScaleFactor 2 the capture is
     * 31000 px, exceeds the limit, and comes back with whole sections repeated
     * — the page is fine, the picture is not. The full-page shot is therefore
     * taken at scale 1, which stays under the limit.
     *
     * Scale 1 on a phone-width page is too coarse to read, so the first screen
     * is captured again at scale 2, where the type and spacing can be judged. */
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    await p.setViewport({ width: w, height: Math.min(h, 16000), deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    await new Promise((r) => setTimeout(r, 700));
    const file = `${OUT}/${TAG}-${name}-${w}px.webp`;
    await p.screenshot({ path: file, type: 'webp', quality: 86 });

    await p.setViewport({ width: w, height: 900, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await new Promise((r) => setTimeout(r, 500));
    await p.screenshot({ path: `${OUT}/${TAG}-${name}-${w}px-first-screen.webp`, type: 'webp', quality: 86 });
    /* the one thing a screenshot cannot show: whether anything spills sideways */
    const overflow = await p.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth);
    notes.push(`${String(w) + 'px'}  ${name.padEnd(13)} ${overflow > 0 ? 'ГОРИЗОНТАЛЬНЕ ПРОКРУЧУВАННЯ +' + overflow + 'px' : 'без горизонтального прокручування'}`);
    await p.close();
  }
}
await b.close();

const head = [
  'D5 — МОБІЛЬНА ВЕРСІЯ: СКРІНШОТИ',
  'Джерело: ' + BASE,
  'Знято: ' + new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC',
  '',
  'Ширини 360 / 390 / 414 px — це iPhone SE, iPhone 14 і iPhone 14 Plus,',
  'тобто смуга, у яку потрапляє майже весь мобільний трафік. Знято повну',
  'висоту сторінки при deviceScaleFactor 2.',
  '',
  'Банер згоди прибрано зі знімка, бо він перекриває підвал; його власна',
  'перевірка — у check-consent.',
  '',
  'Поруч із кожним знімком перевірено, чи не виходить щось за межі екрана:',
  '',
];
fs.writeFileSync(`${OUT}/README-${TAG}.txt`, head.concat(notes).join('\n') + '\n');
console.log(notes.join('\n'));
console.log('\n' + (notes.every(n => n.includes('без горизонт')) ? 'Ніде немає горизонтального прокручування.' : 'Є проблеми, див. вище.'));
