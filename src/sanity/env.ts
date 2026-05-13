// Sanity environment. All values are intentionally permissive so the site
// builds and renders (with mock fallback) before a Sanity project is
// provisioned. Once NEXT_PUBLIC_SANITY_PROJECT_ID is set, `isSanityConfigured`
// flips true and live data flows.

export const apiVersion = '2024-10-01'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const isSanityConfigured = projectId.length > 0

// Token is only needed for draft preview / privileged reads. Server-only.
export const readToken = process.env.SANITY_API_TOKEN ?? ''
