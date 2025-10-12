import { qs, hide, show, rewriteImageSrcs } from './dom.js';
import { fetchText } from '../api.js';
import { stripFrontMatter, renderMarkdown } from '../markdown.js';
import { toBasePath } from '../utils/path.js';

export async function showProjectDetail(item, basePath) {
  qs('#detailTitle').textContent = item.title || item.slug;
  qs('#detailMeta').textContent  = [item.date, ...(item.tags||[])].filter(Boolean).join(' • ');
  qs('#detailBack').href = '#/projects';

  try {
    const html = await fetchText(`${basePath}/${item.href}`);
    qs('#detailBody').innerHTML = rewriteImageSrcs(html, toBasePath(basePath));
  } catch {
    qs('#detailBody').innerHTML = `<p>Could not load the project file.</p>`;
  }

  hide(qs('#introSection')); hide(qs('#projectsSection')); hide(qs('#blogSection')); hide(qs('#activitySection')); hide(qs('#linksSection'));
  show(qs('#detailSection'));
}

export async function showPostDetail(item, basePath) {
  qs('#detailTitle').textContent = item.title || item.slug;
  qs('#detailMeta').textContent  = [item.date, ...(item.tags||[])].filter(Boolean).join(' • ');
  qs('#detailBack').href = '#/blog';

  try {
    let md = await fetchText(`${basePath}/${item.href}`);
    md = stripFrontMatter(md);
    qs('#detailBody').innerHTML = renderMarkdown(md, basePath);
  } catch {
    qs('#detailBody').innerHTML = `<p>Could not load the post.</p>`;
  }

  hide(qs('#introSection')); hide(qs('#projectsSection')); hide(qs('#blogSection')); hide(qs('#activitySection')); hide(qs('#linksSection'));
  show(qs('#detailSection'));
}
