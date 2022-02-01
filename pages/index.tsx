import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import SEO from '@components/SEO';
import Navbar from '@components/Navbar';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { nftCollection } from '@utils/thirdweb';
import { NFT, NFTCard } from '@components/NFTCard';
import { NFTMetadata } from '@3rdweb/sdk';

const IndexPage: NextPage<{ nfts: NFT[] }> = ({ nfts }) => {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white">
      <SEO
        title="Interactive NFTs of frontend code snippets"
        description="A collection of interactive NFTs of frontend code snippets that render in your browser"
      />
      <Navbar />
      <main role="main" className="group">
        <div className="-z-10 overflow-hidden">
          <div className="pointer-events-none absolute -left-28 top-64 transform cursor-default transition-transform duration-700 group-hover:translate-y-8 group-hover:translate-x-4">
            <Image
              src="/assets/img/landing-blob-one.svg"
              alt="blob"
              width={704}
              height={417}
            />
          </div>
          <div className="pointer-events-none absolute right-0 top-0 transform cursor-default transition-transform duration-700 group-hover:-translate-y-12 group-hover:-translate-x-4">
            <Image
              src="/assets/img/landing-blob-two.svg"
              alt="blob"
              width={900}
              height={600}
            />
          </div>
        </div>
        <div className="z-40 mx-auto my-24 max-w-5xl text-center">
          <h1 className="mb-12 font-serif text-7xl font-bold leading-none">
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
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-6 pb-24 pt-12">
          {nfts.length > 0 &&
            nfts
              .slice(0, 3)
              .map((nft: NFT) => <NFTCard key={nft.id} {...nft} />)}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  nfts: NFTMetadata[];
}> = async () => {
  const nfts = await nftCollection.getAll();

  return {
    props: { nfts },
  };
};

export default IndexPage;
