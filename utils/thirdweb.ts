import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';

const rpcUrl = 'https://rpc-mumbai.maticvigil.com';

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY as string,
  ethers.getDefaultProvider(rpcUrl)
);

const collectionAddress = '0xA3Ab9FD46d44633c6a0234CD0dee327a6B7f1435';

const collection = new ThirdwebSDK(wallet).getNFTCollection(collectionAddress);

export { wallet, collectionAddress, collection }