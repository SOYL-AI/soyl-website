'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer } from '@/lib/motion'

interface Props { children: React.ReactNode; className?: string }

export default function StaggerContainer({ children, className }: Props) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      variants={prefersReduced ? {} : staggerContainer}
      initial={prefersReduced ? {} : 'hidden'}
      whileInView={prefersReduced ? {} : 'visible'}
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
