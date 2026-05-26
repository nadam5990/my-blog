import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllCategories, getPostsByCategory } from '@/lib/posts'
import PostList from '@/components/blog/PostList'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map(({ category }) => ({ category: encodeURIComponent(category) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)
  return {
    title: `${decodedCategory} 카테고리`,
    description: `${decodedCategory} 카테고리의 게시물 목록입니다.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)
  const posts = getPostsByCategory(decodedCategory)

  if (posts.length === 0) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/categories"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        카테고리 목록으로
      </Link>

      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
        {decodedCategory}
      </h1>
      <p className="text-[var(--muted-foreground)] mb-8">
        <span className="font-medium text-[var(--foreground)]">{posts.length}</span>개의 게시물
      </p>

      <PostList posts={posts} />
    </div>
  )
}
