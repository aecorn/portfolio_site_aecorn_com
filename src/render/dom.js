export const qs = (s, root=document) => root.querySelector(s);
export const qsa = (s, root=document) => [...root.querySelectorAll(s)];

export function show(el) { el.classList.remove('hidden-section'); }
export function hide(el) { el.classList.add('hidden-section'); }

export function escapeHtml(s='') {
  return s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

export function rewriteImageSrcs(html, basePathPrefix) {
    return html.replace(/(<img\b[^>]*\bsrc=["'])(.*?)(["'][^>]*>)/gi, (_, a, src, b) => {
      // Only modify relative URLs (those not starting with http://, https://, or //)
      if (/^(https?:\/\/|\/\/)/i.test(src)) {
        return a + src + b; // Leave absolute URLs unchanged
      }
      return a + src.replace(/^([^/#].*)$/, `${basePathPrefix}/$1`).replace(/\/+/g, '/') + b;
    });
  }
