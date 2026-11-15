/* The four language versions and where each one lives.
 *
 *   EN  →  /                (index.html, routes.html, routes/*.html)
 *   DE  →  /de/
 *   RU  →  /ru/
 *   UK  →  /uk/
 *
 * English is the canonical version and keeps the bare paths, so existing links,
 * the sitemap and anything already indexed stay valid.
 */
export const SITE = 'https://ridetoalps.com';

export const LANGS = [
  { code: 'en', dir: '',   native: 'English',    label: 'English',   locale: 'en_GB', intl: 'en-GB' },
  { code: 'de', dir: 'de', native: 'Deutsch',    label: 'German',    locale: 'de_DE', intl: 'de-DE' },
  { code: 'ru', dir: 'ru', native: 'Русский',    label: 'Russian',   locale: 'ru_RU', intl: 'ru-RU' },
  { code: 'uk', dir: 'uk', native: 'Українська', label: 'Ukrainian', locale: 'uk_UA', intl: 'uk-UA' },
];

export const byCode = (code) => LANGS.find(l => l.code === code);

/** Root-absolute prefix for a language: '' for English, '/de' otherwise. */
export const base = (code) => (code === 'en' ? '' : '/' + code);

/** Where a page lives on disk for a given language. */
export const outPath = (code, page) => (code === 'en' ? page : `${code}/${page}`);

/** Root-absolute URL of a page in a given language. */
export const urlFor = (code, page) =>
  `${base(code)}/${page === 'index.html' ? '' : page}`;
