const DEFAULT_HEADERS = {
  'User-Agent': 'aecorn-portfolio-bot',
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
}

async function fetchGithubCount(query) {
  if (!query) return null

  const headers = { ...DEFAULT_HEADERS }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    const response = await fetch(
      `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&per_page=1`,
      { headers }
    )
    if (!response.ok) {
      console.error('GitHub API request failed', response.status, response.statusText)
      return null
    }
    const payload = await response.json()
    const { total_count: totalCount } = payload || {}
    return typeof totalCount === 'number' ? totalCount : null
  } catch (error) {
    console.error('Unable to reach GitHub API', error)
    return null
  }
}

export async function getGithubContributionCounts(username, organisation) {
  if (!username) {
    return { total: null, organisation: null, communityIssues: null }
  }

  const totalQuery = `owner:${username} is:pr is:merged`
  const orgQuery = organisation ? `author:${username} org:${organisation} is:pr is:merged` : null
  const communityIssuesQuery = `owner:${username} -org:${organisation} is:issue is:closed`

  const [total, organisationTotal, communityIssues] = await Promise.all([
    fetchGithubCount(totalQuery),
    fetchGithubCount(orgQuery),
    fetchGithubCount(communityIssuesQuery),
  ])

  return {
    total,
    organisation: organisationTotal,
    communityIssues,
  }
}
