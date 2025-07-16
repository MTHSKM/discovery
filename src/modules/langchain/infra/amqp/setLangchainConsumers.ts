import { queues } from '../../../../config/amqp/queues';
import { container } from '../../../../shared/infra/containers';
import { IMessageQueueProvider } from '../../../../shared/providers/models/IMessageQueueProvider';
import { generateFinancialReportConsumer } from './consumers/generateFinancialReportConsumer';
import { generateTechnologyIndustryReportConsumer } from './consumers/generateTechnologyIndustryReportConsumer';
import { processGenericChatConsumer } from './consumers/processGenericChatConsumer';
import { processHistoryQuestionConsumer } from './consumers/processHistoryQuestionConsumer';
import { processDynamicMessageConsumer } from './consumers/processDynamicMessageConsumer';
import { processChatInstructionsConsumer } from './consumers/processChatInstructionsConsumer';
import { processChatInstructionsByCategoryConsumer } from './consumers/processChatInstructionsByCategoryConsumer';
import { processToolMultiplyConsumer } from './consumers/processToolMultiplyConsumer';
import { generateReactAgentConsumer } from './consumers/genereteReactAgentConsumer';

export async function setLangchainConsumers(): Promise<void> {
  const rabbitmqMessageQueueProvider = container.resolve<IMessageQueueProvider>(
    'rabbitmqMessageQueueProvider',
  );

  await rabbitmqMessageQueueProvider.createConsumer({
    async_processing_number: 1,
    consumer: processGenericChatConsumer,
    queue: queues.genericChat,
  });

  await rabbitmqMessageQueueProvider.createConsumer({
    async_processing_number: 1,
    consumer: generateFinancialReportConsumer,
    queue: queues.chatFinance,
  });

  await rabbitmqMessageQueueProvider.createConsumer({
    async_processing_number: 1,
    consumer: generateTechnologyIndustryReportConsumer,
    queue: queues.chatTechnology,
  });

  await rabbitmqMessageQueueProvider.createConsumer({
    async_processing_number: 1,
    consumer: processHistoryQuestionConsumer,
    queue: queues.chatHistory,
  });

  await rabbitmqMessageQueueProvider.createConsumer({
    async_processing_number: 1,
    consumer: processDynamicMessageConsumer,
    queue: queues.dynamicMessage,
  });

  await rabbitmqMessageQueueProvider.createConsumer({
    async_processing_number: 1,
    consumer: processChatInstructionsConsumer,
    queue: queues.chatInstructions,
  });

  await rabbitmqMessageQueueProvider.createConsumer({
    async_processing_number: 1,
    consumer: processChatInstructionsByCategoryConsumer,
    queue: queues.chatInstructionsCategory,
  });

  await rabbitmqMessageQueueProvider.createConsumer({
    async_processing_number: 1,
    consumer: processToolMultiplyConsumer,
    queue: queues.toolMultiply,
  });

  await rabbitmqMessageQueueProvider.createConsumer({
    async_processing_number: 1,
    consumer: generateReactAgentConsumer,
    queue: queues.generateReactAgent,
  });
}
