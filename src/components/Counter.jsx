import { useEffect, useRef, useState } from 'react'

import { motion, useInView, useSpring } from 'framer-motion'

export default function Counter({ value = 0, suffix = '', label, href }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const spring = useSpring(0, { stiffness: 90, damping: 18 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const unsubscribe = spring.on('change', (current) => {
      setDisplay(Math.round(current))
    })
    return () => unsubscribe()
  }, [spring])

  useEffect(() => {
    if (isInView) {
      spring.set(value ?? 0)
    }
  }, [isInView, spring, value])

  const content = (
    <>
      <motion.span className="text-4xl font-semibold text-slate-900 transition-colors dark:text-white">
        {display}
        {suffix}
      </motion.span>
      <p className="mt-2 text-sm text-slate-500 transition-colors dark:text-slate-400">{label}</p>
    </>
  )

  return (
    <div
      ref={ref}
      className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60"
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 dark:focus-visible:outline-white"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  )
}
