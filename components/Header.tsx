import Link from 'next/link'

const nav = [
  { href: '/articles', label: 'Articles' },
  { href: '/posts', label: 'Posts' },
  { href: '/featured', label: 'Featured' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  return (
    <header style={{ borderBottom: '1px solid var(--line)' }}>
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          paddingTop: 'var(--space-4)',
          paddingBottom: 'var(--space-4)',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--black)' }} aria-label="Home">
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="#1f883d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 32v-8" />
            <path d="M14 32h20" />
            <path d="M14 24h20" />
            <path d="M21 24c0-6 8-10 13-14" />
          </svg>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18 }}>Palmshed</span>
        </Link>
        <nav aria-label="Primary" style={{ display: 'flex', gap: 'var(--space-5)' }}>
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
      </div>
    </header>
  )
}
