import { notFound } from 'next/navigation'
import { getPosts, getPost, formatDate } from '@/lib/content'
import Markdown from '@/components/Markdown'
import Badge from '@/components/Badge'

export const dynamicParams = false

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: `${post.title} — Palmshed` }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <article className="container" style={{ maxWidth: 760, paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      <Badge tone="green">{post.topic}</Badge>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, lineHeight: 1.15, margin: 'var(--space-4) 0' }}>
        {post.title}
      </h1>
      <p style={{ color: 'var(--ink-secondary)', fontSize: 14, margin: '0 0 var(--space-6)' }}>
        {formatDate(post.date)}
      </p>
      <Markdown>{post.content}</Markdown>
    </article>
  )
}
