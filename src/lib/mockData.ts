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
  authors: string[]
  year: number
  abstract: string
  tags: string[]
}

export const MOCK_BLOGS: Blog[] = [
  {
    slug: 'cognitive-indexing-at-scale',
    title: 'Cognitive Indexing at Scale: Building the Engine',
    author: 'Ariel Chen',
    date: '2026-03-12',
    readTime: 8,
    excerpt: 'An internal look at how SOYL Echo processes and structures multi-modal inputs with near-zero latency, enabling real-time experiential databases.',
    tags: ['Architecture', 'Engineering'],
    image: '/images/hero-globe.png' // Utilizing existing asset as placeholder
  },
  {
    slug: 'designing-empathy-in-ai',
    title: 'Designing Empathy: The Philosophy of Genesis',
    author: 'Marcus Vance',
    date: '2025-11-20',
    readTime: 6,
    excerpt: 'Standard LLMs feel transactional. Genesis was fundamentally designed to feel relational. Here is the UX psychology driving that bridge.',
    tags: ['Design', 'Philosophy'],
    image: '/images/about-nodes.png' 
  },
  {
    slug: 'the-decentralized-vault',
    title: 'Zero-Knowledge and the Decentralized Ledger',
    author: 'Dr. Sarah Lin',
    date: '2025-08-04',
    readTime: 12,
    excerpt: 'Our commitment to privacy. We explore the cryptographic protocols protecting your legacy data from edge to centralized ingestion.',
    tags: ['Privacy', 'Cryptography']
  },
  {
    slug: 'memory-over-time-gsap',
    title: 'Animating Memory: Why We Chose GSAP',
    author: 'Elias Thorne',
    date: '2025-02-14',
    readTime: 5,
    excerpt: 'The technical decisions behind our highly fluid interface, and how physics-driven animations create a stronger sense of digital permanence.',
    tags: ['Design', 'Engineering']
  }
]

export const MOCK_PAPERS: Paper[] = [
  {
    slug: 'paper-vector-mapping-2026',
    title: 'High-Dimensional Vector Mapping in Chronological Datasets',
    authors: ['Ariel Chen', 'Dr. Sarah Lin'],
    year: 2026,
    abstract: 'We propose a novel methodology for structuring chronological human experiential data utilizing non-linear high-dimensional vector embeddings, achieving a 40% reduction in temporal retrieval latency.',
    tags: ['Algorithms', 'Data Structures']
  },
  {
    slug: 'paper-empathic-tuning-2025',
    title: 'Parameterizing Empathy: Context-Aware State Tracking in Generative Agents',
    authors: ['Marcus Vance', 'Elias Thorne'],
    year: 2025,
    abstract: 'An architectural breakdown of the prompt-state injection loops utilized to grant continuous generative agents a simulated sense of emotional object permanence without maintaining infinite context windows.',
    tags: ['NLP', 'UX Research']
  },
  {
    slug: 'paper-cryptographic-legacy-2024',
    title: 'Immutable Legacy Protocols for Multi-Generational Data Vaults',
    authors: ['Dr. Sarah Lin'],
    year: 2024,
    abstract: 'Outlining a robust cryptographic framework ensuring data integrity and strict delegation mechanics across timespans exceeding a century.',
    tags: ['Cryptography', 'Blockchain']
  },
  {
    slug: 'paper-turbopack-rendering-2023',
    title: 'Edge-Rendered Data Architectures',
    authors: ['Ariel Chen'],
    year: 2023,
    abstract: 'An analysis of utilizing modern build compilers alongside edge-networks to instantly serve dynamic vaults without centralized server bottlenecking.',
    tags: ['Architecture', 'Scaling']
  }
]
