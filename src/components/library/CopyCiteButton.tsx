'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface Props {
  citation: string
}

// Click-to-copy citation button. Brief success state confirms the copy
// landed — no toast library needed.
export default function CopyCiteButton({ citation }: Props) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(citation)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard blocked. Show the citation in a prompt as a fallback —
      // it's homely but better than silent failure.
      window.prompt('Copy citation:', citation)
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-mint/40 text-mint text-sm hover:bg-mint hover:text-obsidian transition-colors"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? 'Copied' : 'Cite this paper'}
    </button>
  )
}
