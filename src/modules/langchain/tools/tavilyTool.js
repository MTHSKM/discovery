import { TavilySearch } from '@langchain/tavily';
import { config } from 'dotenv';

config();

export const tavilyTool = new TavilySearch({
  maxResults: 5,
  topic: 'general',
  tavilyApiKey: process.env.TAVILY_API_KEY,
  description:
    'Useful for finding information and tips about saving money and investment options. You should always search the internet for the best tips using this tool; do not respond directly. Your answer should indicate that the elements were researched online.',
});
