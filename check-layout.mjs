/* Loads a sample of pages in every language at four widths and reports any
 * element that sticks out past the viewport, plus any script error.
 *
 *   node serve.mjs &
 *   node check-layout.mjs
 *
 * Translated text is longer than English — German by about a third — so a
 * layout that is comfortable in English can overflow once it is translated.
 * Elements inside a horizontally scrolling or clipped container are ignored:
 * the fleet slider is meant to extend past the edge.
 */
import puppeteer from 'puppeteer';
import { LANGS, urlFor } from './i18n/config.mjs';
const BASE = 'http://localhost:3010';
const WIDTHS = [320, 390, 768, 1440];
const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
let bad = 0;
for (const l of LANGS) {
  for (const page of ['index.html', 'routes.html', 'blog.html', 'routes/st-anton.html', 'routes/bormio-livigno.html']) {
    for (const w of WIDTHS) {
      const p = await b.newPage();
      await p.setViewport({ width: w, height: 844, isMobile: w < 700, hasTouch: w < 700 });
      const url = BASE + urlFor(l.code, page);
      const errs = [];
      p.on('pageerror', e => errs.push(String(e).slice(0, 80)));
      await p.goto(url, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 250));
      const r = await p.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const scrollable = (e) => { for (let n = e.parentElement; n; n = n.parentElement)
          if (/auto|scroll|hidden/.test(getComputedStyle(n).overflowX)) return true; return false; };
        const over = [...document.querySelectorAll('body *')]
          .filter(e => e.getBoundingClientRect().right > vw + 0.5 && !scrollable(e))
          .map(e => e.tagName + '.' + (e.className || '').toString().split(' ')[0]);
        const tiny = [...document.querySelectorAll('a[href],button')]
          .filter(e => { const r = e.getBoundingClientRect();
            return r.width > 0 && r.height > 0 && r.height < 24; })
          .map(e => e.tagName + '.' + (e.className || '').toString().split(' ')[0]);
        /* An element carrying the hidden attribute but still occupying space.
           The UA rule that enforces hidden has the lowest possible specificity,
           so any author rule setting display defeats it silently — the markup
           and assistive technology say hidden, the screen says otherwise. The
           blog filter shipped broken for exactly this reason. */
        const hiddenButVisible = [...document.querySelectorAll('[hidden]')]
          .filter(e => e.getBoundingClientRect().height > 0)
          .map(e => e.tagName + '.' + (e.className || '').toString().split(' ')[0]);
        return { doc: document.documentElement.scrollWidth - vw, over: [...new Set(over)].slice(0,4),
                 tiny: [...new Set(tiny)].slice(0,4),
                 hiddenButVisible: [...new Set(hiddenButVisible)].slice(0, 4) };
      });
      if (r.doc > 0 || r.over.length || r.hiddenButVisible.length || errs.length) {
        console.log(`${l.code} ${page} @${w}: overflow=${r.doc} ${r.over.join(',')}` +
                    (r.hiddenButVisible.length ? `  hidden-but-shown: ${r.hiddenButVisible.join(',')}` : '') +
                    ` ${errs.join(';')}`);
        bad++;
      }
      await p.close();
    }
  }
}
console.log(bad ? `\n${bad} problem(s)` : '\nno overflow, no hidden-but-visible element and no script error, at any width, in any language');
await b.close();
