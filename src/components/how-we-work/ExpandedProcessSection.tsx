'use client'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '@/components/ui/SectionLabel'
import EditorialMarker from '@/components/ui/EditorialMarker'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const EXPANDED_STEPS = [
  {
    number: '01',
    title: 'Phase I: Listen',
    description: "Every product starts with a real person, a real problem, a real conversation. Before any code, we sit with hotel staff, with home users, with the people who'll use what we build.",
    subSteps: [
      'On-site interviews and shadowing',
      'Problem decomposition before solutioning',
      'Hard "no" on building for personas we have not met',
    ],
    note: 'If we cannot describe the user in one sentence and their problem in another, we are not ready to build.',
    gradient: 'from-mint/10 via-mint/5 to-transparent',
    pattern: 'radial-gradient(circle at 30% 40%, rgba(175,208,204,0.12) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(175,208,204,0.08) 0%, transparent 50%)',
  },
  {
    number: '02',
    title: 'Phase II: Architect',
    description: 'We design for production from day one. Privacy-first by default. Local-first where the hardware allows. Cloud only where it earns its place.',
    subSteps: [
      'Cost and latency budgets set before code',
      'Privacy and data flow diagrams reviewed',
      'Hardware and infra choices justified in writing',
    ],
    note: 'Architecture decisions get documented. Future-us deserves to know why past-us made the call.',
    gradient: 'from-transparent via-mint/8 to-mint/12',
    pattern: 'linear-gradient(135deg, rgba(175,208,204,0.06) 25%, transparent 25%, transparent 50%, rgba(175,208,204,0.06) 50%, rgba(175,208,204,0.06) 75%, transparent 75%)',
  },
  {
    number: '03',
    title: 'Phase III: Ship',
    description: 'We ship to real users early. Butler AI was in a real hotel before we built half its features. The user is the spec.',
    subSteps: [
      'Pilot deployments before polish',
      'Production telemetry from day one',
      'Bug-fixes and shipping take priority over new features',
    ],
    note: "A product not in someone's hands is not a product. It is a slide deck.",
    gradient: 'from-mint/8 via-transparent to-mint/6',
    pattern: 'linear-gradient(45deg, rgba(175,208,204,0.08) 0%, transparent 40%), radial-gradient(ellipse at 80% 20%, rgba(175,208,204,0.1) 0%, transparent 70%)',
  },
  {
    number: '04',
    title: 'Phase IV: Iterate',
    description: "Software rots unless it learns. Every release is informed by what last week's release taught us — from production logs, from user calls, from the team's own dogfooding.",
    subSteps: [
      'Weekly review of production data',
      'User calls every cycle, not just at launch',
      'Roadmap reshaped by what we learn, not by what we promised',
    ],
    note: 'Plans are guesses. Production is the truth. We update our beliefs.',
    gradient: 'from-transparent via-mint/6 to-mint/10',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(175,208,204,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(175,208,204,0.06) 0%, transparent 60%)',
  },
]

export default function ExpandedProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useGSAP(() => {
    const panels = gsap.utils.toArray('.process-panel') as HTMLElement[]

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveStep(i),
        onEnterBack: () => setActiveStep(i),
      })
    })

    const mm = gsap.matchMedia()
    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top+=100',
        end: 'bottom bottom-=100',
        pin: stepsRef.current,
        pinSpacing: false,
      })
    })

    return () => mm.revert()
  }, { scope: containerRef })

  return (
    <section className="relative bg-atmosphere-warm py-24 md:py-32 border-y border-mint/5 overflow-hidden">
      <EditorialMarker number="01" label="LOOP" position="top-right" />
      <div className="max-w-content mx-auto px-6 lg:px-16 w-full">
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative">
          
          {/* Left Side: Pinned Navigation (4 cols) */}
          <div ref={stepsRef} className="lg:col-span-4 pb-12 w-full lg:sticky top-24">
            <SectionLabel>The Loop</SectionLabel>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-soyl-white mb-12 tracking-tight mt-2">
              Build → Ship → Learn
            </h2>
            
            <div className="space-y-6 hidden lg:block">
              {EXPANDED_STEPS.map((step, i) => (
                <div key={step.number} className="flex gap-4 items-center transition-all duration-300">
                  <span className={`font-mono text-sm tracking-widest uppercase transition-colors duration-300 ${i === activeStep ? 'text-mint' : 'text-graphite/40'}`}>
                    {step.number}
                  </span>
                  <div className={`h-[1px] flex-1 transition-all duration-500 ${i === activeStep ? 'bg-mint opacity-100' : 'bg-mint/10 opacity-50'}`} />
                  <h3 className={`font-heading font-medium text-lg xl:text-xl transition-colors duration-300 ${i === activeStep ? 'text-soyl-white' : 'text-graphite/50'}`}>
                    {step.title.split(': ')[1]}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Scroll Panels (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-12 lg:gap-[40vh] pb-12 lg:pb-[20vh]">
            {EXPANDED_STEPS.map((step, i) => (
              <div 
                key={`process-panel-${i}`} 
                className={`process-panel w-full rounded-3xl overflow-hidden border transition-all duration-700 bg-obsidian ${i === activeStep ? 'border-mint/30 shadow-[0_0_40px_rgba(175,208,204,0.05)]' : 'border-mint/10'}`}
              >
                {/* Visual Header Block */}
                <div className="relative aspect-[21/9] w-full border-b border-mint/10">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient}`} />
                  <div className="absolute inset-0" style={{ backgroundImage: step.pattern, backgroundSize: 'cover' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-[120px] md:text-[180px] font-bold text-mint/[0.04] select-none leading-none tracking-tighter">
                      {step.number}
                    </span>
                  </div>
                  <div className="absolute top-6 right-6">
                    <span className="font-mono text-[10px] tracking-widest text-mint/50 border border-mint/20 px-3 py-1 rounded bg-obsidian uppercase">
                      Log // {step.title.split(':')[0]}
                    </span>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-8 md:p-12">
                   <h3 className="font-heading font-bold text-2xl md:text-3xl text-soyl-white mb-4">
                     {step.title}
                   </h3>
                   <p className="text-graphite text-lg leading-relaxed mb-8">
                     {step.description}
                   </p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4 border-t border-b border-mint/10 py-8">
                      <div>
                        <h4 className="text-soyl-white font-mono text-xs uppercase tracking-widest mb-4 opacity-70">Key Deliverables</h4>
                        <ul className="space-y-4">
                          {step.subSteps.map((sub, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-mint mt-[2px] leading-none">▹</span>
                              <span className="text-graphite text-sm">{sub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-mint/[0.02] border border-mint/10 p-6 md:p-8 rounded-2xl flex items-center relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-24 h-24 bg-mint/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
                         <p className="text-sm text-mint/80 italic leading-relaxed relative z-10 w-full text-center">
                           &ldquo;{step.note}&rdquo;
                         </p>
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
