'use client'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'

interface Props { children: React.ReactNode; delay?: number; className?: string }

export default function FadeInUp({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
