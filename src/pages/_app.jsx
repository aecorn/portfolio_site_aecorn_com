import '@/styles/globals.css'

import PageTransition from '@/components/PageTransition'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/ThemeContext'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
  display: 'swap',
})

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div
        className={`${montserrat.variable} font-montserrat flex min-h-screen flex-col bg-white transition-colors duration-300 dark:bg-slate-950`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <PageTransition>
          <main id="main-content" className="site-container flex-1 py-12 sm:py-16">
            <Component {...pageProps} />
          </main>
        </PageTransition>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
