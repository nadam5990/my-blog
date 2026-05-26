import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        블로그 목록으로
      </Link>

      {/* Post header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <CategoryBadge category={post.frontmatter.category} />
          <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] ml-auto">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {format(new Date(post.frontmatter.date), 'yyyy년 M월 d일', { locale: ko })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readingTime}
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] leading-tight mb-4">
          {post.frontmatter.title}
        </h1>

        <p className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-6">
          {post.frontmatter.description}
        </p>

        {post.frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </header>

      <hr className="border-[var(--border)] mb-10" />

      {/* MDX Content */}
      <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-[var(--foreground)] prose-a:text-[var(--accent)] prose-code:text-[var(--accent)] prose-pre:bg-transparent prose-pre:p-0">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={mdxOptions}
        />
      </article>

      {/* Comments */}
      <GiscusComments />
    </div>
  )
}
