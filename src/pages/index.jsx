import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { motion } from 'framer-motion'

import CircularText from '@/components/CircularText'
import { SITE, hero } from '@/lib/site'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Home() {
  return (
    <>
      <Head>
        <title>{SITE.yourName} — {SITE.tagline}</title>
        <meta name="description" content={SITE.focus} />
      </Head>

      <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          className="flex justify-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="/images/hero_image.png"
            alt="Carl F. Corneil having a drink"
            width={1024}
            height={1024}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full max-w-xl rounded-3xl object-contain"
          />
        </motion.div>

        <div className="space-y-8">
          <motion.span
            className="inline-flex items-center rounded-full border border-slate-200 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {hero.badge}
          </motion.span>
          <motion.h1
            className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl dark:text-white"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            {hero.headline}
          </motion.h1>
          <motion.p
            className="max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            {hero.subheading}
          </motion.p>

          <motion.div
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <Link
              href={hero.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-900 bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              See LinkedIn profile
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 12h10m0 0-4-4m4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <CircularText>
              <Link
                href={hero.email}
                className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              >
                Email me
              </Link>
            </CircularText>
          </motion.div>
        </div>
      </section>
    </>
  )
}
