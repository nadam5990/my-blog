import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import PostList from '@/components/blog/PostList'
import SearchBar from '@/components/search/SearchBar'

export const metadata: Metadata = {
  title: '블로그',
  description: '모든 블로그 게시물을 확인하세요.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">블로그</h1>
      <p className="text-[var(--muted-foreground)] mb-8">
        총 <span className="font-medium text-[var(--foreground)]">{posts.length}</span>개의 게시물
      </p>

      <SearchBar posts={posts} />

      <PostList posts={posts} emptyMessage="아직 게시물이 없습니다." />
    </div>
  )
}
