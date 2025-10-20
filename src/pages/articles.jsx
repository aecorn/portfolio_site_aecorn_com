import Head from 'next/head'

import ArticleList from '@/components/ArticleList'
import { getAllArticlesMeta } from '@/lib/content'
import { SITE } from '@/lib/site'

export default function ArticlesPage({ articles }) {
  return (
    <>
      <Head>
        <title>Articles — {SITE.yourName}</title>
        <meta name="description" content="Stories from modernization, automation, and collaborative hacks at Statistics Norway." />
      </Head>

      <div className="space-y-10">
        <header className="space-y-4">
          <span className="text-xs font-medium uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            Articles
          </span>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">
            Summaries of my learnings and experiences
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Notes on everything from data science, web development, nerdy projects to farming and life in general.
          </p>
        </header>

        <ArticleList articles={articles} />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const articles = getAllArticlesMeta().map((article) => ({
    title: article.title,
    description: article.summary,
    image: article.image,
    link: `/articles/${article.slug}`,
    date: article.formattedDate,
    readingTime: article.readingTimeLabel,
  }))

  return {
    props: {
      articles,
    },
  }
}
