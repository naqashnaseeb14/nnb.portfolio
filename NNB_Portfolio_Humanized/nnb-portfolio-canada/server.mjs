import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderRoute, routeEntries } from './src/site.mjs';

const root = fileURLToPath(new URL('.', import.meta.url));
const publicDir = join(root, 'public');
const port = Number(process.env.PORT || 3000);
const mime = { '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.html': 'text/html; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.json': 'application/json; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.yml': 'text/yaml; charset=utf-8', '.yaml': 'text/yaml; charset=utf-8' };
const allowedHelp = new Set(['Social strategy', 'Campaign orchestration', 'Content operations', 'Performance reporting and optimisation', 'Something else']);
const rateBuckets = new Map();
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; form-action 'self'; base-uri 'self'",
};
const adminSecurityHeaders = {
  ...securityHeaders,
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' https://unpkg.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.githubusercontent.com https://avatars.githubusercontent.com; font-src 'self' data:; connect-src 'self' https://api.github.com https://*.githubusercontent.com https://*.decapcms.org; frame-src https://github.com https://*.github.com; form-action 'self' https://github.com; base-uri 'self'",
};

function send(res, status, body, type = 'text/html; charset=utf-8', extra = {}) {
  res.writeHead(status, { ...securityHeaders, 'Content-Type': type, 'Cache-Control': type.includes('text/html') ? 'no-store' : 'public, max-age=3600', ...extra });
  res.end(body);
}

async function staticAsset(res, pathname) {
  const safePath = normalize(pathname).replace(/^\/+/, '');
  if (safePath.includes('..')) return false;
  try {
    const assetRoot = safePath.startsWith('admin/') ? root : publicDir;
    const body = await readFile(join(assetRoot, safePath));
    send(res, 200, body, mime[extname(safePath)] || 'application/octet-stream', safePath.startsWith('admin/') ? adminSecurityHeaders : {});
    return true;
  } catch {
    return false;
  }
}

function sitemap() {
  const base = process.env.PUBLIC_ORIGIN ? process.env.PUBLIC_ORIGIN.replace(/\/$/, '') : '';
  const loc = (path) => base ? `${base}${path}` : path;
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routeEntries.map(({ path }) => `<url><loc>${loc(path)}</loc></url>`).join('')}</urlset>`;
}

function routesJson() {
  return JSON.stringify({ routes: routeEntries }, null, 2);
}

function robots() {
  const base = process.env.PUBLIC_ORIGIN ? `\nSitemap: ${process.env.PUBLIC_ORIGIN.replace(/\/$/, '')}/sitemap.xml` : '';
  return `User-agent: *\nAllow: /\nDisallow: /api/${base}\n`;
}

function bodyFrom(req) {
  return new Promise((resolve) => {
    let data = '';
    let tooLarge = false;
    req.on('data', (chunk) => {
      if (data.length + chunk.length > 20000) tooLarge = true;
      else data += chunk;
    });
    req.on('end', () => resolve({ form: new URLSearchParams(data), tooLarge }));
  });
}

function withinRateLimit(ip) {
  const now = Date.now();
  for (const [key, bucket] of rateBuckets) {
    if (now - bucket.startedAt > 60000) rateBuckets.delete(key);
  }
  const current = rateBuckets.get(ip);
  if (!current || now - current.startedAt > 60000) {
    rateBuckets.set(ip, { startedAt: now, count: 1 });
    return true;
  }
  current.count += 1;
  return current.count <= 5;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  if (req.method === 'GET' && url.pathname === '/manus-routes.json') return send(res, 200, routesJson(), 'application/json; charset=utf-8');
  if (req.method === 'GET' && url.pathname === '/sitemap.xml') return send(res, 200, sitemap(), 'application/xml; charset=utf-8');
  if (req.method === 'GET' && url.pathname === '/robots.txt') return send(res, 200, robots(), 'text/plain; charset=utf-8');
  if (req.method === 'GET' && (url.pathname === '/admin' || url.pathname === '/admin/')) return staticAsset(res, '/admin/index.html');
  if (req.method === 'GET' && url.pathname.startsWith('/api/')) return send(res, 404, 'Not found', 'text/plain; charset=utf-8');
  if (req.method === 'GET' && url.pathname.includes('.') && await staticAsset(res, url.pathname)) return;
  if (req.method === 'POST' && url.pathname === '/api/enquiry') {
    if (!withinRateLimit(req.socket.remoteAddress || 'unknown')) return send(res, 429, '<h1>Too many enquiries.</h1><p>Please wait a minute and try again.</p>', 'text/html; charset=utf-8', { 'Retry-After': '60' });
    const parsed = await bodyFrom(req);
    const form = parsed.form;
    const name = (form.get('name') || '').trim();
    const email = (form.get('email') || '').trim();
    const help = (form.get('help') || '').trim();
    const brief = (form.get('brief') || '').trim();
    const hasRequired = name.length >= 2 && email.length >= 5 && help.length > 0 && brief.length >= 10;
    const withinFieldLimits = name.length <= 120 && email.length <= 200 && brief.length <= 4000;
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (parsed.tooLarge || form.get('company') || !hasRequired || !withinFieldLimits || !looksLikeEmail || !allowedHelp.has(help)) return send(res, 400, '<h1>There was a problem with the form.</h1><p>Please complete the required fields with a valid email and a brief of at least 10 characters.</p>', 'text/html; charset=utf-8');
    res.writeHead(303, { ...securityHeaders, Location: '/contact/?sent=1', 'Cache-Control': 'no-store' });
    return res.end();
  }
  if (req.method === 'GET') {
    const page = renderRoute(url.pathname, `${url.pathname}${url.search}`);
    return send(res, page.status, page.html);
  }
  return send(res, 405, 'Method not allowed', 'text/plain; charset=utf-8', { Allow: 'GET, POST' });
});

server.listen(port, '0.0.0.0', () => console.log(`NNB Portfolio listening on http://0.0.0.0:${port}`));
