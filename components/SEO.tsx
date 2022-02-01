import Head from 'next/head';

type SEOProps = {
  title: string;
  description?: string;
  image?: string;
};

const SEO = ({ title, description, image }: SEOProps) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="theme-color" content="#0f172a" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title} — Snippi NFTs</title>
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  );
};

export default SEO;
