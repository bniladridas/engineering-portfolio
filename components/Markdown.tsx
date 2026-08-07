'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { slugifyHeading } from '@/lib/reading'
import { withBase } from '@/lib/site'
import Reveal from './Reveal'

function heading(level: 'h2' | 'h3') {
  const Tag = level
  return function Heading({ children }: { children?: React.ReactNode }) {
    const text = String(children ?? '').replace(/\n/g, ' ')
    const id = slugifyHeading(text)
    return (
      <Tag id={id} style={{ scrollMarginTop: 'var(--space-6)' }}>
        <a href={`#${id}`} aria-label={`Link to section: ${text}`} style={{ color: 'inherit' }}>
          {children}
        </a>
      </Tag>
    )
  }
}

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h2: heading('h2'),
          h3: heading('h3'),
          img: ({ src, alt }) => {
            const source = typeof src === 'string' ? src : undefined
            const href = source?.startsWith('/') ? withBase(source) : source
            if (source?.startsWith('/diagrams/')) {
              return (
                <Reveal>
                  <figure className="diagram" style={{ margin: 'var(--space-7) 0' }}>
                    <img src={href} alt={alt ?? ''} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    {alt ? (
                      <figcaption style={{ color: 'var(--ink-secondary)', fontSize: 14, textAlign: 'center', marginTop: 'var(--space-2)' }}>
                        {alt}
                      </figcaption>
                    ) : null}
                  </figure>
                </Reveal>
              )
            }
            return <img src={href} alt={alt ?? ''} style={{ maxWidth: '100%' }} />
          },
          a: ({ href, children }) => {
            const external = href?.startsWith('http')
            const target = href?.startsWith('/') ? withBase(href) : href
            return (
              <a href={target} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {children}
              </a>
            )
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
