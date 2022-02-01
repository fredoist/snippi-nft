import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import SEO from '@components/SEO';
import Navbar from '@components/Navbar';
import { nftCollection } from '@utils/thirdweb';
import { NFT, NFTCard } from '@components/NFTCard';
import { NFTMetadata } from '@3rdweb/sdk';
import { useRouter } from 'next/router';

const UserPage: NextPage<{ nfts: NFT[] }> = ({ nfts }) => {
  const router = useRouter();
  const address = router.query.address as string;

  if (!address) {
    router.push('/explore');
  }

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white">
      <SEO
        title={`Explore ${address?.slice(0, 16)} NFTs`}
        description="A collection of interactive NFTs of frontend code snippets that render in your browser"
      />
      <Navbar />
      <main role="main" className="group">
        <div className="mx-auto max-w-7xl py-12">
          <h1 className="text-5xl font-bold">{address.slice(0, 16)} NFTs</h1>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-6 pb-24 pt-12">
          {nfts.length > 0 &&
            nfts.map((nft: NFT) => <NFTCard key={nft.id} {...nft} />)}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  nfts: NFTMetadata[];
}> = async (req) => {
  const address = req.query.address as string;

  const nfts = await nftCollection.getOwned(address);

  return {
    props: { nfts },
  };
};

export default UserPage;
