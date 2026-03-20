'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
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
          <div className="w-8 h-8 rounded-full border border-mint/40 flex items-center justify-center">
            <span className="text-mint text-xs font-bold">S</span>
          </div>
          <span className="font-display font-bold text-soyl-white tracking-tight">SOYL AI</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href}
              className="text-graphite text-sm hover:text-mint transition-colors duration-200">
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
        <button className="md:hidden text-graphite hover:text-mint" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-obsidian border-t border-mint/10 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className="text-graphite text-sm hover:text-mint transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
