import type { Metadata } from 'next'
import { getAllTags } from '@/lib/posts'
import TagBadge from '@/components/blog/TagBadge'

export const metadata: Metadata = {
  title: '태그',
  description: '블로그의 모든 태그를 확인하세요.',
}

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-1 tracking-tight">태그</h1>
      <p className="text-sm text-[var(--muted-foreground)] mb-10">
        {tags.length}개의 태그
      </p>

      {tags.length === 0 ? (
        <p className="py-16 text-center text-sm text-[var(--muted-foreground)]">태그가 없습니다.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {tags.map(({ tag, count }) => (
            <TagBadge key={tag} tag={tag} count={count} />
          ))}
        </div>
      )}
    </div>
  )
}
