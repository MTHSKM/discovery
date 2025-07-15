import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ISimpleAgent } from '../models/ISimpleAgent';
import Redis from 'ioredis';
import { RedisCache } from '@langchain/community/caches/ioredis';
import { sha256 } from '@langchain/core/utils/hash';
import { AgentExecutor, createToolCallingAgent } from 'langchain/agents';
import { multiplyTool } from '../../tools/multiplyTool';
import { ChatPromptTemplate, PromptTemplate } from '@langchain/core/prompts';
import { ICalculateDTO } from '../../dtos/ICalculateDTO';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { sumTool } from '../../tools/sumTool';
import { divideTool } from '../../tools/divideTool';
import { subtractTool } from '../../tools/subtractTool';

export class SimpleAgent implements ISimpleAgent {
  private ai: ChatGoogleGenerativeAI;
  private agent;
  private apiKey: string;
  private model: string;
  private redisHost: string;
  private redisPort: number;
  private agentExecutor;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.model = process.env.GEMINI_API_MODEL;
    this.redisHost = process.env.REDIS_HOST;
    this.redisPort = Number(process.env.REDIS_PORT);

    this.initialize();
  }

  private initialize() {
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
      maxOutputTokens: 200000,
      verbose: true,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are a helpful assistant with access to tools that can perform math operations: sum, subtract, multiply, and divide. 
    Use the appropriate tool from the list to calculate the result based on the inputs {first} and {second}.
    Only use the tools provided, and do not make calculations yourself.`,
      ],
      [
        'human',
        'Given the numbers {first} and {second}, use the {tool} tool to perform the calculation and respond ONLY with "answer is: " and the result.',
      ],
      ['placeholder', '{agent_scratchpad}'],
      ['human', 'only respond the result is and the calculation'],
    ]);

    this.agent = createToolCallingAgent({
      llm: this.ai,
      tools: [multiplyTool, sumTool, subtractTool, divideTool],
      prompt,
    });

    this.agentExecutor = new AgentExecutor({
      agent: this.agent,
      tools: [multiplyTool, sumTool, subtractTool, divideTool],
    });
  }

  async run({
    first,
    second,
    operator,
  }: ICalculateDTO & { operator: string }): Promise<number> {
    const baseChain = PromptTemplate.fromTemplate(
      `
          Classifique o operador recebido entre as seguintes operações:
          
          - Adição
          - Subtração
          - Divisão
          - Multiplicação
    
          Operador: {operator}
          Classificação:
        `,
    )
      .pipe(this.ai)
      .pipe(new StringOutputParser());

    const baseResponse = await baseChain.invoke({ operator });

    console.log(baseResponse);

    const operation = baseResponse.toLowerCase();

    let result: number;

    if (operation.includes('multiplicação')) {
      result = await this.agentExecutor.invoke({
        first,
        second,
        tool: 'multiplyTool',
      });
    } else if (operation.includes('divisão')) {
      result = await this.agentExecutor.invoke({
        first,
        second,
        tool: 'divideTool',
      });
    } else if (operation.includes('subtração')) {
      result = await this.agentExecutor.invoke({
        first,
        second,
        tool: 'subtractTool',
      });
    } else if (operation.includes('adição')) {
      result = await this.agentExecutor.invoke({
        first,
        second,
        tool: 'sumTool',
      });
    } else {
      result = -1;
    }

    return result;
  }
}
