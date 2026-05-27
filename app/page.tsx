import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts'
import PostCard from '@/components/blog/PostCard'

export default function HomePage() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const categories = getAllCategories()
  const recentPosts = posts.slice(0, 5)

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="mb-16">
        <h1 className="text-3xl font-semibold text-[var(--foreground)] mb-3 tracking-tight">
          안녕하세요 👋
        </h1>
        <p className="text-[var(--muted-foreground)] leading-relaxed mb-6 max-w-xl">
          개발, 기술, 일상에 대한 생각을 기록하는 공간입니다.
        </p>
        <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
          <span>{posts.length}개 게시물</span>
          <span className="text-[var(--border)]">·</span>
          <span>{tags.length}개 태그</span>
          <span className="text-[var(--border)]">·</span>
          <span>{categories.length}개 카테고리</span>
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 ? (
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wide">
              최근 게시물
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              전체 보기
              <ArrowRight size={12} />
            </Link>
          </div>
          <div>
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : (
        <section className="py-16 text-center">
          <p className="text-[var(--muted-foreground)] text-sm">
            아직 게시물이 없습니다.{' '}
            <code className="text-xs bg-[var(--muted)] px-1.5 py-0.5 rounded">content/posts/</code>
            에 MDX 파일을 추가해보세요.
          </p>
        </section>
      )}
    </div>
  )
}
