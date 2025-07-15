import { FastifyReply, FastifyRequest } from 'fastify';
import { ProcessGenericChatBodyType } from '../schemas/bodies/processGenericChatBodySchema';
import { container } from '../../../../../shared/infra/containers';
import { IMessageQueueProvider } from '../../../../../shared/providers/models/IMessageQueueProvider';
import { queues } from '../../../../../config/amqp/queues';

interface IRequest extends FastifyRequest {
  body: ProcessGenericChatBodyType;
}

export async function processGenericChatHandler(
  { body }: IRequest,
  reply: FastifyReply,
): Promise<void> {
  const rabbitmqMessageQueueProvider = container.resolve<IMessageQueueProvider>(
    'rabbitmqMessageQueueProvider',
  );

  const message: ProcessGenericChatBodyType = body;

  await rabbitmqMessageQueueProvider.sendToQueue({
    message,
    queue: queues.genericChat,
  });

  reply.send();
}
