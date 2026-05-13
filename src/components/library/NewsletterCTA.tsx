'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { submitNewsletter, type NewsletterState } from '@/app/actions/newsletter'
import { cn } from '@/lib/utils'

const initialState: NewsletterState = { status: 'idle' }

type Variant = 'pill' | 'inline'

interface Props {
  variant?: Variant
  className?: string
  /** Optional heading shown above the inline variant. */
  heading?: string
}

/**
 * The Library's prominent "Join the newsletter" CTA. Two variants:
 *
 *  - `pill`   — a single mint pill that, when clicked, expands to an
 *               inline email form. Used in hero + at the bottom of the
 *               TOC sidebar.
 *  - `inline` — always shows the form. Used inside article footers /
 *               between content blocks.
 *
 * The server action is a no-op in v1 (validates only). When you wire a
 * real provider, swap the action import — the UI doesn't need to change.
 */
export default function NewsletterCTA({ variant = 'pill', className, heading }: Props) {
  const [state, formAction] = useActionState(submitNewsletter, initialState)
  const prefersReduced = useReducedMotion()
  const [expanded, setExpanded] = useState(variant === 'inline')

  // When the form succeeds we keep showing the success card; no re-collapse.
  const showForm = expanded || variant === 'inline'

  return (
    <div className={cn('relative', className)}>
      <AnimatePresence mode="wait" initial={false}>
        {state.status === 'success' ? (
          <motion.div
            key="success"
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-2 bg-mint text-obsidian rounded-full px-5 py-3 text-sm font-medium tracking-wide"
          >
            <Check size={16} />
            {state.message ?? "You're on the list."}
          </motion.div>
        ) : showForm ? (
          <motion.form
            key="form"
            action={formAction}
            initial={prefersReduced || variant === 'inline' ? false : { opacity: 0, width: 0 }}
            animate={prefersReduced || variant === 'inline' ? undefined : { opacity: 1, width: 'auto' }}
            className={cn(
              'flex flex-col gap-2',
              variant === 'inline' ? 'w-full' : 'min-w-[300px]'
            )}
          >
            {variant === 'inline' && heading && (
              <p className="text-mint text-xs tracking-[0.22em] uppercase mb-1">{heading}</p>
            )}
            <div
              className={cn(
                'flex items-stretch bg-obsidian border rounded-full overflow-hidden transition-colors',
                state.errors?.email
                  ? 'border-red-500/50'
                  : 'border-mint/30 focus-within:border-mint',
              )}
            >
              <input
                type="email"
                name="email"
                required
                autoFocus={variant === 'pill'}
                placeholder="you@company.com"
                aria-label="Email address"
                className="flex-1 bg-transparent text-sm text-soyl-white placeholder:text-graphite/60 px-5 py-3 focus:outline-none"
              />
              <SubmitButton />
            </div>
            {state.errors?.email && (
              <span className="text-red-400 text-xs font-mono px-4">
                {state.errors.email}
              </span>
            )}
          </motion.form>
        ) : (
          <motion.button
            key="pill"
            type="button"
            onClick={() => setExpanded(true)}
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group inline-flex items-center gap-3 bg-mint text-obsidian rounded-full pl-6 pr-2 py-2 font-medium text-sm tracking-wide hover:bg-mint/90 transition-colors"
          >
            <span className="tracking-[0.16em] uppercase text-xs">Join the newsletter</span>
            <span className="w-8 h-8 rounded-full bg-obsidian text-mint flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowRight size={14} />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-mint text-obsidian px-5 py-3 text-sm font-medium hover:bg-mint/90 transition-colors disabled:opacity-60 flex items-center gap-2"
    >
      {pending ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
      <span className="hidden sm:inline">{pending ? 'Sending' : 'Subscribe'}</span>
    </button>
  )
}
