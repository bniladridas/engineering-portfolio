import Link from 'next/link'
import { getPosts, formatDate } from '@/lib/content'
import Badge from '@/components/Badge'

export const metadata = {
  title: 'LinkedIn Posts — Palmshed',
  description: 'Short posts on engineering practice, ready to publish as-is.',
  alternates: { canonical: '/posts' },
}

export default function PostsPage() {
  const posts = getPosts()

  return (
    <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      <p className="eyebrow">Social</p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, margin: 'var(--space-2) 0 var(--space-3)' }}>
        LinkedIn posts
      </h1>
      <p style={{ color: 'var(--ink-secondary)', fontSize: 18, maxWidth: '52ch' }}>
        Short posts written to be published as-is. Cross-posted from the articles or standalone
        notes on engineering practice.
      </p>

      <ul style={{ listStyle: 'none', margin: 'var(--space-6) 0 0', padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.slug}
            style={{ border: '1px solid var(--line)', borderRadius: 12, padding: 'var(--space-5)', marginBottom: 'var(--space-5)' }}
          >
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <Badge tone="green">{post.topic}</Badge>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, margin: 0 }}>
              <Link href={`/posts/${post.slug}`} style={{ color: 'var(--black)' }}>
                {post.title}
              </Link>
            </h2>
            <p style={{ color: 'var(--ink-secondary)', fontSize: 15, marginTop: 'var(--space-2)' }}>
              {post.hook}
            </p>
            <p style={{ color: 'var(--ink-secondary)', fontSize: 14, margin: 'var(--space-3) 0 0' }}>
              {formatDate(post.date)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
