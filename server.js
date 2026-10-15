'use strict';
// Server for DK One Tax Bill: static front-end plus the /api routes. Node.js built-ins except the pg driver.
// Serves ./public read-only. TLS terminates at a reverse proxy in front of this process.

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { SECURITY_HEADERS, HttpError, sendJson } = require('./lib/http');

const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOST || '0.0.0.0';
// Set TRUST_PROXY=1 only when a reverse proxy overwrites X-Forwarded-For.
const TRUST_PROXY = process.env.TRUST_PROXY === '1';
const ROOT = path.resolve(__dirname, 'public');

// The API is enabled only when a database is configured, so the static site still runs without one.
let api = null;
if (process.env.DB_HOST) {
  const { Pool } = require('pg');
  const { loadVault, loadPoolConfig } = require('./lib/config');
  const { pgStore } = require('./lib/store');
  const { createApi } = require('./lib/api');
  const pool = new Pool(loadPoolConfig());
  pool.on('error', (err) => console.error('database pool error:', err.code || 'unknown'));
  api = createApi({ store: pgStore(pool), vault: loadVault() });
}

// Whitelist: anything not listed here (including .md, .jsx, .json, .sh) is never served.
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};
const BLOCKED_DIRS = new Set(['components', 'guidelines', 'ui_kits', 'uploads', 'deploy']);
const CACHEABLE = /\.(woff2|png|css|js)$/;

// Fixed-window rate limit per client. Keeps memory bounded.
const RATE_WINDOW_MS = 1000;
const RATE_LIMIT = 50;
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  let entry = hits.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW_MS) {
    if (hits.size >= 10000) hits.clear();
    entry = { start: now, count: 0 };
    hits.set(ip, entry);
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function clientIp(req) {
  if (TRUST_PROXY) {
    const xff = req.headers['x-forwarded-for'];
    if (typeof xff === 'string' && xff.length) return xff.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

// Map a URL path to a file inside ROOT, or null if it must not be served.
function resolveFile(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  if (decoded.includes('\0')) return null;
  if (decoded === '/' || decoded.endsWith('/')) decoded += 'Index.html';

  const segments = decoded.split('/').filter(Boolean);
  if (segments.some((s) => s.startsWith('.') || BLOCKED_DIRS.has(s))) return null;

  const file = path.resolve(ROOT, '.' + path.posix.normalize('/' + decoded));
  if (!file.startsWith(ROOT + path.sep)) return null;
  if (!MIME[path.extname(file).toLowerCase()]) return null;
  return file;
}

function sendText(res, status, body, extra = {}) {
  res.writeHead(status, {
    ...SECURITY_HEADERS,
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extra,
  });
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  if (rateLimited(clientIp(req))) {
    return sendText(res, 429, 'Too Many Requests', { 'Retry-After': '1' });
  }

  let pathname;
  try {
    pathname = new URL(req.url, 'http://localhost').pathname;
  } catch {
    return sendText(res, 400, 'Bad Request');
  }

  if (pathname === '/api' || pathname.startsWith('/api/')) {
    if (!api) return sendJson(res, 404, { error: 'not_found' });
    try {
      const handled = await api(req, res, pathname);
      if (!handled) sendJson(res, 404, { error: 'not_found' });
    } catch (err) {
      if (err instanceof HttpError) return sendJson(res, err.status, { error: err.code });
      console.error('api error:', err.code || err.name);
      sendJson(res, 500, { error: 'internal' });
    }
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return sendText(res, 405, 'Method Not Allowed', { Allow: 'GET, HEAD' });
  }

  const file = resolveFile(pathname);
  if (!file) return sendText(res, 404, 'Not Found');

  fs.stat(file, (statErr, stat) => {
    if (statErr || !stat.isFile()) return sendText(res, 404, 'Not Found');

    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, {
      ...SECURITY_HEADERS,
      'Content-Type': MIME[ext],
      'Content-Length': stat.size,
      'Cache-Control': CACHEABLE.test(file) ? 'public, max-age=86400' : 'no-cache',
    });
    if (req.method === 'HEAD') return res.end();

    const stream = fs.createReadStream(file);
    stream.on('error', () => res.destroy());
    stream.pipe(res);
  });
});

server.requestTimeout = 10000;
server.headersTimeout = 10000;
server.keepAliveTimeout = 5000;

server.listen(PORT, HOST, () => {
  console.log(`dk-one-tax-bill listening on ${HOST}:${PORT}${api ? ' (api enabled)' : ''}`);
});

function shutdown() {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 5000).unref();
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
