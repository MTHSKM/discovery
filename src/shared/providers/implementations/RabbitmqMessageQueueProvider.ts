import { Channel, ChannelModel, Options } from 'amqplib';
import { IMessageQueueProvider } from '../models/IMessageQueueProvider';
import { CreateConsumerRequest } from '../../types/CreateConsumerRequest';
import { SendMessageToQueueRequest } from '../../types/SendMessageToQueueRequest';

export class RabbitmqMessageQueueProvider implements IMessageQueueProvider {
  private static channel: Channel;

  constructor(private amqpConnection: ChannelModel) {}

  private async getChannel(): Promise<Channel> {
    if (!RabbitmqMessageQueueProvider.channel) {
      RabbitmqMessageQueueProvider.channel =
        await this.amqpConnection.createChannel();
    }

    return RabbitmqMessageQueueProvider.channel;
  }

  async createConsumer({
    async_processing_number,
    consumer,
    queue,
    max_priority,
  }: CreateConsumerRequest): Promise<void> {
    const channel = await this.amqpConnection.createChannel();

    channel.prefetch(async_processing_number, false);

    const queueOptions: Options.AssertQueue = { durable: true };

    if (max_priority) queueOptions.maxPriority = max_priority;

    await channel.assertQueue(queue, queueOptions);

    await channel.consume(
      queue,
      message => {
        const content = JSON.parse(
          Buffer.from(String(message.content)).toString(),
        );

        consumer({ message: content })
          .then(() => channel.ack(message))
          .catch((error: unknown) => {
            console.error(`[*] ${consumer.name}.error: `, error);

            channel.nack(message);
          });
      },
      { noAck: false },
    );
  }

  async sendToQueue({
    message,
    queue,
    max_priority,
    priority,
  }: SendMessageToQueueRequest): Promise<void> {
    const channel = await this.getChannel();

    const queueOptions: Options.AssertQueue = { durable: true };

    if (max_priority) queueOptions.maxPriority = max_priority;

    await channel.assertQueue(queue, queueOptions);

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
      priority,
    });
  }
}
