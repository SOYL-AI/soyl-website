import type { SchemaTypeDefinition } from 'sanity'
import { categoryType } from './category'
import { blogPostType } from './blogPost'
import { whitepaperType } from './whitepaper'
import { codeBlockType } from './blocks/codeBlock'

export const schemaTypes: SchemaTypeDefinition[] = [
  categoryType,
  blogPostType,
  whitepaperType,
  codeBlockType,
]
