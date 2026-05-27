import Link from 'next/link'

interface CategoryBadgeProps {
  category: string
  count?: number
}

export default function CategoryBadge({ category, count }: CategoryBadgeProps) {
  return (
    <Link
      href={`/categories/${encodeURIComponent(category)}`}
      className="inline-flex items-center gap-1 text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors uppercase tracking-wide"
    >
      <span>{category}</span>
      {count !== undefined && (
        <span className="opacity-60">({count})</span>
      )}
    </Link>
  )
}
