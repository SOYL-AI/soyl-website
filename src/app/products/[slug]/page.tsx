import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Product' }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <main className="min-h-screen bg-obsidian pt-24">
      <div className="max-w-content mx-auto px-6 text-graphite text-sm">[Product: {slug} — Phase 4]</div>
    </main>
  )
}
