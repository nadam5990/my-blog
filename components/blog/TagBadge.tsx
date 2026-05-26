import Link from 'next/link'

interface TagBadgeProps {
  tag: string
  count?: number
}

export default function TagBadge({ tag, count }: TagBadgeProps) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--muted)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors border border-[var(--border)]"
    >
      <span>#{tag}</span>
      {count !== undefined && (
        <span className="opacity-70">({count})</span>
      )}
    </Link>
  )
}
