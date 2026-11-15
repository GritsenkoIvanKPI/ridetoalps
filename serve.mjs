import http from 'http';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3010;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
  '.php': 'text/html',
};

/* The production server applies .htaccess: gzip on text, long cache lifetimes
   on fingerprinted assets, UTF-8 on text/plain. Without the same headers here,
   a local Lighthouse run reports compression and caching failures that do not
   exist on the real site — and those warnings drown out the ones that do. So
   this mirrors .htaccess closely enough for a measurement to mean something. */
const COMPRESSIBLE = /^(text\/|application\/(javascript|json|xml|manifest\+json)|image\/svg)/;
const CACHE = [
  [/\.(avif|webp|jpe?g|png|gif|ico|svg|woff2?)$/, 'public, max-age=31536000, immutable'],
  [/\.(css|js|mjs)$/,                             'public, max-age=2592000'],
  [/\.(html|txt|xml|webmanifest)$/,               'public, max-age=3600'],
];

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  // Apache serves DirectoryIndex for a path ending in '/', which is how the
  // language versions are addressed: /de/ must reach /de/index.html.
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const filePath = path.join(__dirname, urlPath);
  const ext = path.extname(filePath).toLowerCase();
  let mime = MIME[ext] || 'application/octet-stream';
  if (/^(text\/|application\/(javascript|json|manifest\+json))/.test(mime)) mime += '; charset=utf-8';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const headers = { 'Content-Type': mime };
    const rule = CACHE.find(([re]) => re.test(filePath));
    if (rule) headers['Cache-Control'] = rule[1];

    const acceptsGzip = /\bgzip\b/.test(req.headers['accept-encoding'] || '');
    if (acceptsGzip && COMPRESSIBLE.test(mime)) {
      zlib.gzip(data, (e, gz) => {
        if (e) { res.writeHead(200, headers); return res.end(data); }
        headers['Content-Encoding'] = 'gzip';
        headers['Vary'] = 'Accept-Encoding';
        res.writeHead(200, headers);
        res.end(gz);
      });
      return;
    }

    res.writeHead(200, headers);
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
