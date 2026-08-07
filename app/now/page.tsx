import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { formatDate } from '@/lib/content'
import Markdown from '@/components/Markdown'
import Badge from '@/components/Badge'

export const metadata = { title: 'Now · Palmshed' }

export default function NowPage() {
  const content = readFileSync(join(process.cwd(), 'docs', 'now.md'), 'utf8')

  return (
    <div className="container" style={{ maxWidth: 760, paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="eyebrow">Now</p>
        <Badge tone="green">Updated</Badge>
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, margin: 'var(--space-2) 0 var(--space-4)' }}>
        Now
      </h1>
      <p style={{ color: 'var(--ink-secondary)', fontSize: 14, margin: '0 0 var(--space-5)' }}>
        Last updated: {formatDate(new Date().toISOString())}
      </p>
      <Markdown>{content}</Markdown>
    </div>
  )
}
