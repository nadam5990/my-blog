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
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-1 tracking-tight">
        블로그
      </h1>
      <p className="text-sm text-[var(--muted-foreground)] mb-10">
        {posts.length}개의 게시물
      </p>

      <SearchBar posts={posts} />

      <PostList posts={posts} emptyMessage="아직 게시물이 없습니다." />
    </div>
  )
}
