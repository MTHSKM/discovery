import { FastifyReply, FastifyRequest } from 'fastify';
import { GenerateFinancialReportBodyType } from '../schemas/bodies/generateFinancialReportBodySchema';
import { IMessageQueueProvider } from '../../../../../shared/providers/models/IMessageQueueProvider';
import { container } from '../../../../../shared/infra/containers';
import { queues } from '../../../../../config/amqp/queues';

interface IRequest extends FastifyRequest {
  body: GenerateFinancialReportBodyType;
}

export async function generateFinancialReportHandler(
  { body }: IRequest,
  reply: FastifyReply,
): Promise<void> {
  const rabbitmqMessageQueueProvider = container.resolve<IMessageQueueProvider>(
    'rabbitmqMessageQueueProvider',
  );

  const message: GenerateFinancialReportBodyType = body;

  await rabbitmqMessageQueueProvider.sendToQueue({
    message,
    queue: queues.chatFinance,
  });

  reply.send();
}
