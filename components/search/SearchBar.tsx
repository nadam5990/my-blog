'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import { createSearchIndex } from '@/lib/search'
import type { Post } from '@/types'

interface SearchBarProps {
  posts: Post[]
}

export default function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const fuse = useMemo(() => createSearchIndex(posts), [posts])

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return []
    return fuse.search(query).slice(0, 6).map((r) => r.item)
  }, [query, fuse])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative mb-10">
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--border)]"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="검색..."
          className="w-full pl-9 pr-9 py-2 border border-[var(--border)] bg-transparent text-[var(--foreground)] placeholder:text-[var(--border)] focus:outline-none focus:border-[var(--muted-foreground)] transition-colors text-sm rounded-md"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setIsOpen(false) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--border)] hover:text-[var(--muted-foreground)] transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {isOpen && query.length >= 2 && (
        <div className="absolute top-full mt-1 left-0 right-0 z-50 bg-[var(--background)] border border-[var(--border)] rounded-md shadow-sm overflow-hidden">
          {results.length > 0 ? (
            <ul>
              {results.map((post) => (
                <li key={post.slug} className="border-b border-[var(--border)] last:border-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    onClick={() => { setQuery(''); setIsOpen(false) }}
                    className="block px-4 py-3 hover:bg-[var(--muted)] transition-colors"
                  >
                    <p className="text-sm font-medium text-[var(--foreground)] line-clamp-1">
                      {post.frontmatter.title}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)] line-clamp-1 mt-0.5">
                      {post.frontmatter.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-5 text-center text-sm text-[var(--muted-foreground)]">
              &ldquo;{query}&rdquo;에 대한 결과가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
