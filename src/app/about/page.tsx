import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'About' }
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-obsidian pt-24">
      <div className="max-w-content mx-auto px-6 text-graphite text-sm">[About — Phase 4]</div>
    </main>
  )
}
