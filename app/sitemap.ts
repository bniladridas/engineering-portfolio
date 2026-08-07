import type { MetadataRoute } from 'next'
import { getArticles, getPosts, getArchNotes } from '@/lib/content'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/articles`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site.url}/architecture`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/posts`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${site.url}/featured`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${site.url}/open-source`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/now`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]
  for (const article of getArticles()) {
    pages.push({
      url: `${site.url}/articles/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }
  for (const note of getArchNotes()) {
    pages.push({
      url: `${site.url}/architecture/${note.slug}`,
      lastModified: new Date(note.date),
      changeFrequency: 'yearly',
      priority: 0.5,
    })
  }
  for (const post of getPosts()) {
    pages.push({
      url: `${site.url}/posts/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly',
      priority: 0.4,
    })
  }
  return pages
}
