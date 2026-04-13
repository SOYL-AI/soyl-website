import type { Metadata } from 'next'
import AboutHeroSection from '@/components/about/AboutHeroSection'
import MissionVisionSection from '@/components/about/MissionVisionSection'
import ValuesSection from '@/components/about/ValuesSection'
import TeamSection from '@/components/about/TeamSection'
import CTAStripSection from '@/components/about/CTAStripSection'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-obsidian pt-16 flex flex-col">
      <AboutHeroSection />
      
      <MissionVisionSection />
      
      {/* Timeline goes here eventually */}
      
      <ValuesSection />
      <TeamSection />

      <CTAStripSection />
    </main>
  )
}
