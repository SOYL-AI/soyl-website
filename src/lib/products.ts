export interface Product {
  slug: string
  name: string
  shortName: string
  tagline: string
  description: string
  longDescription: string
  features: { icon: string; title: string; description: string }[]
  steps: { title: string; desc: string }[]
  tags: string[]
}

export const PRODUCTS: Product[] = [
  {
    slug: 'echo',
    name: 'SOYL Echo',
    shortName: 'Echo',
    tagline: 'Index Your Narrative',
    description: 'A powerful, ambient narrative ingestion engine that continuously processes daily digital footsteps into coherent memory structures.',
    longDescription: 'SOYL Echo is the foundation of our suite. It leverages multi-modal AI to ingest text, voice, and visual data, organizing chaotic human inputs into a structured, permanently accessible experiential database.',
    features: [
      { icon: 'Brain', title: 'Contextual Tagging', description: 'Automatically categorizes memories based on emotional weight and context.' },
      { icon: 'Lock', title: 'Zero-Knowledge Privacy', description: 'Your data is encrypted before it ever reaches our indexing servers.' },
      { icon: 'Zap', title: 'Real-time Processing', description: 'Instantly structures incoming data streams with imperceptible latency.' },
    ],
    steps: [
      { title: 'Connect & Sync', desc: 'Link your digital environments. Echo runs silently in the background, capturing your data streams with zero friction.' },
      { title: 'Contextual Indexing', desc: 'Multi-modal AI parses your inputs, tagging each memory by emotional weight, relational context, and time.' },
      { title: 'Structured Retrieval', desc: 'Query your indexed narrative in plain language — surface any moment, pattern, or insight with pinpoint precision.' },
    ],
    tags: ['Ingestion', 'NLP', 'Privacy'],
  },
  {
    slug: 'genesis',
    name: 'SOYL Genesis',
    shortName: 'Genesis',
    tagline: 'The Empathic Companion',
    description: 'An intelligent companion AI that naturally converses, reflects, and learns your distinct cognitive patterns over time.',
    longDescription: 'Unlike standard transaction-based LLMs, SOYL Genesis is designed for connection. It uses the index produced by Echo to converse with you, mirroring your insights and acting as an infinitely patient sounding board.',
    features: [
      { icon: 'Heart', title: 'Empathic Tuning', description: 'Adjusts conversational tone based on your state of mind.' },
      { icon: 'History', title: 'Long-term Memory', description: 'Never forgets a detail, linking conversations separated by years.' },
      { icon: 'Shield', title: 'Local Sandboxing', description: 'Can be deployed locally on hardware for maximum confidentiality.' },
    ],
    steps: [
      { title: 'Load Your Index', desc: 'Genesis connects to your Echo index, granting it full contextual awareness of your documented narrative.' },
      { title: 'Calibrate Your Persona', desc: 'The model learns your communication patterns, emotional signature, and cognitive preferences over time.' },
      { title: 'Continuous Dialogue', desc: 'Engage in meaningful conversation, reflection, and insight generation across unlimited, contextually linked sessions.' },
    ],
    tags: ['Conversational AI', 'Persona', 'Local'],
  },
  {
    slug: 'horizon',
    name: 'SOYL Horizon',
    shortName: 'Horizon',
    tagline: 'Legacy Synthesis',
    description: 'A generational API mapping your organized experiences into actionable, preservable legacy models for descendants.',
    longDescription: 'SOYL Horizon is the pinnacle of the ecosystem. It takes the indexed data and the conversational model and synthesizes a permanent digital vault, capable of preserving your entire experiential map for the future.',
    features: [
      { icon: 'Globe', title: 'Decentralized Vaults', description: 'Data is optionally stored across immutable decentralized nodes.' },
      { icon: 'Share', title: 'Controlled Delegation', description: 'Explicit cryptographic controls on who can access your legacy.' },
      { icon: 'Sparkles', title: 'Generative Insights', description: 'Provides your descendants with actionable wisdom derived from your life.' },
    ],
    steps: [
      { title: 'Ingest the Ecosystem', desc: 'Horizon pulls from your Echo index and Genesis model to construct a complete experiential blueprint.' },
      { title: 'Synthesize Your Legacy', desc: 'AI distils your indexed life into a structured, annotated vault of wisdom, patterns, and narrative.' },
      { title: 'Preserve & Delegate', desc: 'Deploy your legacy to decentralised nodes with explicit cryptographic access controls for your chosen descendants.' },
    ],
    tags: ['Storage', 'Cryptography', 'Legacy'],
  },
]
