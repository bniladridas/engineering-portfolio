export function getReadingTime(words: number): string {
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function extractToc(content: string): { id: string; text: string; depth: number }[] {
  const items: { id: string; text: string; depth: number }[] = []
  for (const line of content.split('\n')) {
    const m = line.match(/^(##|###)\s+(.+)$/)
    if (m) {
      const depth = m[1].length
      items.push({ id: slugifyHeading(m[2]), text: m[2], depth })
    }
  }
  return items
}
