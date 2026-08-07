export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', marginTop: 'var(--space-8)' }}>
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          paddingTop: 'var(--space-6)',
          paddingBottom: 'var(--space-6)',
          color: 'var(--ink-secondary)',
          fontSize: 14,
        }}
      >
        <span>Software that outlasts its authors.</span>
        <a
          href="/colophon/"
          style={{ color: 'var(--ink-secondary)', textDecoration: 'none' }}
        >
          Colophon
        </a>
      </div>
    </footer>
  )
}
