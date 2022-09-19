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
    req.body.prompt ?? `// console log oops that's not implemented`;
  const temperature = req.body.temperature ?? 0.8;
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

  const lines = userPrompt.trim().split('\n');
  const lastLine = lines[lines.length - 1];

  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: 'code-davinci-002',
    prompt: userPrompt.trim() + '\n',
    temperature,
    max_tokens: 512,
    stop: ['//', '"""'],
  });
  return lastLine + '\n' + (response?.data?.choices?.[0].text ?? '');
}
