import { getArticles, getPosts } from '@/lib/content'
import { site, absUrl } from '@/lib/site'

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export const dynamic = 'force-static'

export function GET() {
  const now = new Date().toUTCString()
  const items = [...getArticles(), ...getPosts()].map((entry) => {
    const isArticle = 'intro' in entry
    const href = isArticle ? `/articles/${entry.slug}/` : `/posts/${entry.slug}/`
    const description = isArticle ? entry.intro : entry.hook
    const item = `
  <item>
    <title>${escapeXml(entry.title)}</title>
    <link>${absUrl(href)}</link>
    <guid isPermaLink="true">${absUrl(href)}</guid>
    <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
    <description>${escapeXml(description)}</description>
  </item>`
    return item
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.title)}</title>
    <link>${absUrl('/')}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${absUrl('/feed.xml')}" rel="self" type="application/rss+xml"/>
    ${items.join('\n')}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
