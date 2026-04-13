import type { Metadata } from 'next'
import LibraryHeroSection from '@/components/library/LibraryHeroSection'
import LibraryLayoutSection from '@/components/library/LibraryLayoutSection'
import CTAStripSection from '@/components/about/CTAStripSection'

export const metadata: Metadata = { title: 'Library & Research | SOYL AI' }

export default function LibraryPage() {
  return (
    <main className="min-h-screen bg-obsidian flex flex-col pt-16">
      <LibraryHeroSection />
      
      <LibraryLayoutSection />

      {/* Globally consistent call to action shared component */}
      <CTAStripSection />
    </main>
  )
}
