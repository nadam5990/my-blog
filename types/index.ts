export interface PostFrontmatter {
  title: string
  date: string
  tags: string[]
  category: string
  description: string
  coverImage?: string
  author?: string
  draft?: boolean
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  readingTime: string
}

export interface PostWithContent extends Post {
  content: string
}

export interface TagWithCount {
  tag: string
  count: number
}

export interface CategoryWithCount {
  category: string
  count: number
}
