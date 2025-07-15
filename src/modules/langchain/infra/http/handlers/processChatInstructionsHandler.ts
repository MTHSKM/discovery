import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from '../../../../../shared/infra/containers';
import { IMessageQueueProvider } from '../../../../../shared/providers/models/IMessageQueueProvider';
import { queues } from '../../../../../config/amqp/queues';
import { ProcessChatInstructionsBodyType } from '../schemas/bodies/processChatInstructionsBodySchema';

interface IRequest extends FastifyRequest {
  body: ProcessChatInstructionsBodyType;
}

export async function processChatInstructionsHandler(
  { body }: IRequest,
  reply: FastifyReply,
): Promise<void> {
  const rabbitmqMessageQueueProvider = container.resolve<IMessageQueueProvider>(
    'rabbitmqMessageQueueProvider',
  );

  const message: ProcessChatInstructionsBodyType = body;

  await rabbitmqMessageQueueProvider.sendToQueue({
    message,
    queue: queues.chatInstructions,
  });

  reply.send();
}
