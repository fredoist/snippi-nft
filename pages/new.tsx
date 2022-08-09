import type { NextPage } from 'next'
import SEO from '@components/SEO'
import Navbar from '@components/Navbar'
import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { useEffect, useRef } from 'react'
import { codeStore, setCode, setSnippet, snippetStore } from '@stores/playground'
import { useStore } from '@nanostores/react'
import { generateSnippet } from '@utils/generateSnippet'

const NewPage: NextPage = () => {
  const code = useStore(codeStore)
  const snippet = useStore(snippetStore)
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (frameRef.current) {
      const frame = frameRef.current
      const doc = frame.contentDocument

      doc?.open()
      doc?.write(snippet)
      doc?.close()
    }
  }, [snippet, frameRef])

  useEffect(() => {
    const codeSnippet = generateSnippet('New NFT', code)
    setSnippet(codeSnippet)
  }, [code])

  return (
    <div className="h-screen w-full overflow-hidden bg-black pt-20">
      <SEO title="New NFT" />
      <Navbar />
      <main
        role="main"
        className="container mx-auto h-full">
        <div className="z-40 flex h-2/5 border-b-8 border-b-black">
          <CodeMirror
            value={code.html}
            placeholder="HTML"
            className="h-full w-1/3 border-r-2 border-r-black"
            width="100%"
            theme="dark"
            height="100%"
            extensions={[html({ autoCloseTags: true, matchClosingTags: true })]}
            onChange={value => setCode({ ...code, html: value })}
          />
          <CodeMirror
            value={code.css}
            placeholder="CSS"
            className="h-full w-1/3 border-r-2 border-r-black"
            width="100%"
            theme="dark"
            height="100%"
            extensions={[css()]}
            onChange={value => setCode({ ...code, css: value })}
          />
          <CodeMirror
            value={code.js}
            placeholder="JS"
            className="h-full w-1/3 border-r-0"
            width="100%"
            theme="dark"
            height="100%"
            extensions={[javascript({ jsx: false, typescript: false })]}
            onChange={value => setCode({ ...code, js: value })}
          />
        </div>
        <div className="h-3/5 bg-white">
          <iframe
            ref={frameRef}
            frameBorder="0"
            className="h-full w-full overflow-hidden"
            scrolling="no"></iframe>
        </div>
      </main>
    </div>
  )
}

export default NewPage
