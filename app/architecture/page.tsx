import { getArchNotes } from '@/lib/content'
import Badge from '@/components/Badge'

export const metadata = { title: 'Architecture Notes — Palmshed' }

function excerpt(content: string): string {
  const first = content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p.length > 0)
  return first ? first.slice(0, 180) : ''
}

const TOPIC_LABEL: Record<string, string> = {
  authentication: 'Systems',
  observability: 'Systems',
  'api-design': 'Systems',
  caching: 'Systems',
  configuration: 'Developer tools',
  'cli-design': 'Developer tools',
  testing: 'Practices',
  'flutter-desktop': 'Frontend & desktop',
}

export default function ArchitecturePage() {
  const notes = getArchNotes()

  return (
    <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      <p className="eyebrow">Engineering Notes</p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, margin: 'var(--space-2) 0 var(--space-3)' }}>
        Architecture notes
      </h1>
      <p style={{ color: 'var(--ink-secondary)', fontSize: 18, maxWidth: '52ch' }}>
        Short, focused notes on the systems I build and maintain. Each one captures a design
        decision, the reasoning behind it, and the rules that survived contact with production.
      </p>

      <div style={{ marginTop: 'var(--space-6)' }}>
        {notes.map((note) => (
          <article
            key={note.slug}
            style={{
              borderBottom: '1px solid var(--ink-border)',
              padding: 'var(--space-5) 0',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <Badge>{TOPIC_LABEL[note.topic] || note.topic}</Badge>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, margin: 0 }}>
                <a href={`/architecture/${note.slug}`} style={{ color: 'var(--ink)', textDecoration: 'none' }}>
                  {note.title}
                </a>
              </h2>
              <p style={{ color: 'var(--ink-secondary)', margin: 0, maxWidth: '64ch' }}>
                {excerpt(note.content)}
              </p>
              <a
                href={`/architecture/${note.slug}`}
                style={{ color: 'var(--accent)', fontSize: 14, textDecoration: 'none' }}
              >
                Read the note →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
