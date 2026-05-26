import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllTags, getPostsByTag } from '@/lib/posts'
import PostList from '@/components/blog/PostList'

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map(({ tag }) => ({ tag: encodeURIComponent(tag) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  return {
    title: `#${decodedTag} 태그`,
    description: `${decodedTag} 태그가 붙은 게시물 목록입니다.`,
  }
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)

  if (posts.length === 0) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/tags"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        태그 목록으로
      </Link>

      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
        #{decodedTag}
      </h1>
      <p className="text-[var(--muted-foreground)] mb-8">
        <span className="font-medium text-[var(--foreground)]">{posts.length}</span>개의 게시물
      </p>

      <PostList posts={posts} />
    </div>
  )
}
