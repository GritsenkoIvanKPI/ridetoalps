/* D3 — IndexNow: the key file, its reachability, and a real submission.
 * The key itself is never printed: it is written only to the file named after
 * it, which has to be public for the protocol to work at all. */
import fs from 'fs';
import { execFileSync } from 'child_process';

const OUT = 'tech-report/d3-indexnow';
const HOST = 'ridetoalps.com';
const lines = [];
const say = (s = '') => { lines.push(s); console.log(s); };

const keyFile = fs.readdirSync('.').find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
const mask = keyFile ? keyFile.slice(0, 4) + '…' + keyFile.slice(-8) : '(відсутній)';

say('D3 — INDEXNOW, GOOGLE SEARCH CONSOLE, BING WEBMASTER TOOLS');
say('Знято: ' + new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC');
say('='.repeat(70));
say('');
say('КЛЮЧ INDEXNOW');
say('-'.repeat(70));
say('  Файл ключа        : ' + mask + '  (у корені сайту)');
say('  Довжина ключа     : 32 шістнадцяткові символи');
say('  Повний ключ у цьому звіті не наводиться, як і просили.');
say('');
say('  Як це влаштовано: імʼя файлу — це і є ключ, а всередині лежить той');
say('  самий рядок. IndexNow забирає https://' + HOST + '/<ключ>.txt і');
say('  приймає заявку, лише якщо вміст збігається. Тобто файл за задумом');
say('  протоколу публічний: він доводить контроль над доменом, не більше.');
say('');
say('  Генерація і надсилання — у indexnow.mjs у корені проєкту:');
say('      node indexnow.mjs              усі адреси із sitemap.xml');
say('      node indexnow.mjs <url> ...    лише вказані сторінки');
say('');

/* is the key file actually reachable on the published domain? */
const r = await fetch(`https://${HOST}/${keyFile}`).catch(() => null);
const body = r && r.ok ? (await r.text()).trim() : '';
const match = body === keyFile.replace(/\.txt$/, '');

say('ПЕРЕВІРКА НА ОПУБЛІКОВАНОМУ ДОМЕНІ');
say('-'.repeat(70));
say(`  GET https://${HOST}/<ключ>.txt  →  HTTP ${r ? r.status : 'немає відповіді'}`);
say('  вміст збігається з іменем файлу : ' + (match ? 'так' : 'ні'));
say('');
if (!match) {
  say('  СТАН: файла ще немає на хостингу. Він створений у проєкті й');
  say('  входить до складу вивантаження (build-deploy.mjs кладе його в корінь),');
  say('  але та збірка ще не залита. Після заливки повторіть:');
  say('      node indexnow.mjs');
  say('  і цей самий скрипт перезапише цей файл із підтвердженням.');
  say('');
}

say('ТЕСТОВЕ НАДСИЛАННЯ');
say('-'.repeat(70));
let out = '';
try {
  out = execFileSync(process.execPath, ['indexnow.mjs'], { encoding: 'utf8' });
} catch (e) {
  out = (e.stdout || '') + (e.stderr || '');
}
out.trim().split('\n').forEach((l) => say('  ' + l));
say('');
say('  Коди відповіді IndexNow: 200 — прийнято; 202 — прийнято, ключ ще');
say('  перевіряється; 403 — ключ не знайдено або не збігається.');
say('');
say('  IndexNow спільний для Bing, Yandex, Seznam і Naver — одне надсилання');
say('  доходить до всіх. Google до IndexNow не підключений: для нього працює');
say('  sitemap, вказаний у robots.txt, і Search Console.');

say('');
say('GOOGLE SEARCH CONSOLE ТА BING WEBMASTER TOOLS');
say('-'.repeat(70));
say('  Скріншотів із цих кабінетів у звіті немає, і це треба сказати прямо:');
say('  доступу до облікових записів у нас немає, а підставляти чужі знімки');
say('  або малювати їх — це не доказ.');
say('');
say('  Те, що залежить від сайту, зроблено й перевіряється ззовні:');
say('    • sitemap.xml доступний і вказаний у robots.txt — див. d1-crawling;');
say('    • усі 67 адрес віддають 200 і мають канонічні посилання;');
say('    • розмітка валідна — див. d8-structured-data.');
say('');
say('  Що лишається зробити власнику кабінетів (один раз, 10 хвилин):');
say('    1. Search Console → Add property → Domain → ' + HOST);
say('       підтвердити через DNS TXT, далі Sitemaps → додати');
say('       https://' + HOST + '/sitemap.xml');
say('    2. Bing Webmaster Tools → Add site → можна імпортувати з Search');
say('       Console одним натисканням, далі Sitemaps → той самий файл.');
say('    3. Після цього надішліть нам скріншоти, або дайте доступ');
say('       на читання — додамо їх у цей звіт.');

fs.writeFileSync(`${OUT}/indexnow.txt`, lines.join('\n') + '\n');
console.log('\nwritten: ' + OUT + '/indexnow.txt');
