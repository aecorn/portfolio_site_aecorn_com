import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function ProjectCard({ project, featured = false }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-glow transition dark:border-slate-800 dark:bg-slate-900/60 ${
        featured ? 'p-8 md:p-10' : 'p-6'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100 dark:from-slate-800/40" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-start">
        <Link
          href={project.link}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:border-slate-800 dark:bg-slate-800/60 dark:focus-visible:outline-white md:w-1/2"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            priority={featured}
          />
        </Link>
        <div className="flex flex-1 flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
            {project.type}
          </span>
          <Link href={project.link} className="text-2xl font-semibold text-slate-900 transition hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-white dark:hover:text-slate-200 dark:focus-visible:outline-white">
            {project.title}
          </Link>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {project.description}
          </p>
          <ul className="flex flex-wrap gap-2">
            {project.tags?.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium tracking-wide text-slate-500 dark:border-slate-700 dark:text-slate-300"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <Link
              href={project.link}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-white dark:hover:text-white"
            >
              View project
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 7H17V16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
