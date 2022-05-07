import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';

const rpcUrl = 'https://rpc-mumbai.maticvigil.com';

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY as string,
  ethers.getDefaultProvider(rpcUrl)
);

const collectionAddress = '0x6c346ebaDe85bbFb54D1acA2aF83d756D3F8af61';

const collection = new ThirdwebSDK(wallet).getNFTCollection(collectionAddress);

export { wallet, collectionAddress, collection }