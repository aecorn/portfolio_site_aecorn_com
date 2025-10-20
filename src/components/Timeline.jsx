import { useRef } from 'react'

import { motion, useInView, useScroll, useSpring } from 'framer-motion'

export default function Timeline({ items, title }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.2'],
  })
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 18 })

  return (
    <section ref={containerRef} className="relative">
      {title && <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>}
      <div className="relative mt-6 pl-6 md:pl-10">
        <div className="absolute left-2 top-0 bottom-0 w-1 rounded-full bg-slate-200 dark:bg-slate-800" />
        <motion.div
          className="absolute left-2 top-0 bottom-0 w-1 origin-top rounded-full bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-200"
          style={{ scaleY: lineProgress }}
        />
        <ul className="space-y-10">
          {items.map((item) => (
            <TimelineItem key={`${item.title}-${item.period}`} {...item} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function TimelineItem({ title, company, period, description }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <li ref={ref} className="relative">
      <motion.span
        className="absolute left-[-1.6rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900 md:-left-[42px]"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <span className="h-2 w-2 rounded-full bg-slate-900 dark:bg-white" />
      </motion.span>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">{company}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium tracking-wide text-slate-500 dark:bg-slate-800/70 dark:text-slate-300">
            {period}
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </li>
  )
}
