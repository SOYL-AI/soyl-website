'use client'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { pageVariants } from '@/lib/motion'

export default function Template({ children }: { children: React.ReactNode }) {
  // Studio is a single-page app; the page-transition wrapper would fight its
  // internal routing and add unwanted fade flashes.
  const pathname = usePathname() ?? ''
  if (pathname.startsWith('/studio')) return <>{children}</>

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate">
      {children}
    </motion.div>
  )
}
