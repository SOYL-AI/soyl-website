'use client'
import { useRef, useState } from 'react'
import { Link } from 'next-view-transitions'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '@/components/ui/SectionLabel'
import ImageMarquee from '@/components/ui/ImageMarquee'
import EditorialMarker from '@/components/ui/EditorialMarker'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const STEPS = [
  { 
    number: '01', title: 'Discover', 
    description: 'We begin by deeply understanding the problem space, user needs, and business context.',
    gradient: 'from-mint/10 via-mint/5 to-transparent',
    pattern: 'radial-gradient(circle at 30% 40%, rgba(175,208,204,0.12) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(175,208,204,0.08) 0%, transparent 50%)',
  },
  { 
    number: '02', title: 'Design', 
    description: 'Rapid prototyping and design thinking translate insights into tangible solutions.',
    gradient: 'from-transparent via-mint/8 to-mint/12',
    pattern: 'linear-gradient(135deg, rgba(175,208,204,0.06) 25%, transparent 25%, transparent 50%, rgba(175,208,204,0.06) 50%, rgba(175,208,204,0.06) 75%, transparent 75%)',
  },
  { 
    number: '03', title: 'Build', 
    description: 'Engineering rigour and AI-first thinking produce robust, scalable products.',
    gradient: 'from-mint/8 via-transparent to-mint/6',
    pattern: 'linear-gradient(45deg, rgba(175,208,204,0.08) 0%, transparent 40%), radial-gradient(ellipse at 80% 20%, rgba(175,208,204,0.1) 0%, transparent 70%)',
  },
  { 
    number: '04', title: 'Iterate', 
    description: 'Continuous feedback loops and real-world data drive ongoing refinement.',
    gradient: 'from-transparent via-mint/6 to-mint/10',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(175,208,204,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(175,208,204,0.06) 0%, transparent 60%)',
  },
]

const MARQUEE_IMAGES = [
  '/images/marquee/01-bengaluru-rooftop.png',
  '/images/marquee/02-whiteboard.png',
  '/images/marquee/03-jetson-board.png',
  '/images/marquee/04-desk-laptop.png',
  '/images/marquee/05-voice-setup.png',
  '/images/marquee/06-monsoon-window.png',
]

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
    const mm = gsap.matchMedia()
    
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
    <section className="relative bg-atmosphere-warm section-scanline py-16 md:py-24 border-y border-mint/5">
      <EditorialMarker number="03" label="PROCESS" position="top-right" />
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative">
          {/* Left — Step list */}
          <div ref={stepsRef} className="pb-12">
            <SectionLabel>How We Work</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-soyl-white mb-12">
              Our Process
            </h2>
            
            <div className="space-y-8">
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
              <Link href="/how-we-work" className="text-soyl-white text-sm font-medium hover:text-mint transition-colors inline-block mt-4 link-underline">
                See Full Process →
              </Link>
            </div>
          </div>

          {/* Right — Scroll Panels with CSS gradient visuals */}
          <div className="flex flex-col gap-6 md:gap-[30vh] pb-12 md:pb-[20vh]">
            {STEPS.map((step, i) => (
              <div 
                key={`panel-${i}`} 
                className={`step-panel aspect-video w-full rounded-xl overflow-hidden border border-mint/10 relative transition-all duration-500 ${i === activeStep ? 'border-mint/25 shadow-lg shadow-mint/5' : ''}`}
              >
                {/* Abstract gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient}`} />
                {/* Pattern overlay */}
                <div className="absolute inset-0" style={{ backgroundImage: step.pattern, backgroundSize: step.number === '02' ? '20px 20px' : 'cover' }} />
                {/* Step number watermark */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-[120px] font-bold text-mint/[0.04] select-none">{step.number}</span>
                </div>
                {/* Step label */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-mint/40" />
                  <span className="text-mint/50 text-xs tracking-widest uppercase">{step.title}</span>
                </div>
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
