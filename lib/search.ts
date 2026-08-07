import { getArticles, getPosts } from './content'
import type { SearchEntry } from './search-utils'

export function getSearchIndex(): SearchEntry[] {
  const articles = getArticles().map((a) => ({
    type: 'article' as const,
    title: a.title,
    slug: a.slug,
    href: `/articles/${a.slug}`,
    excerpt: a.intro,
    tags: a.tags,
  }))
  const posts = getPosts().map((p) => ({
    type: 'post' as const,
    title: p.title,
    slug: p.slug,
    href: `/posts/${p.slug}`,
    excerpt: p.hook,
    tags: p.topic ? [p.topic] : [],
  }))
  return [...articles, ...posts]
}
