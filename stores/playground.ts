import { persistentAtom } from '@nanostores/persistent'

type Snippet = {
  html: string
  css: string
  js: string
}

const codeStore = persistentAtom<Snippet>(
  'code',
  { html: '', css: '', js: '' },
  {
    encode: JSON.stringify,
    decode: JSON.parse
  }
)

const setCode = (code: Snippet) => {
  codeStore.set(code)
}

const snippetStore = persistentAtom<string>('snippet', '')
const setSnippet = (snippet: string) => {
  snippetStore.set(snippet)
}

export { codeStore, setCode, snippetStore, setSnippet }
export type { Snippet }
