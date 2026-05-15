import type { SchemaTypeDefinition } from 'sanity'
import { categoryType } from './category'
import { blogPostType } from './blogPost'
import { whitepaperType } from './whitepaper'
import { jobPostingType } from './jobPosting'
import { codeBlockType } from './blocks/codeBlock'

export const schemaTypes: SchemaTypeDefinition[] = [
  categoryType,
  blogPostType,
  whitepaperType,
  jobPostingType,
  codeBlockType,
]
