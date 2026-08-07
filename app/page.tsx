import Link from 'next/link'
import { getArticles, getCards } from '@/lib/content'
import { site, withBase, absUrl } from '@/lib/site'
import ContentCard from '@/components/ContentCard'
import Reveal from '@/components/Reveal'

export const metadata = {
  alternates: { canonical: absUrl('/') },
}

export default function Home() {
  const articles = getArticles()
  const cards = getCards()
  const latest = articles[0]

  const featuredArticles = cards
    .filter((c) => c.tag === 'article')
    .sort((a, b) => (a.slug < b.slug ? 1 : -1))
    .slice(0, 3)

  const buildCards = cards.filter((c) => ['project', 'projects', 'open-source'].includes(c.tag)).slice(0, 3)

  return (
    <>
      <section
        style={{
          padding: 'var(--space-8) 0',
          borderBottom: '1px solid var(--line)',
          background:
            'repeating-linear-gradient(0deg, transparent 0 39px, var(--grid-line) 39px 40px)',
        }}
      >
        <div className="container">
          <Reveal>
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
              everything I make: systems, tools, and open source.
            </p>
            <div className="action-row" style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <a href={withBase(`/articles/${latest.slug}/`)} className="button button--primary">
                Latest article
              </a>
              <a href={withBase('/architecture/')} className="button button--secondary">
                Architecture notes
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: 'var(--space-8) 0' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow">What I build</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, margin: 'var(--space-2) 0 var(--space-5)' }}>
              Systems, tools, and open source
            </h2>
          </Reveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
              gap: 'var(--space-5)',
            }}
          >
            {buildCards.map((card, i) => (
              <Reveal key={card.slug} delay={Math.min(i, 3) * 80}>
                <ContentCard
                  eyebrow={card.tag.toUpperCase()}
                  title={card.title}
                  subtitle={card.subtitle}
                  href={card.link}
                  tag={card.tag}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--space-8) 0', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <p className="eyebrow">Writing</p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, margin: 'var(--space-2) 0 0' }}>
                  Featured articles
                </h2>
              </div>
              <Link href="/articles" style={{ fontWeight: 500 }}>
                All articles →
              </Link>
            </div>
          </Reveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
              gap: 'var(--space-5)',
              marginTop: 'var(--space-5)',
            }}
          >
            {featuredArticles.map((card, i) => (
              <Reveal key={card.slug} delay={Math.min(i, 3) * 80}>
                <ContentCard
                  eyebrow={card.tag.toUpperCase()}
                  title={card.title}
                  subtitle={card.subtitle}
                  href={card.link}
                  tag={card.tag}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 var(--space-8)' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow">Recent writing</p>
          </Reveal>
          <ul style={{ listStyle: 'none', margin: 'var(--space-4) 0 0', padding: 0 }}>
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

      <section style={{ padding: 'var(--space-8) 0', borderTop: '1px solid var(--line)' }}>
        <div className="container" style={{ maxWidth: '60ch' }}>
          <Reveal>
            <p className="eyebrow">Open source</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, margin: 'var(--space-2) 0 var(--space-3)' }}>
              Built and maintained in public
            </h2>
            <p style={{ color: 'var(--ink-secondary)', fontSize: 18 }}>
              Palmshed is developed in the open: the code, the design notes, and the mistakes.
              Building in public changed how I work, and the practice matters more than the code.
            </p>
            <div className="action-row" style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
              <a href={withBase('/open-source/')} className="button button--primary">
                Open source
              </a>
              <a href={site.author.github} className="button button--secondary" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: 'var(--space-8) 0', borderTop: '1px solid var(--line)' }}>
        <div className="container" style={{ maxWidth: '60ch' }}>
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, margin: 'var(--space-2) 0 var(--space-3)' }}>
              Let&rsquo;s talk about software that lasts
            </h2>
            <p style={{ color: 'var(--ink-secondary)', fontSize: 18 }}>
              I write about maintainable systems and developer tools, and I&rsquo;m happy to talk
              about both: systems design, code review, or building in public.
            </p>
            <div className="action-row" style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
              <a href="mailto:hello@palmshed.dev" className="button button--primary">
                Email me
              </a>
              <a href={site.author.github} className="button button--secondary" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
