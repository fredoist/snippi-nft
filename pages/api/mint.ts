import type { NextApiRequest, NextApiResponse } from 'next';
import { collection } from '@utils/thirdweb';
import { generateSnippet } from '@utils/generateSnippet';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { address, name, description, code } = req.body;
  if (!address) {
    res.status(400).end('Missing Address');
    return;
  }

  const snippet = generateSnippet(name, code);
  const file = Buffer.from(snippet);

  try {
    const data = await collection.mintTo(address, {
      name,
      description,
      file,
    });
    res.status(200).json(data);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
    return;
  }
};

export default handler;
