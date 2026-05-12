# /public/papers/

Drop whitepaper PDFs here. The Library section ([src/lib/mockData.ts](../../src/lib/mockData.ts)) references files by path — keep filenames in sync with the `pdfUrl` field on each `Paper` entry.

## Currently expected files

| File | Paper |
|---|---|
| `when-easy-isnt-easy-enough.pdf` | When "Easy" Isn't Easy Enough — May 2026 (1st pilot findings) |
| `checking-in-to-the-ai-era.pdf` | Checking In to the AI Era — April 2026 (hospitality intelligence series) |

## Adding a new paper

1. Save the PDF here with a slug-style filename (lowercase, hyphens, no spaces).
2. Add a new entry to `MOCK_PAPERS` in [`src/lib/mockData.ts`](../../src/lib/mockData.ts) with matching `slug` and `pdfUrl`.
3. Optional: bump the `Sparkles` placeholder copy in [`PapersGridSection.tsx`](../../src/components/library/PapersGridSection.tsx) — the "another paper is in the pipeline" block only shows when there's exactly one paper.
