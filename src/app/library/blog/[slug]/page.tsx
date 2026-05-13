import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleBreadcrumb from '@/components/library/ArticleBreadcrumb'
import ArticleHero from '@/components/library/ArticleHero'
import PortableTextRenderer from '@/components/library/PortableTextRenderer'
import TableOfContents from '@/components/library/TableOfContents'
import NewsletterCTA from '@/components/library/NewsletterCTA'
import RelatedPosts from '@/components/library/RelatedPosts'
import { extractToc } from '@/components/library/toc'
import { sanityFetch } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { isSanityConfigured } from '@/sanity/env'
import { BLOG_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { fallbackBlogBySlug } from '@/sanity/lib/fallback'
import type { BlogPostDoc } from '@/sanity/lib/types'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

async function loadPost(slug: string): Promise<BlogPostDoc | null> {
  const live = await sanityFetch<BlogPostDoc>({
    query: BLOG_BY_SLUG_QUERY,
    params: { slug },
  })
  return live ?? fallbackBlogBySlug()
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) return { title: 'Post not found' }
  const ogImage =
    post.coverImage && isSanityConfigured
      ? urlFor(post.coverImage).width(1200).height(630).fit('crop').url()
      : undefined
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

function formatDate(iso?: string | null) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) notFound()

  const toc = extractToc(post.body)
  const date = formatDate(post.publishedAt)

  return (
    <main className="bg-obsidian min-h-screen pt-24 pb-24">
      <article className="max-w-content mx-auto px-6 lg:px-16">
        <ArticleBreadcrumb
          crumbs={[
            { label: 'Back to Library', href: '/library' },
            post.category
              ? { label: post.category.title, href: `/library/category/${post.category.slug}` }
              : { label: 'Library' },
            { label: post.title, active: true },
          ]}
        />

        <ArticleHero
          title={post.title}
          coverImage={post.coverImage}
          meta={
            <span className="text-graphite">
              {date}
              {post.author && <span className="mx-2 text-graphite/40">·</span>}
              {post.author && <span>{post.author}</span>}
              {post.readTime && <span className="mx-2 text-graphite/40">·</span>}
              {post.readTime && <span>{post.readTime} min read</span>}
            </span>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 mt-8">
          <div className="min-w-0">
            <PortableTextRenderer value={post.body} />

            {/* End-of-article newsletter prompt for the long-scroll reader */}
            <div className="mt-16 border-t border-mint/10 pt-10">
              <p className="text-mint text-[10px] tracking-[0.22em] uppercase font-mono mb-3">
                Stay in the loop
              </p>
              <h2 className="font-heading text-soyl-white text-2xl md:text-3xl mb-6 max-w-xl">
                New writing, dropped in your inbox.
              </h2>
              <NewsletterCTA variant="inline" />
            </div>
          </div>

          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28 flex flex-col gap-8">
                <TableOfContents entries={toc} />
                <div className="border-t border-mint/10 pt-6">
                  <NewsletterCTA variant="pill" />
                </div>
              </div>
            </aside>
          )}
        </div>

        <RelatedPosts items={post.related} />
      </article>
    </main>
  )
}
