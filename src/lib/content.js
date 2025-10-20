import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const root = process.cwd()
const articlesDirectory = path.join(root, 'content/articles')
const projectsDirectory = path.join(root, 'content/projects')

function readMarkdownFiles(directory) {
  return fs.readdirSync(directory).filter((file) => file.endsWith('.md'))
}

function toIsoDate(value) {
  if (!value) return null
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString()
}

function formatDate(input) {
  if (!input) return ''
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return input
  return date.toLocaleString('en-GB', { month: 'short', year: 'numeric' })
}

function wordsPerMinute(content) {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function normaliseArticle(slug, data, content) {
  const readingMinutes = data.readingTime ?? wordsPerMinute(content)
  const isoDate = toIsoDate(data.date)
  return {
    slug,
    title: data.title ?? slug,
    summary: data.summary ?? '',
    image: data.image ?? '/images/article-1.svg',
    date: isoDate,
    formattedDate: formatDate(isoDate),
    tags: data.tags ?? [],
    readingTimeLabel: `${readingMinutes} min read`,
    featured: Boolean(data.featured),
  }
}

function normaliseProject(slug, data, content) {
  const isoDate = toIsoDate(data.date)
  return {
    slug,
    title: data.title ?? slug,
    summary: data.summary ?? '',
    type: data.type ?? 'Project',
    tags: data.tags ?? [],
    image: data.image ?? '/images/project-1.svg',
    date: isoDate,
    formattedDate: formatDate(isoDate),
    featured: Boolean(data.featured),
    repository: data.repository ?? null,
    githubRepo: data.githubRepo ?? null,
    secondaryPage: data.secondaryPage ?? null,
    secondaryPageLabel: data.secondaryPageLabel ?? null,
    links: data.links ?? [],
    content,
  }
}

export function getAllArticlesMeta() {
  const files = readMarkdownFiles(articlesDirectory)
  const articles = files.map((file) => {
    const slug = file.replace(/\.md$/, '')
    const fullPath = path.join(articlesDirectory, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return normaliseArticle(slug, data, content)
  })

  return articles.sort((a, b) => new Date(b.date ?? 0) - new Date(a.date ?? 0))
}

export async function getArticleBySlug(slug) {
  const fullPath = path.join(articlesDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const htmlContent = await remark().use(html).process(content)
  const meta = normaliseArticle(slug, data, content)

  return {
    ...meta,
    contentHtml: htmlContent.toString(),
  }
}

export function getAllProjectsMeta() {
  const files = readMarkdownFiles(projectsDirectory)
  const projects = files.map((file) => {
    const slug = file.replace(/\.md$/, '')
    const fullPath = path.join(projectsDirectory, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const meta = normaliseProject(slug, data, content)
    return {
      slug: meta.slug,
      title: meta.title,
      summary: meta.summary,
      type: meta.type,
      tags: meta.tags,
      image: meta.image,
      date: meta.date,
      formattedDate: meta.formattedDate,
      featured: meta.featured,
      repository: meta.repository,
      githubRepo: meta.githubRepo,
      secondaryPage: meta.secondaryPage,
      secondaryPageLabel: meta.secondaryPageLabel,
      links: meta.links,
    }
  })

  return projects.sort((a, b) => new Date(b.date ?? 0) - new Date(a.date ?? 0))
}

export async function getProjectBySlug(slug) {
  const fullPath = path.join(projectsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const htmlContent = await remark().use(html).process(content)
  const meta = normaliseProject(slug, data, content)
  let latestRelease = null

  if (meta.githubRepo) {
    try {
      const response = await fetch(`https://api.github.com/repos/${meta.githubRepo}/releases/latest`, {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'aecorn-portfolio-site',
        },
      })

      if (response.ok) {
        const release = await response.json()
        const primaryAsset =
          Array.isArray(release.assets) && release.assets.length > 0
            ? release.assets.find((asset) => asset.name?.toLowerCase().endsWith('.zip')) ?? release.assets[0]
            : null

        latestRelease = {
          tagName: release.tag_name ?? null,
          name: release.name ?? null,
          htmlUrl: release.html_url ?? null,
          publishedAt: release.published_at ?? release.created_at ?? null,
          assetName: primaryAsset?.name ?? null,
          downloadUrl: primaryAsset?.browser_download_url ?? null,
        }
      }
    } catch (error) {
      console.warn(`Failed to fetch latest release for ${meta.githubRepo}:`, error)
    }
  }

  return {
    ...meta,
    contentHtml: htmlContent.toString(),
    latestRelease,
  }
}
