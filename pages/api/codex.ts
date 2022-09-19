// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

type Data = {
  response: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userPrompt =
    req.body.userPrompt ?? `a video for my grandmother's birthday`;
  const temperature = req.body.temperature ?? 0.9;
  const response = await callCodexAPIWithContext({ userPrompt, temperature });
  res.status(200).json({ response });
}

async function callCodexAPIWithContext({
  userPrompt,
  temperature,
}: {
  userPrompt: string;
  temperature: number;
}) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
  interface Video {
    musicSearchQuery: string;
    scenes: Scene[];
  }

  interface Scene {
    duration: number;
    stockSearchQuery: string;
    displayText: string;
  }

  // create a video for a child's birthday with 7 scenes
  const birthdayVideo: Video = {
    musicSearchQuery: 'yesterday',
    scenes: [
      {
        duration: 5,
        stockSearchQuery: 'childhood fun',
        displayText: 'A year to remember',
      },
      {
        duration: 4,
        stockSearchQuery: 'children imagination',
        displayText: 'A joy for life',
      },
      {
        duration: 4,
        stockSearchQuery: 'kid learning',
        displayText: 'Always learning',
      },
      {
        duration: 2,
        stockSearchQuery: 'science',
        displayText: 'A curious mind',
      },
      {
        duration: 5,
        stockSearchQuery: 'child playing',
        displayText: 'Keep pushing boundaries',
      },
      {
        duration: 5,
        stockSearchQuery: 'purple background',
        displayText: 'Happy birthday',
      },
      {
        duration: 5,
        stockSearchQuery: 'hearts',
        displayText: 'We love you',
      },
    ],
  };

  // create a graduation video with 4 scenes
  const graduationVideo: Video = {
    musicSearchQuery: 'graduation',
    scenes: [
      {
        duration: 5,
        stockSearchQuery: 'confetti popping',
        displayText: 'Congratulations',
      },
      {
        duration: 5,
        stockSearchQuery: 'graduation cap',
        displayText: 'We are so proud of you',
      },
      {
        duration: 5,
        stockSearchQuery: 'stars galaxies',
        displayText: 'You are amazing',
      },
      {
        duration: 5,
        stockSearchQuery: 'love heart',
        displayText: 'We love you',
      },
    ],
  };`;

  const fullPrompt = `${prompt}

// ${userPrompt}
const`;

  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: 'code-davinci-002',
    prompt: fullPrompt,
    temperature,
    max_tokens: 512,
    stop: '//',
  });
  return response?.data?.choices?.[0].text ?? '';
}
