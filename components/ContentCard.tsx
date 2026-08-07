import Link from 'next/link'
import Badge from './Badge'

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href)
}

interface ContentCardProps {
  eyebrow: string
  title: string
  subtitle?: string
  description?: string
  href: string
  tag?: string
  meta?: string
}

export default function ContentCard({
  eyebrow,
  title,
  subtitle,
  description,
  href,
  tag,
  meta,
}: ContentCardProps) {
  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        padding: 'var(--space-5)',
        background: 'var(--white)',
        border: '1px solid var(--line)',
        borderRadius: 12,
        minHeight: 280,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="eyebrow">{eyebrow}</span>
        {tag ? <Badge tone="green">{tag}</Badge> : null}
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.2, margin: 0 }}>
        {isExternal(href) ? (
          <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--black)' }}>
            {title}
          </a>
        ) : (
          <Link href={href} style={{ color: 'var(--black)' }}>
            {title}
          </Link>
        )}
      </h2>
      {subtitle ? <p style={{ margin: 0, color: 'var(--ink-secondary)' }}>{subtitle}</p> : null}
      {description ? (
        <p style={{ margin: 0, color: 'var(--ink-secondary)', fontSize: 15 }}>{description}</p>
      ) : null}
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--green)', fontWeight: 500, fontSize: 15 }}>Read →</span>
        {meta ? <span style={{ color: 'var(--ink-secondary)', fontSize: 14 }}>{meta}</span> : null}
      </div>
    </article>
  )
}
