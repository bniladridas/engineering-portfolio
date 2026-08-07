export const site = {
  name: 'Palmshed',
  title: 'Palmshed · Software Engineer',
  description:
    'Maintainable systems, developer tools, and open source. Software engineering portfolio and writing.',
  // Origin only (no path). Set NEXT_PUBLIC_SITE_URL when deploying somewhere
  // other than the default domain.
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

// Sub-path the site is deployed under (e.g. "/engineering-portfolio" on
// GitHub Pages). Empty string means the site is served at the domain root.
// Configured via the same env var used by next.config.mjs so navigation
// links, assets, and generated URLs stay consistent.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Prefix a root-relative path with the basePath.
export function withBase(path: string): string {
  if (!basePath) return path
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`
}

// Absolute URL for a root-relative path, honoring basePath.
export function absUrl(path: string): string {
  return `${site.url}${withBase(path)}`
}

export function resolveRefUrl(url: string): string {
  if (/^https?:\/\//.test(url)) return url
  return `${site.github}/${url.replace(/^\//, '')}`
}
