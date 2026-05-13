// GROQ queries used across the Library. Card shape is unified across blog
// posts and whitepapers — both produce { _type, slug, title, category,
// publishedAt, excerpt, readMins, coverImage, tags, pdfMeta? } so the same
// card component can render either.

const cardProjection = `
  _type,
  "slug": slug.current,
  title,
  subtitle,
  "category": category->{
    "slug": slug.current,
    title
  },
  publishedAt,
  excerpt,
  abstract,
  readTime,
  year,
  pages,
  tags,
  "coverImage": coverImage,
  "pdfUrl": pdf.asset->url
`

export const CATEGORIES_QUERY = /* groq */ `
  *[_type == "category"] | order(order asc, title asc) {
    "slug": slug.current,
    title,
    description,
    order,
    "count": count(*[_type in ["blogPost", "whitepaper"] && references(^._id)])
  }
`

export const LIBRARY_INDEX_QUERY = /* groq */ `
  {
    "categories": *[_type == "category"] | order(order asc, title asc) {
      "slug": slug.current,
      title,
      description,
      "count": count(*[_type in ["blogPost", "whitepaper"] && references(^._id)]),
      "items": *[_type in ["blogPost", "whitepaper"] && references(^._id)] | order(coalesce(publishedAt, year) desc) [0..5] { ${cardProjection} }
    },
    "allItems": *[_type in ["blogPost", "whitepaper"]] | order(coalesce(publishedAt, year) desc) { ${cardProjection} }
  }
`

export const CATEGORY_PAGE_QUERY = /* groq */ `
  {
    "category": *[_type == "category" && slug.current == $slug][0] {
      "slug": slug.current,
      title,
      description
    },
    "items": *[_type in ["blogPost", "whitepaper"] && category->slug.current == $slug] | order(coalesce(publishedAt, year) desc) { ${cardProjection} }
  }
`

export const BLOG_BY_SLUG_QUERY = /* groq */ `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _type,
    "slug": slug.current,
    title,
    "category": category->{
      "slug": slug.current,
      title
    },
    author,
    publishedAt,
    readTime,
    excerpt,
    tags,
    coverImage,
    body,
    "related": *[_type == "blogPost" && slug.current != $slug && category._ref == ^.category._ref] | order(publishedAt desc) [0..2] { ${cardProjection} }
  }
`

export const WHITEPAPER_BY_SLUG_QUERY = /* groq */ `
  *[_type == "whitepaper" && slug.current == $slug][0] {
    _type,
    "slug": slug.current,
    title,
    subtitle,
    "category": category->{
      "slug": slug.current,
      title
    },
    authors,
    publishedAt,
    year,
    pages,
    abstract,
    tags,
    coverImage,
    "pdfUrl": pdf.asset->url,
    "related": *[_type == "whitepaper" && slug.current != $slug] | order(coalesce(publishedAt, year) desc) [0..2] { ${cardProjection} }
  }
`

export const LIBRARY_PREVIEW_QUERY = /* groq */ `
  {
    "latestBlog": *[_type == "blogPost"] | order(publishedAt desc) [0] { ${cardProjection} },
    "latestPaper": *[_type == "whitepaper"] | order(coalesce(publishedAt, year) desc) [0] { ${cardProjection} }
  }
`

export const SITEMAP_QUERY = /* groq */ `
  {
    "blogs": *[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current, "updated": coalesce(_updatedAt, publishedAt) },
    "papers": *[_type == "whitepaper" && defined(slug.current)]{ "slug": slug.current, "updated": coalesce(_updatedAt, publishedAt) },
    "categories": *[_type == "category" && defined(slug.current)]{ "slug": slug.current, "updated": _updatedAt }
  }
`
