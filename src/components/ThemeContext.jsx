import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  isReady: false,
  setTheme: () => {},
  toggleTheme: () => {},
})

const STORAGE_KEY = 'cb-theme'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
    const initial = stored === 'dark' || stored === 'light' ? stored : 'dark'
    setTheme(initial)
    applyTheme(initial)
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (!isReady) return
    applyTheme(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme, isReady])

  const value = useMemo(
    () => ({
      theme,
      isReady,
      setTheme,
      toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [theme, isReady]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}

function applyTheme(themeValue) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  const next = themeValue === 'dark' ? 'dark' : 'light'
  root.classList.remove('light', 'dark')
  root.classList.add(next)
}
