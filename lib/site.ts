export const site = {
  name: 'Palmshed',
  title: 'Palmshed — Software Engineer',
  description:
    'Maintainable systems, developer tools, and open source. Software engineering portfolio and writing.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://palmshed.dev',
  // The only place you need to edit placeholder links.
  // Set this to your real GitHub profile and every reference, sitemap
  // entry, and social link resolves from it.
  github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/palmshed',
  author: {
    name: 'Palmshed',
    jobTitle: 'Software Engineer',
    headline: 'Software Engineer | Open Source | Developer Tools | Systems',
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/palmshed',
    type: 'Person',
  },
}

export function resolveRefUrl(url: string): string {
  if (/^https?:\/\//.test(url)) return url
  return `${site.github}/${url.replace(/^\//, '')}`
}
