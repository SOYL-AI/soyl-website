export interface Blog {
  slug: string
  title: string
  author: string
  date: string
  readTime: number
  excerpt: string
  tags: string[]
  image?: string
}

export interface Paper {
  slug: string
  title: string
  subtitle?: string
  authors: string[]
  year: number
  date: string
  abstract: string
  tags: string[]
  pdfUrl?: string
  pages?: number
}

// No engineering blog posts yet — the Library currently focuses on whitepapers.
// When real posts land, add them here and the blog teaser becomes a real grid.
export const MOCK_BLOGS: Blog[] = []

export const MOCK_PAPERS: Paper[] = [
  {
    slug: 'when-easy-isnt-easy-enough',
    title: 'When "Easy" Isn\'t Easy Enough',
    subtitle:
      "Lessons from a 30-Room Hotel Pilot, and What It Taught Us About India's Budget Hospitality Segment",
    authors: ['SOYL AI Research'],
    year: 2026,
    date: 'May 2026',
    abstract:
      "SOYL AI was built on a single guiding principle: a property management system dramatically easier to use than the legacy tools the hospitality industry has tolerated for decades. In our first pilot — a 30-room independent hotel in India with a 3.4–3.8 Google Maps rating and average room rates of ₹1,500–₹1,800 — we received a piece of feedback that, on the surface, contradicted our entire thesis: 'The software is hard to use.' This paper unpacks that feedback and what it taught us about a specific, under-studied segment of Indian hospitality where the incumbent isn't worse software — it's a pen, a register, and a manager who has internalised both.",
    tags: ['Hospitality', 'Hotel Pilot', 'India', 'Product Strategy'],
    pdfUrl: '/papers/when-easy-isnt-easy-enough.pdf',
    pages: 8,
  },
  {
    slug: 'checking-in-to-the-ai-era',
    title: 'Checking In to the AI Era',
    subtitle:
      'How Artificial Intelligence Is Transforming Revenue Growth and Operational Loss Optimisation Across the Hospitality Industry',
    authors: ['SOYL AI Research'],
    year: 2026,
    date: 'April 2026',
    abstract:
      'The hospitality industry is entering a period of irreversible structural change. After a decade of margin compression — compounded by COVID-19 and an uneven recovery — operators can no longer rely on cyclical improvement to restore profitability. AI is the first technology inflection point in modern hospitality capable of addressing volatile demand, rising labour costs, and aggressive OTA intermediation simultaneously and at scale — not as a supplementary optimisation layer, but as a structural reimagining of how hospitality businesses generate revenue, manage cost, and deliver guest experience.',
    tags: ['Hospitality', 'AI Strategy', 'Revenue Optimisation', 'Market Analysis'],
    pdfUrl: '/papers/checking-in-to-the-ai-era.pdf',
    pages: 10,
  },
]
