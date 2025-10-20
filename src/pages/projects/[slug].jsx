import Head from 'next/head'
import Link from 'next/link'

import { getAllProjectsMeta, getProjectBySlug } from '@/lib/content'
import { SITE } from '@/lib/site'

export default function ProjectDetail({ project }) {
  const externalLinks = [
    project.repository && { label: 'Repository', href: project.repository },
    project.secondaryPage && {
      label: project.secondaryPageLabel || 'Secondary page',
      href: project.secondaryPage,
    },
    ...(project.links ?? []),
  ].filter(Boolean)
  const latestReleaseDate =
    project.latestRelease?.publishedAt && !Number.isNaN(new Date(project.latestRelease.publishedAt).getTime())
      ? new Date(project.latestRelease.publishedAt).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : null
  const latestReleaseVersion = project.latestRelease?.tagName ?? null
  const latestReleaseTitle = project.latestRelease?.name ?? null

  return (
    <>
      <Head>
        <title>{project.title} — {SITE.yourName}</title>
        <meta name="description" content={project.summary} />
      </Head>
      <article className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            {project.type} • {project.formattedDate}
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{project.title}</h1>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">{project.summary}</p>
          {externalLinks.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-white dark:hover:text-white"
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
        </header>
        <div
          className="prose prose-slate max-w-none dark:prose-invert prose-a:text-slate-900 dark:prose-a:text-white"
          dangerouslySetInnerHTML={{ __html: project.contentHtml }}
        />
        {project.latestRelease && (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Latest release</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <span className="font-medium text-slate-500 dark:text-slate-400">Version:</span>{' '}
                {project.latestRelease.htmlUrl ? (
                  <a
                    href={project.latestRelease.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {latestReleaseVersion ?? latestReleaseTitle ?? 'View on GitHub'}
                  </a>
                ) : (
                  latestReleaseVersion ?? latestReleaseTitle ?? 'Not available'
                )}
              </li>
              {latestReleaseTitle && latestReleaseTitle !== latestReleaseVersion && (
                <li>
                  <span className="font-medium text-slate-500 dark:text-slate-400">Title:</span> {latestReleaseTitle}
                </li>
              )}
              {latestReleaseDate && (
                <li>
                  <span className="font-medium text-slate-500 dark:text-slate-400">Published:</span> {latestReleaseDate}
                </li>
              )}
              {project.latestRelease.downloadUrl && (
                <li>
                  <span className="font-medium text-slate-500 dark:text-slate-400">Download:</span>{' '}
                  <a
                    href={project.latestRelease.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {project.latestRelease.assetName ?? 'Download package'}
                  </a>
                </li>
              )}
            </ul>
          </section>
        )}
        <footer className="flex items-center justify-between border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <Link href="/projects" className="inline-flex items-center gap-2 text-slate-700 transition hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
            <span aria-hidden="true">←</span>
            Back to projects
          </Link>
          <Link href="/" className="text-slate-700 underline-offset-4 hover:underline dark:text-slate-200">
            Home
          </Link>
        </footer>
      </article>
    </>
  )
}

export async function getStaticPaths() {
  const projects = getAllProjectsMeta()
  return {
    paths: projects.map((project) => ({ params: { slug: project.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const project = await getProjectBySlug(params.slug)
  return {
    props: {
      project,
    },
  }
}
