import { ThirdwebSDK } from '@3rdweb/sdk';
import { ethers } from 'ethers';

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.METAMASK_PRIVATE_KEY as string,
    ethers.getDefaultProvider('https://rpc-mumbai.maticvigil.com')
  )
);

const nftCollection = sdk.getNFTModule(
  process.env.NFT_COLLECTION_ADDRESS as string
);

export { sdk, nftCollection };
