/* Asserts that every structural element shares one left edge — the content
 * column that .container defines.
 *
 *   node serve.mjs &
 *   node check-grid.mjs
 *
 * The site has three nested coordinate systems: the page, the full-bleed cards
 * inset from it by --shell (the hero, the footer), and the content column
 * inside both. Before this check existed they disagreed: at 1720px the header
 * sat at 200, the hero text at 68 and the footer at 82, so the eye had three
 * different left edges to follow down a single page.
 *
 * Probe modes matter. For a button or a card the border-box edge is what the
 * eye lines up; for a row that carries the gutter as its own padding, the
 * content edge is. Measuring the wrong one reports a 10px error that is not
 * there, or hides one that is.
 */
import puppeteer from 'puppeteer';
const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

/* 'box'  — the element's own edge is what the eye lines up (a button, a card)
   'text' — the element carries the gutter as padding, so its content is the edge */
const PROBES = [
  ['header',     '.rhead .brand, .masthead .brand',               'box'],
  ['hero',       '.rhero__crumb, .hero__body h1',                 'box'],
  ['hero btn',   '.rhero__actions .btn, .hero__actions .btn',     'box'],
  ['section',    '.section-head h2, .rsplit h2',                  'box'],
  ['calc card',  '.calc',                                         'box'],
  ['footer',     '.footer .brand',                                'box'],
  ['footer row', '.footer__bottom',                               'text'],
  ['footer top', '.footer__top',                                  'text'],
  ['hero strip', '.hero__strip',                                  'text'],
  ['hero facts', '.rfacts .rfact, .hero__strip li',               'box'],
];
let bad = 0;
for (const url of ['/', '/routes.html', '/routes/munich-city.html', '/blog.html', '/blog/munich-airport-ski-luggage-arrivals.html', '/de/', '/uk/routes/ischgl.html']) {
  for (const w of [1920, 1720, 1500, 1440, 1280, 1024, 820, 600, 390, 320]) {
    const p = await b.newPage();
    await p.setViewport({ width: w, height: 900 });
    await p.goto('http://localhost:3010' + url, { waitUntil: 'domcontentloaded' });
    await p.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('visible')));
    await new Promise(r => setTimeout(r, 150));
    const r = await p.evaluate((probes) => {
      const out = {};
      for (const [label, sel, mode] of probes) {
        const e = document.querySelector(sel);
        if (!e) continue;
        const pad = mode === 'text' ? parseFloat(getComputedStyle(e).paddingLeft) : 0;
        out[label] = Math.round(e.getBoundingClientRect().left + pad);
      }
      const c = document.querySelector('.container');
      out.__container = c ? Math.round(c.getBoundingClientRect().left + parseFloat(getComputedStyle(c).paddingLeft)) : null;
      return out;
    }, PROBES);
    const ref = r.__container;
    const off = Object.entries(r).filter(([k, v]) => k !== '__container' && Math.abs(v - ref) > 1);
    if (off.length) { console.log(`${url} @${w}  column ${ref}  →  ` + off.map(([k, v]) => `${k} ${v}`).join(', ')); bad++; }
    await p.close();
  }
}
console.log(bad ? `\n${bad} page/width combinations are off the column` : '\nevery probe sits on the content column, at every width, on every page');
await b.close();
