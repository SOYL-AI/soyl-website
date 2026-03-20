import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

const PRODUCTS = [
  { slug: 'product-one', name: 'Product One', description: 'Short description of what this product does and who it is for.' },
  { slug: 'product-two', name: 'Product Two', description: 'Short description of what this product does and who it is for.' },
  { slug: 'product-three', name: 'Product Three', description: 'Short description of what this product does and who it is for.' },
]

export default function ProductsSection() {
  return (
    <section className="bg-obsidian py-16 md:py-24">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <SectionLabel>Our Products</SectionLabel>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-soyl-white mb-4">
          AI Solutions Built for Impact
        </h2>
        <p className="text-graphite max-w-xl mb-12">
          Three products, one mission — making AI that genuinely serves people.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PRODUCTS.map(product => (
            <div key={product.slug} className="bg-card-bg border border-mint/12 rounded-xl p-8 flex flex-col gap-6 hover:border-mint/40 transition-colors duration-200">
              {/* Icon placeholder */}
              <div className="w-12 h-12 bg-mint/10 rounded-lg flex items-center justify-center">
                <span className="text-mint text-lg">◆</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-soyl-white">{product.name}</h3>
              <p className="text-graphite text-sm leading-relaxed flex-1">{product.description}</p>
              <a href={`/products/${product.slug}`} className="text-mint text-sm inline-flex items-center gap-1 hover:gap-2 transition-all duration-200">
                Explore →
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button href="/products">View All Products →</Button>
        </div>
      </div>
    </section>
  )
}
