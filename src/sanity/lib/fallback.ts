// Dev/preview fallback that shapes the local mockData into the same
// LibraryIndexData / detail shapes Sanity returns. Lets the new Library
// render cleanly before the CEO provisions Sanity, and during local dev
// when env vars aren't set.

import { MOCK_BLOGS, MOCK_PAPERS } from '@/lib/mockData'
import type {
  BlogPostDoc,
  Category,
  LibraryCard,
  LibraryIndexData,
  WhitepaperDoc,
} from './types'

// Seed categories mirror the ones the founders will edit in Studio.
const FALLBACK_CATEGORIES = [
  { slug: 'hospitality', title: 'Hospitality', order: 10 },
  { slug: 'ai-strategy', title: 'AI Strategy', order: 20 },
  { slug: 'engineering', title: 'Engineering', order: 30 },
  { slug: 'research', title: 'Research', order: 40 },
  { slug: 'product', title: 'Product', order: 50 },
  { slug: 'company-news', title: 'Company News', order: 60 },
] as const

function paperToCard(p: typeof MOCK_PAPERS[number]): LibraryCard {
  return {
    _type: 'whitepaper',
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle ?? null,
    category: { slug: 'research', title: 'Research' },
    publishedAt: null,
    excerpt: null,
    abstract: p.abstract,
    readTime: null,
    year: p.year,
    pages: p.pages ?? null,
    tags: p.tags ?? [],
    coverImage: null,
    pdfUrl: p.pdfUrl ?? null,
  }
}

function blogToCard(b: typeof MOCK_BLOGS[number]): LibraryCard {
  return {
    _type: 'blogPost',
    slug: b.slug,
    title: b.title,
    subtitle: null,
    category: { slug: 'engineering', title: 'Engineering' },
    publishedAt: b.date,
    excerpt: b.excerpt,
    abstract: null,
    readTime: b.readTime,
    year: null,
    pages: null,
    tags: b.tags ?? [],
    coverImage: null,
    pdfUrl: null,
  }
}

export function fallbackLibraryIndex(): LibraryIndexData {
  const blogCards = MOCK_BLOGS.map(blogToCard)
  const paperCards = MOCK_PAPERS.map(paperToCard)
  const allItems = [...blogCards, ...paperCards].sort((a, b) => {
    const ay = a.publishedAt ?? String(a.year ?? '')
    const by = b.publishedAt ?? String(b.year ?? '')
    return by.localeCompare(ay)
  })

  const categories: Category[] = FALLBACK_CATEGORIES.map(cat => {
    const items = allItems.filter(it => it.category?.slug === cat.slug)
    return {
      slug: cat.slug,
      title: cat.title,
      description: null,
      order: cat.order,
      count: items.length,
      items: items.slice(0, 6),
    }
  })

  return { categories, allItems }
}

export function fallbackCategoryList(): Category[] {
  const idx = fallbackLibraryIndex()
  return idx.categories
}

export function fallbackCategoryPage(slug: string) {
  const idx = fallbackLibraryIndex()
  const category = idx.categories.find(c => c.slug === slug)
  if (!category) return null
  return {
    category: { slug: category.slug, title: category.title, description: category.description },
    items: idx.allItems.filter(it => it.category?.slug === slug),
  }
}

export function fallbackWhitepaperBySlug(slug: string): WhitepaperDoc | null {
  const p = MOCK_PAPERS.find(x => x.slug === slug)
  if (!p) return null
  return {
    _type: 'whitepaper',
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle ?? null,
    category: { slug: 'research', title: 'Research' },
    authors: p.authors,
    publishedAt: null,
    year: p.year,
    pages: p.pages ?? null,
    abstract: p.abstract,
    tags: p.tags ?? [],
    coverImage: null,
    pdfUrl: p.pdfUrl ?? null,
    related: MOCK_PAPERS
      .filter(x => x.slug !== slug)
      .map(paperToCard)
      .slice(0, 3),
  }
}

export function fallbackBlogBySlug(): BlogPostDoc | null {
  // No blog posts in mockData. Returning null exercises the not-found path,
  // which is the realistic behaviour pre-Sanity.
  return null
}

export function fallbackLibraryPreview() {
  const idx = fallbackLibraryIndex()
  return {
    latestBlog: idx.allItems.find(i => i._type === 'blogPost') ?? null,
    latestPaper: idx.allItems.find(i => i._type === 'whitepaper') ?? null,
  }
}
