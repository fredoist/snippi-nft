import Link from 'next/link';
import { IPFSToURI } from '@utils/IPFSToURI';
import { NFTMetadataOwner } from '@thirdweb-dev/sdk';
import { BigNumber } from 'ethers';

export type NFTMetadata = NFTMetadataOwner & {
  metadata: {
    file: string;
  }
}

const NFTCard = ({ nft: { metadata: nft } }: { nft: NFTMetadata }) => {
  return (
    <Link href="/s" as={`/s/${BigNumber.from(nft.id)}`}>
      <a className="cursor-pointer">
        <div className="w-full overflow-hidden rounded-xl border border-sky-400/10 bg-slate-800/50 shadow-xl shadow-slate-800/10 backdrop-blur-md transition hover:-translate-y-1 hover:bg-slate-800/90">
          <iframe
            src={IPFSToURI(nft.file)}
            title={nft.name}
            loading="lazy"
            scrolling="no"
            frameBorder="0"
            className="aspect-square w-full overflow-hidden rounded-lg"
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
