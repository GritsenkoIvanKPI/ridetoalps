// Assembles deploy/ — exactly the files that belong in public_html, and nothing else.
// The asset list is checked against what the pages actually reference, so a new image
// or font cannot be left behind. Dev tooling, the brief and the template screenshot
// deliberately stay out: anything uploaded is publicly readable at ridetoalps.com/<name>.
//
//   node build-deploy.mjs
//
import fs from 'fs';
import path from 'path';

const OUT = 'deploy';

import { ROUTES } from './routes.data.mjs';
import { LANGS } from './i18n/config.mjs';

// Every page, in every language. The legal pages are documents under German
// law and all four versions link to the same copy, so they appear once.
const LOCALISED = ['index.html', 'routes.html', ...ROUTES.map(r => `routes/${r.slug}.html`)];
const PAGES = [
  ...LANGS.flatMap(l => LOCALISED.map(p => (l.code === 'en' ? p : `${l.code}/${p}`))),
  'impressum.html', 'datenschutz.html', 'agb.html',
];

// served as-is, referenced from the head, the manifest or by crawlers
const ROOT_FILES = [
  '.htaccess',
  'send-form.php',
  'legal.css', 'route.css', 'route.js',
  'favicon.ico', 'favicon.svg', 'favicon-16.png', 'favicon-32.png',
  'apple-touch-icon.png', 'icon-192.png', 'icon-512.png',
  'site.webmanifest', 'robots.txt', 'sitemap.xml',
];

const NEVER_UPLOAD = [
  'serve.mjs', 'screenshot.mjs', 'build-deploy.mjs', 'package.json',
  'README.md', 'CLAUDE.md', 'GEMINI_IMAGE_GENERATION.md', 'SKILL.md',
  'config.example.php', '.gitignore', 'desktop.png',
  'routes.data.mjs', 'build-routes.mjs', 'build-routes-index.mjs',
  'build-i18n.mjs', 'build-sitemap.mjs', 'build.mjs',
  'check-links.mjs', 'check-layout.mjs',
  'Інструкція — перевірка оплат ridetoalps.docx',
  'htaccess.txt',
];

fs.rmSync(OUT, { recursive: true, force: true });

const copy = (src, dest) => {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
};

let count = 0;
const take = (f) => {
  if (!fs.existsSync(f)) { console.warn('  !! missing, skipped:', f); return; }
  copy(f, path.join(OUT, f));
  count++;
};

PAGES.forEach(take);
ROOT_FILES.forEach(take);

// every local asset the pages link to, pulled straight out of the markup
const html = PAGES.filter(p => fs.existsSync(p)).map(p => fs.readFileSync(p, 'utf8')).join('\n');
const refs = new Set();
for (const m of html.matchAll(/(?:src|href)="(?!https?:|mailto:|tel:|#|data:)\/?([^"]+)"/g)) {
  refs.add(m[1].replace(/^\.\.\//, ''));   // route pages link one level up
}
// @font-face urls live in the inline <style>, not in an attribute
for (const m of html.matchAll(/url\('(fonts\/[^']+)'\)/g)) refs.add(m[1]);

// the Open Graph card is referenced by absolute URL in a meta tag, so the
// relative-path scan above never sees it — social crawlers still fetch it
for (const m of html.matchAll(/content="https?:\/\/[^"]*?\/(images\/[^"]+)"/g)) refs.add(m[1]);

// <source srcset> carries the avif/webp variants; src-only scanning misses them
for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
  m[1].split(',').forEach(part => {
    const url = part.trim().split(/\s+/)[0];
    if (url && !/^https?:|^data:/.test(url)) refs.add(url.replace(/^\.\.\//, '').replace(/^\//, ''));
  });
}

refs.forEach(r => {
  if (PAGES.includes(r) || ROOT_FILES.includes(r)) return;
  if (NEVER_UPLOAD.includes(r)) return;
  if (fs.existsSync(r) && fs.statSync(r).isFile()) take(r);
});

// Written as config.sample.php, never as config.php.
//
// The live config.php holds the Telegram bot token and is created once, on the
// server. If this folder contained a config.php, then every later upload of
// deploy/ would overwrite that file with blank placeholders and silently break
// the booking form — the kind of failure nobody notices until an enquiry goes
// missing. So the template ships under a different name and is copied into
// place by hand, once.
const CONFIG = `<?php
/**
 * ridetoalps — form settings.
 *
 * 1. Replace the two PASTE_ values below.
 * 2. Rename it to config.php and upload it next to send-form.php.
 * 3. Set its permissions to 600 in the Webuzo file manager.
 *
 * Never commit this file and never e-mail it. Anyone holding the token
 * controls the bot.
 */

return [
    // From @BotFather in Telegram: /newbot, then copy the token it gives you.
    // Looks like  1234567890:AAE-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    'bot_token' => 'PASTE_BOT_TOKEN_HERE',

    // Where enquiries arrive.
    //   - private chat: message @userinfobot, it replies with your id (positive)
    //   - group: add the bot to the group, send any message, then open
    //     https://api.telegram.org/bot<TOKEN>/getUpdates and read "chat":{"id":…}
    //     (a group id is negative, e.g. -1001234567890)
    'chat_id' => 'PASTE_CHAT_ID_HERE',

    // PayPal deposit link, shown on the success screen after an enquiry is
    // recorded. Leave empty to hide the deposit button entirely.
    'paypal_url' => 'https://www.paypal.com/ncp/payment/VRX7RQGVVUZ2Q',

    // Optional: also send a copy to this mailbox. Leave empty to turn off.
    'notify_email' => '',

    // How many submissions one IP may send per hour.
    'rate_limit_per_hour' => 5,
];
`;
fs.writeFileSync(path.join(OUT, 'config.sample.php'), CONFIG);
count++;

const size = (dir) => fs.readdirSync(dir, { withFileTypes: true })
  .reduce((n, e) => n + (e.isDirectory()
    ? size(path.join(dir, e.name))
    : fs.statSync(path.join(dir, e.name)).size), 0);

console.log(`deploy/ built — ${count} files, ${(size(OUT) / 1024 / 1024).toFixed(2)} MB`);
console.log('config.sample.php is a template. On a FIRST install, rename it to');
console.log('config.php on the server, fill in the two PASTE_ values and chmod 600.');
console.log('On later uploads leave it alone — the live config.php is never overwritten.');
