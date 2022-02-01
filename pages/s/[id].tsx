import type { GetServerSideProps, NextPage } from 'next';
import SEO from '@components/SEO';
import Navbar from '@components/Navbar';
import { nftCollection } from '@utils/thirdweb';
import { NFTMetadata, NFTMetadataOwner } from '@3rdweb/sdk';
import { IPFSToURI } from '@utils/IPFSToURI';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/outline';

type NFT = {
  owner: string;
  metadata: {
    name: string;
    description: string;
    image: string;
    uri: string;
    file: string;
  };
};

const SnippetPage: NextPage<NFT> = ({
  owner,
  metadata: { name, description, image, uri, file },
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
          <div className="mb-12">
            <h1 className="mb-6 font-serif text-6xl font-bold">{name}</h1>
            <p className="mb-5">{description}</p>
            <Link href="/user" as={`/user/${owner}`}>
              <a className="inline-block rounded-full bg-sky-700/50 py-2 px-5 text-sm font-bold leading-none text-white transition-colors hover:bg-sky-600/50">
                <UserIcon className="float-left mr-2 h-4 w-4" />
                {owner.slice(0, 16)}
              </a>
            </Link>
          </div>
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

export const getServerSideProps: GetServerSideProps<NFTMetadataOwner> = async (
  req
) => {
  const id = req.query.id as string;

  const nft = await nftCollection.getWithOwner(id);

  return {
    props: nft,
  };
};

export default SnippetPage;
