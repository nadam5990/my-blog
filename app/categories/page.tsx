import type { Metadata } from 'next'
import { getAllCategories } from '@/lib/posts'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '카테고리',
  description: '블로그의 모든 카테고리를 확인하세요.',
}

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-1 tracking-tight">카테고리</h1>
      <p className="text-sm text-[var(--muted-foreground)] mb-10">
        {categories.length}개의 카테고리
      </p>

      {categories.length === 0 ? (
        <p className="py-16 text-center text-sm text-[var(--muted-foreground)]">카테고리가 없습니다.</p>
      ) : (
        <div className="divide-y divide-[var(--border)]">
          {categories.map(({ category, count }) => (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category)}`}
              className="flex items-center justify-between py-4 text-sm group"
            >
              <span className="font-medium text-[var(--foreground)] group-hover:text-[var(--muted-foreground)] transition-colors">
                {category}
              </span>
              <span className="text-[var(--muted-foreground)]">{count}개</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
