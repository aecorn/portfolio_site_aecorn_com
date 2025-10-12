import { qs } from './render/dom.js';

function timeAgo(iso) {
  const t = new Date(iso).getTime();
  const mins = Math.floor((Date.now() - t) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export async function renderGithubActivity(username) {
  const activityList = qs('#activityList');
  const activityHint = qs('#activityHint');
  if (!username) return;

  try {
    const res = await fetch(`https://api.github.com/users/${username}/events/public`);
    if (!res.ok) throw new Error('GitHub API error');
    const events = await res.json();
    const html = events
      .filter(e => ['PushEvent','PullRequestEvent','IssuesEvent','CreateEvent','ReleaseEvent'].includes(e.type))
      .slice(0, 6)
      .map(e => {
        const repo = e.repo?.name || '';
        const when = timeAgo(e.created_at);
        let title = '';
        switch (e.type) {
          case 'PushEvent': title = `Pushed ${(e.payload?.commits?.length || 1)} commit(s) to <strong>${repo}</strong>`; break;
          case 'PullRequestEvent': title = `${e.payload.action} PR <strong>#${e.payload.number}</strong> in <strong>${repo}</strong>`; break;
          case 'IssuesEvent': title = `${e.payload.action} issue <strong>#${e.payload.issue?.number}</strong> in <strong>${repo}</strong>`; break;
          case 'CreateEvent': title = `Created ${e.payload.ref_type} <strong>${e.payload.ref || repo}</strong>`; break;
          case 'ReleaseEvent': title = `${e.payload.action} release <strong>${e.payload.release?.tag_name}</strong> in <strong>${repo}</strong>`; break;
        }
        return `
          <article class="rounded-2xlr p-5 bg-white/70 glass shadow-soft">
            <div class="text-sm opacity-70">${when}</div>
            <div class="mt-1">${title}</div>
            <a href="https://github.com/${repo}" class="inline-block mt-3 text-sm underline">View repo</a>
          </article>`;
      }).join('');
    activityList.innerHTML = html;
    activityHint.style.display = 'none';
  } catch {
    activityList.innerHTML = `<div class="rounded-2xlr p-6 bg-white/70 glass shadow-soft">Could not load GitHub activity.</div>`;
  }
}
