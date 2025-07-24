import { AgentExecutor, createReactAgent } from 'langchain/agents';
import { IReactAgent } from '../models/IReactAgent';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { pull } from 'langchain/hub';
import { PromptTemplate } from '@langchain/core/prompts';
import Redis from 'ioredis';
import { RedisCache } from '@langchain/community/caches/ioredis';
import { sha256 } from '@langchain/core/utils/hash';
import { tavilyTool } from '../../tools/tavilyTool';

export class ReactAgent implements IReactAgent {
  private ai: ChatGoogleGenerativeAI;
  private agent;
  private apiKey: string;
  private model: string;
  private redisHost: string;
  private redisPort: number;
  private agentExecutor: AgentExecutor;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.model = process.env.GEMINI_API_MODEL;
    this.redisHost = process.env.REDIS_HOST;
    this.redisPort = Number(process.env.REDIS_PORT);

    this.initialize();
  }

  private async initialize() {
    const client = new Redis({
      host: this.redisHost,
      port: this.redisPort,
    });

    const cache = new RedisCache(client);
    cache.makeDefaultKeyEncoder(sha256);

    this.ai = new ChatGoogleGenerativeAI({
      model: this.model,
      temperature: 1,
      maxRetries: 2,
      apiKey: this.apiKey,
      maxOutputTokens: 20000,
      verbose: true,
    });

    const tools = [tavilyTool];

    const prompt = await pull<PromptTemplate>('hwchase17/react');

    this.agent = await createReactAgent({
      llm: this.ai,
      tools,
      prompt,
    });

    this.agentExecutor = new AgentExecutor({
      agent: this.agent,
      tools,
      maxIterations: 20,
      verbose: true,
    });
  }

  async run(question: string): Promise<string> {
    const result = await this.agentExecutor.invoke({ input: question });

    return result.output;
  }
}
