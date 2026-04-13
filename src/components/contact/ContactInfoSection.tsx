'use client'
import { Mail, MapPin, MessageSquare, Terminal, Network } from 'lucide-react'

export default function ContactInfoSection() {
  return (
    <section className="bg-obsidian border-t border-mint/5 py-16 md:py-24 relative z-10 w-full">
      <div className="max-w-content mx-auto px-6 lg:px-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* Email Direct Channel Block */}
          <div className="flex flex-col items-center md:items-start group">
            <div className="w-12 h-12 rounded-2xl bg-mint/5 border border-mint/20 flex flex-col items-center justify-center text-mint mb-5 group-hover:bg-mint/10 group-hover:scale-110 transition-all duration-300">
              <Mail size={20} />
            </div>
            <h3 className="font-heading font-medium text-lg text-soyl-white mb-2 tracking-wide">Direct Channel</h3>
            <p className="text-graphite/70 text-sm mb-3 max-w-[250px] leading-relaxed">For inquiries mapping to architectural integrations or dedicated enterprise support.</p>
            <a href="mailto:hello@soyl.ai" className="text-mint font-mono text-sm uppercase tracking-widest hover:text-soyl-white transition-colors">
              hello@soyl.ai
            </a>
          </div>

          {/* Physical Node Location Block */}
          <div className="flex flex-col items-center md:items-start group">
            <div className="w-12 h-12 rounded-2xl bg-mint/5 border border-mint/20 flex flex-col items-center justify-center text-mint mb-5 group-hover:bg-mint/10 group-hover:scale-110 transition-all duration-300">
              <MapPin size={20} />
            </div>
            <h3 className="font-heading font-medium text-lg text-soyl-white mb-2 tracking-wide">Physical Nodes</h3>
            <p className="text-graphite/70 text-sm mb-3 max-w-[250px] leading-relaxed">Our physical architecture relies on decentralized nodes, but HQ is heavily concentrated here.</p>
            <address className="text-graphite font-mono text-sm uppercase tracking-widest not-italic leading-relaxed">
              San Francisco, CA<br/>
              Planet Earth
            </address>
          </div>

          {/* Digital Social Footprint Block */}
          <div className="flex flex-col items-center md:items-start group">
            <div className="w-12 h-12 rounded-2xl bg-mint/5 border border-mint/20 flex flex-col items-center justify-center text-mint mb-5 group-hover:bg-mint/10 group-hover:scale-110 transition-all duration-300">
              <span className="font-mono text-lg font-bold">@</span>
            </div>
            <h3 className="font-heading font-medium text-lg text-soyl-white mb-2 tracking-wide">Digital Footprint</h3>
            <p className="text-graphite/70 text-sm mb-4 max-w-[250px] leading-relaxed">Track our ongoing architectural framework updates across our external network feeds.</p>
            <div className="flex items-center gap-5">
              <a href="https://twitter.com/soyl_ai" target="_blank" rel="noopener noreferrer" className="text-graphite hover:text-mint hover:-translate-y-1 transition-all duration-300" aria-label="Twitter">
                <MessageSquare size={20} />
              </a>
              <a href="https://github.com/soyl-ai" target="_blank" rel="noopener noreferrer" className="text-graphite hover:text-mint hover:-translate-y-1 transition-all duration-300" aria-label="GitHub">
                <Terminal size={20} />
              </a>
              <a href="https://linkedin.com/company/soyl-ai" target="_blank" rel="noopener noreferrer" className="text-graphite hover:text-mint hover:-translate-y-1 transition-all duration-300" aria-label="LinkedIn">
                <Network size={20} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
