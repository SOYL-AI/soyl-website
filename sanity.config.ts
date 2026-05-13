import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { codeInput } from '@sanity/code-input'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes } from './src/sanity/schemas'

// Studio mounts at /studio. CEO + CTO log in with Sanity SSO and publish.
// `projectId` is empty until env vars are set — the studio route guards
// against this with a placeholder so dev doesn't crash before provisioning.
export default defineConfig({
  name: 'soyl-library',
  title: 'SOYL Library',
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  basePath: '/studio',
  plugins: [
    structureTool(),
    codeInput(),
  ],
  schema: { types: schemaTypes },
})
