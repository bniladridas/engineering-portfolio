import type { TocItem } from '@/lib/types'

export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null
  return (
    <nav aria-label="Table of contents" className="toc">
      <p className="eyebrow" style={{ margin: '0 0 var(--space-3)' }}>
        On this page
      </p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              padding: 'var(--space-1) 0',
              paddingLeft: item.depth === 3 ? 'var(--space-4)' : 0,
            }}
          >
            <a
              href={`#${item.id}`}
              style={{ color: 'var(--ink-secondary)', fontSize: 14, textDecoration: 'none' }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
