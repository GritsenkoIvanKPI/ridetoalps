/* Sanity checks over the translation files.
 *
 *   node i18n/check.mjs
 *
 * Two things this catches that nothing else would:
 *
 *   1. Characters from the wrong script. A stray CJK or Vietnamese character
 *      inside a Cyrillic sentence renders as a perfectly visible glyph, so it
 *      passes every build and every screenshot — and is only ever noticed by a
 *      reader of that language.
 *   2. Ukrainian apostrophes written three different ways. U+02BC, U+2019 and
 *      a plain ' all look similar enough to slip through, but they sort and
 *      search differently.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// fileURLToPath, not .pathname: this project's path is percent-encoded in a URL
const DIR = path.dirname(fileURLToPath(import.meta.url));

/* Latin-1 and the general punctuation these files legitimately use, plus the
   script each language is written in. */
const ALLOWED = {
  de: /[\u0000-ɏ]/,
  ru: /[\u0000-ɏЀ-ӿ]/,
  uk: /[\u0000-ɏЀ-ӿ]/,
  en: /[\u0000-ɏ]/,
};
const PUNCT = new Set([...'—–‘’“”„…«»€₴·×→›✓°']);

let problems = 0;

for (const file of fs.readdirSync(DIR).filter(f => /\.(de|ru|uk|en)\.mjs$/.test(f))) {
  const code = file.match(/\.(de|ru|uk|en)\.mjs$/)[1];
  // comments are prose about the translations, and may quote any language;
  // only the strings that ship are checked
  const src = fs.readFileSync(path.join(DIR, file), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');

  const stray = new Map();
  for (const ch of src) {
    if (ALLOWED[code].test(ch) || PUNCT.has(ch)) continue;
    stray.set(ch, (stray.get(ch) || 0) + 1);
  }
  for (const [ch, n] of stray) {
    console.error(`${file}: ${n}× ${JSON.stringify(ch)} (U+${ch.codePointAt(0).toString(16).toUpperCase()}) ` +
                  `is not ${code} — probably a slip of the keyboard`);
    problems++;
  }

  if (code === 'uk') {
    // an apostrophe standing between two Cyrillic letters; the quote that ends
    // a JavaScript string sits next to a comma or a brace and does not count
    const forms = ['ʼ', "'"].filter(a =>
      new RegExp('[\\u0400-\\u04FF]' + a + '[\\u0400-\\u04FF]').test(src));
    for (const a of forms) {
      console.error(`${file}: apostrophe U+${a.codePointAt(0).toString(16).toUpperCase()} used; ` +
                    `this project writes the Ukrainian apostrophe as U+2019`);
      problems++;
    }
  }
}

if (problems) {
  console.error(`\n${problems} problem(s) found.`);
  process.exit(1);
}
console.log('i18n files: no stray characters');
