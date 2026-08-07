import Link from 'next/link'
import type { Article } from '@/lib/types'

export default function PrevNext({ previous, next }: { previous?: Article; next?: Article }) {
  if (!previous && !next) return null
  return (
    <nav
      aria-label="Article navigation"
      className="grid-2"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--space-4)',
        borderTop: '1px solid var(--line)',
        marginTop: 'var(--space-8)',
        paddingTop: 'var(--space-5)',
      }}
    >
      <div>
        {previous ? (
          <>
            <p className="eyebrow" style={{ margin: '0 0 var(--space-1)' }}>
              ← Previous
            </p>
            <Link href={`/articles/${previous.slug}`} style={{ color: 'var(--black)', fontWeight: 500 }}>
              {previous.title}
            </Link>
          </>
        ) : null}
      </div>
      <div style={{ textAlign: 'right' }}>
        {next ? (
          <>
            <p className="eyebrow" style={{ margin: '0 0 var(--space-1)' }}>
              Next →
            </p>
            <Link href={`/articles/${next.slug}`} style={{ color: 'var(--black)', fontWeight: 500 }}>
              {next.title}
            </Link>
          </>
        ) : null}
      </div>
    </nav>
  )
}
