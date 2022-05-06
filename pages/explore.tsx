import type { GetServerSideProps, NextPage } from 'next';
import SEO from '@components/SEO';
import Navbar from '@components/Navbar';
import { collection } from '@utils/thirdweb';
import { NFTCard, NFTMetadata } from '@components/NFTCard';

const ExplorePage: NextPage<{ nfts: NFTMetadata[] }> = ({ nfts }) => {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white">
      <SEO
        title="Explore Snippi NFTs"
        description="A collection of interactive NFTs of frontend code snippets that render in your browser"
      />
      <Navbar />
      <main role="main" className="group px-4 pt-12">
        <div className="mx-auto max-w-7xl py-12">
          <h1 className="font-serif text-5xl font-bold">
            Explore NFT Collection
          </h1>
        </div>
        <div className="grid-flow-rows mx-auto grid max-w-7xl gap-6 pb-24 pt-12 lg:grid-cols-3">
          {nfts.length > 0 &&
            nfts.map((nft) => <NFTCard key={Number(nft.metadata.id)} nft={nft} />)}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const nfts = await collection.getAll();
    const data = JSON.parse(JSON.stringify(nfts));
    return {
      props: { nfts: data },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { nfts: [] },
    };
  }
};

export default ExplorePage;
