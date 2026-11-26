/* D5 — Lighthouse, mobile profile, median of three passes per page.
 *
 *   node d5-median.mjs
 *
 * Measures the same three pages twice over:
 *
 *   LIVE   https://ridetoalps.com — what a visitor gets right now
 *   LOCAL  http://localhost:3010  — this build, which is not uploaded yet
 *
 * One pass is not evidence. Two consecutive passes of the same live URL gave
 * LCP 5.03s and then 1.89s, because this host's response time swings. Three
 * passes are reported as a median with the range beside it, so the spread is
 * visible rather than hidden behind one lucky number.
 *
 * Run it with nothing else happening on the machine: the mobile profile
 * throttles the CPU 4x, so a parallel build or download lands in the numbers.
 */
import fs from 'fs';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';

const OUT = 'tech-report/d5-performance';
const RUNS = 3;
const TARGETS = [
  { label: 'LIVE',  base: 'https://ridetoalps.com', keepReports: true },
  { label: 'LOCAL', base: 'http://localhost:3010',  keepReports: false },
];
const PAGES = [
  ['homepage',   '/'],
  ['kitzbuehel', '/routes/kitzbuehel.html'],
  ['salzburg',   '/routes/salzburg.html'],
];

const lines = [];
const say = (s = '') => { lines.push(s); console.log(s); };
const med = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const f2 = (n) => (n / 1000).toFixed(2);
const ok = (pass) => (pass ? 'у межах ТЗ' : 'ПОЗА ТЗ');

