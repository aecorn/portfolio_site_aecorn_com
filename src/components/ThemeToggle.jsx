import { useEffect, useId } from 'react'

import { motion, useSpring } from 'framer-motion'

import { useTheme } from '@/components/ThemeContext'

const springConfig = { stiffness: 200, damping: 20 }

export default function ThemeToggle({ variant = 'solid', onToggle }) {
  const { theme, toggleTheme, isReady } = useTheme()
  const isDark = theme === 'dark'
  const maskId = useId()

  const moonX = useSpring(isDark ? 12 : 18, springConfig)
  const moonRadius = useSpring(isDark ? 0.01 : 8, springConfig)
  const raysOpacity = useSpring(isDark ? 1 : 0, springConfig)
  const rotation = useSpring(isDark ? 0 : -20, springConfig)

  useEffect(() => {
    moonX.set(isDark ? 12 : 18)
    moonRadius.set(isDark ? 0.01 : 8)
    raysOpacity.set(isDark ? 1 : 0)
    rotation.set(isDark ? 0 : -20)
  }, [isDark, moonRadius, moonX, raysOpacity, rotation])

  const baseClasses =
    'relative flex h-11 w-11 items-center justify-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-white'

  const solidClasses = isDark
    ? 'border border-white/60 bg-white text-slate-900 hover:border-white hover:bg-slate-50'
    : 'border border-slate-900 bg-slate-900 text-white hover:border-slate-950 hover:bg-slate-950'

  const ghostClasses =
    'border border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10'

  const handleClick = () => {
    toggleTheme()
    if (onToggle) onToggle()
  }

  const circleFill = isDark ? '#facc15' : '#e2e8f0'
  const raysColor = isDark ? '#f59e0b' : '#94a3b8'

  return (
    <button
      type="button"
      aria-label={`Activate ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      onClick={handleClick}
      disabled={!isReady}
      className={`${baseClasses} ${variant === 'ghost' ? ghostClasses : solidClasses}`}
    >
      <motion.svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        style={{ rotate: rotation }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <defs>
          <mask id={maskId}>
            <rect x="0" y="0" width="24" height="24" fill="white" />
            <motion.circle cx={moonX} cy="12" r={moonRadius} fill="black" />
          </mask>
        </defs>
        <motion.circle
          cx="12"
          cy="12"
          r="7"
          mask={`url(#${maskId})`}
          fill={circleFill}
          initial={false}
          animate={{ fill: circleFill }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
        <motion.g
          strokeWidth="1.4"
          strokeLinecap="round"
          style={{ opacity: raysOpacity }}
          animate={{ stroke: raysColor }}
        >
          <motion.line x1="12" y1="2.8" x2="12" y2="5.4" />
          <motion.line x1="12" y1="18.6" x2="12" y2="21.2" />
          <motion.line x1="4.8" y1="4.8" x2="6.6" y2="6.6" />
          <motion.line x1="17.4" y1="17.4" x2="19.2" y2="19.2" />
          <motion.line x1="2.8" y1="12" x2="5.4" y2="12" />
          <motion.line x1="18.6" y1="12" x2="21.2" y2="12" />
          <motion.line x1="4.8" y1="19.2" x2="6.6" y2="17.4" />
          <motion.line x1="17.4" y1="6.6" x2="19.2" y2="4.8" />
        </motion.g>
      </motion.svg>
    </button>
  )
}
