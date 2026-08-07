export interface SearchEntry {
  type: 'article' | 'post'
  title: string
  slug: string
  href: string
  excerpt: string
  tags: string[]
}

export function search(query: string, index: SearchEntry[]): SearchEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return index
    .filter((entry) => {
      const haystack = `${entry.title} ${entry.excerpt} ${entry.tags.join(' ')}`.toLowerCase()
      return q.split(/\s+/).every((term) => haystack.includes(term))
    })
    .slice(0, 12)
}
