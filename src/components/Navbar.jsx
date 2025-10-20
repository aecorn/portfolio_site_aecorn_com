import { useState } from 'react'

import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'

import ThemeToggle from '@/components/ThemeToggle'
import { SITE, navLinks, socialLinks } from '@/lib/site'

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const logoMark = SITE.yourName
    ? SITE.yourName
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => word.replace(/[^A-Za-z]/g, '').charAt(0))
        .join('')
        .slice(0, 3)
        .toUpperCase() || 'CB'
    : 'CB'

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-transparent bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:bg-slate-950/70 dark:border-slate-800">
      <div className="site-container">
        <div className="flex items-center justify-between gap-6 py-6">
          <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navLinks.map((link) => {
              const isActive = router.pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'relative transition-colors hover:text-slate-900 dark:hover:text-white',
                    isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-300'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-slate-900 dark:bg-white"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <Link
            href="/"
            aria-label="Back to homepage"
            className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-900 shadow-lg shadow-slate-900/5 transition-transform hover:scale-105 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:shadow-slate-950/40"
          >
            <motion.span
              layoutId="logo-ring"
              className="absolute inset-0 rounded-full border border-transparent"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <motion.span
              className="relative tracking-wider"
              initial={false}
              whileHover={{ letterSpacing: '0.25em' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {logoMark}
            </motion.span>
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            <ul className="flex items-center gap-4">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    className="group flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-900 hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:border-white dark:hover:text-white"
                  >
                    <Icon icon={item.icon} className="h-5 w-5 transition group-hover:scale-110" />
                  </a>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-900 hover:text-slate-900 dark:border-slate-800 dark:text-slate-200 dark:hover:border-white dark:hover:text-white md:hidden"
            aria-label="Open navigation"
          >
            <Icon icon="mdi:menu" className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm dark:bg-slate-950/60"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="absolute inset-x-4 top-6 rounded-3xl border border-slate-200 bg-white px-6 py-8 text-slate-900 shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-900 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-white dark:hover:text-white"
                >
                  <Icon icon="mdi:close" className="h-5 w-5" />
                </button>
              </div>
              <nav
                aria-label="Mobile navigation"
                className="mt-8 space-y-3 text-lg font-semibold text-slate-900 dark:text-white"
              >
                {navLinks.map((link) => {
                  const isActive = router.pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={clsx(
                        'flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 transition',
                        isActive
                          ? 'border-slate-300 bg-slate-100 dark:border-slate-500 dark:bg-white/5'
                          : 'hover:border-slate-300 hover:bg-slate-50 dark:hover:border-white/40 dark:hover:bg-white/5'
                      )}
                    >
                      {link.label}
                      <Icon icon="mdi:arrow-top-right" className="h-5 w-5" />
                    </Link>
                  )
                })}
              </nav>

              <div className="mt-10 border-t border-slate-200/60 pt-6 dark:border-white/10">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-500">
                  Find me
                </p>
                <ul className="mt-4 flex items-center gap-4 text-slate-700 dark:text-slate-100">
                  {socialLinks.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition hover:border-slate-900 hover:bg-slate-100 dark:border-white/10 dark:hover:border-white dark:hover:bg-white/10"
                        aria-label={item.label}
                      >
                        <Icon icon={item.icon} className="h-5 w-5" />
                      </a>
                    </li>
                  ))}
                  <ThemeToggle onToggle={closeMenu} />
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
