import type { Post } from '@/types'
import PostCard from './PostCard'

interface PostListProps {
  posts: Post[]
  emptyMessage?: string
}

export default function PostList({ posts, emptyMessage = '게시물이 없습니다.' }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--muted-foreground)]">
        <p className="text-lg">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
