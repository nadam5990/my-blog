import type { Metadata } from 'next'
import { getAllCategories } from '@/lib/posts'
import CategoryBadge from '@/components/blog/CategoryBadge'

export const metadata: Metadata = {
  title: '카테고리',
  description: '블로그의 모든 카테고리를 확인하세요.',
}

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">카테고리</h1>
      <p className="text-[var(--muted-foreground)] mb-8">
        총 <span className="font-medium text-[var(--foreground)]">{categories.length}</span>개의 카테고리
      </p>

      {categories.length === 0 ? (
        <p className="text-center py-16 text-[var(--muted-foreground)]">카테고리가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map(({ category, count }) => (
            <div
              key={category}
              className="flex items-center justify-between p-4 border border-[var(--border)] rounded-xl hover:border-[var(--accent)] transition-colors"
            >
              <CategoryBadge category={category} />
              <span className="text-sm text-[var(--muted-foreground)]">
                {count}개 게시물
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
