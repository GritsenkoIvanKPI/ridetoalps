/* Every URL in the sitemap, fetched from the published domain. */
import fs from 'fs';
const urls = [...fs.readFileSync('sitemap.xml','utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
const bad = [], ok = [];
for (const u of urls) {
  let code = 0;
  try { code = (await fetch(u, { redirect: 'manual' })).status; } catch (e) { code = 0; }
  (code === 200 ? ok : bad).push([u, code]);
}
console.log('адрес у sitemap.xml: ' + urls.length);
console.log('віддають 200       : ' + ok.length);
console.log('НЕ віддають 200    : ' + bad.length);
if (bad.length) { console.log(''); bad.forEach(([u,c]) => console.log('  ' + String(c).padEnd(5) + u)); }
fs.writeFileSync('tech-report/d1-crawling/live-sweep.txt',
  'ПЕРЕВІРКА ВСІХ АДРЕС ІЗ SITEMAP НА ОПУБЛІКОВАНОМУ ДОМЕНІ\n' +
  'Знято: ' + new Date().toISOString().slice(0,16).replace('T',' ') + ' UTC\n' +
  '='.repeat(66) + '\n\n' +
  'адрес у sitemap.xml: ' + urls.length + '\n' +
  'віддають 200       : ' + ok.length + '\n' +
  'НЕ віддають 200    : ' + bad.length + '\n\n' +
  (bad.length ? bad.map(([u,c]) => String(c).padEnd(6) + u).join('\n') + '\n' : 'Усі адреси доступні.\n'));
