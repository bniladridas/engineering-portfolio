import Link from 'next/link'
import HeaderSearch from './HeaderSearch'
import ThemeToggle from './ThemeToggle'

const nav = [
  { href: '/articles', label: 'Articles' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/open-source', label: 'Open Source' },
  { href: '/now', label: 'Now' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  return (
    <header style={{ borderBottom: '1px solid var(--line)' }}>
      <div
        className="container header"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3) var(--space-4)',
          paddingTop: 'var(--space-4)',
          paddingBottom: 'var(--space-4)',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--black)' }}>
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="#1f883d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 32v-8" />
            <path d="M14 32h20" />
            <path d="M14 24h20" />
            <path d="M21 24c0-6 8-10 13-14" />
          </svg>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18 }}>Palmshed</span>
        </Link>
        <nav aria-label="Primary" className="header-nav" style={{ display: 'flex', gap: 'var(--space-5)' }}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ color: 'var(--ink-secondary)', fontSize: 15, fontWeight: 500 }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
        <HeaderSearch />
      </div>
    </header>
  )
}
