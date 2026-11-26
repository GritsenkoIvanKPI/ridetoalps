/* Submits the site's URLs to IndexNow, which Bing, Yandex, Seznam and Naver
 * share. Google is not an IndexNow participant: it is notified through the
 * sitemap in robots.txt and through Search Console.
 *
 *   node indexnow.mjs            submit every URL in sitemap.xml
 *   node indexnow.mjs <url> ...  submit only the URLs given
 *
 * The key lives in a file named after itself at the site root, because that is
 * what the protocol requires: IndexNow fetches https://ridetoalps.com/<key>.txt
 * and accepts the submission only if it contains the same key. The file is
 * therefore public by design — it proves control of the domain, nothing more.
 * It is still kept out of reports and messages, as the client asked.
 */
import fs from 'fs';
import crypto from 'crypto';

const HOST = 'ridetoalps.com';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

let keyFile = fs.readdirSync('.').find((f) => /^[a-f0-9]{32}\.txt$/.test(f));

/* node indexnow.mjs --init  — create a key when the project has none. The key
   file is gitignored on purpose, so a fresh clone starts without one. */
if (process.argv.includes('--init')) {
  if (keyFile) { console.log('A key file already exists; keeping it.'); process.exit(0); }
  const fresh = crypto.randomBytes(16).toString('hex');
  fs.writeFileSync(fresh + '.txt', fresh + '\n');
  console.log('Created the key file at the project root.');
  console.log('build-deploy.mjs puts it in the upload bundle; upload before submitting.');
  process.exit(0);
}
if (!keyFile) {
  console.error('No IndexNow key file at the project root. Expected <32 hex chars>.txt');
  process.exit(1);
}
const key = fs.readFileSync(keyFile, 'utf8').trim();
if (key + '.txt' !== keyFile) {
  console.error(`${keyFile} must contain exactly the key it is named after.`);
  process.exit(1);
}

let urls = process.argv.slice(2);
if (!urls.length) {
  const xml = fs.readFileSync('sitemap.xml', 'utf8');
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
if (!urls.length) { console.error('Nothing to submit.'); process.exit(1); }

/* The key file has to be reachable before the submission can pass: IndexNow
   fetches it to verify the request. Checking first turns an opaque 403 into a
   sentence that says which step is missing. */
const probe = await fetch(`https://${HOST}/${keyFile}`).catch(() => null);
const probeOk = probe && probe.ok && (await probe.text()).trim() === key;
console.log(`key file at https://${HOST}/<key>.txt : ` +
  (probeOk ? 'reachable, contents match' : `NOT USABLE (HTTP ${probe ? probe.status : 'no response'})`));
if (!probeOk) {
  console.log('Upload the key file to the site root first, then run this again.');
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList: urls }),
});

const MEANING = {
  200: 'OK — the URLs were accepted',
  202: 'Accepted — URLs received, the key is still being validated',
  400: 'Bad request — the JSON body is malformed',
  403: 'Forbidden — the key file was not found or did not match',
  422: 'Unprocessable — a URL does not belong to this host, or the key does not match the host',
  429: 'Too many requests — slow down',
};
console.log(`submitted ${urls.length} URLs → HTTP ${res.status}  ${MEANING[res.status] || ''}`);
const body = (await res.text()).trim();
if (body) console.log('response body: ' + body.slice(0, 400));
process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
