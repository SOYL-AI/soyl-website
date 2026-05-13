import { defineType } from 'sanity'

// Light wrapper around @sanity/code-input so the Studio gives authors a
// proper code editor with language selection. Frontend renderer maps this
// to a syntax-highlighted block.
export const codeBlockType = defineType({
  name: 'codeBlock',
  title: 'Code',
  type: 'code',
  options: {
    withFilename: true,
    languageAlternatives: [
      { title: 'TypeScript', value: 'typescript' },
      { title: 'JavaScript', value: 'javascript' },
      { title: 'TSX', value: 'tsx' },
      { title: 'JSX', value: 'jsx' },
      { title: 'Python', value: 'python' },
      { title: 'Go', value: 'go' },
      { title: 'Rust', value: 'rust' },
      { title: 'Bash', value: 'bash' },
      { title: 'JSON', value: 'json' },
      { title: 'YAML', value: 'yaml' },
      { title: 'HTML', value: 'html' },
      { title: 'CSS', value: 'css' },
      { title: 'SQL', value: 'sql' },
      { title: 'Markdown', value: 'markdown' },
      { title: 'Plain text', value: 'text' },
    ],
  },
})
