import { getArticles, formatDate } from '@/lib/content'
import ContentCard from '@/components/ContentCard'

export const metadata = {
  title: 'Articles · Palmshed',
  description:
    'Long-form engineering writing on maintainable systems, developer tools, open source, and building software that lasts.',
  alternates: { canonical: '/articles' },
}

export default function ArticlesPage() {
  const articles = getArticles()

  return (
    <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      <p className="eyebrow">Writing</p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, margin: 'var(--space-2) 0 var(--space-3)' }}>
        Articles
      </h1>
      <p style={{ color: 'var(--ink-secondary)', fontSize: 18, maxWidth: '52ch' }}>
        Long-form engineering writing on maintainable systems, developer tools, open source, and the
        practice of building software that lasts.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 'var(--space-5)',
          marginTop: 'var(--space-6)',
        }}
      >
        {articles.map((article) => (
          <ContentCard
            key={article.slug}
            eyebrow="Article"
            title={article.title}
            description={article.intro}
            href={`/articles/${article.slug}`}
            tag={article.tags[0]}
            meta={formatDate(article.date)}
          />
        ))}
      </div>
    </div>
  )
}
