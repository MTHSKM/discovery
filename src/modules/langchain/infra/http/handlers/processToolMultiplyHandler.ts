import { FastifyReply, FastifyRequest } from 'fastify';
import { ProcessCalculationToolBodyType } from '../schemas/bodies/processCalculationTool';
import { queues } from '../../../../../config/amqp/queues';
import { container } from '../../../../../shared/infra/containers';
import { IMessageQueueProvider } from '../../../../../shared/providers/models/IMessageQueueProvider';

interface IRequest extends FastifyRequest {
  body: ProcessCalculationToolBodyType;
}

export async function processToolMultiplyHandler(
  { body }: IRequest,
  reply: FastifyReply,
): Promise<void> {
  const rabbitmqMessageQueueProvider = container.resolve<IMessageQueueProvider>(
    'rabbitmqMessageQueueProvider',
  );

  const message: ProcessCalculationToolBodyType = body;

  await rabbitmqMessageQueueProvider.sendToQueue({
    message,
    queue: queues.toolMultiply,
  });

  reply.send();
}
