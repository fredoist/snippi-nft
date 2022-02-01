import Link from 'next/link';
import { IPFSToURI } from '@utils/IPFSToURI';
import { NFTMetadata } from '@3rdweb/sdk';

export interface NFT extends NFTMetadata {
  file: string;
}

const NFTCard = (nft: NFT) => {
  return (
    <Link href="/s" as={`/s/${nft.id}`}>
      <a className="cursor-pointer">
        <div className="h-96 w-full overflow-hidden rounded-xl border border-sky-400/10 bg-slate-800/50 shadow-xl shadow-slate-800/10 backdrop-blur-md transition hover:-translate-y-1 hover:bg-slate-800/90">
          <iframe
            src={IPFSToURI(nft.file)}
            scrolling="no"
            frameBorder="0"
            className="h-72 w-full overflow-hidden rounded-lg"
          ></iframe>
          <div className="p-4">
            <span className="mb-2 block font-bold">{nft.name}</span>
            <span className="block overflow-hidden text-ellipsis text-sm">
              {nft.description}
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export { NFTCard };
