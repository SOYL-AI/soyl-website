import type { Metadata } from 'next'
import ProductsHeroSection from '@/components/products/ProductsHeroSection'
import ProductGridSection from '@/components/products/ProductGridSection'
import CTAStripSection from '@/components/about/CTAStripSection'

export const metadata: Metadata = { title: 'Products' }

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-obsidian pt-16 flex flex-col">
      <ProductsHeroSection />
      
      <ProductGridSection />

      {/* Reusing the CTA created during the About phase */}
      <CTAStripSection />
    </main>
  )
}
