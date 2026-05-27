import type { MetadataRoute } from 'next'
import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts'

export const dynamic = 'force-static'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://my-blog.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const tags = getAllTags()
  const categories = getAllCategories()

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const tagEntries: MetadataRoute.Sitemap = tags.map(({ tag }) => ({
    url: `${BASE_URL}/tags/${encodeURIComponent(tag)}`,
    changeFrequency: 'weekly',
    priority: 0.5,
  }))

  const categoryEntries: MetadataRoute.Sitemap = categories.map(({ category }) => ({
    url: `${BASE_URL}/categories/${encodeURIComponent(category)}`,
    changeFrequency: 'weekly',
    priority: 0.5,
  }))

  return [
    {
      url: BASE_URL,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tags`,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/categories`,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...postEntries,
    ...tagEntries,
    ...categoryEntries,
  ]
}
