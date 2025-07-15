import { ConsumerRequest } from './ConsumerRequest';

export type CreateMessageQueueConsumer = {
  queue: string;
  consumer: (request: ConsumerRequest) => Promise<void>;
  async_processing_number: number;
};
