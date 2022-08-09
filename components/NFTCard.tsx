import Link from 'next/link'
import { IPFSToURI } from '@utils/IPFSToURI'
import { NFTMetadataOwner } from '@thirdweb-dev/sdk'
import { BigNumber } from 'ethers'

export type NFTMetadata = NFTMetadataOwner & {
  metadata: {
    file: string
  }
}

const NFTCard = ({ nft: { metadata: nft } }: { nft: NFTMetadata }) => {
  return (
    <Link
      href="/s"
      as={`/s/${BigNumber.from(nft.id)}`}
      passHref>
      <div className="h-full w-full cursor-pointer overflow-hidden rounded-xl shadow ring-1 ring-black/5 transition duration-75 ease-in hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-square w-full overflow-hidden rounded-t-xl border-0 before:absolute before:inset-0 before:content-['']">
          <iframe
            src={IPFSToURI(nft.file)}
            title={nft.name}
            loading="lazy"
            scrolling="no"
            className="h-full w-full overflow-hidden"
          />
        </div>
        <div className="p-4">
          <span className="mb-2 block font-bold">{nft.name}</span>
          <span className="block overflow-hidden text-ellipsis text-sm">{nft.description}</span>
        </div>
      </div>
    </Link>
  )
}

export { NFTCard }
