import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <meta name="color-scheme" content="light dark" />
      </Head>
      <body className="bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
