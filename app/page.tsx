import Link from 'next/link'
import { getArticles, getCards } from '@/lib/content'
import ContentCard from '@/components/ContentCard'
import Badge from '@/components/Badge'

export default function Home() {
  const articles = getArticles()
  const cards = getCards()
  const latest = articles[0]
  const featured = cards.slice(0, 4)

  return (
    <>
      <section
        style={{
          padding: 'var(--space-8) 0',
          borderBottom: '1px solid var(--line)',
          background:
            'repeating-linear-gradient(0deg, transparent 0 39px, rgba(227,227,224,0.35) 39px 40px)',
        }}
      >
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 'var(--space-4)' }}>
            Software Engineer · Open Source · Developer Tools
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 1.05,
              margin: 0,
              maxWidth: '18ch',
              fontWeight: 600,
            }}
          >
            I build software that{' '}
            <span style={{ color: 'var(--green)' }}>outlasts its authors.</span>
          </h1>
          <p
            style={{
              maxWidth: '52ch',
              color: 'var(--ink-secondary)',
              fontSize: 19,
              marginTop: 'var(--space-5)',
              marginBottom: 'var(--space-6)',
            }}
          >
            The longer I build software, the less I believe writing code is the difficult part.
            Keeping software understandable, maintainable, and adaptable is. That belief shows up in
            everything I make — systems, tools, and open source.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <a
              href={`/articles/${latest.slug}`}
              style={{
                background: 'var(--green)',
                color: 'var(--white)',
                padding: '12px 24px',
                borderRadius: 8,
                fontWeight: 600,
              }}
            >
              Latest article
            </a>
            <a
              href="/about"
              style={{
                border: '1px solid var(--line)',
                color: 'var(--black)',
                padding: '12px 24px',
                borderRadius: 8,
                fontWeight: 600,
              }}
            >
              About me
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--space-8) 0' }}>
        <div className="container">
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <p className="eyebrow">Featured</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, margin: 'var(--space-2) 0 0' }}>
              Selected work
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 'var(--space-5)',
            }}
          >
            {featured.map((card) => (
              <ContentCard
                key={card.slug}
                eyebrow={card.tag.toUpperCase()}
                title={card.title}
                subtitle={card.subtitle}
                href={card.link.startsWith('/') ? card.link : '/featured'}
                tag={card.tag}
              />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 var(--space-8)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <p className="eyebrow">Writing</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, margin: 'var(--space-2) 0 0' }}>
                Recent articles
              </h2>
            </div>
            <Link href="/articles" style={{ fontWeight: 500 }}>
              All articles →
            </Link>
          </div>
          <ul style={{ listStyle: 'none', margin: 'var(--space-6) 0 0', padding: 0 }}>
            {articles.slice(0, 5).map((article) => (
              <li
                key={article.slug}
                style={{ borderBottom: '1px solid var(--line)', padding: 'var(--space-4) 0' }}
              >
                <Link
                  href={`/articles/${article.slug}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 'var(--space-4)',
                    alignItems: 'baseline',
                    color: 'var(--black)',
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{article.title}</span>
                  <span style={{ color: 'var(--ink-secondary)', fontSize: 14, whiteSpace: 'nowrap' }}>
                    {article.tags[0] ?? ''}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
