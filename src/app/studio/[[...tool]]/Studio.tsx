'use client'

// Sanity Studio is a client-only SPA. Splitting it into this file keeps
// the surrounding page.tsx a server component so route-segment config
// (`dynamic`, `metadata`) stays valid.

import { NextStudio } from 'next-sanity/studio'
import config from '@/../sanity.config'

export function Studio() {
  return <NextStudio config={config} />
}
