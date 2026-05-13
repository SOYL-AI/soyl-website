'use client'

import { usePathname } from 'next/navigation'

interface Props {
  navbar: React.ReactNode
  footer: React.ReactNode
  children: React.ReactNode
}

// SiteChrome wraps the page in the site Navbar/Footer for normal routes and
// bypasses them entirely for /studio/* so Sanity Studio gets the full
// viewport. We accept Navbar/Footer as slot props (rendered in the server
// layout) so this client component can stay a thin pathname switch — it
// must not import Footer/Navbar directly because doing so would force them
// into the client bundle.
export default function SiteChrome({ navbar, footer, children }: Props) {
  const pathname = usePathname() ?? ''
  const isStudio = pathname.startsWith('/studio')

  if (isStudio) return <>{children}</>

  return (
    <>
      {navbar}
      <main>{children}</main>
      {footer}
    </>
  )
}
