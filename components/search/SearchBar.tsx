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
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto mb-8">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="게시물 검색..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--muted)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-colors text-sm"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setIsOpen(false) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && query.length >= 2 && (
        <div className="absolute top-full mt-2 left-0 right-0 z-50 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-lg overflow-hidden">
          {results.length > 0 ? (
            <ul>
              {results.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    onClick={() => { setQuery(''); setIsOpen(false) }}
                    className="block px-4 py-3 hover:bg-[var(--muted)] transition-colors"
                  >
                    <p className="font-medium text-sm text-[var(--foreground)] line-clamp-1">
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
            <div className="px-4 py-6 text-center text-sm text-[var(--muted-foreground)]">
              &ldquo;{query}&rdquo;에 대한 검색 결과가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
