import { CreateConsumerRequest } from '../../types/CreateConsumerRequest';
import { SendMessageToQueueRequest } from '../../types/SendMessageToQueueRequest';

export interface IMessageQueueProvider {
  createConsumer(request: CreateConsumerRequest): Promise<void>;
  sendToQueue(request: SendMessageToQueueRequest): Promise<void>;
}
