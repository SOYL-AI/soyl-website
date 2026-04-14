'use client'
import { Link } from 'next-view-transitions'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { motion, useReducedMotion } from 'framer-motion'
import StaggerContainer from '@/components/motion/StaggerContainer'
import FadeInUp from '@/components/motion/FadeInUp'

const PRODUCTS = [
  { 
    slug: 'butler-ai', 
    tagline: 'VOICE AI FOR HOSPITALITY',
    name: 'Butler AI', 
    description: 'Voice AI that gives every hotel, hospital, and restaurant a soul. Guests speak. Staff listen. Operations run themselves — no typing, no friction, no human error in the way of great hospitality.',
    cta: 'Explore Butler AI →'
  },
  { 
    slug: 'ai-dex', 
    tagline: 'PRIVATE LOCAL INTELLIGENCE',
    name: 'AI Dex', 
    description: 'A self-sustaining module that runs powerful LLMs entirely on-device. Your data never leaves the room. Your home becomes intelligent — fully private, fully yours, fully under your control.',
    cta: 'Explore AI Dex →'
  },
  { 
    slug: 'lifestyle-apps', 
    tagline: 'SOFTWARE FOR EVERYDAY LIFE',
    name: 'Lifestyle Apps', 
    description: 'Small apps for the small things — finance, mindfulness, a reminder to call your parents. Built for the quiet problems most software ignores, and the lives quietly shaped by solving them.',
    cta: 'Explore Apps →'
  },
]

export default function ProductsSection() {
  const prefersReduced = useReducedMotion()
  return (
    <section className="bg-obsidian py-16 md:py-24">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <StaggerContainer>
          <FadeInUp><SectionLabel>OUR PRODUCTS</SectionLabel></FadeInUp>
          <FadeInUp>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-soyl-white mb-4">
              Three Products. One Mission.
            </h2>
          </FadeInUp>
          <FadeInUp>
            <p className="text-graphite max-w-3xl mb-12">
              Voice AI for the industries that serve people. Private intelligence for the homes that protect them. Software for the small moments that shape a life.
            </p>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {PRODUCTS.map(product => (
              <FadeInUp key={product.slug} className="h-full">
                <motion.div 
                  whileHover={prefersReduced ? {} : { y: -6, borderColor: 'rgba(175,208,204,0.4)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative bg-card-bg border border-mint/12 rounded-xl p-8 flex flex-col gap-6 h-full overflow-hidden"
                >
                  {/* Mint gradient flood on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-mint/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10 flex flex-col gap-6 h-full">
                    <div className="flex flex-col gap-2">
                      {product.tagline && (
                        <span className="text-mint/60 font-mono text-[10px] tracking-widest uppercase mb-1">
                          {product.tagline}
                        </span>
                      )}
                      <h3 className="font-heading font-bold text-xl text-soyl-white">{product.name}</h3>
                    </div>
                    <p className="text-graphite text-sm leading-relaxed flex-1">{product.description}</p>
                    <Link href={`/products/${product.slug}`} className="text-mint text-sm inline-flex items-center gap-1 hover:gap-2 transition-all duration-200">
                      {product.cta}
                    </Link>
                  </div>
                </motion.div>
              </FadeInUp>
            ))}
          </div>

          <FadeInUp>
            <div className="text-center">
              <Button href="/products">View All Products →</Button>
            </div>
          </FadeInUp>
        </StaggerContainer>
      </div>
    </section>
  )
}
