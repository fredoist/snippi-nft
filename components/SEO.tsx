import Head from 'next/head'

type SEOProps = {
  title: string | undefined
  description?: string | undefined
  image?: string
}

const SEO = ({ title, description, image }: SEOProps) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta
        name="theme-color"
        content="#0f172a"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <title>{title} — Snippi NFTs</title>
      <link
        rel="icon"
        href="/favicon.svg"
        type="image/svg+xml"
      />
      <link
        rel="preconnect"
        href="https://ipfs.io"
      />
      <meta
        name="description"
        content={description}
      />
      <meta
        name="image"
        content={image}
      />
      <meta
        property="og:title"
        content={title}
      />
      <meta
        property="og:description"
        content={description}
      />
      <script
        async
        id="bannernotesdk"
        src="https://app.bannernote.com/sdk/sdk.js?apiKey=c0d030cfa7144751aba9160f0565ae32"
      />
    </Head>
  )
}

export default SEO
