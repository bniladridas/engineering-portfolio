import { notFound } from 'next/navigation'
import { getArchNote, getArchNotes, formatDate } from '@/lib/content'
import { getReadingTime } from '@/lib/reading'
import { site } from '@/lib/site'
import Markdown from '@/components/Markdown'
import Badge from '@/components/Badge'

export const dynamicParams = false

export function generateStaticParams() {
  return getArchNotes().map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getArchNote(slug)
  if (!note) return {}
  const url = `${site.url}/architecture/${note.slug}`
  return {
    title: `${note.title} — Palmshed`,
    description: note.content.slice(0, 160),
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: note.title,
      description: note.content.slice(0, 160),
      publishedTime: note.date,
    },
  }
}

export default async function ArchNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getArchNote(slug)
  if (!note) notFound()

  const notes = getArchNotes()
  const index = notes.findIndex((n) => n.slug === slug)
  const previous = notes[index + 1]
  const next = notes[index - 1]
  const readingTime = getReadingTime(note.words)

  return (
    <article className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      <div style={{ maxWidth: '66ch' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
          <a href="/architecture" style={{ color: 'var(--ink-secondary)', fontSize: 14, textDecoration: 'none' }}>
            ← Architecture notes
          </a>
        </div>
        <Badge tone="green">{note.topic}</Badge>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1.1, margin: 'var(--space-3) 0' }}>
          {note.title}
        </h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
            color: 'var(--ink-secondary)',
            fontSize: 14,
            marginBottom: 'var(--space-6)',
          }}
        >
          <span>{formatDate(note.date)}</span>
          <span aria-hidden>·</span>
          <span>{readingTime}</span>
        </div>
        <Markdown>{note.content}</Markdown>
        <nav
          aria-label="Note navigation"
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
                <a href={`/architecture/${previous.slug}`} style={{ color: 'var(--black)', fontWeight: 500 }}>
                  {previous.title}
                </a>
              </>
            ) : null}
          </div>
          <div style={{ textAlign: 'right' }}>
            {next ? (
              <>
                <p className="eyebrow" style={{ margin: '0 0 var(--space-1)' }}>
                  Next →
                </p>
                <a href={`/architecture/${next.slug}`} style={{ color: 'var(--black)', fontWeight: 500 }}>
                  {next.title}
                </a>
              </>
            ) : null}
          </div>
        </nav>
      </div>
    </article>
  )
}
