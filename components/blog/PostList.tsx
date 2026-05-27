import type { Post } from '@/types'
import PostCard from './PostCard'

interface PostListProps {
  posts: Post[]
  emptyMessage?: string
}

export default function PostList({ posts, emptyMessage = '게시물이 없습니다.' }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-[var(--muted-foreground)]">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
