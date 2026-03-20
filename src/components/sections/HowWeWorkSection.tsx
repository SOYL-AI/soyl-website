'use client'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '@/components/ui/SectionLabel'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}
import ImageMarquee from '@/components/ui/ImageMarquee'

const STEPS = [
  { number: '01', title: 'Discover', description: 'We begin by deeply understanding the problem space, user needs, and business context.' },
  { number: '02', title: 'Design',   description: 'Rapid prototyping and design thinking translate insights into tangible solutions.' },
  { number: '03', title: 'Build',    description: 'Engineering rigour and AI-first thinking produce robust, scalable products.' },
  { number: '04', title: 'Iterate',  description: 'Continuous feedback loops and real-world data drive ongoing refinement.' },
]

// Temporary placeholder images
const MARQUEE_IMAGES = Array.from({ length: 6 }).map((_, i) => `/images/placeholder-${i}.jpg`)

export default function HowWeWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useGSAP(() => {
    // 1. Always track active panels for state
    const panels = gsap.utils.toArray('.step-panel') as HTMLElement[]

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveStep(i),
        onEnterBack: () => setActiveStep(i),
      })
    })

    // 2. Only pin the left container on desktop screens
    let mm = gsap.matchMedia()
    
    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top+=120',
        end: 'bottom bottom-=120',
        pin: stepsRef.current,
        pinSpacing: false,
      })
    })
  }, { scope: containerRef })

  return (
    <section className="bg-elevated py-16 md:py-24 border-y border-mint/5">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <SectionLabel>How We Work</SectionLabel>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-soyl-white mb-12">
          Our Process
        </h2>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative">
          {/* Left — Step list */}
          <div ref={stepsRef} className="space-y-8 pb-12">
            {STEPS.map((step, i) => (
              <div key={step.number} className="flex gap-6 items-start transition-opacity duration-300">
                <span className={`font-display font-bold text-4xl transition-colors duration-300 ${i === activeStep ? 'text-mint' : 'text-graphite/40'}`}>
                  {step.number}
                </span>
                <div>
                  <h3 className={`font-heading font-bold text-lg mb-1 transition-colors duration-300 ${i === activeStep ? 'text-soyl-white' : 'text-graphite'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${i === activeStep ? 'text-soyl-white/70' : 'text-graphite'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
            <a href="/how-we-work" className="text-soyl-white text-sm font-medium hover:text-mint transition-colors inline-block mt-4">
              See Full Process →
            </a>
          </div>

          {/* Right — Scroll Panels */}
          <div className="flex flex-col gap-6 md:gap-[30vh] pb-12 md:pb-[20vh]">
            {STEPS.map((step, i) => (
              <div 
                key={`panel-${i}`} 
                className="step-panel aspect-video w-full bg-obsidian/50 border border-mint/10 rounded-xl flex items-center justify-center transition-opacity shadow-lg"
              >
                <span className="text-graphite/40 text-sm">{step.title} Visual — Phase 3</span>
              </div>
            ))}
          </div>
        </div>

        {/* Infinite Image Marquee */}
        <ImageMarquee images={MARQUEE_IMAGES} />
      </div>
    </section>
  )
}
