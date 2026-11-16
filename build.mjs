/* Rebuilds every generated page, in order.
 *
 *   node build.mjs
 *
 * Order matters: the route pages and the hub lift their calculator, fleet and
 * footer out of index.html, so the homepage has to be the source of truth
 * before anything reads it. Everything downstream is derived — editing a file
 * under de/, ru/ or uk/ by hand is always a mistake, because the next build
 * overwrites it.
 */
import { execFileSync } from 'child_process';

const STEPS = [
  ['i18n/check.mjs',           'translation files'],
  ['build-i18n.mjs',           'localized homepages'],
  ['build-routes.mjs',         'route landing pages'],
  ['build-routes-index.mjs',   'route hub pages'],
  ['build-blog.mjs',           'blog index and articles'],
  ['build-sitemap.mjs',        'sitemap'],
  ['build-llms.mjs',           'llms.txt for AI assistants'],
];

for (const [script, what] of STEPS) {
  console.log(`\n── ${what} ─────────────────────────`);
  execFileSync(process.execPath, [script], { stdio: 'inherit' });
}

console.log('\nAll generated pages are up to date.');
console.log('Run `node build-deploy.mjs` to assemble the upload folder.');
