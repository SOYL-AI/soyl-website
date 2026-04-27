'use client'
import { Mail, MapPin, Terminal, Network } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'

export default function ContactInfoSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-atmosphere-warm border-t border-mint/5 py-16 md:py-24 relative z-10 w-full">
      <div className="max-w-content mx-auto px-6 lg:px-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* Email Direct Channel Block */}
          <div className="flex flex-col items-center md:items-start group">
            <div className={[
              'w-12 h-12 rounded-2xl bg-mint/5 border border-mint/20 flex flex-col items-center justify-center text-mint mb-5 group-hover:bg-mint/10 transition-all duration-300',
              prefersReduced ? '' : 'group-hover:scale-110',
            ].join(' ')}>
              <Mail size={20} />
            </div>
            <h3 className="font-heading font-medium text-lg text-soyl-white mb-2 tracking-wide">Email</h3>
            <p className="text-graphite/70 text-sm mb-3 max-w-[250px] leading-relaxed">For pilots, partnerships, and people who just want to say hi.</p>
            <a href="mailto:ryan.gomez@soyl.cloud" className="text-mint font-mono text-sm uppercase tracking-widest hover:text-soyl-white transition-colors break-all">
              ryan.gomez@soyl.cloud
            </a>
          </div>

          {/* Physical Node Location Block */}
          <div className="flex flex-col items-center md:items-start group">
            <div className={[
              'w-12 h-12 rounded-2xl bg-mint/5 border border-mint/20 flex flex-col items-center justify-center text-mint mb-5 group-hover:bg-mint/10 transition-all duration-300',
              prefersReduced ? '' : 'group-hover:scale-110',
            ].join(' ')}>
              <MapPin size={20} />
            </div>
            <h3 className="font-heading font-medium text-lg text-soyl-white mb-2 tracking-wide">Location</h3>
            <p className="text-graphite/70 text-sm mb-3 max-w-[250px] leading-relaxed">HQ in Bengaluru. We work with partners across India and the rest of the world.</p>
            <address className="text-graphite font-mono text-sm uppercase tracking-widest not-italic leading-relaxed">
              Bengaluru, Karnataka<br/>
              India
            </address>
          </div>

          {/* Digital Social Footprint Block */}
          <div className="flex flex-col items-center md:items-start group">
            <div className={[
              'w-12 h-12 rounded-2xl bg-mint/5 border border-mint/20 flex flex-col items-center justify-center text-mint mb-5 group-hover:bg-mint/10 transition-all duration-300',
              prefersReduced ? '' : 'group-hover:scale-110',
            ].join(' ')}>
              <span className="font-mono text-lg font-bold">@</span>
            </div>
            <h3 className="font-heading font-medium text-lg text-soyl-white mb-2 tracking-wide">Social</h3>
            <p className="text-graphite/70 text-sm mb-4 max-w-[250px] leading-relaxed">Follow along as we build. We post when we ship, not before.</p>
            <div className="flex items-center gap-5">
              <a href="https://linkedin.com/company/soyl-ai" target="_blank" rel="noopener noreferrer" className={[
                'text-graphite hover:text-mint transition-all duration-300',
                prefersReduced ? '' : 'hover:-translate-y-1',
              ].join(' ')} aria-label="LinkedIn">
                <Network size={20} />
              </a>
              <a href="https://github.com/soyl-ai" target="_blank" rel="noopener noreferrer" className={[
                'text-graphite hover:text-mint transition-all duration-300',
                prefersReduced ? '' : 'hover:-translate-y-1',
              ].join(' ')} aria-label="GitHub">
                <Terminal size={20} />
              </a>
              <a href="mailto:ryan.gomez@soyl.cloud" className={[
                'text-graphite hover:text-mint transition-all duration-300',
                prefersReduced ? '' : 'hover:-translate-y-1',
              ].join(' ')} aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
