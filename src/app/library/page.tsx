import type { Metadata } from 'next'
import LibraryHeroSection from '@/components/library/LibraryHeroSection'
import LibraryIntroOverlay from '@/components/library/LibraryIntroOverlay'
import PapersGridSection from '@/components/library/PapersGridSection'

export const metadata: Metadata = {
  title: 'Library | SOYL AI',
  description:
    'Whitepapers and engineering research from the SOYL AI team. Long-form writing on voice AI, hospitality pilots, and the segments most software ignores.',
}

export default function LibraryPage() {
  return (
    <main className="min-h-screen bg-obsidian flex flex-col pt-16">
      <LibraryIntroOverlay />
      <LibraryHeroSection />
      <PapersGridSection />
    </main>
  )
}
