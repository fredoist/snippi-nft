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
    <Link href="/s" as={`/s/${BigNumber.from(nft.id)}`} passHref>
      <div className="cursor-pointer w-full h-full overflow-hidden rounded-xl shadow transition duration-75 ease-in hover:-translate-y-1 hover:shadow-lg ring-1 ring-black/5">
        <div className="relative aspect-square w-full overflow-hidden rounded-t-xl border-0 before:content-[''] before:absolute before:inset-0">
          <iframe
            src={IPFSToURI(nft.file)}
            title={nft.name}
            loading="lazy"
            scrolling="no"
            className="w-full h-full overflow-hidden"
          />
        </div>
        <div className="p-4">
          <span className="mb-2 block font-bold">{nft.name}</span>
          <span className="block overflow-hidden text-ellipsis text-sm">
            {nft.description}
          </span>
        </div>
      </div>
    </Link>
  );
};

export { NFTCard };
