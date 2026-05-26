import Link from 'next/link'
import { Folder } from 'lucide-react'

interface CategoryBadgeProps {
  category: string
  count?: number
}

export default function CategoryBadge({ category, count }: CategoryBadgeProps) {
  return (
    <Link
      href={`/categories/${encodeURIComponent(category)}`}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
    >
      <Folder size={12} />
      <span>{category}</span>
      {count !== undefined && (
        <span className="opacity-70">({count})</span>
      )}
    </Link>
  )
}
