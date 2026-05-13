import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import LibraryHero from '@/components/library/LibraryHero'
import CategoryPage from '@/components/library/CategoryPage'
import { sanityFetch } from '@/sanity/lib/client'
import { CATEGORIES_QUERY, CATEGORY_PAGE_QUERY } from '@/sanity/lib/queries'
import { fallbackCategoryList, fallbackCategoryPage } from '@/sanity/lib/fallback'
import type { Category, LibraryCard } from '@/sanity/lib/types'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

type CategoryPagePayload = {
  category: Pick<Category, 'slug' | 'title' | 'description'> | null
  items: LibraryCard[]
}

async function loadPage(slug: string): Promise<CategoryPagePayload | null> {
  const live = await sanityFetch<CategoryPagePayload>({
    query: CATEGORY_PAGE_QUERY,
    params: { slug },
  })
  if (live?.category) return live
  return fallbackCategoryPage(slug)
}

async function loadAllCategories() {
  const live = await sanityFetch<{ slug: string; title: string }[]>({
    query: CATEGORIES_QUERY,
  })
  if (live && live.length > 0) return live
  return fallbackCategoryList().map(c => ({ slug: c.slug, title: c.title }))
}

export async function generateStaticParams() {
  const cats = await loadAllCategories()
  return cats.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await loadPage(slug)
  if (!data?.category) return { title: 'Category' }
  return {
    title: data.category.title,
    description: data.category.description ?? `Articles in ${data.category.title}`,
    openGraph: {
      title: `${data.category.title} | SOYL AI Library`,
      description: data.category.description ?? `Articles in ${data.category.title}`,
      type: 'website',
    },
  }
}

export default async function LibraryCategoryPage({ params }: PageProps) {
  const { slug } = await params
  const [data, allCategories] = await Promise.all([loadPage(slug), loadAllCategories()])
  if (!data?.category) notFound()

  return (
    <main className="bg-obsidian min-h-screen pt-16">
      <LibraryHero
        eyebrow="Library"
        title={data.category.title}
        showNewsletter={false}
      />
      {/* CategoryPage contains CategoryPillBar which reads useSearchParams.
          Without this Suspense boundary, the SSG prerender (via
          generateStaticParams) fails with the CSR-bailout error. */}
      <Suspense fallback={<div className="h-16 border-b border-mint/8 bg-obsidian/85" aria-hidden />}>
        <CategoryPage
          category={{ ...data.category, items: data.items }}
          items={data.items}
          allCategories={allCategories}
        />
      </Suspense>
    </main>
  )
}
