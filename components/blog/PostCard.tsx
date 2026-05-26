import Link from 'next/link'
import { Clock, Calendar } from 'lucide-react'
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
    <article className="group border border-[var(--border)] rounded-xl p-6 bg-[var(--background)] hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/5 transition-all duration-200">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <CategoryBadge category={frontmatter.category} />
        <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] ml-auto">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {format(new Date(frontmatter.date), 'yyyy년 M월 d일', { locale: ko })}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {readingTime}
          </span>
        </div>
      </div>

      <Link href={`/blog/${slug}`}>
        <h2 className="text-xl font-bold mb-2 text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
          {frontmatter.title}
        </h2>
      </Link>

      <p className="text-sm text-[var(--muted-foreground)] mb-4 line-clamp-2 leading-relaxed">
        {frontmatter.description}
      </p>

      {frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags.slice(0, 4).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
          {frontmatter.tags.length > 4 && (
            <span className="text-xs text-[var(--muted-foreground)] self-center">
              +{frontmatter.tags.length - 4}
            </span>
          )}
        </div>
      )}
    </article>
  )
}
