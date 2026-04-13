'use client'
import { useState, useEffect } from 'react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'About',       href: '/about' },
  { label: 'Products',    href: '/products' },
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'Library',     href: '/library' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
      scrolled ? 'bg-obsidian/95 backdrop-blur-sm border-mint/10' : 'bg-transparent border-transparent'
    )}>
      <div className="max-w-content mx-auto px-6 lg:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/images/logo.png" 
            alt="SOYL AI Logo" 
            width={48} 
            height={48} 
            className="h-14 w-auto object-contain" 
            priority 
          />
          <span className="font-display font-bold text-soyl-white tracking-tight">SOYL AI</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href}
              className={cn(
                'text-sm transition-colors duration-200',
                pathname === link.href || pathname.startsWith(link.href + '/')
                  ? 'text-mint'
                  : 'text-graphite hover:text-mint'
              )}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link href="/products"
          className="hidden md:inline-flex items-center px-4 py-2 text-sm border border-mint/40 text-mint rounded hover:bg-mint hover:text-obsidian transition-all duration-200">
          Get Started
        </Link>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden text-graphite hover:text-mint transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-obsidian border-t border-mint/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'text-sm transition-colors',
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'text-mint'
                      : 'text-graphite hover:text-mint'
                  )}>
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
