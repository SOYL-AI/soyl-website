import { notFound } from 'next/navigation'
import { PRODUCTS } from '@/lib/products'
import ProductDetailHero from '@/components/products/ProductDetailHero'
import ProductOverviewSection from '@/components/products/ProductOverviewSection'
import RelatedProductsSection from '@/components/products/RelatedProductsSection'
import CTAStripSection from '@/components/about/CTAStripSection'

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = PRODUCTS.find((p) => p.slug === slug)
  if (!product) return { title: 'Product Not Found' }
  return { title: `${product.name} - SOYL AI` }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = PRODUCTS.find((p) => p.slug === slug)
  
  if (!product) return notFound()

  return (
    <main className="min-h-screen bg-obsidian pt-16 flex flex-col">
      <ProductDetailHero product={product} />
      <ProductOverviewSection product={product} />
      
      {/* ProductFeaturesSection and ProductHowItWorksSection will be injected here during Task 4 */}
      <div className="flex-1" />
      
      <RelatedProductsSection currentSlug={product.slug} />
      <CTAStripSection />
    </main>
  )
}
