import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { cache } from 'react'
import type { Post, PostWithContent, TagWithCount, CategoryWithCount } from '@/types'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))
}

export const getAllPosts = cache((): Post[] => {
  const files = getPostFiles()
  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const filePath = path.join(POSTS_DIR, filename)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)
      const rt = readingTime(content)

      return {
        slug,
        frontmatter: {
          title: data.title ?? slug,
          date: data.date ?? new Date().toISOString().split('T')[0],
          tags: data.tags ?? [],
          category: data.category ?? '미분류',
          description: data.description ?? '',
          coverImage: data.coverImage,
          author: data.author,
          draft: data.draft ?? false,
        },
        readingTime: rt.text,
      } satisfies Post
    })
    .filter((post) => {
      if (process.env.NODE_ENV === 'production') {
        return !post.frontmatter.draft
      }
      return true
    })
    .sort((a, b) => {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    })

  return posts
})

export const getPostBySlug = cache((slug: string): PostWithContent | null => {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    slug,
    frontmatter: {
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString().split('T')[0],
      tags: data.tags ?? [],
      category: data.category ?? '미분류',
      description: data.description ?? '',
      coverImage: data.coverImage,
      author: data.author,
      draft: data.draft ?? false,
    },
    readingTime: rt.text,
    content,
  }
})

export function getAllSlugs(): string[] {
  return getPostFiles().map((f) => f.replace(/\.mdx$/, ''))
}

export const getAllTags = cache((): TagWithCount[] => {
  const posts = getAllPosts()
  const tagMap = new Map<string, number>()
  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1)
    })
  })
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
})

export const getAllCategories = cache((): CategoryWithCount[] => {
  const posts = getAllPosts()
  const catMap = new Map<string, number>()
  posts.forEach((post) => {
    const cat = post.frontmatter.category
    catMap.set(cat, (catMap.get(cat) ?? 0) + 1)
  })
  return Array.from(catMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
})

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.tags.includes(tag))
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.category === category)
}
