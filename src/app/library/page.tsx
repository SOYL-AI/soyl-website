import type { Metadata } from 'next'
import LibraryComingSoonSection from '@/components/library/LibraryComingSoonSection'

export const metadata: Metadata = { title: 'Library & Research | SOYL AI' }

export default function LibraryPage() {
  return (
    <main className="min-h-screen bg-obsidian flex flex-col pt-16">
      <LibraryComingSoonSection />
    </main>
  )
}
