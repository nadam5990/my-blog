import Fuse, { type IFuseOptions } from 'fuse.js'
import type { Post } from '@/types'

const fuseOptions: IFuseOptions<Post> = {
  keys: [
    { name: 'frontmatter.title', weight: 0.6 },
    { name: 'frontmatter.description', weight: 0.25 },
    { name: 'frontmatter.tags', weight: 0.15 },
  ],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 2,
}

export function createSearchIndex(posts: Post[]): Fuse<Post> {
  return new Fuse(posts, fuseOptions)
}

export function searchPosts(query: string, posts: Post[]): Post[] {
  if (!query.trim()) return posts
  const fuse = createSearchIndex(posts)
  return fuse.search(query).map((result) => result.item)
}
