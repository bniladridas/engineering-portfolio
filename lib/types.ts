export interface Article {
  slug: string
  title: string
  date: string
  tags: string[]
  intro: string
  content: string
  words: number
}

export interface Post {
  slug: string
  title: string
  date: string
  topic: string
  hook: string
  content: string
}

export interface Card {
  slug: string
  title: string
  subtitle: string
  link: string
  tag: string
  content: string
}

export interface ProfileDoc {
  slug: string
  title: string
  content: string
}
