import { notFound } from 'next/navigation'
import { getArticle, getArticles, formatDate } from '@/lib/content'
import { getReadingTime, extractToc } from '@/lib/reading'
import { site } from '@/lib/site'
import Markdown from '@/components/Markdown'
import Badge from '@/components/Badge'
import TableOfContents from '@/components/TableOfContents'
import CopyLinkButton from '@/components/CopyLinkButton'
import PrevNext from '@/components/PrevNext'
import References from '@/components/References'

export const dynamicParams = false

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  const url = `${site.url}/articles/${article.slug}`
  return {
    title: `${article.title} — Palmshed`,
    description: article.intro,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.intro,
      publishedTime: article.date,
      tags: article.tags,
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const articles = getArticles()
  const index = articles.findIndex((a) => a.slug === slug)
  const previous = articles[index + 1]
  const next = articles[index - 1]
  const toc = extractToc(article.content)
  const readingTime = getReadingTime(article.words)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.intro,
    datePublished: article.date,
    author: { '@type': 'Person', name: site.author.name, url: site.url },
    publisher: { '@type': 'Person', name: site.author.name, url: site.url },
    url: `${site.url}/articles/${article.slug}`,
    keywords: article.tags.join(', '),
  }

  return (
    <article className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: 'var(--space-6)',
          alignItems: 'start',
        }}
      >
        <aside style={{ position: 'sticky', top: 'var(--space-6)' }}>
          <TableOfContents items={toc} />
        </aside>
        <div>
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                color: 'var(--ink-secondary)',
                fontSize: 14,
                marginTop: 'var(--space-4)',
              }}
            >
              <span>{formatDate(article.date)}</span>
              <span aria-hidden>·</span>
              <span>{readingTime}</span>
              <span aria-hidden>·</span>
              <span>{article.words} words</span>
              <span style={{ marginLeft: 'auto' }}>
                <CopyLinkButton />
              </span>
            </div>
          </header>
          <Markdown>{article.content}</Markdown>

          <References references={article.references} />

          <PrevNext previous={previous} next={next} />
        </div>
      </div>
    </article>
  )
}
