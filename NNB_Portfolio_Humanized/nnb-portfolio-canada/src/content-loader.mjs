import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import matter from 'gray-matter';

const contentRoot = fileURLToPath(new URL('../content/', import.meta.url));

async function loadMarkdownCollection(name) {
  const directory = join(contentRoot, name);
  const files = (await readdir(directory)).filter((file) => file.endsWith('.md')).sort();
  const entries = await Promise.all(files.map(async (file) => {
    const source = await readFile(join(directory, file), 'utf8');
    const { data } = matter(source);
    return data;
  }));
  return entries;
}

function normalizeEntry(entry) {
  const scalarList = (value) => Array.isArray(value) ? value.map((item) => typeof item === 'object' && item !== null ? item.item : item) : [];
  return {
    ...entry,
    ...(entry.strategy ? { strategy: scalarList(entry.strategy) } : {}),
    ...(entry.tags ? { tags: scalarList(entry.tags) } : {}),
    ...(entry.outputs ? { outputs: scalarList(entry.outputs) } : {}),
  };
}

async function loadJson(name) {
  return JSON.parse(await readFile(join(contentRoot, name), 'utf8'));
}

export const profile = await loadJson('profile.json');
export const highlights = (await loadJson('highlights.json')).highlights;
export const projects = (await loadMarkdownCollection('projects')).map(normalizeEntry).filter((project) => project.status !== 'draft');
export const services = (await loadMarkdownCollection('services')).map(normalizeEntry).sort((a, b) => Number(a.number) - Number(b.number));
export const articles = (await loadMarkdownCollection('articles')).map(normalizeEntry).filter((article) => article.published !== false);

export const routeEntries = [
  { path: '/', title: 'Home' },
  { path: '/work/', title: 'Work' },
  ...projects.map((project) => ({ path: `/work/${project.slug}/`, title: project.title })),
  { path: '/services/', title: 'Services' },
  ...services.map((service) => ({ path: `/services/${service.slug}/`, title: service.name })),
  { path: '/about/', title: 'About' },
  { path: '/insights/', title: 'Insights' },
  ...articles.map((article) => ({ path: `/insights/${article.slug}/`, title: article.title })),
  { path: '/contact/', title: 'Contact' },
  { path: '/privacy/', title: 'Privacy' },
];
