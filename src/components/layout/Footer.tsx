import Link from 'next/link'

const LINKS = {
  Company:  [{ label: 'About', href: '/about' }, { label: 'How We Work', href: '/how-we-work' }],
  Products: [{ label: 'All Products', href: '/products' }],
  Library:  [{ label: 'Blogs', href: '/library' }, { label: 'Research', href: '/library' }],
  Contact:  [{ label: 'Get in Touch', href: '/contact' }],
}

export default function Footer() {
  return (
    <footer className="bg-[#0a0d0f] border-t border-mint/10">
      <div className="max-w-content mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full border border-mint/40 flex items-center justify-center">
                <span className="text-mint text-xs font-bold">S</span>
              </div>
              <span className="font-display font-bold text-soyl-white">SOYL AI</span>
            </div>
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

        <div className="border-t border-mint/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-graphite text-xs">© {new Date().getFullYear()} SOYL AI Private Limited. All rights reserved.</p>
          <p className="text-graphite text-xs">Built with purpose.</p>
        </div>
      </div>
    </footer>
  )
}
