import { FastifyInstance } from 'fastify';
import {
  processGenericChatBodySchema,
  ProcessGenericChatBodyType,
} from '../schemas/bodies/processGenericChatBodySchema';
import {
  generateFinancialReportBodySchema,
  GenerateFinancialReportBodyType,
} from '../schemas/bodies/generateFinancialReportBodySchema';
import {
  generateTechnologyIndustryReportBodySchema,
  GenerateTechnologyIndustryReportBodyType,
} from '../schemas/bodies/generateTechnologyIndustryReportBodySchmea';
import {
  processHistoryQuestionBodySchema,
  ProcessHistoryQuestionBodyType,
} from '../schemas/bodies/processHistoryQuestionBodySchemna';
import {
  processDynamicMessageBodySchema,
  ProcessDynamicMessageBodyType,
} from '../schemas/bodies/processDynamicMessageBodySchema';
import { processGenericChatHandler } from '../handlers/processGenericChatHandler';
import { generateFinancialReportHandler } from '../handlers/generateFinancialReportHandler';
import { generateTechnologyIndustryReportHandler } from '../handlers/generateTechnologyIndustryReportHandler';
import { processHistoryQuestionHandler } from '../handlers/processHistoryQuestionHandler';
import { processDynamicMessagePromptHandler } from '../handlers/processDynamicMessagePromptHandler';
import {
  processChatInstructionsBodySchema,
  ProcessChatInstructionsBodyType,
} from '../schemas/bodies/processChatInstructionsBodySchema';
import { processChatInstructionsHandler } from '../handlers/processChatInstructionsHandler';
import { processChatInstructionsByCategoryHandler } from '../handlers/processChatInstructionsByCategoryHandler';
import {
  ProcessToolMultiplyBodyType,
  processToolMultiplyBodySchema,
} from '../schemas/bodies/processToolMultiply';
import { processToolMultiplyHandler } from '../handlers/processToolMultiplyHandler';

export async function langchainRouter(app: FastifyInstance): Promise<void> {
  app.post<{ Body: ProcessGenericChatBodyType }>(
    '/generic/chat',
    {
      schema: {
        summary: 'Generate generic chat.',
        body: processGenericChatBodySchema,
        tags: ['Langchain'],
      },
    },
    processGenericChatHandler,
  );

  app.post<{ Body: GenerateFinancialReportBodyType }>(
    '/chat/finance',
    {
      schema: {
        summary:
          'Generate financial report by analyses, company, language and preiod.',
        body: generateFinancialReportBodySchema,
        tags: ['Langchain'],
      },
    },
    generateFinancialReportHandler,
  );

  app.post<{ Body: GenerateTechnologyIndustryReportBodyType }>(
    '/chat/technology',
    {
      schema: {
        summary: 'Generate technology industry report by region.',
        body: generateTechnologyIndustryReportBodySchema,
        tags: ['Langchain'],
      },
    },
    generateTechnologyIndustryReportHandler,
  );

  app.post<{ Body: ProcessHistoryQuestionBodyType }>(
    '/chat/history',
    {
      schema: {
        summary: 'Generate history professor chat.',
        body: processHistoryQuestionBodySchema,
        tags: ['Langchain'],
      },
    },
    processHistoryQuestionHandler,
  );

  app.post<{ Body: ProcessDynamicMessageBodyType }>(
    '/generic/placeholder',
    {
      schema: {
        summary: 'Generate generic message template.',
        body: processDynamicMessageBodySchema,
        tags: ['Langchain'],
      },
    },
    processDynamicMessagePromptHandler,
  );

  app.post<{ Body: ProcessChatInstructionsBodyType }>(
    '/chat/instructions',
    {
      schema: {
        summary: 'Generate repair instructions from manual.',
        body: processChatInstructionsBodySchema,
        tags: ['Langchain'],
      },
    },
    processChatInstructionsHandler,
  );

  app.post<{ Body: ProcessChatInstructionsBodyType }>(
    '/chat/instructions-category',
    {
      schema: {
        summary: 'Generate instructions by category.',
        body: processChatInstructionsBodySchema,
        tags: ['Langchain'],
      },
    },
    processChatInstructionsByCategoryHandler,
  );

  app.post<{ Body: ProcessToolMultiplyBodyType }>(
    '/tools/multiply',
    {
      schema: {
        summary: 'Multiply two numbers.',
        body: processToolMultiplyBodySchema,
        tags: ['Langchain'],
      },
    },
    processToolMultiplyHandler,
  );
}
