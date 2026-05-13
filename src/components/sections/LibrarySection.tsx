import { sanityFetch } from '@/sanity/lib/client'
import { LIBRARY_PREVIEW_QUERY } from '@/sanity/lib/queries'
import { fallbackLibraryPreview } from '@/sanity/lib/fallback'
import type { LibraryCard } from '@/sanity/lib/types'
import LibrarySectionView from './LibrarySectionView'

interface PreviewPayload {
  latestBlog: LibraryCard | null
  latestPaper: LibraryCard | null
}

// Server component shell: fetches the latest blog + latest whitepaper from
// Sanity (with mock fallback) and hands them to the animated client view.
export default async function LibrarySection() {
  const live = await sanityFetch<PreviewPayload>({ query: LIBRARY_PREVIEW_QUERY })
  const data = live ?? fallbackLibraryPreview()
  return <LibrarySectionView latestBlog={data.latestBlog} latestPaper={data.latestPaper} />
}
