import type { NextPage } from 'next';
import SEO from '@components/SEO';
import Navbar from '@components/Navbar';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { useEffect, useRef } from 'react';
import { codeStore, setCode, setSnippet, snippetStore } from '@stores/playground';
import { useStore } from '@nanostores/react';

const NewPage: NextPage = () => {
  const code = useStore(codeStore);
  const snippet = useStore(snippetStore);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (frameRef.current) {
      const frame = frameRef.current;
      const doc = frame.contentDocument;

      doc?.open()
      doc?.write(snippet);
      doc?.close();
    }
  }, [snippet, frameRef]);

  useEffect(() => {
    const codeSnippet = `
     <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New NFT</title>
        <style>
          ${code.css}
        </style>
      </head>
      <body>
        ${code.html}
        <script>
          ${code.js}
        </script>
      </body>
    `;
    setSnippet(codeSnippet);
  }, [code])

  return (
    <div className="h-screen w-full overflow-hidden bg-slate-900 text-white">
      <SEO title="New NFT" />
      <Navbar />
      <main role="main" className="container mx-auto" style={{ height: 'calc(100% - 70px)' }}>
        <div className="h-2/5 flex border-b-8 border-b-cyan-600/10 z-40">
          <CodeMirror
            value={code.html}
            placeholder="HTML"
            className="h-full w-1/3 border-r-2 border-r-sky-600/10"
            width="100%"
            theme="dark"
            height="100%"
            extensions={[html({ autoCloseTags: true, matchClosingTags: true })]}
            onChange={(value) => setCode({ ...code, html: value })}
          />
          <CodeMirror
            value={code.css}
            placeholder="CSS"
            className="h-full w-1/3 border-r-2 border-r-sky-600/10"
            width="100%"
            theme="dark"
            height="100%"
            extensions={[css()]}
            onChange={(value) => setCode({ ...code, css: value })}
          />
          <CodeMirror
            value={code.js}
            placeholder="JS"
            className="h-full w-1/3 border-r-0"
            width="100%"
            theme="dark"
            height="100%"
            extensions={[javascript({ jsx: false, typescript: false })]}
            onChange={(value) => setCode({ ...code, js: value })}
          />
        </div>
        <div className="h-3/5 bg-white">
          <iframe
            ref={frameRef}
            frameBorder="0"
            className="h-full w-full"
          ></iframe>
        </div>
      </main>
    </div>
  );
};

export default NewPage;
