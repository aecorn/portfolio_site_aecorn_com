export function toBasePath(p) {
    if (!p) return p;
    if (/^([a-z]+:)?\/\//i.test(p) || p.startsWith('/')) return p;
    const base = location.pathname.replace(/[^/]*$/, '');
    return (base + p).replace(/\/+/g, '/');
  }
  
  export function prefixRelativeUrl(url, basePath) {
    if (!url || /^([a-z]+:)?\/\//i.test(url) || url.startsWith('/') || url.startsWith('#')) return url;
    return `${toBasePath(basePath)}/${url}`.replace(/\/+/g, '/');
  }
  