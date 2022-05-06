import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';

const rpcUrl = 'https://rpc-mumbai.maticvigil.com';

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY as string,
  ethers.getDefaultProvider(rpcUrl)
);

const collectionAddress = '0xdFc60d9B22DB2758525a291808c959D4b901Acef';

const collection = new ThirdwebSDK(wallet).getNFTCollection(collectionAddress);

export { wallet, collectionAddress, collection }