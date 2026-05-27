import Link from 'next/link'

interface TagBadgeProps {
  tag: string
  count?: number
}

export default function TagBadge({ tag, count }: TagBadgeProps) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
    >
      <span className="text-[var(--border)]">#</span>
      <span>{tag}</span>
      {count !== undefined && (
        <span className="text-[var(--border)]">({count})</span>
      )}
    </Link>
  )
}
