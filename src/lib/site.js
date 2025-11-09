export const SITE = {
  yourName: 'Carl F. Corneil',
  tagline: 'Fail fast, learn through grit.',
  focus:
    'Culture, media and education statistics. Focusing on modernization, automation and transitioning to cloud.',
  githubUser: 'aecorn',
  linkedinUrl: 'https://www.linkedin.com/in/carl-corneil-4312098/',
  pypiUser: 'aecorn',
  pypiUrl: 'https://pypi.org/user/aecorn/',
  farmUrl: 'https://www.skogensverksted.no',
  imdbUrl: 'https://www.imdb.com/name/nm3015785/',
  email: 'aecorn@gmail.com',
}

export const hero = {
  badge: SITE.tagline,
  headline: 'Modernizing culture, media, and education statistics for the cloud era.',
  subheading: SITE.focus,
  linkedinUrl: SITE.linkedinUrl,
  email: `mailto:${SITE.email}`,
}

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Articles', href: '/articles' },
]

export const socialLinks = [
  {
    label: 'GitHub',
    href: `https://github.com/${SITE.githubUser}`,
    icon: 'mdi:github',
  },
  {
    label: 'LinkedIn',
    href: SITE.linkedinUrl,
    icon: 'mdi:linkedin',
  },
  {
    label: 'Farm',
    href: SITE.farmUrl,
    icon: 'mdi:tractor',
  },
  {
    label: 'IMDb',
    href: SITE.imdbUrl,
    icon: 'mdi:filmstrip',
  },
]

const githubSearchUrlPrs = (query) => `https://github.com/search?q=${encodeURIComponent(query)}&type=pullrequests`
const githubSearchUrlIssues = (query) => `https://github.com/search?q=${encodeURIComponent(query)}&type=issues`


export const metrics = [
  {
    id: 'pypi-packages',
    label: 'Packages published to PyPI',
    suffix: '',
    href: SITE.pypiUrl,
  },
  {
    id: 'github-org-contributions',
    label: 'Merged PRs at Statistics Norway on Public Repos',
    suffix: '',
    href: githubSearchUrlPrs(`author:${SITE.githubUser} org:statisticsnorway is:pr is:merged`),
  },
  {
    id: 'github-community-contributions',
    label: 'Solved issues on repoes owned by me',
    suffix: '',
    href: githubSearchUrlIssues(`owner:${SITE.githubUser} -org:statisticsnorway is:issue is:closed`),
  },
] 

export const experience = [
  {
    title: 'Senior Advisor, Education and Culture Statistics',
    company: 'Statistics Norway (SSB)',
    period: '2020 — Present',
    description:
      'Leading modernization across culture, media, and education statistics. Driving automation, cloud transitions, and developer enablement.',
  },
  {
    title: 'Media Manager, Data and Render Wrangler, Conform, Technical Editor, Compositing, Animation, Motion-Graphics etc.',
    company: 'Qvisten Animation',
    period: '2009 — 2020',
    description:
      'Managed media and data pipelines for award-winning animated films and series, ensuring efficient workflows and high-quality outputs.',
  },
  {
    title: 'Wordpress designer & developer',
    company: 'Independant contractor',
    period: '2010 — 2015',
    description:
      '"On my spare time" - Designed and developed custom WordPress themes and plugins for small businesses, enhancing their online presence and functionality. Companies like Eggen Arkitekter, Ølakademiet, Qvisten etc.',
  },
]

export const education = [
  {
    title: 'Cloud developer',
    company: 'University of Inland Norway',
    period: 'Feb 2024 - Apr 2025',
    description: 'The Education provides basic programming skills, linked to the necessary mathematical understanding to be able to develop for cloud services, how to develop for cloud services yourself and how to use it in today\'s structures.',
  
  },
  {
    title: 'Practical Pedagogical Education (PPU)',
    company: 'Oslo and Akershus University College',
    period: '2016-2018',
    description: 'Completed the one-year Practical Pedagogical Education program, equipping me with essential teaching skills and methodologies for effective knowledge transfer.',
  
  },
  {
    title: 'Bachelor in Animation',
    company: 'Volda University College',
    period: '2006 — 2009',
    description: 'Focused on 3D and Cut-Out animation, storytelling, and visual effects, gaining a solid foundation in both technical skills and creative processes.',
  },
]
