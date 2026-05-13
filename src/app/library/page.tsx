import type { Metadata } from 'next'
import LibraryHero from '@/components/library/LibraryHero'
import LibraryFilterShell from '@/components/library/LibraryFilterShell'
import { sanityFetch } from '@/sanity/lib/client'
import { LIBRARY_INDEX_QUERY } from '@/sanity/lib/queries'
import { fallbackLibraryIndex } from '@/sanity/lib/fallback'
import type { LibraryIndexData } from '@/sanity/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Library',
  description:
    'Engineering notes, hospitality research, and product writing from the SOYL AI team.',
  openGraph: {
    title: 'Library | SOYL AI',
    description:
      'Engineering notes, hospitality research, and product writing from the SOYL AI team.',
    type: 'website',
  },
}

export default async function LibraryIndexPage() {
  // Sanity-first with mock fallback. When env vars are missing the
  // sanityFetch returns null and we render local seed data so the page
  // still demos correctly.
  const live = await sanityFetch<LibraryIndexData>({ query: LIBRARY_INDEX_QUERY })
  const data = live ?? fallbackLibraryIndex()

  return (
    <main className="bg-obsidian min-h-screen pt-16">
      <LibraryHero />
      <LibraryFilterShell data={data} />
    </main>
  )
}
