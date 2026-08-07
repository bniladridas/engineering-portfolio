import type { MetadataRoute } from 'next'
import { getArticles, getPosts, getArchNotes } from '@/lib/content'
import { absUrl } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages: MetadataRoute.Sitemap = [
    { url: absUrl('/'), lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: absUrl('/about/'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absUrl('/articles/'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absUrl('/architecture/'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/posts/'), lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: absUrl('/featured/'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: absUrl('/open-source/'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/now/'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: absUrl('/colophon/'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
  for (const article of getArticles()) {
    pages.push({
      url: absUrl(`/articles/${article.slug}/`),
      lastModified: new Date(article.date),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }
  for (const note of getArchNotes()) {
    pages.push({
      url: absUrl(`/architecture/${note.slug}/`),
      lastModified: new Date(note.date),
      changeFrequency: 'yearly',
      priority: 0.5,
    })
  }
  for (const post of getPosts()) {
    pages.push({
      url: absUrl(`/posts/${post.slug}/`),
      lastModified: new Date(post.date),
      changeFrequency: 'yearly',
      priority: 0.4,
    })
  }
  return pages
}
