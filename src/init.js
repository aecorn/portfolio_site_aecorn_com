import { qs, show, hide } from './render/dom.js';
import { loadIndex } from './api.js';
import { makeRouter } from './router.js';
import { renderGithubActivity } from './github.js';
import { renderProjectsList, renderPostsList, populateTags } from './render/lists.js';

export async function init(SITE) {
  // header + links
  qs('#site-name').textContent = SITE.yourName;
  qs('#site-tagline').textContent = SITE.tagline;
  qs('#emailLink').href = `mailto:${SITE.email}`;
  qs('#githubLink').href = `https://github.com/${SITE.githubUser}`;
  qs('#githubLink').textContent = `@${SITE.githubUser}`;
  qs('#ln-github').href = `https://github.com/${SITE.githubUser}`;
  qs('#ln-linkedin').href = SITE.linkedinUrl;
  qs('#ln-farm').href = SITE.farmUrl;
  qs('#ln-imdb').href = SITE.imdbUrl;
  qs('#year').textContent = new Date().getFullYear();
  qs('#footer-name').textContent = SITE.yourName;

  // load data
  const [PROJECTS, POSTS] = await Promise.all([
    loadIndex(SITE.projectsPath),
    loadIndex(SITE.blogPath)
  ]);

  // render lists
  if (PROJECTS.length) { show(qs('#projectsSection')); renderProjectsList(PROJECTS); } else { hide(qs('#projectsSection')); }
  if (POSTS.length)    { show(qs('#blogSection')); populateTags(POSTS); renderPostsList(POSTS); } else { hide(qs('#blogSection')); }

  // search + tag filter
  qs('#searchInput')?.addEventListener('input', e => renderPostsList(POSTS, { q: e.target.value, tag: qs('#tagFilter')?.value || '' }));
  qs('#tagFilter')?.addEventListener('change', e => renderPostsList(POSTS, { q: qs('#searchInput')?.value || '', tag: e.target.value }));

  // github activity
  renderGithubActivity(SITE.githubUser);

  // router
  const state = { PROJECTS, POSTS, paths: { blog: SITE.blogPath, projects: SITE.projectsPath } };
  const router = makeRouter(state);
  router.route();

// Dynamically populate Open Graph and Twitter meta tags
function setMetaTag(name, property, content) {
    let tag = document.querySelector(`meta[${name}="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(name, property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  }
  
  // Set Open Graph meta tags
  setMetaTag('property', 'og:title', `${SITE.yourName} - Homepage`);
  setMetaTag('property', 'og:description', SITE.tagline || 'Explore my portfolio with projects, blog posts, and more!');
  setMetaTag('property', 'og:image', SITE.imageUrl || 'https://yourwebsite.com/images/default-image.jpg');
  setMetaTag('property', 'og:url', SITE.url || window.location.href);
  setMetaTag('property', 'og:type', 'website');
  
  // Set Twitter Card meta tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', `${SITE.yourName} - Homepage`);
  setMetaTag('name', 'twitter:description', SITE.tagline || 'Explore my portfolio with projects, blog posts, and more!');
  setMetaTag('name', 'twitter:image', SITE.imageUrl || 'https://yourwebsite.com/images/default-image.jpg');

}
