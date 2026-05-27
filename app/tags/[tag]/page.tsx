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
    title: `#${decodedTag}`,
    description: `${decodedTag} 태그가 붙은 게시물 목록입니다.`,
  }
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)

  if (posts.length === 0) notFound()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/tags"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-12 transition-colors"
      >
        <ArrowLeft size={14} />
        태그
      </Link>

      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-1 tracking-tight">
        #{decodedTag}
      </h1>
      <p className="text-sm text-[var(--muted-foreground)] mb-4">
        {posts.length}개의 게시물
      </p>

      <PostList posts={posts} />
    </div>
  )
}
