'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'

interface Props { children: React.ReactNode; delay?: number; className?: string }

export default function FadeInUp({ children, delay = 0, className }: Props) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      variants={prefersReduced ? {} : fadeInUp}
      initial={prefersReduced ? {} : 'hidden'}
      whileInView={prefersReduced ? {} : 'visible'}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: prefersReduced ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
