import { IAIProvider } from '../models/IAIProvider';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from '@langchain/core/messages';
import { RedisCache } from '@langchain/community/caches/ioredis';
import Redis from 'ioredis';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from '@langchain/core/prompts';
import { sha256 } from '@langchain/core/utils/hash/sha256';
import { ICreateDynamicMessagesTemplateDTO } from '../../dtos/ICreateDynamicMessagesTemplateDTO';
import { ICreateFinancialReportDTO } from '../../dtos/ICreateFinancialReportDTO';
import { ICreatePromptMessageDTO } from '../../dtos/ICreatePromptMessageDTO';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableLambda } from '@langchain/core/runnables';
import { readFile } from 'fs/promises';
import { RESOURCES_PATH } from '../../../../config/path/resources';
import path = require('path');
import { multiplyTool } from '../../tools/multiplyTool';
import { IMultiplyDTO } from '../../dtos/IMultiplyDTO';

export class AIProvider implements IAIProvider {
  private ai: ChatGoogleGenerativeAI;
  private model: string;
  private apiKey: string;
  private redisHost: string;
  private redisPort: number;

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
      // cache: true, // InMemoryCache
      cache, // RedisCache
      verbose: true,
    });
  }

  async queryLLM(request: ICreatePromptMessageDTO): Promise<string> {
    const composedChain = new RunnableLambda({
      func: async (input: { role: string; text: string }) => {
        const promptText = `O usuário com role "${input.role}" disse: "${input.text}"`;
        return { promptText };
      },
    })
      .pipe(ChatPromptTemplate.fromTemplate('{promptText}. Isso é apropriado?'))
      .pipe(this.ai)
      .pipe(new StringOutputParser());

    const content = await composedChain.invoke({
      role: request.role,
      text: request.text,
    });

    const normalized = content.trim().toLowerCase();

    const startsWithSim = /^sim\b/.test(normalized);
    const startsWithNao = /^(não|nao)\b/.test(normalized);

    const containsNao = /\b(não|nao)\b/.test(normalized);
    const containsSim = /\bsim\b/.test(normalized);

    if (startsWithNao || (!startsWithSim && containsNao && !containsSim)) {
      console.log('Response is inappropriate.');
      return 'A resposta foi considerada inapropriada.';
    } else if (startsWithSim || containsSim) {
      console.log('Response is appropriate.');
      const response = await this.ai.pipe(new StringOutputParser()).invoke([
        {
          role: request.role,
          content: request.text,
        },
      ]);

      return response;
    } else {
      console.log('Unclear response, returning original content.');
      return content;
    }
  }

  async createFinancialReportPrompt({
    analyses,
    company,
    language,
    period,
  }: ICreateFinancialReportDTO): Promise<string> {
    const promptTemplate = PromptTemplate.fromTemplate(
      `You are a financial analyst.

      Write a detailed financial report for the company "{company}" for the period {period}.

      The report must be written in {language} and include the following analyses: {analyses}.

      Make sure to provide insights and conclusions for each section.`,
    );

    const analysesText = analyses.map(item => `- ${item}`).join('\n');

    const chain = promptTemplate.pipe(this.ai).pipe(new StringOutputParser());

    const content = await chain.invoke({
      analyses: analysesText,
      company,
      language,
      period,
    });

    return content;
  }

  async createTechnologyIndustryReportPrompt(region: string): Promise<string> {
    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        'system',
        'You must structure your responses according to the business analysis methodology, ensuring clarity and conciseness.',
      ],
      [
        'user',
        'Please generate a detailed report on the technology industry in the region of "{region}".',
      ],
      [
        'assistant',
        'Sure, I will start by collecting information about the region and analyzing the available data.',
      ],
      [
        'user',
        'Make sure to include a SWOT analysis and a growth forecast for the next 5 years.',
      ],
      ['assistant', 'Understood. Here is the complete report:'],
    ]);

    const chain = promptTemplate.pipe(this.ai).pipe(new StringOutputParser());

    const content = await chain.invoke({ region });

    return content;
  }

  async createHistoryProfessorPromptTemplate(
    question: string,
  ): Promise<string> {
    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        'system',
        'You are an experienced and passionate history professor with vast knowledge across various periods and civilizations. Your goal is to educate, contextualize events, and explain historical concepts clearly and engagingly.',
      ],
      new MessagesPlaceholder('msgs'),
    ]);

    const chain = promptTemplate.pipe(this.ai).pipe(new StringOutputParser());

    const content = await chain.invoke({
      msgs: [new HumanMessage(question)],
    });

    return content;
  }

  private translate({
    title,
    content,
    role,
  }: ICreateDynamicMessagesTemplateDTO) {
    let MessageClass;
    if (role === 'user') MessageClass = HumanMessage;
    else if (role === 'system') MessageClass = SystemMessage;
    else if (role === 'assistant') MessageClass = AIMessage;
    else throw new Error('Role desconhecido');

    return {
      [title]: [new MessageClass(content)],
    };
  }

  async createDynamicMessagesPromptTemplate(
    placeholders: ICreateDynamicMessagesTemplateDTO[],
  ): Promise<string> {
    const messageTemplate = placeholders.map(
      placeholder => new MessagesPlaceholder(placeholder.title),
    );

    const promptTemplate = ChatPromptTemplate.fromMessages(messageTemplate);

    const completePrompt = placeholders
      .map(placeholder => this.translate(placeholder))
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});

    const chain = promptTemplate.pipe(this.ai).pipe(new StringOutputParser());

    const content = await chain.invoke(completePrompt);

    return content;
  }

  async getRepairInstructionsFromManual(question: string): Promise<string> {
    const filePath = path.join(
      RESOURCES_PATH,
      'base_conhecimento_britadeira.txt',
    );

    const instrutions = await readFile(filePath, 'utf-8');

    const historicoConversas = `Cliente: Minha britadeira não liga. Chatbot: Você já verificou se a bateria está carregada e conectada corretamente?`;

    const promptTemplateKnowledgeBase = PromptTemplate.fromTemplate(
      `Use o seguinte contexto para responder à pergunta.
      Responda apenas com as informações fornecidas.
      Não forneça instruções de procedimento já realizadas.
      Não utilize informações externas ao contexto.

      Contexto: {context}

      Pergunta: {question}`,
    );

    const promptTemplateConversationHistory = PromptTemplate.fromTemplate(`
      Use o histórico de conversas para responder à pergunta.
      Responda apenas com base nas informações fornecidas.
      Não forneca instruções de procedimento já realizadas.
      Não utilize informações externas ao contexto:
      
      Histórico: {historico}
      
      Pergunta: {question}`);

    const promtTemplateFinalPrompt = PromptTemplate.fromTemplate(`
        Combine as seguintes respostas para gerar uma resposta final,
        mas não forneça instruções de procedimentos já realizadas.
        
        Resposta da base de conhecimento: {knowledgeBaseResponse}

        Resposta do histórico de conversas: {conversationHistoryResponse}`);

    const knowledgeBaseChain = promptTemplateKnowledgeBase
      .pipe(this.ai)
      .pipe(new StringOutputParser());

    const conversationHistoryChain = promptTemplateConversationHistory
      .pipe(this.ai)
      .pipe(new StringOutputParser());

    const finalChain = promtTemplateFinalPrompt
      .pipe(this.ai)
      .pipe(new StringOutputParser());

    const [knowledgeBaseResponse, conversationHistoryResponse] =
      await Promise.all([
        knowledgeBaseChain.invoke({
          context: instrutions,
          question,
        }),
        conversationHistoryChain.invoke({
          historico: historicoConversas,
          question,
        }),
      ]);

    const finalResponse = await finalChain.invoke({
      knowledgeBaseResponse,
      conversationHistoryResponse,
    });

    return finalResponse;
  }

  async createResponseBasedOnCategory(question: string): Promise<string> {
    const basePrompt = PromptTemplate.fromTemplate(`
      Classifique a pergunta do usuário em uma das seguintes categorias:
      
      - Assuntos Financeiros
      - Suporte Técnico
      - Atualização de Cadastro
      - Outras Informações

      Pergunta: {question}
      Classificação:
    `);

    const baseChain = basePrompt.pipe(this.ai).pipe(new StringOutputParser());

    const baseResponse = await baseChain.invoke({
      question,
    });

    console.log(baseResponse);

    const financialChain = PromptTemplate.fromTemplate(
      `
      Você é um especialista financeiro.
      Sempre responda às perguntas começando com "Bem-vindo ao nosso serviço financeiro.".
      Responda à pergunta do usuário:
      Pergunta: {question}
      Resposta:
    `,
    )
      .pipe(this.ai)
      .pipe(new StringOutputParser());

    const techSupportChain = PromptTemplate.fromTemplate(
      `
      Você é um especialista em suporte técnico.
      Sempre responda às perguntas começando com "Bem-vindo ao nosso serviço de suporte técnico.".
      Ajude o usuário com seu problema técnico.
      Pergunta: {question}
      Resposta:
    `,
    )
      .pipe(this.ai)
      .pipe(new StringOutputParser());

    const updateRegistrationChain = PromptTemplate.fromTemplate(
      `
      Você é um representante de atendimento ao cliente.
      Sempre responda às perguntas começando com "Bem-vindo ao nosso Suporte de Cadastro.".
      Guie o usuário na atualização de suas informações de cadastro.
      Pergunta: {question}
      Resposta:
    `,
    )
      .pipe(this.ai)
      .pipe(new StringOutputParser());

    const otherInformationChain = PromptTemplate.fromTemplate(
      `
      Você é um assistente de informações gerais.
      Sempre responda às perguntas começando com "Bem-vindo ao nosso Suporte Geral.".
      Forneça informações ao usuário sobre sua pergunta.
      Pergunta: {question}
      Resposta:
      `,
    )
      .pipe(this.ai)
      .pipe(new StringOutputParser());

    if (baseResponse.toLowerCase().includes('financeiro')) {
      return await financialChain.invoke({ question });
    } else if (
      baseResponse.toLowerCase().includes('técnico') ||
      baseResponse.toLowerCase().includes('suporte')
    ) {
      return await techSupportChain.invoke({ question });
    } else if (
      baseResponse.toLowerCase().includes('cadastro') ||
      baseResponse.toLowerCase().includes('atualização')
    ) {
      return await updateRegistrationChain.invoke({ question });
    } else {
      return await otherInformationChain.invoke({ question });
    }
  }

  async usingMultiplyTool({ first, second }: IMultiplyDTO): Promise<number> {
    const response = await multiplyTool.invoke({ first, second });

    return response;
  }
}
