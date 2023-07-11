import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(400).json({ message: 'The endpoint is not available' });
};

export default handler;
