import Link from 'next/link'
import { ArrowRight, BookOpen, Tag, Folder } from 'lucide-react'
import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts'
import PostCard from '@/components/blog/PostCard'

export default function HomePage() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const categories = getAllCategories()
  const recentPosts = posts.slice(0, 3)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center py-16 mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-4 tracking-tight">
          안녕하세요, 제 블로그에 오신 걸 환영합니다! 👋
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto mb-8 leading-relaxed">
          개발, 기술, 일상에 대한 이야기를 기록하는 공간입니다.
          함께 성장하는 개발자가 되고 싶습니다.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            <BookOpen size={18} />
            블로그 보기
          </Link>
          <Link
            href="/tags"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] rounded-xl font-medium hover:bg-[var(--muted)] transition-colors text-[var(--foreground)]"
          >
            <Tag size={18} />
            태그 탐색
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4 mb-16">
        {[
          { label: '게시물', value: posts.length, icon: BookOpen, href: '/blog' },
          { label: '태그', value: tags.length, icon: Tag, href: '/tags' },
          { label: '카테고리', value: categories.length, icon: Folder, href: '/categories' },
        ].map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center justify-center p-6 border border-[var(--border)] rounded-xl hover:border-[var(--accent)] hover:bg-[var(--muted)] transition-all text-center"
          >
            <Icon size={24} className="text-[var(--accent)] mb-2" />
            <span className="text-2xl font-bold text-[var(--foreground)]">{value}</span>
            <span className="text-sm text-[var(--muted-foreground)]">{label}</span>
          </Link>
        ))}
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">최근 게시물</h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-[var(--accent)] hover:underline"
            >
              전체 보기
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <section className="text-center py-16 border border-dashed border-[var(--border)] rounded-xl">
          <BookOpen size={48} className="text-[var(--muted-foreground)] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">아직 게시물이 없습니다</h2>
          <p className="text-[var(--muted-foreground)]">
            <code className="text-xs bg-[var(--muted)] px-2 py-1 rounded">content/posts/</code> 폴더에 MDX 파일을 추가해보세요.
          </p>
        </section>
      )}
    </div>
  )
}
