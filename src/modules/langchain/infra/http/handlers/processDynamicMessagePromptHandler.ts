import { FastifyReply, FastifyRequest } from 'fastify';
import { ProcessDynamicMessageBodyType } from '../schemas/bodies/processDynamicMessageBodySchema';
import { container } from '../../../../../shared/infra/containers';
import { IMessageQueueProvider } from '../../../../../shared/providers/models/IMessageQueueProvider';
import { queues } from '../../../../../config/amqp/queues';

interface IRequest extends FastifyRequest {
  body: ProcessDynamicMessageBodyType;
}

export async function processDynamicMessagePromptHandler(
  { body }: IRequest,
  reply: FastifyReply,
): Promise<void> {
  const rabbitmqMessageQueueProvider = container.resolve<IMessageQueueProvider>(
    'rabbitmqMessageQueueProvider',
  );

  const message: ProcessDynamicMessageBodyType = body;

  await rabbitmqMessageQueueProvider.sendToQueue({
    message,
    queue: queues.dynamicMessage,
  });

  reply.send();
}
