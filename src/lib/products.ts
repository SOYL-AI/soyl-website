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
    slug: 'butler-ai',
    name: 'Butler AI',
    shortName: 'Butler AI',
    tagline: 'Voice AI for Hospitality',
    description: 'A multi-agent voice AI Property Management System that lets guests speak, staff listen, and operations run themselves.',
    longDescription: 'Butler AI is a native, AI-first PMS purpose-built for mid-market independent hotels. Guests call, speak naturally, and get answers, bookings, and service requests handled in under three seconds. Behind the scenes, a multi-agent system orchestrates room operations, billing, housekeeping, and concierge tasks — all on a native data layer, not a thin wrapper around legacy systems.',
    features: [
      { icon: 'Zap', title: 'Sub-3s Voice Latency', description: 'Asterisk PBX + Twilio SIP pipeline tuned for natural conversation. No awkward pauses, no robotic prompts.' },
      { icon: 'Brain', title: 'Multi-Agent Orchestration', description: 'LangGraph-powered agents handle bookings, billing, room service, and concierge in parallel — not a single bloated chatbot.' },
      { icon: 'Shield', title: 'Edge Inference Ready', description: 'Runs on AMD Ryzen AI NPUs on-property for resilience when the internet flickers and cost control at scale.' },
    ],
    steps: [
      { title: 'Guest speaks', desc: 'A guest calls the hotel — no app, no QR code, no learning curve. Just a conversation in their own language.' },
      { title: 'Agents resolve', desc: 'A graph of specialized agents — concierge, booking, F&B, housekeeping — coordinate over a shared hotel state to resolve the request end-to-end.' },
      { title: 'Staff stay free', desc: 'Routine asks get handled autonomously. Staff are alerted only when human judgment matters, freeing them to do hospitality, not paperwork.' },
    ],
    tags: ['Voice AI', 'Hospitality', 'Multi-Agent', 'RAG'],
  },
  {
    slug: 'ai-dex',
    name: 'AI Dex',
    shortName: 'AI Dex',
    tagline: 'Your AI, On Your Hardware',
    description: 'A privacy-first personal AI operating system. A small NVIDIA Jetson Orin appliance that lives in your home and gives you a personal LLM, persistent memory, and agent automation — every byte processed locally.',
    longDescription: 'AI Dex is a paradigm shift from "AI as a cloud service" to "AI as infrastructure you own". Plug a Jetson Orin Node into your home WiFi, and from any device, anywhere, you have a personal LLM, a structured personal memory graph spanning years of your digital life, and persistent agents running 24/7 on hardware you physically possess. No subscriptions. No data leaving your home. No rent.',
    features: [
      { icon: 'Lock', title: 'Local-First by Architecture', description: 'Inference, memory, and agent execution all run on the Node. End-to-end encrypted tunnels mean even we cannot read your data.' },
      { icon: 'History', title: 'Personal Memory Graph', description: 'A vector + knowledge graph indexing your files, emails, calendar, and notes. Years of context, queryable in plain language.' },
      { icon: 'Sparkles', title: 'Agent Automation', description: 'Persistent agents subscribe to events, reason over your memory, and execute multi-step workflows within permissions you define.' },
    ],
    steps: [
      { title: 'Plug in the Node', desc: 'A compact, fanless Jetson Orin appliance. Connect to home WiFi via a guided mobile setup — under five minutes, zero terminal commands.' },
      { title: 'Connect your data', desc: 'Files, calendar, email, notes, browser history. AI Dex indexes them locally into a personal memory graph encrypted on the Node\'s SSD.' },
      { title: 'Use it from anywhere', desc: 'Phone, laptop, anywhere in the world — connect securely back to your Node. On the same WiFi it goes direct; abroad, through an encrypted relay.' },
    ],
    tags: ['Edge AI', 'Privacy', 'Jetson Orin', 'Local LLM'],
  },
  {
    slug: 'lifestyle-apps',
    name: 'Lifestyle Apps',
    shortName: 'Lifestyle',
    tagline: 'AI for the Quiet Problems',
    description: 'A growing suite of small, focused apps that use AI to solve the everyday problems most software ignores — finance, mindfulness, the people you keep meaning to call.',
    longDescription: 'The big AI products get the headlines. Lifestyle Apps are SOYL AI\'s answer to the quieter ones — the small frictions that shape a day. Each app is single-purpose, opinionated, and built on the same intelligence layer as our flagship products. None of them try to be everything. All of them try to do one thing exceptionally well.',
    features: [
      { icon: 'Heart', title: 'Single-Purpose by Design', description: 'Every app does one thing — finance, mindfulness, social check-ins. No bloat, no feature creep, no everything-app delusion.' },
      { icon: 'Brain', title: 'Shared Intelligence Layer', description: 'Built on the same RAG and agent infrastructure as Butler AI and AI Dex. Each app gets best-in-class AI without us re-inventing it.' },
      { icon: 'Zap', title: 'Privacy-Conscious', description: 'Opt-in cloud sync. Data minimization by default. No ads. No selling. No exceptions.' },
    ],
    steps: [
      { title: 'Pick your problem', desc: 'Choose one app for one habit. Finance tracking, evening reflection, staying in touch with people who matter.' },
      { title: 'Use it for two weeks', desc: 'The apps are small on purpose. Quick to set up, quick to dismiss if they don\'t click, quick to become part of your day if they do.' },
      { title: 'Add another, or don\'t', desc: 'Apps don\'t need each other. Use one, use all, use none — the suite is à la carte by design.' },
    ],
    tags: ['Consumer', 'Mobile', 'Daily Use'],
  },
]
