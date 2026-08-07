import type { Reference } from '@/lib/types'

export default function References({ references }: { references: Reference[] }) {
  if (references.length === 0) return null
  return (
    <section style={{ maxWidth: '66ch', marginTop: 'var(--space-8)' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>References &amp; evidence</h2>
      <ul style={{ color: 'var(--ink-secondary)' }}>
        {references.map((ref) => (
          <li key={ref.url} style={{ margin: 'var(--space-2) 0' }}>
            <a href={ref.url} target="_blank" rel="noopener noreferrer">
              {ref.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
