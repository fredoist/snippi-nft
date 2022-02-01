import type { GetServerSideProps, NextPage } from 'next';
import SEO from '@components/SEO';
import Navbar from '@components/Navbar';
import { nftCollection } from '@utils/thirdweb';
import { NFTMetadata } from '@3rdweb/sdk';
import { IPFSToURI } from '@utils/IPFSToURI';

type NFT = {
  name: string;
  description: string;
  image: string;
  uri: string;
  file: string;
};

const SnippetPage: NextPage<NFT> = ({
  name,
  description,
  image,
  uri,
  file,
}) => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-slate-900 text-white">
      <SEO title={name} description={description} />
      <Navbar />
      <main
        role="main"
        className="h-full w-full overflow-y-auto"
        style={{ height: 'calc(100vh - 70px)' }}
      >
        <div className="mx-auto my-24 w-full max-w-6xl text-center">
          <h1 className="mb-6 text-6xl font-bold">{name}</h1>
          <p className="mb-12">{description}</p>
          <iframe
            src={IPFSToURI(file)}
            frameBorder="0"
            className="min-h-[600px] w-full overflow-hidden rounded-xl"
          ></iframe>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<NFTMetadata> = async (
  req
) => {
  const id = req.query.id as string;

  const nft = await nftCollection.get(id);

  return {
    props: nft,
  };
};

export default SnippetPage;
