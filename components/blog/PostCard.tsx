import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import type { Post } from '@/types'
import TagBadge from './TagBadge'
import CategoryBadge from './CategoryBadge'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const { slug, frontmatter, readingTime } = post

  return (
    <article className="py-8 border-b border-[var(--border)] last:border-0">
      <div className="flex items-center gap-3 mb-2">
        <CategoryBadge category={frontmatter.category} />
        <span className="text-xs text-[var(--border)]">·</span>
        <time className="text-xs text-[var(--muted-foreground)]">
          {format(new Date(frontmatter.date), 'yyyy년 M월 d일', { locale: ko })}
        </time>
        <span className="text-xs text-[var(--border)]">·</span>
        <span className="text-xs text-[var(--muted-foreground)]">{readingTime}</span>
      </div>

      <Link href={`/blog/${slug}`} className="group">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2 leading-snug group-hover:text-[var(--muted-foreground)] transition-colors">
          {frontmatter.title}
        </h2>
      </Link>

      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4 line-clamp-2">
        {frontmatter.description}
      </p>

      {frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {frontmatter.tags.slice(0, 5).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
          {frontmatter.tags.length > 5 && (
            <span className="text-xs text-[var(--border)]">+{frontmatter.tags.length - 5}</span>
          )}
        </div>
      )}
    </article>
  )
}
