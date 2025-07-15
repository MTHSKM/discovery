import { ConsumerRequest } from './ConsumerRequest';

export type CreateConsumerRequest = {
  queue: string;
  consumer: (request: ConsumerRequest) => Promise<void>;
  async_processing_number: number;
  max_priority?: number;
};
