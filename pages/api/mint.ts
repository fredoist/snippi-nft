import type { NextApiRequest, NextApiResponse } from 'next'
import { collection } from '@utils/thirdweb'
import { generateSnippet } from '@utils/generateSnippet'
import { IpfsStorage } from '@thirdweb-dev/sdk'
import { BigNumber } from 'ethers'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).end(`Method ${req.method} Not Allowed`)
    return
  }

  const { address, name, description, code } = req.body
  if (!address) {
    res.status(400).end('Missing Address')
    return
  }

  try {
    const storage = new IpfsStorage()
    const snippet = generateSnippet(name, code)
    const file = await storage.upload(Buffer.from(snippet))
    const data = await collection.mintTo(address, {
      name,
      description,
      file
    })
    console.log('✅✅✅✅ Minted', data)
    res.status(200).json({ id: BigNumber.from(data.id).toString() })
    return
  } catch (error) {
    console.error('🚨🚨🚨🚨🚨 Error', error)
    res.status(500).json({ error })
    return
  }
}

export default handler
