// Shared Library types. These match the GROQ projections in queries.ts and
// the mockData fallback. When Sanity is offline or unconfigured, mockData
// is shaped to this interface so the same components work in both modes.

import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageSource } from '@sanity/image-url'

export type LibraryItemType = 'blogPost' | 'whitepaper'

export interface CategoryRef {
  slug: string
  title: string
}

export interface LibraryCard {
  _type: LibraryItemType
  slug: string
  title: string
  subtitle?: string | null
  category?: CategoryRef | null
  publishedAt?: string | null
  excerpt?: string | null
  abstract?: string | null
  readTime?: number | null
  year?: number | null
  pages?: number | null
  tags?: string[] | null
  coverImage?: SanityImageSource | null
  pdfUrl?: string | null
}

export interface Category {
  slug: string
  title: string
  description?: string | null
  order?: number | null
  count?: number
  items?: LibraryCard[]
}

export interface LibraryIndexData {
  categories: Category[]
  allItems: LibraryCard[]
}

export interface BlogPostDoc {
  _type: 'blogPost'
  slug: string
  title: string
  category: CategoryRef | null
  author: string
  publishedAt: string
  readTime: number
  excerpt: string
  tags: string[]
  coverImage?: SanityImageSource | null
  body: PortableTextBlock[]
  related: LibraryCard[]
}

export interface WhitepaperDoc {
  _type: 'whitepaper'
  slug: string
  title: string
  subtitle?: string | null
  category: CategoryRef | null
  authors: string[]
  publishedAt?: string | null
  year: number
  pages?: number | null
  abstract: string
  tags: string[]
  coverImage?: SanityImageSource | null
  pdfUrl?: string | null
  related: LibraryCard[]
}
