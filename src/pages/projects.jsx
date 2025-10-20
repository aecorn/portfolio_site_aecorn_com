import Head from 'next/head'

import { motion } from 'framer-motion'

import ProjectCard from '@/components/ProjectCard'
import { getAllProjectsMeta } from '@/lib/content'
import { SITE } from '@/lib/site'

export default function ProjectsPage({ projects }) {
  const featuredProject = projects.find((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  return (
    <>
      <Head>
        <title>Projects — {SITE.yourName}</title>
        <meta name="description" content="Detailing the things I build in my spare time, or public things from work." />
      </Head>

      <div className="space-y-12">
        <header className="space-y-4">
          <span className="text-xs font-medium uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            Projects made by me.
          </span>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">
            Showcasing what I make on my spare time, or public stuff from work.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Projects that showcase my skills, playfulness and curiosity—ranging from web apps to data tools and automations.
          </p>
        </header>

        {featuredProject && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <ProjectCard project={featuredProject} featured />
          </motion.div>
        )}

        {otherProjects.length > 0 && (
          <section className="grid gap-8 lg:grid-cols-2">
            {otherProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </section>
        )}
      </div>
    </>
  )
}

export async function getStaticProps() {
  const projectsMeta = getAllProjectsMeta()
  const hasFeatured = projectsMeta.some((project) => project.featured)
  const projects = projectsMeta.map((project, index) => ({
    title: project.title,
    type: project.type,
    description: project.summary,
    tags: project.tags,
    image: project.image,
    link: `/projects/${project.slug}`,
    featured: hasFeatured ? project.featured : index === 0,
  }))

  return {
    props: {
      projects,
    },
  }
}
