'use client'
import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/motion'

interface Props { children: React.ReactNode; className?: string }

export default function StaggerContainer({ children, className }: Props) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
