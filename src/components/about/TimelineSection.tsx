'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '@/components/ui/SectionLabel'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const TIMELINE = [
  { year: '2023', title: 'Inception', desc: 'SOYL AI was founded with a singular vision: to ensure no human story is ever lost.' },
  { year: '2024', title: 'First Index', desc: 'Deployed our core narrative parsing algorithm, successfully processing over 10 million experiential datapoints.' },
  { year: '2025', title: 'Empathic Release', desc: 'Launched the first public beta of our Empathic Companion, redefining humancentric AI interactions.' },
  { year: '2026', title: 'Global Architecture', desc: 'Expanding our systems globally to provide decentralized, perfectly preserved legacy structures for millions.' }
]

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    let mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Draw Axis Line
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center+=100',
            end: 'bottom center+=100',
            scrub: 0.5,
          }
        }
      )

      // 2. Reveal Nodes
      const nodes = gsap.utils.toArray('.timeline-node') as HTMLElement[]
      nodes.forEach((node) => {
        const content = node.querySelector('.timeline-content')
        const dot = node.querySelector('.timeline-dot')

        gsap.from(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: node,
            start: 'top center+=120',
          }
        })

        gsap.from(content, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: node,
            start: 'top center+=120',
          }
        })
      })
    })

    return () => mm.revert()
  }, { scope: containerRef })

  return (
    <section className="bg-obsidian py-24 md:py-32 overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-16" ref={containerRef}>
        <div className="mb-24 text-center flex flex-col items-center">
          <SectionLabel>Our Story</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-soyl-white mt-2">
            The journey so far
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Faded background line */}
          <div className="absolute left-[36px] md:left-1/2 top-0 bottom-0 w-[1px] bg-mint/10 md:-translate-x-1/2" />
          
          {/* Animated drawing line */}
          <div ref={lineRef} className="absolute left-[36px] md:left-1/2 top-0 bottom-0 w-[1px] bg-mint md:-translate-x-1/2 origin-top scale-y-0" />

          {TIMELINE.map((item, i) => {
            const isLeft = i % 2 === 0

            return (
              <div key={i} className="timeline-node relative flex w-full items-start md:items-center mb-16 md:mb-32 last:mb-0">
                
                {/* Central Dot */}
                <div className="absolute left-[28px] md:left-1/2 top-[10px] md:top-1/2 w-[16px] h-[16px] rounded-full bg-obsidian border-[3px] border-mint z-10 timeline-dot shadow-[0_0_12px_rgba(175,208,204,0.4)] md:-translate-x-1/2 md:-translate-y-1/2" />

                {/* Left Desktop Spacer */}
                {!isLeft && <div className="hidden md:block w-1/2" />}

                {/* Content */}
                <div className={`timeline-content w-full pl-[72px] md:pl-0 md:w-1/2 flex flex-col ${isLeft ? 'md:items-end md:text-right md:pr-16' : 'md:items-start md:text-left md:pl-16'}`}>
                  <span className="font-display text-5xl font-bold text-mint/10 mb-2">{item.year}</span>
                  <h3 className="font-heading text-xl font-bold text-soyl-white mb-3">{item.title}</h3>
                  <p className="text-graphite text-sm leading-relaxed max-w-sm">{item.desc}</p>
                </div>

                {/* Right Desktop Spacer */}
                {isLeft && <div className="hidden md:block w-1/2" />}

              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
