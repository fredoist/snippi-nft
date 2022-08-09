import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import SEO from '@components/SEO';
import Navbar from '@components/Navbar';
import Link from 'next/link';
import { ArrowRightIcon, CodeIcon, ViewGridIcon } from '@heroicons/react/outline';
import { collection } from '@utils/thirdweb';
import { NFTCard } from '@components/NFTCard';
import { NFTMetadata } from '@components/NFTCard';

/**
 * @todo: replace for a remote origin
 */
const NFTS = [
  'https://gateway.ipfscdn.io/ipfs/QmVaFpu48wJmCsubRJFdznkWVBdqTDw1NLkMqZeo4ZxPHg/0',
  'https://gateway.ipfscdn.io/ipfs/QmPDzNEnL1XgZu8qcxYhmMqucqkQMBfuXPeM2UCer4cZCP/0',
  'https://gateway.ipfscdn.io/ipfs/QmTfykVZu1yDKnpGuvZenUsXtY2bCSuHB9AE3DoJeXBMKj/0',
];

const IndexPage: NextPage<{ nfts: NFTMetadata[] }> = ({ nfts }) => {
  const randomNFT = NFTS[Math.floor(Math.random() * NFTS.length)];

  return (
    <React.Fragment>
      <SEO
        title="Interactive NFTs of frontend code snippets"
        description="A collection of interactive NFTs of frontend code snippets that render in your browser"
      />
      <Navbar />
      <div className="relative bg-black px-5 py-40">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold text-white mix-blend-difference md:text-5xl lg:text-6xl mb-12">
          Turn your code snippets into non-fungible tokens
        </h1>
        <div className="relative z-10">
          <div className="flex items-center gap-4 max-w-max mx-auto">
            <button className="bg-white/40 font-medium text-white rounded-lg p-4 inline-flex items-center gap-2 justify-between ring-1 ring-white/80 hover:bg-white/50 transition-colors group">
              <ViewGridIcon className="h-5 w-5" />
              <span>Explore Collection</span>
            </button>
            <button className="bg-white/40 font-medium text-white rounded-lg p-4 inline-flex items-center gap-2 justify-between ring-1 ring-white/80 hover:bg-white/50 transition-colors group">
              <CodeIcon className="h-5 w-5" />
              <span>Create Your Own</span>
            </button>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <iframe className="h-full w-full object-cover overflow-hidden" src={randomNFT} loading="eager" scrolling="no" />
        </div>
      </div>
      <main role="main" className="group px-4 pt-12">
        <div className="mx-auto grid max-w-7xl gap-6 pb-24 pt-12 lg:grid-cols-3">
          {nfts.length > 0 &&
            nfts.map((nft) => (
              <NFTCard key={Number(nft.metadata.id)} nft={nft} />
            ))}
        </div>
      </main>
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps<{
  nfts: NFTMetadata[];
}> = async () => {
  try {
    const nfts = await collection.getAll();
    const data = JSON.parse(JSON.stringify(nfts));
    return { props: { nfts: data } };
  } catch (error) {
    console.error(error);
    return { props: { nfts: [] } };
  }
};

export default IndexPage;
