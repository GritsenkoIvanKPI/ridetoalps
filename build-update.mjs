/* Stages only the files that differ from the build currently on the host, so
 * the upload is a few hundred kilobytes rather than thirty megabytes.
 *
 *   node bundle.mjs <commit-that-is-live>
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const base = process.argv[2];
if (!base) throw new Error('give the commit that is currently on the host');

const OUT = 'update';
fs.rmSync(OUT, { recursive: true, force: true });

const changed = execSync(`git diff --name-only ${base} HEAD`, { encoding: 'utf8' })
  .trim().split('\n')
  // the bundle itself is not part of the site
  .filter(f => f && !f.startsWith('update'))
  // only files the deploy folder actually ships
  .filter(f => fs.existsSync(path.join('deploy', f)));

for (const f of changed) {
  const dest = path.join(OUT, f);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(path.join('deploy', f), dest);
}

console.log(`${changed.length} files staged in ${OUT}/`);
const roots = changed.filter(f => !f.includes('/'));
console.log('root files: ' + (roots.join(', ') || 'none'));
