import { escapeHtml } from './render/dom.js';
import { prefixRelativeUrl } from './utils/path.js';

export function stripFrontMatter(text) {
  const m = text.match(/^---\n[\s\S]*?\n---\n?/);
  return m ? text.slice(m[0].length) : text;
}

export function renderMarkdown(mdText, basePath) {
  // code fences
  mdText = mdText.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${escapeHtml(code.trim())}</code></pre>`);
  // inline code
  mdText = mdText.replace(/`([^`]+)`/g, (_, c) => `<code>${escapeHtml(c)}</code>`);
  // images
  mdText = mdText.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) =>
    `<img alt="${escapeHtml(alt)}" src="${escapeHtml(prefixRelativeUrl(src.trim(), basePath))}" />`
  );
  // links
  mdText = mdText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) =>
    `<a class="underline" href="${escapeHtml(prefixRelativeUrl(href.trim(), basePath))}">${escapeHtml(text)}</a>`
  );
  // headings
  mdText = mdText
    .replace(/^######\s+(.*)$/gm, '<h6>$1</h6>')
    .replace(/^#####\s+(.*)$/gm, '<h5>$1</h5>')
    .replace(/^####\s+(.*)$/gm, '<h4>$1</h4>')
    .replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
    .replace(/^##\s+(.*)$/gm, '<h2>$1</h2>')
    .replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');
  // bold / italic
  mdText = mdText
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // unordered lists
  mdText = mdText.replace(/(^|\n)(?:-\s+|\*\s+).+(?:\n(?:-\s+|\*\s+).+)*/g, block => {
    const items = block.trim().split(/\n(?:-\s+|\*\s+)/).map(s => s.replace(/^(?:-\s+|\*\s+)/, '').trim()).filter(Boolean);
    return `<ul class="list-disc pl-6">${items.map(li => `<li>${li}</li>`).join('')}</ul>`;
  });
  // ordered lists
  mdText = mdText.replace(/(^|\n)\d+\.\s+.+(?:\n\d+\.\s+.+)*/g, block => {
    const items = block.trim().split(/\n\d+\.\s+/).map(s => s.replace(/^\d+\.\s+/, '').trim()).filter(Boolean);
    return `<ol class="list-decimal pl-6">${items.map(li => `<li>${li}</li>`).join('')}</ol>`;
  });
  // paragraphs
  return mdText
    .split(/\n\s*\n/)
    .map(p => /^<h\d|^<ul|^<ol|^<pre|^<img|^<blockquote/.test(p.trim()) ? p : `<p>${p.trim()}</p>`)
    .join('\n\n');
}
