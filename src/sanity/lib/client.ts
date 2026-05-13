import { createClient, type SanityClient } from 'next-sanity'
import { apiVersion, dataset, isSanityConfigured, projectId } from '../env'

let _client: SanityClient | null = null
if (isSanityConfigured) {
  _client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: 'published',
  })
}

export const sanityClient = _client

type FetchOpts = {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
  revalidate?: number | false
}

// All site reads go through this wrapper. When Sanity isn't configured the
// caller decides how to fall back (typically to mockData). When a fetch
// throws, we log and return null so a transient Sanity outage degrades to
// the fallback rather than tanking the page.
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
  revalidate = 60,
}: FetchOpts): Promise<T | null> {
  if (!sanityClient) return null
  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { tags, revalidate: revalidate === false ? undefined : revalidate },
    })
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[sanity] fetch failed:', err)
    }
    return null
  }
}
