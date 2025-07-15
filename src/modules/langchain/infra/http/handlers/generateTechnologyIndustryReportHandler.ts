import { FastifyReply, FastifyRequest } from 'fastify';
import { GenerateTechnologyIndustryReportBodyType } from '../schemas/bodies/generateTechnologyIndustryReportBodySchmea';
import { queues } from '../../../../../config/amqp/queues';
import { container } from '../../../../../shared/infra/containers';
import { IMessageQueueProvider } from '../../../../../shared/providers/models/IMessageQueueProvider';

interface IRequest extends FastifyRequest {
  body: GenerateTechnologyIndustryReportBodyType;
}

export async function generateTechnologyIndustryReportHandler(
  { body }: IRequest,
  reply: FastifyReply,
): Promise<void> {
  const rabbitmqMessageQueueProvider = container.resolve<IMessageQueueProvider>(
    'rabbitmqMessageQueueProvider',
  );

  const message: GenerateTechnologyIndustryReportBodyType = body;

  await rabbitmqMessageQueueProvider.sendToQueue({
    message,
    queue: queues.chatTechnology,
  });

  reply.send();
}
