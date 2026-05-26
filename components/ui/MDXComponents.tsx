import Image from 'next/image'
import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  // Next.js Image 최적화
  img: ({ src, alt, width, height, ...props }) => {
    if (!src) return null
    return (
      <span className="block my-6">
        <Image
          src={src}
          alt={alt ?? ''}
          width={typeof width === 'number' ? width : 800}
          height={typeof height === 'number' ? height : 450}
          className="rounded-xl border border-[var(--border)] w-full h-auto"
          {...props}
        />
        {alt && (
          <span className="block text-center text-xs text-[var(--muted-foreground)] mt-2 italic">
            {alt}
          </span>
        )}
      </span>
    )
  },

  // 외부 링크 처리
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http') || href?.startsWith('//')
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)] hover:underline"
          {...props}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href ?? '#'} className="text-[var(--accent)] hover:underline" {...props}>
        {children}
      </Link>
    )
  },

  // 인용구
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-[var(--accent)] pl-4 py-1 my-6 bg-[var(--muted)] rounded-r-lg italic text-[var(--muted-foreground)]"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // 헤딩 앵커 스타일
  h2: ({ children, id, ...props }) => (
    <h2
      id={id}
      className="group flex items-center gap-2 scroll-mt-20"
      {...props}
    >
      {children}
      {id && (
        <a
          href={`#${id}`}
          className="opacity-0 group-hover:opacity-100 text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-opacity text-sm"
          aria-hidden
        >
          #
        </a>
      )}
    </h2>
  ),

  h3: ({ children, id, ...props }) => (
    <h3
      id={id}
      className="group flex items-center gap-2 scroll-mt-20"
      {...props}
    >
      {children}
      {id && (
        <a
          href={`#${id}`}
          className="opacity-0 group-hover:opacity-100 text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-opacity text-sm"
          aria-hidden
        >
          #
        </a>
      )}
    </h3>
  ),

  // 수평선
  hr: () => <hr className="border-[var(--border)] my-8" />,
}
