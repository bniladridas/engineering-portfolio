'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { search, type SearchEntry } from '@/lib/search-utils'
import Badge from '@/components/Badge'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<SearchEntry[]>([])
  const [loading, setLoading] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/search-index.json')
      .then((r) => r.json())
      .then(setIndex)
      .catch(() => setIndex([]))
      .finally(() => setLoading(false))
    inputRef.current?.focus()
  }, [])

  const results = useMemo(() => search(query, index), [query, index])

  return (
    <div className="container" style={{ maxWidth: 760, paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      <p className="eyebrow">Search</p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, margin: 'var(--space-2) 0 var(--space-5)' }}>
        Find writing
      </h1>
      <input
        ref={inputRef}
        type="search"
        role="searchbox"
        aria-label="Search articles and posts"
        placeholder="Search articles and posts…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '14px 16px',
          fontSize: 17,
          fontFamily: 'var(--font-body)',
          border: '1px solid var(--line)',
          borderRadius: 10,
          outline: 'none',
        }}
      />
      {loading ? <p style={{ color: 'var(--ink-secondary)' }}>Loading index…</p> : null}
      {!loading && query.trim() && results.length === 0 ? (
        <p style={{ color: 'var(--ink-secondary)' }}>No results for “{query}”.</p>
      ) : null}
      <ul style={{ listStyle: 'none', margin: 'var(--space-6) 0 0', padding: 0 }}>
        {results.map((result) => (
          <li key={result.href} style={{ borderBottom: '1px solid var(--line)', padding: 'var(--space-4) 0' }}>
            <Link href={result.href} style={{ color: 'var(--black)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                <Badge tone={result.type === 'article' ? 'green' : 'neutral'}>
                  {result.type}
                </Badge>
                <span style={{ fontWeight: 500 }}>{result.title}</span>
              </div>
              <span style={{ color: 'var(--ink-secondary)', fontSize: 14 }}>{result.excerpt}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
