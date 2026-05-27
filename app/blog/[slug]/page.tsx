import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getAllSlugs, getPostBySlug } from '@/lib/posts'
import TagBadge from '@/components/blog/TagBadge'
import CategoryBadge from '@/components/blog/CategoryBadge'
import GiscusComments from '@/components/blog/GiscusComments'
import { mdxComponents } from '@/components/ui/MDXComponents'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  }
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [
        rehypePrettyCode,
        {
          theme: {
            dark: 'github-dark',
            light: 'github-light',
          },
          keepBackground: false,
        },
      ],
    ] as any,
  },
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-12 transition-colors"
      >
        <ArrowLeft size={14} />
        블로그
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <CategoryBadge category={post.frontmatter.category} />
          <span className="text-[var(--border)] text-xs">·</span>
          <time className="text-xs text-[var(--muted-foreground)]">
            {format(new Date(post.frontmatter.date), 'yyyy년 M월 d일', { locale: ko })}
          </time>
          <span className="text-[var(--border)] text-xs">·</span>
          <span className="text-xs text-[var(--muted-foreground)]">{post.readingTime}</span>
        </div>

        <h1 className="text-3xl font-semibold text-[var(--foreground)] leading-tight mb-4 tracking-tight">
          {post.frontmatter.title}
        </h1>

        <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
          {post.frontmatter.description}
        </p>

        {post.frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {post.frontmatter.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </header>

      <hr className="border-[var(--border)] mb-12" />

      {/* Content */}
      <article className="prose prose-slate dark:prose-invert max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-[var(--foreground)]
        prose-p:text-[var(--foreground)] prose-p:leading-relaxed
        prose-a:text-[var(--foreground)] prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-[var(--muted-foreground)]
        prose-strong:text-[var(--foreground)]
        prose-code:text-[var(--foreground)] prose-code:font-normal
        prose-pre:bg-transparent prose-pre:p-0
        prose-blockquote:border-[var(--border)] prose-blockquote:text-[var(--muted-foreground)]
        prose-hr:border-[var(--border)]
        prose-img:rounded-md
      ">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={mdxOptions}
        />
      </article>

      {/* Comments */}
      <div className="mt-16 pt-12 border-t border-[var(--border)]">
        <GiscusComments />
      </div>
    </div>
  )
}
