export interface Product {
  slug: string
  name: string
  tagline: string
  description: string
  longDescription: string
  features: { icon: string; title: string; description: string }[]
  tags: string[]
}

export const PRODUCTS: Product[] = [
  {
    slug: 'echo',
    name: 'SOYL Echo',
    tagline: 'Index Your Narrative',
    description: 'A powerful, ambient narrative ingestion engine that continuously processes daily digital footsteps into coherent memory structures.',
    longDescription: 'SOYL Echo is the foundation of our suite. It leverages multi-modal AI to ingest text, voice, and visual data, organizing chaotic human inputs into a structured, permanently accessible experiential database.',
    features: [
      { icon: 'Brain', title: 'Contextual Tagging', description: 'Automatically categorizes memories based on emotional weight and context.' },
      { icon: 'Lock', title: 'Zero-Knowledge Privacy', description: 'Your data is encrypted before it ever reaches our indexing servers.' },
      { icon: 'Zap', title: 'Real-time Processing', description: 'Instantly structures incoming data streams with imperceptible latency.' }
    ],
    tags: ['Ingestion', 'NLP', 'Privacy']
  },
  {
    slug: 'genesis',
    name: 'SOYL Genesis',
    tagline: 'The Empathic Companion',
    description: 'An intelligent companion AI that naturally converses, reflects, and learns your distinct cognitive patterns over time.',
    longDescription: 'Unlike standard transaction-based LLMs, SOYL Genesis is designed for connection. It uses the index produced by Echo to converse with you, mirroring your insights and acting as an infinitely patient sounding board.',
    features: [
      { icon: 'Heart', title: 'Empathic Tuning', description: 'Adjusts conversational tone based on your state of mind.' },
      { icon: 'History', title: 'Long-term Memory', description: 'Never forgets a detail, linking conversations separated by years.' },
      { icon: 'Shield', title: 'Local Sandboxing', description: 'Can be deployed locally on hardware for maximum confidentiality.' }
    ],
    tags: ['Conversational AI', 'Persona', 'Local']
  },
  {
    slug: 'horizon',
    name: 'SOYL Horizon',
    tagline: 'Legacy Synthesis',
    description: 'A generational API mapping your organized experiences into actionable, preservable legacy models for descendants.',
    longDescription: 'SOYL Horizon is the pinnacle of the ecosystem. It takes the indexed data and the conversational model and synthesizes a permanent digital vault, capable of preserving your entire experiential map for the future.',
    features: [
      { icon: 'Globe', title: 'Decentralized Vaults', description: 'Data is optionally stored across immutable decentralized nodes.' },
      { icon: 'Share', title: 'Controlled Delegation', description: 'Explicit cryptographic controls on who can access your legacy.' },
      { icon: 'Sparkles', title: 'Generative Insights', description: 'Provides your descendants with actionable wisdom derived from your life.' }
    ],
    tags: ['Storage', 'Cryptography', 'Legacy']
  }
]
