import type { GetServerSideProps, NextPage } from 'next';
import SEO from '@components/SEO';
import Navbar from '@components/Navbar';
import { nftCollection } from '@utils/thirdweb';
import { NFT, NFTCard } from '@components/NFTCard';
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
      <main role="main" className="group px-4 pt-12">
        <div className="mx-auto max-w-7xl py-12">
          <h1 className="font-serif text-3xl lg:text-5xl font-bold">
            {address.slice(0, 16)} Owned NFTs
          </h1>
        </div>
        <div className="mx-auto grid max-w-7xl grid-flow-row lg:grid-cols-3 gap-6 pb-24 pt-12">
          {nfts.length > 0 &&
            nfts.map((nft: NFT) => <NFTCard key={nft.id} {...nft} />)}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (req) => {
  const address = req.query.address as string;

  try {
    const nfts = await nftCollection.getOwned(address);
    return {
      props: { nfts },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default UserPage;
