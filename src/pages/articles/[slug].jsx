import Head from 'next/head'
import Link from 'next/link'

import { getAllArticlesMeta, getArticleBySlug } from '@/lib/content'
import { SITE } from '@/lib/site'

export default function ArticleDetail({ article }) {
  return (
    <>
      <Head>
        <title>{article.title} — {SITE.yourName}</title>
        <meta name="description" content={article.summary} />
      </Head>
      <article className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            {article.formattedDate} • {article.readingTimeLabel}
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{article.title}</h1>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">{article.summary}</p>
        </header>
        <div
          className="prose prose-slate max-w-none dark:prose-invert prose-a:text-slate-900 dark:prose-a:text-white"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
        <footer className="flex items-center justify-between border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <Link href="/articles" className="inline-flex items-center gap-2 text-slate-700 transition hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
            <span aria-hidden="true">←</span>
            Back to articles
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
  const articles = getAllArticlesMeta()
  return {
    paths: articles.map((article) => ({ params: { slug: article.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const article = await getArticleBySlug(params.slug)
  return {
    props: {
      article,
    },
  }
}
