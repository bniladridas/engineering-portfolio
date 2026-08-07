import { notFound } from 'next/navigation'
import { getArticle, getArticles, formatDate } from '@/lib/content'
import Markdown from '@/components/Markdown'
import Badge from '@/components/Badge'

export const dynamicParams = false

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return { title: `${article.title} — Palmshed`, description: article.intro }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  return (
    <article className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      <header style={{ maxWidth: '66ch', marginBottom: 'var(--space-7)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
          {article.tags.map((tag) => (
            <Badge key={tag} tone="green">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1.1, margin: 0 }}>
          {article.title}
        </h1>
        <p style={{ color: 'var(--ink-secondary)', fontSize: 18, marginTop: 'var(--space-4)' }}>
          {article.intro}
        </p>
        <p style={{ color: 'var(--ink-secondary)', fontSize: 14 }}>
          {formatDate(article.date)} · {article.words} words
        </p>
      </header>
      <Markdown>{article.content}</Markdown>
    </article>
  )
}
