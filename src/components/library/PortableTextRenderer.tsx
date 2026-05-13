import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { slugifyHeading } from './toc'

// Re-implemented Prism theme that respects SOYL's mint accent without
// replacing the readable Prism colors wholesale.
const codeStyle: React.CSSProperties = {
  background: 'transparent',
  margin: 0,
  padding: '1.25rem',
  fontSize: '0.85rem',
  lineHeight: 1.55,
}

// IMPORTANT: heading ids here MUST match the ids the TOC component
// computes from the same body. Both call `slugifyHeading` for parity.
function headingText(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(headingText).join('')
  if (typeof children === 'object' && children && 'props' in children) {
    type WithChildren = { props: { children: React.ReactNode } }
    return headingText((children as WithChildren).props.children)
  }
  return ''
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => {
      const id = slugifyHeading(headingText(children))
      return (
        <h2
          id={id}
          className="font-heading text-soyl-white text-2xl md:text-3xl mt-12 mb-5 scroll-mt-28 leading-tight"
        >
          {children}
        </h2>
      )
    },
    h3: ({ children }) => {
      const id = slugifyHeading(headingText(children))
      return (
        <h3
          id={id}
          className="font-heading text-soyl-white text-xl md:text-2xl mt-10 mb-4 scroll-mt-28 leading-snug"
        >
          {children}
        </h3>
      )
    },
    normal: ({ children }) => (
      <p className="text-graphite text-base md:text-[17px] leading-[1.75] mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-mint pl-6 my-8 text-soyl-white/90 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-soyl-white font-semibold">{children}</strong>,
    em: ({ children }) => <em className="text-soyl-white italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-card-bg border border-mint/15 text-mint text-[0.9em] px-1.5 py-0.5 rounded font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noreferrer noopener' : undefined}
        className="text-mint underline underline-offset-4 decoration-mint/40 hover:decoration-mint transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const url = urlFor(value).width(1400).fit('max').url()
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-card-bg border border-mint/10">
            <Image
              src={url}
              alt={value.alt ?? ''}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-xs text-graphite text-center italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    codeBlock: ({ value }) => (
      <div className="my-8 rounded-xl overflow-hidden border border-mint/15 bg-card-bg">
        {value?.filename && (
          <div className="bg-obsidian/60 border-b border-mint/10 px-4 py-2 text-[10px] tracking-[0.18em] uppercase text-mint font-mono">
            {value.filename}
          </div>
        )}
        <SyntaxHighlighter
          language={value?.language || 'text'}
          style={vscDarkPlus}
          customStyle={codeStyle}
          codeTagProps={{ style: { fontFamily: 'inherit' } }}
        >
          {value?.code ?? ''}
        </SyntaxHighlighter>
      </div>
    ),
  },
}

export default function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />
}
