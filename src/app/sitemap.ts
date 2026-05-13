import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/client'
import { SITEMAP_QUERY } from '@/sanity/lib/queries'
import { fallbackLibraryIndex } from '@/sanity/lib/fallback'
import { PRODUCTS } from '@/lib/products'

const SITE = 'https://soylai.com'

type SitemapPayload = {
  blogs: { slug: string; updated?: string }[]
  papers: { slug: string; updated?: string }[]
  categories: { slug: string; updated?: string }[]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/products`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/how-we-work`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/library`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map(p => ({
    url: `${SITE}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const live = await sanityFetch<SitemapPayload>({ query: SITEMAP_QUERY, revalidate: 600 })
  let blogs = live?.blogs ?? []
  let papers = live?.papers ?? []
  let categories = live?.categories ?? []

  if (!live) {
    // Fallback to mockData so research papers still appear in the sitemap
    // before Sanity is provisioned.
    const idx = fallbackLibraryIndex()
    blogs = idx.allItems.filter(i => i._type === 'blogPost').map(i => ({ slug: i.slug }))
    papers = idx.allItems.filter(i => i._type === 'whitepaper').map(i => ({ slug: i.slug }))
    categories = idx.categories.map(c => ({ slug: c.slug }))
  }

  const blogRoutes: MetadataRoute.Sitemap = blogs.map(b => ({
    url: `${SITE}/library/blog/${b.slug}`,
    lastModified: b.updated ? new Date(b.updated) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const paperRoutes: MetadataRoute.Sitemap = papers.map(p => ({
    url: `${SITE}/library/research/${p.slug}`,
    lastModified: p.updated ? new Date(p.updated) : now,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = categories.map(c => ({
    url: `${SITE}/library/category/${c.slug}`,
    lastModified: c.updated ? new Date(c.updated) : now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    ...staticRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...blogRoutes,
    ...paperRoutes,
  ]
}
