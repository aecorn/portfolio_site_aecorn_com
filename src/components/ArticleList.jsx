import { useState } from 'react'

import { motion, useSpring } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function ArticleList({ articles }) {
  const [active, setActive] = useState(null)

  const x = useSpring(0, { stiffness: 120, damping: 25, mass: 0.4 })
  const y = useSpring(0, { stiffness: 120, damping: 25, mass: 0.4 })
  const opacity = useSpring(0, { stiffness: 250, damping: 35 })

  const handleMove = (event, article) => {
    x.set(event.clientX)
    y.set(event.clientY - 40)
    setActive(article)
    opacity.set(1)
  }

  const handleLeave = () => {
    setActive(null)
    opacity.set(0)
  }

  return (
    <div className="relative">
      <ul className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white shadow-sm dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900/60">
        {articles.map((article) => (
          <li key={article.title}>
            <Link
              href={article.link}
              className="flex flex-col gap-3 px-6 py-6 transition hover:bg-slate-50 dark:hover:bg-slate-800/40 md:flex-row md:items-center md:justify-between"
              onMouseMove={(event) => handleMove(event, article)}
              onMouseLeave={handleLeave}
              onFocus={(event) => handleMove(event, article)}
              onBlur={handleLeave}
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{article.title}</h3>
                <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                  {article.description}
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:gap-4">
                <span className="rounded-full bg-slate-100 px-3 py-1 font-medium dark:bg-slate-800/50">
                  {article.date}
                </span>
                <span>{article.readingTime}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
