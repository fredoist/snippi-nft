import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'

const rpcUrl = 'https://rpc-mumbai.maticvigil.com'

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY as string,
  ethers.getDefaultProvider(rpcUrl)
)

const collectionAddress = process.env.COLLECTION_ADDRESS as string

const collection = new ThirdwebSDK(wallet).getNFTCollection(collectionAddress)

export { wallet, collectionAddress, collection }
