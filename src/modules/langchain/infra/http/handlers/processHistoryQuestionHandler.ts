import { FastifyReply, FastifyRequest } from 'fastify';
import { ProcessHistoryQuestionBodyType } from '../schemas/bodies/processHistoryQuestionBodySchemna';
import { container } from '../../../../../shared/infra/containers';
import { IMessageQueueProvider } from '../../../../../shared/providers/models/IMessageQueueProvider';
import { queues } from '../../../../../config/amqp/queues';

interface IRequest extends FastifyRequest {
  body: ProcessHistoryQuestionBodyType;
}

export async function processHistoryQuestionHandler(
  { body }: IRequest,
  reply: FastifyReply,
): Promise<void> {
  const rabbitmqMessageQueueProvider = container.resolve<IMessageQueueProvider>(
    'rabbitmqMessageQueueProvider',
  );

  const message: ProcessHistoryQuestionBodyType = body;

  await rabbitmqMessageQueueProvider.sendToQueue({
    message,
    queue: queues.chatHistory,
  });

  reply.send();
}
