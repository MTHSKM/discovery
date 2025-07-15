import { FastifyInstance } from 'fastify';
import { verifyHealthHandler } from '../handlers/verifyHealthHandler';

export async function healthRouter(app: FastifyInstance): Promise<void> {
  app.get(
    '/',
    { schema: { summary: 'Verify application health', tags: ['Health'] } },
    verifyHealthHandler,
  );
}
