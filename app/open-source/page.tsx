import { getCards } from '@/lib/content'
import ContentCard from '@/components/ContentCard'
import Markdown from '@/components/Markdown'
import Badge from '@/components/Badge'

export const metadata = { title: 'Open Source — Palmshed' }

export default function OpenSourcePage() {
  const cards = getCards()
  const openSource = cards.filter((c) => c.tag === 'open-source' || c.tag === 'project')

  return (
    <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      <p className="eyebrow">Open Source</p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, margin: 'var(--space-2) 0 var(--space-3)' }}>
        Open source
      </h1>
      <p style={{ color: 'var(--ink-secondary)', fontSize: 18, maxWidth: '52ch' }}>
        Building in public, contributing with intention, and treating strangers&rsquo; time as
        precious. The practice matters more than the code.
      </p>

      <div className="prose" style={{ marginTop: 'var(--space-6)' }}>
        <Markdown>
          {`
## Projects

- **kit** — a command-line developer tool, built and maintained in public. [Repository](https://github.com/palmshed/kit)

## How I contribute

- I fix the rough edges of software I actually use.
- Reviews are translations, not gates: point at the line, suggest the alternative, say why.
- I keep every change small enough to review honestly.

## The practice

Open source taught me to separate feedback about code from judgment about people. It taught me that maintainers are translators, not gatekeepers. And it taught me that a contribution is a collaboration, not a performance.
`}
        </Markdown>
      </div>

      <div style={{ marginTop: 'var(--space-8)' }}>
        <p className="eyebrow">Selected</p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'var(--space-5)',
            marginTop: 'var(--space-4)',
          }}
        >
          {openSource.map((card) => (
            <ContentCard
              key={card.slug}
              eyebrow={card.tag.toUpperCase()}
              title={card.title}
              subtitle={card.subtitle}
              href={card.link}
              tag={card.tag}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
