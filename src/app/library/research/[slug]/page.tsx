import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Download } from 'lucide-react'
import ArticleBreadcrumb from '@/components/library/ArticleBreadcrumb'
import ArticleHero from '@/components/library/ArticleHero'
import AbstractPanel from '@/components/library/AbstractPanel'
import PdfEmbed from '@/components/library/PdfEmbed'
import CopyCiteButton from '@/components/library/CopyCiteButton'
import RelatedPosts from '@/components/library/RelatedPosts'
import { sanityFetch } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { isSanityConfigured } from '@/sanity/env'
import { WHITEPAPER_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { fallbackWhitepaperBySlug } from '@/sanity/lib/fallback'
import type { WhitepaperDoc } from '@/sanity/lib/types'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

async function loadPaper(slug: string): Promise<WhitepaperDoc | null> {
  const live = await sanityFetch<WhitepaperDoc>({
    query: WHITEPAPER_BY_SLUG_QUERY,
    params: { slug },
  })
  return live ?? fallbackWhitepaperBySlug(slug)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const p = await loadPaper(slug)
  if (!p) return { title: 'Paper not found' }
  const ogImage =
    p.coverImage && isSanityConfigured
      ? urlFor(p.coverImage).width(1200).height(630).fit('crop').url()
      : undefined
  return {
    title: p.title,
    description: p.abstract.slice(0, 200),
    openGraph: {
      title: p.title,
      description: p.abstract.slice(0, 200),
      type: 'article',
      publishedTime: p.publishedAt ?? undefined,
      authors: p.authors,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  }
}

// APA-ish citation. Authors first, year in parens, title, then publisher.
function buildCitation(p: WhitepaperDoc): string {
  const authors = p.authors.join(', ')
  return `${authors} (${p.year}). ${p.title}. SOYL AI Research.`
}

export default async function WhitepaperPage({ params }: PageProps) {
  const { slug } = await params
  const paper = await loadPaper(slug)
  if (!paper) notFound()

  const citation = buildCitation(paper)

  return (
    <main className="bg-obsidian min-h-screen pt-24 pb-24">
      <article className="max-w-content mx-auto px-6 lg:px-16">
        <ArticleBreadcrumb
          crumbs={[
            { label: 'Back to Library', href: '/library' },
            paper.category
              ? { label: paper.category.title, href: `/library/category/${paper.category.slug}` }
              : { label: 'Research' },
            { label: paper.title, active: true },
          ]}
        />

        <ArticleHero
          title={paper.title}
          subtitle={paper.subtitle}
          coverImage={paper.coverImage}
          meta={
            <span className="text-graphite">
              {paper.authors.join(' · ')}
              <span className="mx-2 text-graphite/40">·</span>
              {paper.year}
              {paper.pages && <span className="mx-2 text-graphite/40">·</span>}
              {paper.pages && <span>{paper.pages} pages</span>}
            </span>
          }
        />

        <AbstractPanel abstract={paper.abstract} tags={paper.tags} />

        <div className="flex flex-wrap gap-3 my-8">
          {paper.pdfUrl && (
            <a
              href={paper.pdfUrl}
              download
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-mint text-obsidian text-sm font-medium hover:bg-mint/90 transition-colors"
            >
              <Download size={14} /> Download PDF
            </a>
          )}
          <CopyCiteButton citation={citation} />
        </div>

        {paper.pdfUrl && <PdfEmbed src={paper.pdfUrl} title={paper.title} />}

        <RelatedPosts items={paper.related} heading="Related research" />
      </article>
    </main>
  )
}