say('D5 — ШВИДКІСТЬ ЗАВАНТАЖЕННЯ І МОБІЛЬНА ВЕРСІЯ');
say('Знято: ' + new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC');
say('='.repeat(70));
say('');
say('Інструмент: Lighthouse — рушій, який рахує лабораторну частину PageSpeed');
say('Insights. Профіль Mobile: екран 412x823 @1.75x, CPU уповільнено 4x,');
say('мережа Slow 4G (RTT 150 мс, 1,6 Мбіт/с).');
say('');
say('По ' + RUNS + ' проходи на сторінку; у таблицях медіана, у дужках розкид.');
say('Один прохід не є доказом: два послідовних заміри тієї самої адреси дали');
say('LCP 5,03 с і 1,89 с, бо час відповіді цього хостингу стрибає.');
say('');
say('Критерії ТЗ: Performance ≥ 80 | LCP ≤ 2,5 с | CLS ≤ 0,1 | INP ≤ 200 мс');
say('');
say('Два заміри кожної сторінки:');
say('  LIVE  — https://ridetoalps.com, те, що зараз бачить відвідувач;');
say('  LOCAL — поточна збірка, ще не залита на хостинг.');

const chrome = await launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
const all = {};

for (const t of TARGETS) {
  all[t.label] = [];
  say('');
  say('#'.repeat(70));
  say('# ' + t.label + '  —  ' + t.base);
  say('#'.repeat(70));

  for (const [name, path] of PAGES) {
    const runs = [];
    for (let i = 0; i < RUNS; i++) {
      const r = await lighthouse(t.base + path, {
        port: chrome.port, output: 'html', logLevel: 'error',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        formFactor: 'mobile',
        screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
        throttling: { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4 },
      });
      const a = r.lhr.audits, c = r.lhr.categories;
      runs.push({
        perf: Math.round(c.performance.score * 100),
        a11y: Math.round(c.accessibility.score * 100),
        bp: Math.round(c['best-practices'].score * 100),
        seo: Math.round(c.seo.score * 100),
        lcp: a['largest-contentful-paint'].numericValue,
        cls: a['cumulative-layout-shift'].numericValue,
        tbt: a['total-blocking-time'].numericValue,
        fcp: a['first-contentful-paint'].numericValue,
        ttfb: a['server-response-time'] ? a['server-response-time'].numericValue : 0,
        report: r.report,
      });
    }

    const m = {
      name, url: t.base + path,
      perf: med(runs.map(r => r.perf)), a11y: med(runs.map(r => r.a11y)),
      bp: med(runs.map(r => r.bp)), seo: med(runs.map(r => r.seo)),
      lcp: med(runs.map(r => r.lcp)), cls: med(runs.map(r => r.cls)),
      tbt: med(runs.map(r => r.tbt)), fcp: med(runs.map(r => r.fcp)),
      ttfb: med(runs.map(r => r.ttfb)),
      perfRange: [Math.min(...runs.map(r => r.perf)), Math.max(...runs.map(r => r.perf))],
      lcpRange: [Math.min(...runs.map(r => r.lcp)), Math.max(...runs.map(r => r.lcp))],
    };
    all[t.label].push(m);

    if (t.keepReports) {
      const keep = runs.find(r => r.perf === m.perf) || runs[0];
      fs.writeFileSync(`${OUT}/lighthouse-${name}-mobile.html`, keep.report);
    }

    say('');
    say('-'.repeat(70));
    say(m.url);
    if (t.keepReports) say('  повний звіт: d5-performance/lighthouse-' + name + '-mobile.html');
    say('-'.repeat(70));
    say(`  Performance      ${String(m.perf).padEnd(4)} (${m.perfRange[0]}–${m.perfRange[1]})      ${ok(m.perf >= 80)}`);
    say(`  Accessibility    ${m.a11y}`);
    say(`  Best Practices   ${m.bp}`);
    say(`  SEO              ${m.seo}`);
    say(`  LCP              ${f2(m.lcp)} с (${f2(m.lcpRange[0])}–${f2(m.lcpRange[1])})   ${ok(m.lcp <= 2500)}`);
    say(`  CLS              ${m.cls.toFixed(3)}            ${ok(m.cls <= 0.1)}`);
    say(`  TBT              ${Math.round(m.tbt)} мс            ${ok(m.tbt <= 200)}   (лаб. відповідник INP)`);
    say(`  FCP              ${f2(m.fcp)} с`);
    say(`  TTFB             ${Math.round(m.ttfb)} мс`);
  }
}
await chrome.kill();

say('');
say('='.repeat(70));
say('ЗВЕДЕННЯ — МЕДІАНИ');
say('='.repeat(70));
for (const t of TARGETS) {
  say('');
  say(t.label + '  (' + t.base + ')');
  say('  сторінка        Perf   LCP        CLS     TBT     A11y  BP    SEO');
  for (const m of all[t.label]) {
    say(`  ${m.name.padEnd(14)}  ${String(m.perf).padEnd(6)} ${f2(m.lcp)} с    ${m.cls.toFixed(3)}   ${String(Math.round(m.tbt)).padStart(3)} мс  ${String(m.a11y).padEnd(5)} ${String(m.bp).padEnd(5)} ${m.seo}`);
  }
}

say('');
say('='.repeat(70));
say('ЩО ЗМІНИЛА ПОТОЧНА ЗБІРКА (LIVE → LOCAL)');
say('='.repeat(70));
say('  сторінка        Performance        LCP');
for (let i = 0; i < PAGES.length; i++) {
  const a = all.LIVE[i], b = all.LOCAL[i];
  const d = (x, y) => (y - x >= 0 ? '+' : '') + (y - x);
  say(`  ${a.name.padEnd(14)}  ${a.perf} → ${b.perf} (${d(a.perf, b.perf)})` +
      `      ${f2(a.lcp)} с → ${f2(b.lcp)} с`);
}
say('');
say('LOCAL не має мережевої затримки до хостингу, тому ці два стовпці не є');
say('рівноцінними порівнянням абсолютних чисел. Вони показують напрямок і те,');
say('що в самих сторінках більше немає того, що блокувало рендер.');
say('');
say('INP — польова метрика: PageSpeed Insights показує її лише коли домен');
say('набрав статистику реальних відвідувачів у CrUX. Для нового домену її ще');
say('немає, тому наведено TBT — лабораторний показник відгуку.');

fs.writeFileSync(`${OUT}/pagespeed.txt`, lines.join('\n') + '\n');
const strip = (m) => { const { report, ...x } = m; return x; };
fs.writeFileSync(`${OUT}/pagespeed.json`,
  JSON.stringify({ live: all.LIVE.map(strip), local: all.LOCAL.map(strip) }, null, 2));
console.log('\nwritten: ' + OUT + '/pagespeed.txt');
