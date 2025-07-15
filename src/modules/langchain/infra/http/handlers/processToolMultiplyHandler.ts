import { FastifyReply, FastifyRequest } from 'fastify';
import { ProcessToolMultiplyBodyType } from '../schemas/bodies/processToolMultiply';
import { queues } from '../../../../../config/amqp/queues';
import { container } from '../../../../../shared/infra/containers';
import { IMessageQueueProvider } from '../../../../../shared/providers/models/IMessageQueueProvider';

interface IRequest extends FastifyRequest {
  body: ProcessToolMultiplyBodyType;
}

export async function processToolMultiplyHandler(
  { body }: IRequest,
  reply: FastifyReply,
): Promise<void> {
  const rabbitmqMessageQueueProvider = container.resolve<IMessageQueueProvider>(
    'rabbitmqMessageQueueProvider',
  );

  const message: ProcessToolMultiplyBodyType = body;

  await rabbitmqMessageQueueProvider.sendToQueue({
    message,
    queue: queues.toolMultiply,
  });

  reply.send();
}
