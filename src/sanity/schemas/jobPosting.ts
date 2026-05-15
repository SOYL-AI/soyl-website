import { defineField, defineType } from 'sanity'

export const jobPostingType = defineType({
  name: 'jobPosting',
  title: 'Job Posting',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Role title',
      type: 'string',
      validation: R => R.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: R => R.required(),
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering, Product & Design', value: 'engineering' },
          { title: 'Go-To-Market', value: 'go-to-market' },
          { title: 'Post Sales', value: 'post-sales' },
          { title: 'G&A', value: 'g-and-a' },
        ],
        layout: 'radio',
      },
      validation: R => R.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Bengaluru", "Remote (India)"',
      validation: R => R.required(),
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract',  value: 'contract' },
          { title: 'Internship', value: 'internship' },
        ],
        layout: 'radio',
      },
      initialValue: 'full-time',
      validation: R => R.required(),
    }),
    defineField({
      name: 'applyUrl',
      title: 'Apply URL',
      type: 'url',
      description: 'External link to the application form (ATS, Notion, mailto:, etc.).',
      validation: R => R.required().uri({ scheme: ['http', 'https', 'mailto'] }),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short one-paragraph teaser shown on hover/preview. ~200 chars.',
      validation: R => R.max(400),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Pin this role to the top of the list.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Manual order',
      type: 'number',
      description: 'Lower numbers appear first within the same featured tier.',
      initialValue: 100,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: R => R.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', team: 'team' },
    prepare: ({ title, subtitle, team }) => ({
      title: title as string,
      subtitle: [team, subtitle].filter(Boolean).join(' · '),
    }),
  },
  orderings: [
    {
      title: 'Featured first, then manual order',
      name: 'featuredOrder',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
  ],
})
