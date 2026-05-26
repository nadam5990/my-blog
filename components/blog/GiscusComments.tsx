'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function GiscusComments() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const giscusTheme = resolvedTheme === 'dark' ? 'dark_dimmed' : 'light'

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}` | undefined
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

  // placeholder 값 감지 (실제 설정이 안 된 경우)
  const isPlaceholder =
    !repo ||
    !repoId ||
    !category ||
    !categoryId ||
    repo.includes('username') ||
    repoId.startsWith('R_xxx') ||
    categoryId.startsWith('DIC_xxx')

  if (isPlaceholder) {
    return (
      <div className="mt-12 p-6 border border-[var(--border)] rounded-xl text-center text-[var(--muted-foreground)] text-sm">
        <p>댓글 기능을 사용하려면 <code>.env.local</code>에 Giscus 설정값을 추가하세요.</p>
        <p className="mt-1 text-xs">
          <a
            href="https://giscus.app/ko"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            giscus.app
          </a>
          에서 설정값을 발급받을 수 있습니다.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-12">
      <Giscus
        key={giscusTheme}
        repo={repo}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={giscusTheme}
        lang="ko"
        loading="lazy"
      />
    </div>
  )
}
