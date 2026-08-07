import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import type { Article, Card, Post, ProfileDoc } from './types'

const DOCS = join(process.cwd(), 'docs')

function readDir(dir: string): string[] {
  return readdirSync(join(DOCS, dir)).filter((f) => f.endsWith('.md'))
}

function readFile(dir: string, file: string) {
  const { data, content } = matter(readFileSync(join(DOCS, dir, file), 'utf8'))
  const slug = (data.slug as string) || file.replace(/\.md$/, '')
  return { data, content, slug }
}

function stripLeadingTitle(content: string): string {
  return content.replace(/^#\s.+$/m, '').trim()
}

function words(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

export function getArticles(): Article[] {
  return readDir('articles')
    .map((file) => {
      const { data, content, slug } = readFile('articles', file)
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        tags: (data.tags as string[]) || [],
        intro: (data.intro as string) || '',
        content: stripLeadingTitle(content),
        words: words(content),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug)
}

export function getPosts(): Post[] {
  return readDir('linkedin')
    .map((file) => {
      const { data, content, slug } = readFile('linkedin', file)
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        topic: (data.topic as string) || '',
        hook: (data.hook as string) || '',
        content: stripLeadingTitle(content),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug)
}

export function getCards(): Card[] {
  return readDir('featured')
    .map((file) => {
      const { data, content, slug } = readFile('featured', file)
      return {
        slug,
        title: data.title as string,
        subtitle: data.subtitle as string,
        link: data.link as string,
        tag: data.tag as string,
        content,
      }
    })
    .sort((a, b) => (a.slug < b.slug ? -1 : 1))
}

const PROFILE_ORDER = [
  'summary',
  'about',
  'experience',
  'skills',
  'featured-order',
  'interests',
  'open-to-work',
]

export function getProfileDocs(): ProfileDoc[] {
  const files = readDir('profile')
  return files
    .map((file) => {
      const { data, content, slug } = readFile('profile', file)
      return { slug, title: data.title as string, content }
    })
    .sort((a, b) => {
      const ia = PROFILE_ORDER.indexOf(a.slug)
      const ib = PROFILE_ORDER.indexOf(b.slug)
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
    })
}

export function formatDate(date: string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
