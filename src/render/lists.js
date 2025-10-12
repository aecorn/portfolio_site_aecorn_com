import { qs, escapeHtml } from './dom.js';

export function renderProjectsList(items) {
  const el = qs('#projectsList');
  el.innerHTML = items.map(p => `
    <article class="rounded-2xlr shadow-soft bg-white/70 glass p-6">
      <h3 class="font-semibold"><a class="underline" href="#/projects/${encodeURIComponent(p.slug)}">${escapeHtml(p.title || p.slug)}</a></h3>
      <div class="mt-1 text-xs opacity-70">${p.date || ''}</div>
      <p class="mt-2 text-sm opacity-90">${escapeHtml(p.summary || '')}</p>
      <div class="mt-4 flex flex-wrap gap-2 text-xs">${(p.tags||[]).map(t => `<span class="px-2 py-1 rounded-lg bg-mint-200">${escapeHtml(t)}</span>`).join('')}</div>
    </article>
  `).join('');
}

export function renderPostsList(items, filter = { q:'', tag:'' }) {
  const el = qs('#postList');
  const q = (filter.q || '').toLowerCase();
  const tag = filter.tag || '';
  
  const filtered = items.filter(p => {
    const text = `${p.title||''} ${p.summary||''}`.toLowerCase();
    const matchesQ = !q || text.includes(q);
    const matchesTag = !tag || (p.tags||[]).includes(tag);
    return matchesQ && matchesTag;
  });

  el.innerHTML = filtered.map(p => `
    <article class="rounded-2xlr p-6 bg-white/70 glass shadow-soft">
      <div class="text-sm opacity-70">${p.date ? new Date(p.date).toLocaleDateString() : ''}</div>
      <h3 class="text-lg font-semibold mt-1"><a class="underline" href="#/blog/${encodeURIComponent(p.slug)}">${escapeHtml(p.title || p.slug)}</a></h3>
      <div class="mt-2 flex flex-wrap gap-2 text-xs">${(p.tags||[]).map(t => `<span class="px-2 py-1 rounded-lg bg-candy-200 text-ink">${escapeHtml(t)}</span>`).join('')}</div>
      <p class="mt-3 text-sm opacity-90">${escapeHtml(p.summary || '')}</p>
    </article>
  `).join('');
}

export function populateTags(posts) {
  const sel = qs('#tagFilter');
  const tags = Array.from(new Set(posts.flatMap(p => p.tags || []))).sort();
  sel.innerHTML = `<option value="">All tags</option>` + tags.map(t => `<option value="${t}">${t}</option>`).join('');
}
