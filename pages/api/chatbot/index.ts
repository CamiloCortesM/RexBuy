import type { NextApiRequest, NextApiResponse } from 'next';

import { OpenAIStream } from '@/utils/OpenAIStream';
import { supabaseAdmin } from '@/utils/supabase';

type Data = {
  message: string;
};

type TChunk = {
  id: number;
  title: string;
  content: string;
  content_length: number;
  content_tokens: number;
  similarity: number;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'POST':
      return await getSearchChunks(req, res);
    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
};

const getSearchChunks = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    const { messages = [], message } = req.body;

    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: message,
      }),
    });

    const json = await response.json();
    const embedding = json.data[0].embedding;

    const { data: chunks, error } = await supabaseAdmin.rpc('rexbuy_search', {
      query_embedding: embedding,
      similarity_threshold: 0.5,
      match_count: 3,
    });

    if (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }

    const promptAnswer = `Context:\n ${chunks
      .map((chunk: TChunk) => chunk.content)
      .join('\n')} \n Question:\n ${message}`;

    const botResponse = await OpenAIStream(messages, promptAnswer);

    res.status(200).json(botResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export default handler;
