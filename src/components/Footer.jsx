import { SITE } from '@/lib/site'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-slate-200 py-8 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
      <div className="site-container flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between">
        <p>&copy; {year} {SITE.yourName}.</p>
        <div className="space-y-1">
          <p className="font-medium text-slate-600 dark:text-slate-300">{SITE.tagline}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{SITE.focus}</p>
        </div>
      </div>
    </footer>
  )
}
