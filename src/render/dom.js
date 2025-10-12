export const qs = (s, root=document) => root.querySelector(s);
export const qsa = (s, root=document) => [...root.querySelectorAll(s)];

export function show(el) { el.classList.remove('hidden-section'); }
export function hide(el) { el.classList.add('hidden-section'); }

export function escapeHtml(s='') {
  return s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

export function rewriteImageSrcs(html, basePathPrefix) {
  return html.replace(/(<img\b[^>]*\bsrc=["'])(.*?)(["'][^>]*>)/gi, (_, a, src, b) =>
    a + src.replace(/^([^/#].*)$/, `${basePathPrefix}/$1`).replace(/\/+/g,'/') + b
  );
}
