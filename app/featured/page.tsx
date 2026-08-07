import { getCards } from '@/lib/content'
import ContentCard from '@/components/ContentCard'

export const metadata = { title: 'Featured · Palmshed' }
export default function FeaturedPage() {
  const cards = getCards()

  return (
    <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      <p className="eyebrow">Selected work</p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, margin: 'var(--space-2) 0 var(--space-3)' }}>
        Featured
      </h1>
      <p style={{ color: 'var(--ink-secondary)', fontSize: 18, maxWidth: '52ch' }}>
        The cards behind the featured section of the profile: articles, projects, and open source.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 'var(--space-5)',
          marginTop: 'var(--space-6)',
        }}
      >
        {cards.map((card) => (
          <ContentCard
            key={card.slug}
            eyebrow={card.tag.toUpperCase()}
            title={card.title}
            subtitle={card.subtitle}
            href={card.link}
            tag={card.tag}
            copyTitle={card.title}
            copyDescription={card.description || undefined}
          />
        ))}
      </div>
    </div>
  )
}
