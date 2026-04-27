import { Link } from 'next-view-transitions'
import Image from 'next/image'

const LINKS = {
  Company: [{ label: 'About', href: '/about' }, { label: 'How We Work', href: '/how-we-work' }],
  Products: [{ label: 'All Products', href: '/products' }],
  Library: [{ label: 'Blogs', href: '/library' }, { label: 'Research (soon)', href: '/library' }],
  Contact: [{ label: 'Get in Touch', href: '/contact' }],
}

export default function Footer() {
  return (
    <footer className="bg-footer-bg border-t border-mint/10">
      <div className="max-w-content mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Logo & Manifesto */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 inline-flex">
              <Image
                src="/images/logo.png"
                alt="SOYL AI Logo"
                width={48}
                height={48}
                className="h-14 w-auto object-contain"
              />
              <span className="font-display font-bold text-soyl-white tracking-tight">SOYL AI</span>
            </Link>
            <p className="text-mint text-xs tracking-widest">Story Of Your Life</p>
          </div>

          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-soyl-white text-xs font-bold tracking-widest uppercase mb-4">{group}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-graphite text-sm hover:text-mint transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-mint/10 pt-6 mb-4 font-caption text-[10px] tracking-[0.25em] uppercase text-graphite/50">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-mint pulse-mint" />
            <span>Pilot live · Bengaluru</span>
          </div>
          <div className="hidden md:block">v0.4.0 · Shipping weekly</div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-graphite text-xs">© {new Date().getFullYear()} SOYL AI Private Limited. All rights reserved.</p>
          <p className="text-graphite text-xs">Built with purpose.</p>
        </div>
      </div>
    </footer>
  )
}
