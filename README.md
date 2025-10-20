# CB Studio Portfolio Starter

Production-ready starter for a creative/frontend portfolio built with Next.js (pages router), Tailwind CSS, and Framer Motion. It ships with light/dark theming, animated interactions, and placeholder content so you can focus on your story.

## Getting Started

- Install dependencies: `npm install`
- Run the dev server: `npm run dev`
- Visit `http://localhost:3000` to explore the starter pages.

## What’s Included

- Four prebuilt routes: Home, About, Projects, Articles
- Responsive navigation with Iconify icons, animated theme toggle, and overlay menu
- Page transitions, counters, timelines, and hover-driven article previews powered by Framer Motion
- Tailwind CSS configured for the `/src` directory and Montserrat loaded via `next/font`
- Placeholder assets in `public/images` and a sample resume in `public/docs/resume.pdf`

## Customize

- Update global copy (tagline, skills, metrics) in `src/lib/site.js`
- Add or edit projects in `content/projects/*.md`
- Add or edit articles in `content/articles/*.md`
- Replace image placeholders inside `public/images`
- Swap `public/docs/resume.pdf` with your own resume
- Adjust Tailwind tokens, colors, or shadows in `tailwind.config.js`

When you’re ready to deploy, run `npm run build` followed by `npm run start` (or deploy directly to Vercel).
