'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function HeaderSearch() {
  const router = useRouter()
  const [q, setQ] = useState('')

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!q.trim()) return
    router.push(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <form role="search" onSubmit={onSubmit} className="header-search">
      <label className="sr-only" htmlFor="site-search">
        Search articles and posts
      </label>
      <input
        id="site-search"
        type="search"
        placeholder="Search…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{
          padding: '6px 10px',
          fontSize: 14,
          fontFamily: 'var(--font-body)',
          border: '1px solid var(--line)',
          borderRadius: 8,
          width: 130,
          maxWidth: '100%',
          outline: 'none',
        }}
      />
    </form>
  )
}
