'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Lock, Terminal, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function LibraryComingSoonSection() {
  const prefersReduced = useReducedMotion()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(email) setSubmitted(true)
  }

  return (
    <section className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-obsidian py-24 min-h-[80vh] hero-grid-overlay">
      
      {/* Ambient glow centered */}
      <div className="absolute top-1/2 left-1/2 w-[80vw] md:w-[40vw] h-[80vw] md:h-[40vw] bg-mint/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse duration-[4000ms]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center">
        
        {/* Terminal Card Vault */}
        <motion.div 
          initial={{ opacity: prefersReduced ? 1 : 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full bg-elevated/40 backdrop-blur-xl border border-mint/10 hover:border-mint/30 rounded-[2rem] p-8 md:p-16 shadow-[0_0_60px_rgba(175,208,204,0.03)] relative overflow-hidden transition-colors duration-700"
        >
          {/* Animated vertical scanline */}
          <motion.div 
            animate={prefersReduced ? {} : { top: ["-10%", "110%"] }} 
            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }} 
            className="absolute left-0 right-0 h-[1px] bg-mint/20 z-0 pointer-events-none" 
          />

          <div className="flex flex-col items-center text-center relative z-10">
            
            {/* Glowing Lock / Node */}
            <motion.div 
              animate={prefersReduced ? {} : { y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="w-24 h-24 rounded-[2rem] bg-mint/5 border border-mint/20 flex items-center justify-center mb-10 relative overflow-hidden backdrop-blur-md shadow-[0_0_30px_rgba(175,208,204,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-mint/20 to-transparent opacity-30" />
              <Lock className="text-mint w-10 h-10 relative z-10 drop-shadow-[0_0_15px_rgba(175,208,204,0.5)]" />
            </motion.div>

            {/* Typography */}
            <div className="flex items-center justify-center gap-3 text-mint font-mono text-[10px] md:text-xs uppercase tracking-widest mb-6 bg-mint/5 border border-mint/10 px-4 py-2 rounded-full">
              <Terminal size={14} className="opacity-80" />
              <span>[STATUS] Archive locked. Awaiting final sequence.</span>
            </div>

            <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-soyl-white tracking-[0.05em] leading-tight mb-6">
              A R C H I V E <br className="md:hidden" /><span className="hidden md:inline text-mint/40"> // </span> I N I T I A L I Z I N G
            </h1>

            <p className="text-graphite text-lg md:text-xl max-w-lg mb-12">
              The SOYL AI research and engineering nexus is currently compiling. Access will be granted shortly.
            </p>

            {/* Input Field */}
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-mint/10 border border-mint/30 rounded-xl py-4 px-6 text-mint font-mono text-sm tracking-wide shadow-[0_0_20px_rgba(175,208,204,0.1)]"
              >
                [✓] Comm-link established. We will notify you.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-md relative group flex mx-auto">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-mint font-mono opacity-50 select-none pointer-events-none">
                  &gt;
                </span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter comm-link for early access..." 
                  required
                  className="w-full bg-obsidian/80 border border-mint/20 text-soyl-white text-sm md:text-base font-mono rounded-xl pl-12 pr-16 py-4 focus:outline-none focus:border-mint/60 focus:bg-mint/10 placeholder:text-graphite/40 transition-all duration-300 shadow-inner"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-mint/10 hover:bg-mint text-mint hover:text-obsidian p-2.5 rounded-lg transition-all duration-300"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            )}

            <div className="mt-16">
              <Button variant="ghost" href="/">← Return to Overview</Button>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  )
}
