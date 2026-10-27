import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

process.env.STATIC_BUILD = 'true';

const { renderRoute, routeEntries } = await import('../src/site.mjs');
const dist = new URL('../dist/', import.meta.url);
const distPath = dist.pathname;
const origin = (process.env.PUBLIC_ORIGIN || '').replace(/\/$/, '');

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(new URL('../public/', import.meta.url), dist, { recursive: true });
await cp(new URL('../admin/', import.meta.url), new URL('../dist/admin/', import.meta.url), { recursive: true });

for (const { path } of routeEntries) {
  const page = renderRoute(path, path);
  const output = path === '/' ? join(distPath, 'index.html') : join(distPath, path.replace(/^\//, ''), 'index.html');
  await mkdir(join(output, '..'), { recursive: true });
  await writeFile(output, page.html);
}

const notFound = renderRoute('/404/', '/404/');
await writeFile(join(distPath, '404.html'), notFound.html);

const absolute = (path) => origin ? `${origin}${path}` : path;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routeEntries.map(({ path }) => `<url><loc>${absolute(path)}</loc></url>`).join('')}</urlset>`;
const robots = `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${absolute('/sitemap.xml')}\n`;
await writeFile(join(distPath, 'sitemap.xml'), sitemap);
await writeFile(join(distPath, 'robots.txt'), robots);
await writeFile(join(distPath, 'manus-routes.json'), JSON.stringify({ routes: routeEntries }, null, 2) + '\n');

console.log(`Static build complete: ${routeEntries.length} routes written to dist/.`);
