import type { Snippet } from '@stores/playground'

const generateSnippet = (title: string, code: Snippet) => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          ${code.css}
        </style>
      </head>
      <body style="min-width: 100vw; min-height: 100vh;">
        ${code.html}
        <script>
          ${code.js}
        </script>
      </body>`
}

export { generateSnippet }
