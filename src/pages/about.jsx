import Head from 'next/head'
import Image from 'next/image'

import { motion } from 'framer-motion'

import Counter from '@/components/Counter'
import Timeline from '@/components/Timeline'
import { getGithubContributionCounts } from '@/lib/github'
import { getPyPiPackageCount } from '@/lib/pypi'
import { SITE, education, experience, metrics as metricsConfig, skills } from '@/lib/site'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.08, duration: 0.45, ease: 'easeOut' },
  }),
}

export default function AboutPage({ metrics }) {
  return (
    <>
      <Head>
        <title>About — {SITE.yourName}</title>
        <meta name="description" content={`${SITE.tagline} ${SITE.focus}`} />
      </Head>

      <div className="space-y-16">
        <motion.section
          className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeUp} className="space-y-6">
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              About
            </span>
            <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{SITE.tagline}</h1>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">{SITE.focus}</p>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              At Statistics Norway I work specifically on data modernisation of education statistics.
              I&apos;m on the team for the national education database, and I&apos;m responsible for the <a href="https://www.ssb.no/en/utdanning/videregaende-utdanning/statistikk/gjennomforing-i-videregaende-opplaering">Completion rates of pupils in upper secondary education</a>.
              I also enjoy internal tooling, specifically python packages with generalized functionality for other staticians to use.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/60"
          >
            <Image
              src="/images/1709732508184.jpeg"
              alt="Portrait of Carl F. Corneil at Statistics Norway."
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              className="object-cover"
            />
          </motion.div>
        </motion.section>

        <section aria-labelledby="metrics-heading">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="metrics-heading" className="text-2xl font-semibold text-slate-900 dark:text-white">
                A few quick numbers
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                My contributions to code projects.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {metrics.map((metric) => (
              <Counter
                key={metric.label}
                value={metric.value}
                suffix={metric.suffix}
                label={metric.label}
                href={metric.href}
              />
            ))}
          </div>
        </section>

        <section className="grid gap-16 lg:grid-cols-2">
          <Timeline title="Experience" items={experience} />
          <Timeline title="Education" items={education} />
        </section>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const [pypiCount, githubCounts] = await Promise.all([
    getPyPiPackageCount(SITE.pypiUser),
    getGithubContributionCounts(SITE.githubUser, 'statisticsnorway'),
  ])

  const resolvedMetrics = metricsConfig.map((metric) => {
    if (metric.id === 'pypi-packages') {
      return {
        ...metric,
        value: typeof pypiCount === 'number' && pypiCount >= 0 ? pypiCount : 0,
      }
    }

    if (metric.id === 'github-org-contributions') {
      const orgTotal = githubCounts.organisation
      return {
        ...metric,
        value: typeof orgTotal === 'number' && orgTotal >= 0 ? orgTotal : 0,
      }
    }

    if (metric.id === 'github-community-contributions') {
      const outside = githubCounts.communityIssues
      return {
        ...metric,
        value: typeof outside === 'number' && outside >= 0 ? outside : 0,
      }
    }

    return metric
  })

  const enrichedMetrics = resolvedMetrics.map((metric) =>
    typeof metric.value === 'number' ? metric : { ...metric, value: 0 }
  )

  return {
    props: {
      metrics: enrichedMetrics,
    },
  }
}
