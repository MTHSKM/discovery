import { FastifyReply, FastifyRequest } from 'fastify';
import { ProcessChatInstructionsBodyType } from '../schemas/bodies/processChatInstructionsBodySchema';
import { queues } from '../../../../../config/amqp/queues';
import { IMessageQueueProvider } from '../../../../../shared/providers/models/IMessageQueueProvider';
import { container } from '../../../../../shared/infra/containers';

interface IRequest extends FastifyRequest {
  body: ProcessChatInstructionsBodyType;
}

export async function generateReactAgentHandler(
  { body }: IRequest,
  reply: FastifyReply,
): Promise<void> {
  const rabbitmqMessageQueueProvider = container.resolve<IMessageQueueProvider>(
    'rabbitmqMessageQueueProvider',
  );

  const message: ProcessChatInstructionsBodyType = body;

  await rabbitmqMessageQueueProvider.sendToQueue({
    message,
    queue: queues.generateReactAgent,
  });

  reply.send();
}
