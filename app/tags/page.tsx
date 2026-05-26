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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">태그</h1>
      <p className="text-[var(--muted-foreground)] mb-8">
        총 <span className="font-medium text-[var(--foreground)]">{tags.length}</span>개의 태그
      </p>

      {tags.length === 0 ? (
        <p className="text-center py-16 text-[var(--muted-foreground)]">태그가 없습니다.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <TagBadge key={tag} tag={tag} count={count} />
          ))}
        </div>
      )}
    </div>
  )
}
