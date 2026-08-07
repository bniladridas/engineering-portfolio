import { getProfileDocs } from '@/lib/content'
import { toPlainText } from '@/lib/plain'
import Markdown from '@/components/Markdown'
import CopyableBlock from '@/components/CopyableBlock'

export const metadata = { title: 'About · Palmshed' }

const LABELS: Record<string, string> = {
  headline: 'Headline',
  summary: 'Summary',
  about: 'About',
  experience: 'Experience',
  skills: 'Skills',
  'featured-order': 'Featured order',
  interests: 'Interests',
  'open-to-work': 'Open to work',
}

const COPYABLE = new Set(['headline', 'summary', 'about', 'experience'])

export default function AboutPage() {
  const docs = getProfileDocs()

  return (
    <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      <p className="eyebrow">Profile</p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, margin: 'var(--space-2) 0 var(--space-3)' }}>
        About
      </h1>
      <p style={{ color: 'var(--ink-secondary)', fontSize: 18, maxWidth: '52ch' }}>
        The full profile, rendered from the version-controlled source. Copy any section into
        LinkedIn.
      </p>

      {docs.map((doc) => {
        const label = LABELS[doc.slug] ?? doc.title
        const body = <Markdown>{doc.content}</Markdown>
        return COPYABLE.has(doc.slug) ? (
          <section key={doc.slug}>
            <CopyableBlock title={label} content={toPlainText(doc.content)}>
              {body}
            </CopyableBlock>
          </section>
        ) : (
          <section key={doc.slug} style={{ marginTop: 'var(--space-7)', maxWidth: '66ch' }}>
            <p className="eyebrow" style={{ marginBottom: 'var(--space-2)' }}>
              {label}
            </p>
            {body}
          </section>
        )
      })}
    </div>
  )
}
