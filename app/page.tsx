import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts'
import PostCard from '@/components/blog/PostCard'
import TagBadge from '@/components/blog/TagBadge'

export default function HomePage() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const categories = getAllCategories()
  const recentPosts = posts.slice(0, 4)

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 space-y-16">

      {/* ── 인트로 ── */}
      <section>
        <h1 className="text-3xl font-semibold text-[var(--foreground)] tracking-tight mb-2">
          안녕하세요 👋
        </h1>
        <p className="text-[var(--muted-foreground)] leading-relaxed">
          개발 · 기술 · 일상을 기록하는 공간입니다.
        </p>
      </section>

      {/* ── 최근 글 ── */}
      {recentPosts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-widest">
              최근 글
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              전체 보기 <ArrowRight size={11} />
            </Link>
          </div>
          <div>
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* ── 태그 ── */}
      {tags.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-widest">
              태그
            </h2>
            <Link
              href="/tags"
              className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              전체 보기 <ArrowRight size={11} />
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {tags.map(({ tag, count }) => (
              <TagBadge key={tag} tag={tag} count={count} />
            ))}
          </div>
        </section>
      )}

      {/* ── 카테고리 ── */}
      {categories.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-widest">
              카테고리
            </h2>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              전체 보기 <ArrowRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {categories.map(({ category, count }) => (
              <Link
                key={category}
                href={`/categories/${encodeURIComponent(category)}`}
                className="flex items-center justify-between py-3 text-sm group"
              >
                <span className="text-[var(--foreground)] group-hover:text-[var(--muted-foreground)] transition-colors">
                  {category}
                </span>
                <span className="text-xs text-[var(--muted-foreground)]">{count}개</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 게시물 없을 때 */}
      {posts.length === 0 && (
        <section className="py-16 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">
            아직 게시물이 없습니다.{' '}
            <code className="text-xs bg-[var(--muted)] px-1.5 py-0.5 rounded">
              content/posts/
            </code>
            에 MDX 파일을 추가해보세요.
          </p>
        </section>
      )}

    </div>
  )
}
