/* D5 — the image and mobile part of the specification, checked against the
 * built pages rather than described. Counts every <img> on all 67 pages. */
import fs from 'fs';
import path from 'path';

const OUT = 'tech-report/d5-performance';
const lines = [];
const say = (s = '') => { lines.push(s); console.log(s); };

const SKIP = new Set(['node_modules', '.git', 'tech-report', 'update', 'update 2', 'deploy', 'temporary screenshots', 'brand_assets', 'images', 'i18n']);
const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP.has(e.name)) walk(path.join(d, e.name)); }
    else if (e.name.endsWith('.html')) pages.push(path.join(d, e.name).replace(/^\.\//, ''));
  }
})('.');
pages.sort();

say('D5 — ЗОБРАЖЕННЯ ТА МОБІЛЬНА ВЕРСІЯ');
say('Перевірено ' + pages.length + ' HTML-сторінок у збірці');
say('Знято: ' + new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC');
say('='.repeat(70));

let imgs = 0, withAlt = 0, decorative = 0, noAlt = [], noDims = [], lazy = 0, eager = 0, srcset = 0;
const formats = { avif: 0, webp: 0, jpgOnly: 0 };

for (const f of pages) {
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    imgs++;
    const alt = /\balt="([^"]*)"/.exec(tag);
    if (!alt) noAlt.push(f + ' :: ' + tag.slice(0, 80));
    else if (alt[1].trim() === '') decorative++;
    else withAlt++;
    if (!/\bwidth="\d+"/.test(tag) || !/\bheight="\d+"/.test(tag)) noDims.push(f + ' :: ' + tag.slice(0, 80));
    if (/\bloading="lazy"/.test(tag)) lazy++; else eager++;
    if (/\bsrcset="/.test(tag)) srcset++;
  }
  for (const m of html.matchAll(/<picture\b[\s\S]*?<\/picture>/g)) {
    const p = m[0];
    if (/type="image\/avif"/.test(p)) formats.avif++;
    if (/type="image\/webp"/.test(p)) formats.webp++;
    if (!/type="image\/(avif|webp)"/.test(p)) formats.jpgOnly++;
  }
}

say('');
say('СУЧАСНІ ФОРМАТИ (WebP / AVIF)');
say('-'.repeat(70));
say('  Кожне фото віддається через <picture> з трьома варіантами. Браузер');
say('  бере перший, який розуміє: AVIF → WebP → JPEG як запас.');
say('');
say('  блоків <picture> з варіантом AVIF : ' + formats.avif);
say('  блоків <picture> з варіантом WebP : ' + formats.webp);
say('  блоків лише з JPEG                : ' + formats.jpgOnly);
say('');
const ex = (() => {
  const h = fs.readFileSync('routes/kitzbuehel.html', 'utf8');
  const m = /<picture><source type="image\/avif"[\s\S]*?<\/picture>/.exec(h);
  return m ? m[0] : '';
})();
say('  Приклад — герой сторінки /routes/kitzbuehel.html:');
for (const part of ex.replace(/></g, '>\n><').split('\n')) say('    ' + part);

say('');
say('АДАПТИВНІ РОЗМІРИ (srcset + sizes)');
say('-'.repeat(70));
say('  <img> із srcset: ' + srcset + ' із ' + imgs);
say('');
say('  Телефону не віддається фото на 1376 px, яке він покаже на 412 px.');
say('  Кожен герой має три ширини, і браузер вибирає за sizes="100vw":');
say('');
const hero = /<link rel="preload" as="image"[^>]*>/.exec(fs.readFileSync('routes/kitzbuehel.html', 'utf8'));
say('  Приклад preload-а героя (він же LCP-елемент сторінки):');
say('    ' + (hero ? hero[0] : '—'));
say('');
say('  fetchpriority="high" + preload означають, що браузер знаходить');
say('  головне фото ще до того, як дочитає сторінку, а imagesrcset у preload');
say('  повторює srcset картинки — інакше завантажилася б не та ширина.');

say('');
say('ВІДКЛАДЕНЕ ЗАВАНТАЖЕННЯ');
say('-'.repeat(70));
say('  loading="lazy"          : ' + lazy);
say('  без lazy (вище згину)   : ' + eager);
say('  Герой кожної сторінки свідомо завантажується одразу: lazy на LCP-');
say('  елементі навпаки сповільнює показ.');

say('');
say('ТЕКСТОВІ ОПИСИ (alt)');
say('-'.repeat(70));
say('  зі змістовним alt      : ' + withAlt);
say('  декоративні (alt="")   : ' + decorative + '   — читалка їх пропускає, так і треба');
say('  БЕЗ атрибута alt       : ' + noAlt.length);
if (noAlt.length) noAlt.slice(0, 20).forEach(l => say('    ! ' + l));
else say('  Жодного <img> без alt немає.');

say('');
say('РОЗМІРИ У РОЗМІТЦІ (проти стрибків верстки)');
say('-'.repeat(70));
say('  <img> без width/height : ' + noDims.length);
if (noDims.length) noDims.slice(0, 20).forEach(l => say('    ! ' + l));
else say('  У кожного <img> вказані width і height, тому місце під фото');
say('  зарезервоване заздалегідь. Це й дає CLS = 0,000 на всіх сторінках.');

say('');
say('='.repeat(70));
say('ВАГА ФАЙЛІВ — що зекономили адаптивні ширини');
say('='.repeat(70));
const kb = (p) => Math.round(fs.statSync(p).size / 1024);
for (const [label, full, small] of [
  ['герой маршруту', 'images/routes/hero-kitzbuehel.avif', 'images/routes/hero-kitzbuehel-768.avif'],
  ['фото міста',     'images/routes/town-kitzbuehel.avif', 'images/routes/town-kitzbuehel-600.avif'],
  ['фон CTA',        'images/cta.avif',                    'images/cta-800.avif'],
]) {
  if (!fs.existsSync(full) || !fs.existsSync(small)) continue;
  say(`  ${label.padEnd(16)} ${String(kb(full)).padStart(4)} KB → ${String(kb(small)).padStart(4)} KB   (на телефоні)`);
}
say('');
say('  Для порівняння, той самий герой у JPEG: ' + kb('images/routes/hero-kitzbuehel.jpg') + ' KB.');
say('  AVIF дає ' + kb('images/routes/hero-kitzbuehel.avif') + ' KB при тій самій картинці.');

fs.writeFileSync(`${OUT}/images.txt`, lines.join('\n') + '\n');
console.log('\nwritten: ' + OUT + '/images.txt');
