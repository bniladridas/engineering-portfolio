import { notFound } from 'next/navigation'
import { getPosts, getPost, formatDate } from '@/lib/content'
import { getReadingTime } from '@/lib/reading'
import { site, absUrl } from '@/lib/site'
import Markdown from '@/components/Markdown'
import Badge from '@/components/Badge'
import CopyLinkButton from '@/components/CopyLinkButton'

export const dynamicParams = false

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  const url = absUrl(`/posts/${post.slug}/`)
  return {
    title: `${post.title} — Palmshed`,
    description: post.hook,
    alternates: { canonical: url },
    openGraph: { type: 'article', url, title: post.title, description: post.hook },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.hook,
    datePublished: post.date,
    author: { '@type': 'Person', name: site.author.name, url: site.url },
    url: absUrl(`/posts/${post.slug}/`),
  }

  return (
    <article
      className="container"
      style={{ maxWidth: 760, paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Badge tone="green">{post.topic}</Badge>
        <CopyLinkButton />
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, lineHeight: 1.15, margin: 'var(--space-4) 0' }}>
        {post.title}
      </h1>
      <p style={{ color: 'var(--ink-secondary)', fontSize: 14, margin: '0 0 var(--space-6)' }}>
        {formatDate(post.date)} · {getReadingTime(Math.round(post.content.split(/\s+/).length))}
      </p>
      <Markdown>{post.content}</Markdown>
    </article>
  )
}
