import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  const { id } = req.query;

  try {
    if (typeof id !== 'string') {
      throw new Error('Invalid id');
    }

    const response = await fetch(`http://localhost:3001/search?id=${id}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: Data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
