'use client'
import { useFormStatus } from 'react-dom'
import { Send, Loader2 } from 'lucide-react'

// Rendered within <form> boundary allowing Next 15 to securely intercept layout boolean triggers.
function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`w-full py-4 mt-2 rounded-xl flex items-center justify-center gap-3 font-heading font-medium tracking-wide transition-all duration-500 overflow-hidden relative ${pending ? 'bg-mint/10 text-mint/50 cursor-not-allowed border border-mint/20' : 'bg-mint text-obsidian hover:bg-mint/90 hover:shadow-[0_0_25px_rgba(175,208,204,0.3)] hover:-translate-y-1'}`}
    >
      {pending ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Processing Handshake...
        </>
      ) : (
        <>
          <Send size={18} />
          Initialize Connection
        </>
      )}
    </button>
  )
}

export default function ContactFormSection() {
  // Awaiting action wiring mapping in Task 4 Execution.
  // The layout wrapper establishes rigorous native aesthetic constraints bounding HTML5 forms.
  
  return (
    <section className="bg-obsidian pb-16 md:pb-24 relative z-20 w-full">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 w-full -mt-20 md:-mt-24 relative">
        <div className="bg-elevated border border-mint/20 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <form className="flex flex-col gap-6 w-full">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* Name Structural Block */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-mint font-mono text-[10px] uppercase tracking-widest px-2 opacity-80">Initiator // Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Jane Doe"
                  className="bg-obsidian border border-mint/10 text-soyl-white text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-mint/50 focus:bg-mint/5 placeholder:text-graphite/30 transition-all duration-300 font-mono shadow-inner"
                />
              </div>

              {/* Email Structural Block */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-mint font-mono text-[10px] uppercase tracking-widest px-2 opacity-80">Com-Link // Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="jane@example.com"
                  className="bg-obsidian border border-mint/10 text-soyl-white text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-mint/50 focus:bg-mint/5 placeholder:text-graphite/30 transition-all duration-300 font-mono shadow-inner"
                />
              </div>
            </div>

            {/* Company Structural Block */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="company" className="text-mint font-mono text-[10px] uppercase tracking-widest px-2 opacity-80">Faction // Company [Optional]</label>
              <input 
                type="text" 
                id="company" 
                name="company" 
                placeholder="Enterprise Architecture Corp"
                className="bg-obsidian border border-mint/10 text-soyl-white text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-mint/50 focus:bg-mint/5 placeholder:text-graphite/30 transition-all duration-300 font-mono shadow-inner"
              />
            </div>

            {/* Message Layout Block */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="message" className="text-mint font-mono text-[10px] uppercase tracking-widest px-2 opacity-80">Transmission // Detail Layer</label>
              <textarea 
                id="message" 
                name="message" 
                rows={5}
                placeholder="Map your operational requirements..."
                className="bg-obsidian border border-mint/10 text-soyl-white text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-mint/50 focus:bg-mint/5 placeholder:text-graphite/30 transition-all duration-300 font-mono resize-y shadow-inner"
              />
            </div>

            {/* Feedback Layout Placeholder (Reserved for Action Wiring Phase) */}
            <div aria-live="polite" className="h-6 flex items-center justify-center">
              {/* Error tracking spans mapping target */}
            </div>

            <SubmitButton />
          </form>
        </div>
      </div>
    </section>
  )
}
