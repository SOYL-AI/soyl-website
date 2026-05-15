// Dev/preview fallback that shapes the local mockData into the same
// LibraryIndexData / detail shapes Sanity returns. Lets the new Library
// render cleanly before the CEO provisions Sanity, and during local dev
// when env vars aren't set.

import { MOCK_BLOGS, MOCK_PAPERS } from '@/lib/mockData'
import type {
  BlogPostDoc,
  Category,
  JobPostingDoc,
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

// Seed roles, used when Sanity is unconfigured or unreachable. Shape matches
// JOBS_QUERY exactly so the same RolesSection code renders both modes.
const FALLBACK_JOBS: JobPostingDoc[] = [
  {
    _id: 'fallback-job-eng-voice',
    slug: 'voice-ai-engineer',
    title: 'Voice AI Engineer',
    team: 'engineering',
    location: 'Bengaluru',
    employmentType: 'full-time',
    applyUrl: 'mailto:careers@soylai.com?subject=Voice%20AI%20Engineer',
    summary: 'Ship the next chapter of Butler. Real-time speech, low-latency inference, production hardening.',
    featured: true,
    publishedAt: '2026-05-10T00:00:00Z',
  },
  {
    _id: 'fallback-job-eng-infra',
    slug: 'infrastructure-engineer',
    title: 'Infrastructure Engineer',
    team: 'engineering',
    location: 'Bengaluru',
    employmentType: 'full-time',
    applyUrl: 'mailto:careers@soylai.com?subject=Infrastructure%20Engineer',
    summary: 'Own the substrate Butler runs on — GPU orchestration, observability, and on-device deployment.',
    featured: true,
    publishedAt: '2026-05-08T00:00:00Z',
  },
  {
    _id: 'fallback-job-product-design',
    slug: 'product-designer',
    title: 'Product Designer, Hospitality',
    team: 'engineering',
    location: 'Bengaluru',
    employmentType: 'full-time',
    applyUrl: 'mailto:careers@soylai.com?subject=Product%20Designer',
    summary: 'Design the surfaces hotel staff and guests will use every shift. Voice-first, calm, opinionated.',
    featured: false,
    publishedAt: '2026-05-02T00:00:00Z',
  },
  {
    _id: 'fallback-job-gtm-ae',
    slug: 'enterprise-account-executive',
    title: 'Enterprise Account Executive',
    team: 'go-to-market',
    location: 'Bengaluru · Remote (India)',
    employmentType: 'full-time',
    applyUrl: 'mailto:careers@soylai.com?subject=Enterprise%20AE',
    summary: 'Take Butler into India’s flagship hotels. You’ll own pilots end-to-end and bring back the truth.',
    featured: false,
    publishedAt: '2026-04-28T00:00:00Z',
  },
  {
    _id: 'fallback-job-postsales-cs',
    slug: 'customer-success-lead',
    title: 'Customer Success Lead',
    team: 'post-sales',
    location: 'Bengaluru',
    employmentType: 'full-time',
    applyUrl: 'mailto:careers@soylai.com?subject=Customer%20Success%20Lead',
    summary: 'Turn one launched pilot into ten. Onboarding, integrations, executive trust-building.',
    featured: false,
    publishedAt: '2026-04-22T00:00:00Z',
  },
  {
    _id: 'fallback-job-ga-ops',
    slug: 'people-operations',
    title: 'People Operations',
    team: 'g-and-a',
    location: 'Bengaluru',
    employmentType: 'full-time',
    applyUrl: 'mailto:careers@soylai.com?subject=People%20Operations',
    summary: 'Build the operating system for a hard-shipping team. Hiring, comp, and the calm in between.',
    featured: false,
    publishedAt: '2026-04-15T00:00:00Z',
  },
]

export function fallbackJobs(): JobPostingDoc[] {
  return FALLBACK_JOBS
}

export function fallbackLibraryPreview() {
  const idx = fallbackLibraryIndex()
  return {
    latestBlog: idx.allItems.find(i => i._type === 'blogPost') ?? null,
    latestPaper: idx.allItems.find(i => i._type === 'whitepaper') ?? null,
  }
}
