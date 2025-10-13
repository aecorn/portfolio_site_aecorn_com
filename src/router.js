import { qs, show, hide } from './render/dom.js';
import { showProjectDetail, showPostDetail } from './render/detail.js';

export function makeRouter(state) {
  function route() {
    const [_, section, slug] = (location.hash || '#/').split('/');
    hide(qs('#detailSection')); show(qs('#introSection')); show(qs('#projectsSection')); show(qs('#activitySection')); show(qs('#linksSection')); show(qs('#showreelSection'));

    switch (section) {
      case 'projects':
        if (slug) return showProjectDetail(state.PROJECTS.find(p => p.slug === decodeURIComponent(slug)), state.paths.projects);
        show(qs('#projectsSection')); hide(qs('#introSection')); hide(qs('#activitySection')); hide(qs('#blogSection')); hide(qs('#linksSection')); hide(qs('#showreelSection')); break;
      case 'blog':
        if (slug) return showPostDetail(state.POSTS.find(p => p.slug === decodeURIComponent(slug)), state.paths.blog);
        show(qs('#blogSection')); hide(qs('#introSection')); hide(qs('#activitySection')); hide(qs('#projectsSection')); hide(qs('#linksSection'));hide(qs('#showreelSection')); break;
      case 'activity':
        show(qs('#activitySection')); hide(qs('#introSection')); hide(qs('#projectsSection')); hide(qs('#blogSection')); hide(qs('#linksSection'));hide(qs('#showreelSection')); break;
      case 'links':
        show(qs('#linksSection')); hide(qs('#introSection'));  hide(qs('#activitySection')); hide(qs('#projectsSection')); hide(qs('#blogSection'));hide(qs('#showreelSection')); break;
      default:
        // Home: show both if they have content
        state.PROJECTS.length ? show(qs('#projectsSection')) : hide(qs('#projectsSection'));
        state.POSTS.length ? show(qs('#blogSection')) : hide(qs('#blogSection'));
        hide(qs('#detailSection'));
    }
  }
  window.addEventListener('hashchange', route);
  return { route };
}
