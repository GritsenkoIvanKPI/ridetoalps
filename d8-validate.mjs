/* D8 — structured data, parsed rather than pattern-matched.
 *
 * The first version of this check looked for "@type":"TaxiService" with a
 * regular expression and reported it missing on every page. It is not missing:
 * the business is declared with several types at once —
 * ["TaxiService","LimousineService","LocalBusiness","Organization"] — which is
 * valid Schema.org and invisible to that pattern. This version parses the JSON
 * and treats @type as the list it is allowed to be.
 *
 *   node d8-validate.mjs            live domain and local build
 *   node d8-validate.mjs <base>     one source
 */
import fs from 'fs';

const OUT = 'tech-report/d8-structured-data';
const PAGES = [
  ['homepage',   '/'],
  ['kitzbuehel', '/routes/kitzbuehel.html'],
  ['salzburg',   '/routes/salzburg.html'],
  ['innsbruck',  '/routes/innsbruck.html'],
  ['blog',       '/blog.html'],
  ['blog-article', '/blog/munich-airport-to-alps-transport-options.html'],
];
const SOURCES = process.argv[2]
  ? [['ВКАЗАНЕ ДЖЕРЕЛО', process.argv[2]]]
  : [['ОПУБЛІКОВАНИЙ ДОМЕН', 'https://ridetoalps.com'], ['ПОТОЧНА ЗБІРКА', 'http://localhost:3010']];

const lines = [];
const say = (s = '') => { lines.push(s); console.log(s); };
const typesOf = (n) => (Array.isArray(n['@type']) ? n['@type'] : [n['@type']]).filter(Boolean);

/* walk the whole tree, because Offer and Question sit inside their parents */
function collect(node, into = new Map()) {
  if (Array.isArray(node)) { node.forEach((n) => collect(n, into)); return into; }
  if (!node || typeof node !== 'object') return into;
  for (const t of typesOf(node)) {
    if (!into.has(t)) into.set(t, []);
    into.get(t).push(node);
  }
  for (const v of Object.values(node)) collect(v, into);
  return into;
}

/* what the specification asks to see, and what makes each one useful */
const WANTED = [
  ['TaxiService',    'тип послуги, який Google розуміє як перевезення'],
  ['Organization',   'сам бізнес: назва, контакти, зона обслуговування'],
  ['LocalBusiness',  'адреса і години роботи'],
  ['Service',        'конкретний трансфер'],
  ['Offer',          'ціна і валюта'],
  ['FAQPage',        'питання та відповіді'],
  ['BreadcrumbList', 'ланцюжок навігації'],
  ['WebSite',        'сайт як ціле'],
];

say('D8 — СТРУКТУРОВАНА РОЗМІТКА (JSON-LD / Schema.org)');
say('Знято: ' + new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC');
say('='.repeat(70));
say('');
say('Розмітка розбирається як JSON, а не шукається регулярним виразом.');
say('@type може бути списком — бізнес оголошений одразу як TaxiService,');
say('LimousineService, LocalBusiness і Organization, і це коректно.');

let problems = 0;

for (const [label, base] of SOURCES) {
  say('');
  say('#'.repeat(70));
  say('# ' + label + '  —  ' + base);
  say('#'.repeat(70));

  const seen = {};
  for (const [name, path] of PAGES) {
    let html;
    try {
      const r = await fetch(base + path);
      if (!r.ok) { say(''); say(`  ${path} → HTTP ${r.status}`); problems++; continue; }
      html = await r.text();
    } catch (e) { say(''); say(`  ${path} → недоступно (${e.message})`); problems++; continue; }

    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    say('');
    say('-'.repeat(70));
    say('  ' + base + path);
    say('-'.repeat(70));
    if (!blocks.length) { say('    JSON-LD немає'); problems++; continue; }

    let graph = [];
    for (const b of blocks) {
      try { graph.push(JSON.parse(b[1])); }
      catch (e) { say('    ПОМИЛКА РОЗБОРУ JSON: ' + e.message); problems++; }
    }
    const found = collect(graph);
    const top = graph.flatMap((g) => g['@graph'] || [g]);

    say('    блоків JSON-LD: ' + blocks.length + ', синтаксис коректний');
    say('    сутності верхнього рівня:');
    for (const n of top) say('      ' + typesOf(n).join(' + ').padEnd(52) + (n['@id'] || ''));

    const here = [...found.keys()];
    for (const t of here) (seen[t] ||= new Set()).add(name);

    /* the properties that decide whether a rich result can be built */
    const offer = (found.get('Offer') || [])[0];
    if (offer) {
      const price = offer.price ?? offer.priceSpecification?.price;
      const cur = offer.priceCurrency ?? offer.priceSpecification?.priceCurrency;
      say(`    Offer: price=${price ?? '—'} ${cur ?? ''}` + (price && cur ? '' : '   ← неповний'));
      if (!price || !cur) problems++;
    }
    const faq = (found.get('Question') || []).length;
    if (faq) say('    FAQPage: питань — ' + faq);
    const crumbs = (found.get('ListItem') || []).length;
    if (crumbs) say('    BreadcrumbList: рівнів — ' + crumbs);
  }

  say('');
  say('  ' + '='.repeat(66));
  say('  ЗВЕДЕННЯ ПО ДЖЕРЕЛУ');
  say('  ' + '='.repeat(66));
  for (const [t, why] of WANTED) {
    const on = seen[t];
    say('  ' + (on ? '+' : '!') + ' ' + t.padEnd(16) + (on ? [...on].join(', ') : 'НЕМАЄ ЖОДНОЇ СТОРІНКИ'));
    say('      ' + why);
    if (!on) problems++;
  }
}

say('');
say('='.repeat(70));
say(problems ? problems + ' зауваження — див. вище' : 'Зауважень немає.');
say('');
say('Перевірити незалежно можна тут:');
say('  https://search.google.com/test/rich-results?url=https://ridetoalps.com/');
say('  https://validator.schema.org/#url=https://ridetoalps.com/');

fs.writeFileSync(`${OUT}/validation.txt`, lines.join('\n') + '\n');
console.log('\nwritten: ' + OUT + '/validation.txt');
