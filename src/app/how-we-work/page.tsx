import type { Metadata } from 'next'
import HowWeWorkHeroSection from '@/components/how-we-work/HowWeWorkHeroSection'
import PrinciplesGridSection from '@/components/how-we-work/PrinciplesGridSection'
import ToolsPracticesSection from '@/components/how-we-work/ToolsPracticesSection'
import CTAStripSection from '@/components/about/CTAStripSection'

export const metadata: Metadata = { title: 'How We Work' }

export default function HowWeWorkPage() {
  return (
    <main className="min-h-screen bg-obsidian flex flex-col pt-16">
      <HowWeWorkHeroSection />
      
      {/* <ExpandedProcessSection /> */}
      
      <PrinciplesGridSection />
      
      {/* <CultureGallerySection /> */}
      
      <ToolsPracticesSection />

      {/* Globally consistent call to action shared component */}
      <CTAStripSection />
    </main>
  )
}
