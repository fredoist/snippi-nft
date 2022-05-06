import type { GetStaticProps, NextPage } from 'next';
import SEO from '@components/SEO';
import Navbar from '@components/Navbar';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { nftCollection } from '@utils/thirdweb';
import { NFT, NFTCard } from '@components/NFTCard';
import { NFTMetadata } from '@3rdweb/sdk';

const IndexPage: NextPage<{ nfts: NFT[] }> = ({ nfts }) => {
  return (
    <div className="min-h-fit w-full bg-slate-900 text-white">
      <SEO
        title="Interactive NFTs of frontend code snippets"
        description="A collection of interactive NFTs of frontend code snippets that render in your browser"
      />
      <Navbar />
      <main role="main" className="group px-4 pt-12">
        <div className="-z-10 w-full overflow-hidden">
          <div className="pointer-events-none absolute -left-28 top-64 transform cursor-default transition-transform duration-700 group-hover:translate-y-8 group-hover:translate-x-4">
            <div className="h-80 w-72 rounded-full bg-sky-200/20 blur-3xl" />
          </div>
          <div className="pointer-events-none absolute right-0 top-0 transform cursor-default transition-transform duration-700 group-hover:-translate-y-12 group-hover:-translate-x-4">
            <div className="h-80 w-72 rounded-full bg-sky-200/20 blur-3xl" />
          </div>
        </div>
        <div className="z-40 mx-auto my-12 max-w-5xl text-center lg:my-24">
          <h1 className="mb-6 text-3xl font-bold leading-none lg:mb-12 lg:text-7xl">
            The interactive NFT collection for frontend developers
          </h1>
          <p className="mb-5">
            Snippi NFTs is a collection of interactive NFTs of frontend code
            snippets.
          </p>
          <Link href="/new">
            <a className="inline-block rounded-full bg-sky-400/50 py-2 px-5 text-sm font-bold leading-none text-white transition-colors hover:bg-sky-400/80 focus:outline-none">
              Mint yours from the playground
              <ArrowRightIcon className="float-right ml-2 h-4 w-4" />
            </a>
          </Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-6 pb-24 pt-12 lg:grid-flow-col lg:grid-cols-3">
          {nfts.length > 0 &&
            nfts.map((nft: NFT) => <NFTCard key={nft.id} {...nft} />)}
        </div>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  nfts: NFTMetadata[];
}> = async () => {
  try {
    const nfts = (await nftCollection.getAll()).slice(0, 3);
    return { props: { nfts } };
  } catch (error) {
    console.error(error);
    return { props: { nfts: [] } };
  }
};

export default IndexPage;
