/* What still has to reach the server.
 *
 *   node diff-live.mjs
 *
 * Compares every file in deploy/ with the same path on the live domain, by
 * content, and sorts the result into: missing, changed, identical. Files the
 * web server never serves (.htaccess, *.php, the IndexNow key) cannot be read
 * back over HTTP and are listed separately — they always go up.
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const BASE = args.find((a) => a.startsWith('http')) || 'https://ridetoalps.com';
const STAGE = 'update';
const ROOT = 'deploy';

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p) : files.push(p);
  }
})(ROOT);

const rel = (p) => p.slice(ROOT.length + 1);
const sha = (b) => crypto.createHash('sha1').update(b).digest('hex');
/* ignore differences the server itself introduces, not us */
const norm = (b) => b.toString('utf8').replace(/\r\n/g, '\n').trimEnd();

const NOT_SERVED = /(^\.htaccess$)|(\.php$)|(^[0-9a-f]{32}\.txt$)/;

const missing = [], changed = [], same = [], blind = [], errors = [];

const check = async (p) => {
  const r = rel(p);
  if (NOT_SERVED.test(r)) { blind.push(r); return; }
  const local = fs.readFileSync(p);
  const url = BASE + '/' + r;
  let res;
  try { res = await fetch(url); } catch (e) { errors.push([r, e.message]); return; }
  if (res.status === 404) { missing.push(r); return; }
  if (!res.ok) { errors.push([r, 'HTTP ' + res.status]); return; }
  const remote = Buffer.from(await res.arrayBuffer());
  const text = /\.(html|css|js|txt|xml|json|webmanifest)$/.test(r);
  const equal = text ? norm(local) === norm(remote) : sha(local) === sha(remote);
  (equal ? same : changed).push(r);
};

/* a few at a time; the host is shared and 396 parallel requests is rude */
const queue = [...files];
await Promise.all(Array.from({ length: 8 }, async () => {
  while (queue.length) await check(queue.pop());
}));

const show = (title, list, note) => {
  console.log('');
  console.log(title + '  (' + list.length + ')');
  if (note) console.log('  ' + note);
  console.log('-'.repeat(68));
  if (!list.length) { console.log('  —'); return; }
  const byDir = {};
  for (const f of list.sort()) {
    const d = f.includes('/') ? f.slice(0, f.lastIndexOf('/')) + '/' : '(корінь)';
    (byDir[d] ||= []).push(f.slice(d === '(корінь)' ? 0 : d.length));
  }
  for (const [d, fs_] of Object.entries(byDir)) {
    console.log('  ' + d + '   ' + fs_.length + ' файл(ів)');
    if (fs_.length <= 6) fs_.forEach((f) => console.log('      ' + f));
  }
};

console.log('ЩО ТРЕБА ЗАЛИТИ НА ХОСТИНГ');
console.log('Порівняння deploy/ із ' + BASE);
console.log('Знято: ' + new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC');
console.log('='.repeat(68));

show('ВІДСУТНІ НА СЕРВЕРІ — їх там немає взагалі', missing);
show('ЗМІНЕНІ — на сервері лежить інша версія', changed);
show('ЗАЛИТИ НАОСЛІП — сервер не віддає їх по HTTP, тому порівняти не можна', blind,
     'їх треба залити завжди; config.php на сервері НЕ чіпати');
show('ЗБІГАЮТЬСЯ — можна не чіпати', same);
if (errors.length) show('ПОМИЛКИ ПЕРЕВІРКИ', errors.map(([f, e]) => f + '  (' + e + ')'));

console.log('');
console.log('='.repeat(68));
const need = missing.length + changed.length + blind.length;
console.log('Треба залити: ' + need + ' із ' + files.length + '.  Без змін: ' + same.length + '.');

/* --write stages exactly those files, with their paths, ready to drop into
   the file manager. Everything else on the server is left alone. */
if (WRITE) {
  fs.rmSync(STAGE, { recursive: true, force: true });
  const take = [...missing, ...changed, ...blind];
  for (const r of take) {
    const dest = path.join(STAGE, r);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(path.join(ROOT, r), dest);
  }
  const bytes = take.reduce((n, r) => n + fs.statSync(path.join(ROOT, r)).size, 0);
  console.log('');
  console.log('Зібрано теку ./' + STAGE + '/ — ' + take.length + ' файлів, ' +
              (bytes / 1048576).toFixed(1) + ' MB.');
  console.log('Вивантажити її вміст у корінь сайту, зберігаючи структуру тек.');
  console.log('config.php на сервері не чіпати — його тут навмисно немає.');
}
