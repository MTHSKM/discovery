import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from '../../../../../shared/infra/containers';
import { VerifyHealthService } from '../../../services/VerifyHealthService';

export async function verifyHealthHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const verifyHealthService = container.resolve<VerifyHealthService>(
    'verifyHealthService',
  );

  await verifyHealthService.execute();

  reply.send();
}
