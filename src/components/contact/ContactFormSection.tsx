'use client'
import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, CheckCircle, AlertTriangle } from 'lucide-react'
import { submitContact, type ContactFormState } from '@/app/actions/contact'

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

const initialState: ContactFormState = { status: 'idle' }

export default function ContactFormSection() {
  const [state, formAction] = useActionState(submitContact, initialState)
  const [shake, setShake] = useState(false)

  // Trigger brief x-axis vibration exclusively upon target rejection.
  useEffect(() => {
    if (state.status === 'error') {
      setShake(true)
      const timer = setTimeout(() => setShake(false), 500)
      return () => clearTimeout(timer)
    }
  }, [state])

  return (
    <section className="relative z-20 w-full flex items-center justify-center my-8 md:my-16">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 w-full relative">
        <AnimatePresence mode="wait">
          {state.status === 'success' ? (
             <motion.div
               key="success-card"
               initial={{ opacity: 0, y: 50, scale: 0.95 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               transition={{ duration: 0.6, type: 'spring' }}
               className="bg-elevated border border-mint/30 rounded-[2rem] p-12 md:p-16 shadow-[0_20px_60px_rgba(175,208,204,0.15)] backdrop-blur-xl flex flex-col items-center justify-center text-center mt-12"
             >
                <div className="w-20 h-20 rounded-full bg-mint/10 border border-mint/30 flex items-center justify-center text-mint mb-6 relative">
                  <div className="absolute inset-0 bg-mint/20 blur-xl rounded-full" />
                  <CheckCircle size={40} className="relative z-10 drop-shadow-[0_0_15px_rgba(175,208,204,0.5)]" />
                </div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-soyl-white tracking-tight mb-4">
                  Transmission Verified
                </h2>
                <p className="text-graphite text-lg leading-relaxed max-w-md">
                   Your signal has been securely encrypted and relayed to our internal nodes. We will initiate contact shortly.
                </p>
             </motion.div>
          ) : (
             <motion.div
               key="form-card"
               initial={{ opacity: 0, y: 20 }}
               animate={shake ? { x: [-10, 10, -10, 10, 0] } : { opacity: 1, y: 0, x: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: -20, filter: 'blur(10px)' }}
               transition={{ duration: 0.4 }}
               className="bg-elevated border border-mint/20 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl"
             >
                <form action={formAction} className="flex flex-col gap-6 w-full">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {/* Name Structural Block */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-mint font-mono text-[10px] uppercase tracking-widest px-2 opacity-80">Initiator // Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        placeholder="Jane Doe"
                        className={`bg-obsidian border text-soyl-white text-sm rounded-xl px-5 py-4 focus:outline-none placeholder:text-graphite/30 transition-all duration-300 font-mono shadow-inner ${state.errors?.name ? 'border-red-500/50 focus:border-red-500 bg-red-500/[0.02]' : 'border-mint/10 focus:border-mint/50 focus:bg-mint/5'}`}
                      />
                      {state.errors?.name && <span className="text-red-400 text-xs font-mono ml-2 animate-pulse">{state.errors.name}</span>}
                    </div>

                    {/* Email Structural Block */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-mint font-mono text-[10px] uppercase tracking-widest px-2 opacity-80">Com-Link // Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        placeholder="jane@example.com"
                        className={`bg-obsidian border text-soyl-white text-sm rounded-xl px-5 py-4 focus:outline-none placeholder:text-graphite/30 transition-all duration-300 font-mono shadow-inner ${state.errors?.email ? 'border-red-500/50 focus:border-red-500 bg-red-500/[0.02]' : 'border-mint/10 focus:border-mint/50 focus:bg-mint/5'}`}
                      />
                      {state.errors?.email && <span className="text-red-400 text-xs font-mono ml-2 animate-pulse">{state.errors.email}</span>}
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
                      required
                      placeholder="Map your operational requirements..."
                      className={`bg-obsidian border text-soyl-white text-sm rounded-xl px-5 py-4 focus:outline-none placeholder:text-graphite/30 transition-all duration-300 font-mono resize-y shadow-inner ${state.errors?.message ? 'border-red-500/50 focus:border-red-500 bg-red-500/[0.02]' : 'border-mint/10 focus:border-mint/50 focus:bg-mint/5'}`}
                    />
                    {state.errors?.message && <span className="text-red-400 text-xs font-mono ml-2 animate-pulse">{state.errors.message}</span>}
                  </div>

                  <div aria-live="polite" className="h-6 flex items-center justify-center w-full">
                    <AnimatePresence>
                      {state.status === 'error' && state.message && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 text-red-400 text-sm font-mono border border-red-500/20 bg-red-500/10 px-4 py-1.5 rounded-md"
                        >
                           <AlertTriangle size={14} />
                           {state.message}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <SubmitButton />
                </form>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
