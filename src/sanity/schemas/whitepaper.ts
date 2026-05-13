import { defineField, defineType } from 'sanity'

export const whitepaperType = defineType({
  name: 'whitepaper',
  title: 'Whitepaper',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: R => R.required().max(180),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: R => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: R => R.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'string' }],
      validation: R => R.required().min(1),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: R => R.required().min(2000).max(2100),
      initialValue: () => new Date().getFullYear(),
    }),
    defineField({
      name: 'pages',
      title: 'Pages',
      type: 'number',
    }),
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      rows: 6,
      validation: R => R.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'pdf',
      title: 'PDF',
      type: 'file',
      options: { accept: '.pdf' },
      validation: R => R.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Card art (optional)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
      description: 'Optional. If unset, cards show an abstract placeholder.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', media: 'coverImage' },
  },
})
