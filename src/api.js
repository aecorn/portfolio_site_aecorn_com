import { toBasePath } from './utils/path.js';

export async function loadIndex(basePath) {
  try {
    const res = await fetch(toBasePath(`${basePath}/index.json`), { cache: 'no-store' });
    if (!res.ok) return [];
    const arr = await res.json();
    return Array.isArray(arr) ? arr : [];
  } catch { return []; }
}

export async function fetchText(path) {
  const res = await fetch(toBasePath(path), { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.text();
}
