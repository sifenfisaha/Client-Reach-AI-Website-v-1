import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  const allOpenAIVars = Object.keys(process.env)
    .filter(key => key.includes('OPENAI'))
    .reduce((obj, key) => {
      obj[key] = process.env[key] ? 'SET' : 'NOT SET';
      return obj;
    }, {} as Record<string, string>);

  return new Response(
    JSON.stringify({
      openaiApiKeyExists: !!apiKey,
      openaiApiKeyPrefix: apiKey ? apiKey.substring(0, 10) + '...' : 'NOT SET',
      allOpenAIVars,
      nodeEnv: process.env.NODE_ENV,
      cwd: process.cwd(),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

