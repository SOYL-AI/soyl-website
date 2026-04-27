'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '@/components/ui/SectionLabel'
import EditorialMarker from '@/components/ui/EditorialMarker'
import { type Product } from '@/lib/products'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ProductHowItWorksSection({ product }: { product: Product }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Draw the vertical connector line as user scrolls through the section
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 0.5,
          },
        }
      )

      // Pop in each step node as the line reaches it
      const nodes = gsap.utils.toArray('.hiw-node') as HTMLElement[]
      nodes.forEach((node) => {
        const dot = node.querySelector('.hiw-dot')
        const content = node.querySelector('.hiw-content')

        gsap.from(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: node, start: 'top center+=100' },
        })

        gsap.from(content, {
          x: -30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: node, start: 'top center+=100' },
        })
      })
    })

    return () => mm.revert()
  }, { scope: containerRef })

  return (
    <section className="relative bg-atmosphere-cool border-b border-mint/5 py-24 md:py-32 overflow-hidden">
      <EditorialMarker number="03" label="MECHANISM" position="top-right" />
      <div className="max-w-3xl mx-auto px-6 lg:px-16 w-full" ref={containerRef}>
        <div className="mb-20 text-center flex flex-col items-center">
          <SectionLabel className="justify-center">Mechanism</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-soyl-white mt-2">
            How it operates
          </h2>
        </div>

        <div className="relative py-4">
          {/* Faded track line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-mint/10" />
          {/* Active drawing line */}
          <div ref={lineRef} className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-mint origin-top scale-y-0" />

          {product.steps.map((step, i) => (
            <div key={i} className="hiw-node relative w-full mb-16 last:mb-0 pl-[64px] md:pl-[80px]">
              <div className="hiw-dot absolute left-[12px] top-[24px] w-[24px] h-[24px] rounded-full bg-obsidian border-[3px] border-mint z-10 flex items-center justify-center shadow-[0_0_15px_rgba(175,208,204,0.3)]">
                <span className="text-[10px] font-bold text-mint">{i + 1}</span>
              </div>

              <div className="hiw-content w-full bg-mint/[0.02] border border-mint/10 rounded-2xl p-6 md:p-8 hover:border-mint/30 hover:bg-mint/[0.04] transition-all duration-300">
                <h3 className="font-heading font-bold text-2xl text-soyl-white mb-3">
                  {step.title}
                </h3>
                <p className="text-graphite leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
